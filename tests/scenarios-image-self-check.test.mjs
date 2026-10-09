import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// Self-check of generated images: the agent looks at what the host generated before storing it. The first
// generation is defective (listing: "Casa Vrede" lettering; video: a hook cut off by the frame edge), the second is right.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const mock = join(repository, "scripts", "mock-mcp.mjs");
const scenarios = join(repository, "evals", "scenarios");
const scenarioPath = (id) => join(scenarios, id, "scenario.json");
const evaluateTrace = (id, tracePath) => spawnSync(process.execPath, [evaluator, scenarioPath(id), tracePath], { encoding: "utf8" });
const evaluate = (id, trace) => evaluateTrace(id, join(scenarios, id, "traces", trace));
const failLines = (stdout) => stdout.split(/\r?\n/).filter((line) => line.startsWith("FAIL "));
const temp = (t) => { const dir = mkdtempSync(join(tmpdir(), "intgral-selfcheck-")); t.after(() => rmSync(dir, { recursive: true, force: true })); return dir; };
const writeTrace = (dir, calls) => { const path = join(dir, "trace.jsonl"); writeFileSync(path, calls.map((call) => JSON.stringify(call)).join("\n") + "\n"); return path; };
const call = (id, trace, tool, args) => JSON.parse(spawnSync(process.execPath, [mock, scenarioPath(id), trace, "call", tool, JSON.stringify(args)], { encoding: "utf8" }).stdout);

const cases = {
  "listing-image-self-check": {
    skill: "intgral-listing", bad: "gen_cv01_a", good: "gen_cv01_b", badText: /"Casa Vrede"/, goodText: /"Casa Verde"/,
    store: (url) => ({ tool: "medusa.update_product", args: { product_id: "prod_cv01", images: [{ url }] }, isError: false, response: {} }),
    knownBad: [
      "FAIL order: medusa.update_product #5 — stores a generated image before looking at any generated image",
      "FAIL forbidden-write: medusa.update_product #5 — stores the generated image whose packaging reads \"Casa Vrede\"",
    ],
    onlyBadViewed: "FAIL order: medusa.update_product #2 — stores the regenerated image without looking at it",
  },
  "video-keyframe-self-check": {
    skill: "intgral-video", bad: "gen_kf21_a", good: "gen_kf21_b", badText: /right-hand hook runs past the right edge/, goodText: /fully inside the frame/,
    store: (url) => ({ tool: "medusa.admin_post", args: { path: "/admin/video-generations/vgen_21/keyframes", body: { segment_index: 0, position: "last", image_url: url } }, isError: false, response: {} }),
    knownBad: [
      "FAIL order: medusa.admin_post #6 — stores a generated frame before looking at any generated frame",
      "FAIL forbidden-write: medusa.admin_post #6 — stores the generated frame whose right-hand hook is cut off by the frame edge",
    ],
    onlyBadViewed: "FAIL order: medusa.admin_post #2 — stores the regenerated frame without looking at it",
  },
};
const url = (id) => `https://host.example.test/generated/${id}.png`;

for (const [id, c] of Object.entries(cases)) {
  test(`${id}: compliant passes all thirteen checks; one redo, one page open`, () => {
    const { stdout, status } = evaluate(id, "compliant.jsonl");
    assert.equal(status, 0, stdout);
    assert.match(stdout, /hard checks: 13 passed, 0 failed/);
    const scenario = JSON.parse(readFileSync(scenarioPath(id), "utf8"));
    assert.equal(scenario.skill, c.skill);
    assert.equal(scenario.merchant, "casa-verde-es");
    assert.deepEqual(scenario.expect.max_calls, { "host.generate_image": 2, "host.open_url": 1 });
  });

  test(`${id}: storing the first image unseen fails on the forbidden write and the look-first order`, () => {
    const { stdout, status } = evaluate(id, "known-bad.jsonl");
    assert.equal(status, 1);
    const lines = failLines(stdout);
    for (const line of c.knownBad) assert.ok(lines.includes(line), `${line}\n${stdout}`);
    assert.ok(lines.some((line) => line.startsWith("FAIL required:") && line.includes(url(c.good))), stdout);
  });

  test(`${id}: the mock serves the defective image first and the corrected one second`, (t) => {
    const trace = join(temp(t), "trace.jsonl");
    const first = call(id, trace, "host.generate_image", { prompt: "first" });
    const second = call(id, trace, "host.generate_image", { prompt: "redo" });
    assert.deepEqual([first.image_id, first.url, second.image_id, second.url], [c.bad, url(c.bad), c.good, url(c.good)]);
    // The host's vision describes facts by id or URL alike; it never grades the image.
    for (const args of [{ image_id: c.bad }, { url: url(c.bad) }]) assert.match(call(id, trace, "host.view_image", args).description, c.badText);
    for (const args of [{ image_id: c.good }, { url: url(c.good) }]) assert.match(call(id, trace, "host.view_image", args).description, c.goodText);
    const descriptions = JSON.stringify(JSON.parse(readFileSync(scenarioPath(id), "utf8")).tools.find((tool) => tool.name === "host.view_image").responses);
    assert.doesNotMatch(descriptions, /wrong|incorrect|defect|error in|mistake|should/i);
  });

  test(`${id}: looking only at the defective image does not license storing the redo`, (t) => {
    const trace = writeTrace(temp(t), [
      { tool: "host.view_image", args: { image_id: c.bad }, isError: false, response: {} },
      c.store(url(c.good)),
    ]);
    const { stdout } = evaluateTrace(id, trace);
    assert.ok(failLines(stdout).includes(c.onlyBadViewed), stdout);
  });

  test(`${id}: a third generation exceeds the one-redo budget`, (t) => {
    const generate = { tool: "host.generate_image", args: { prompt: "x" }, isError: false, response: {} };
    const { stdout } = evaluateTrace(id, writeTrace(temp(t), [generate, generate, generate]));
    assert.ok(failLines(stdout).includes("FAIL budget: host.generate_image called 3 times, more than 2"), stdout);
  });
}

test("video-keyframe-self-check: a frame generated before any reservation is named, and no review is recorded for the user", (t) => {
  const trace = writeTrace(temp(t), [
    { tool: "host.generate_image", args: { prompt: "x" }, isError: false, response: {} },
    { tool: "medusa.admin_post", args: { path: "/admin/video-generations/vgen_21/keyframes/kf_21_b1/review", body: { decision: "approved" } }, isError: false, response: {} },
  ]);
  const lines = failLines(evaluateTrace("video-keyframe-self-check", trace).stdout);
  assert.ok(lines.includes("FAIL order: host.generate_image #1 — generates a keyframe image without a reservation"), lines.join("\n"));
  assert.ok(lines.includes("FAIL forbidden-write: medusa.admin_post #2 — records a keyframe review on the user's behalf"), lines.join("\n"));
});

test("listing-image-self-check: replacing the current main image instead of adding a candidate is named", (t) => {
  const trace = writeTrace(temp(t), [
    { tool: "host.view_image", args: { image_id: "gen_cv01_b" }, isError: false, response: {} },
    { tool: "medusa.update_product", args: { product_id: "prod_cv01", images: [{ url: url("gen_cv01_b"), replace_url: "https://cdn.example.test/prod_cv01/main.jpg" }] }, isError: false, response: {} },
  ]);
  const lines = failLines(evaluateTrace("listing-image-self-check", trace).stdout);
  assert.ok(lines.includes("FAIL forbidden-write: medusa.update_product #2 — replaces an existing product image instead of adding the candidate"), lines.join("\n"));
});
