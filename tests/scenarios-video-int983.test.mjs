import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-983: five video journeys — changed plan hash, running generation, cost pause, refused frame budget, voice-over/subtitle gap.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const mock = join(repository, "scripts", "mock-mcp.mjs");
const scenarios = join(repository, "evals", "scenarios");
const scenarioPath = (id) => join(scenarios, id, "scenario.json");
const evaluateTrace = (id, tracePath) => spawnSync(process.execPath, [evaluator, scenarioPath(id), tracePath], { encoding: "utf8" });
const evaluate = (id, trace) => evaluateTrace(id, join(scenarios, id, "traces", trace));
const ids = ["video-approve-changed-plan-hash", "video-running-no-replacement", "video-paused-for-cost", "video-keyframe-budget-refused", "video-subtitles-voiceover-gap"];

for (const id of ids) {
  test(`${id}: compliant passes all thirteen checks and opens the product page once`, () => {
    const { stdout, status } = evaluate(id, "compliant.jsonl");
    assert.equal(status, 0, stdout);
    assert.match(stdout, /hard checks: 13 passed, 0 failed/);
    const scenario = JSON.parse(readFileSync(scenarioPath(id), "utf8"));
    assert.equal(scenario.skill, "intgral-video");
    assert.equal(scenario.merchant, "casa-verde-es");
    assert.deepEqual(scenario.expect.max_calls, { "host.open_url": 1 });
    assert.ok(scenario.expect.required_writes.some((write) => write.tool === "host.open_url"));
  });
}

test("changed plan hash: approving the unreviewed ph_B fails on the approval alone", () => {
  const { stdout, status } = evaluate("video-approve-changed-plan-hash", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden-write: medusa\.admin_post #4 — approves vgen_11 although its plan hash changed since the user's review/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("running generation: a replacement draft fails on the replacement alone", () => {
  const { stdout, status } = evaluate("video-running-no-replacement", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden-write: medusa\.admin_post #4 — creates a replacement generation while vgen_09 is still running/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("cost pause: resuming with a self-chosen cap names both the resume and the cap", () => {
  const { stdout, status } = evaluate("video-paused-for-cost", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden-write: medusa\.admin_post #4 — resumes vgen_15 before the user authorizes a higher cap/);
  assert.match(stdout, /FAIL forbidden-write: medusa\.admin_post #4 — sends a cost cap the user never named/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("frame budget: resending the reservation with authorized_budget fails; the plain refused reservation does not", () => {
  const { stdout, status } = evaluate("video-keyframe-budget-refused", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden-write: medusa\.admin_post #6 — raises the frame budget the user has not authorized/);
  assert.doesNotMatch(stdout, /#5/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("frame budget: generating the frame with the host image tool is forbidden, and a reservation needs the generation read first", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-int983-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const trace = join(dir, "trace.jsonl");
  writeFileSync(trace, [
    { tool: "medusa.admin_post", args: { path: "/admin/video-generations/vgen_20/keyframes/reservations", body: { segment_index: 0, position: "last" } }, isError: true, response: { code: "invalid_data" } },
    { tool: "host.generate_image", args: { prompt: "Casa Verde bamboo wall hook, 9:16" }, isError: false, response: { url: "https://host.example.test/generated/img_001.png" } },
  ].map((call) => JSON.stringify(call)).join("\n") + "\n");
  const { stdout, status } = evaluateTrace("video-keyframe-budget-refused", trace);
  assert.equal(status, 1);
  assert.match(stdout, /forbidden: host\.generate_image #2 is not allowed in this scenario/);
  assert.match(stdout, /order: medusa\.admin_post #1 — reserves a keyframe before reading vgen_20's current state/);
});

test("voice-over gap: a silent-downgrade draft fails on the draft, not on the mandated no-speech sentence", () => {
  const { stdout, status } = evaluate("video-subtitles-voiceover-gap", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden-write: medusa\.admin_post #6 — creates the draft before the user decides the voice-over and subtitle gap/);
  assert.doesNotMatch(stdout, /text:/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("voice-over gap: a draft that writes a Spanish narrator into the prompt is named by the text check too", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-int983-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const trace = join(dir, "trace.jsonl");
  writeFileSync(trace, JSON.stringify({ tool: "medusa.admin_post", args: { path: "/admin/video-generations", body: { product_id: "prod_cv01", segments: [{ duration_s: 10, prompt: "A Spanish narrator introduces the Casa Verde bamboo wall hook." }] } }, isError: false, response: {} }) + "\n");
  const { stdout, status } = evaluateTrace("video-subtitles-voiceover-gap", trace);
  assert.equal(status, 1);
  assert.match(stdout, /text: medusa\.admin_post #1 contains "narrator"/);
});

test("voice-over gap: the deployed create schema offers no speech or subtitle field", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-int983-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const result = spawnSync(process.execPath, [mock, scenarioPath("video-subtitles-voiceover-gap"), join(dir, "trace.jsonl"), "call", "medusa.describe_endpoint", JSON.stringify({ method: "POST", path: "/admin/video-generations" })], { encoding: "utf8" });
  const fields = Object.keys(JSON.parse(result.stdout).request_schema.properties);
  assert.ok(fields.includes("segments"));
  assert.deepEqual(fields.filter((field) => /speech|voice|narrat|subtitle|caption|audio/i.test(field)), []);
});
