import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { readdirSync, readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
// A scenario that declares final_required_text needs a final answer to judge: give it one holding every required string.
const finalFor = (id) => {
  const required = JSON.parse(readFileSync(join(scenarios, id, "scenario.json"), "utf8")).expect.final_required_text ?? [];
  if (!required.length) return [];
  const path = join(mkdtempSync(join(tmpdir(), "intgral-final-")), "final.md");
  writeFileSync(path, required.join(" "));
  return ["--final", path];
};
const evaluateTrace = (id, tracePath) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), tracePath, ...finalFor(id)], { encoding: "utf8" });
const evaluate = (id, trace) => evaluateTrace(id, join(scenarios, id, "traces", trace));

for (const id of readdirSync(scenarios)) {
  test(`${id}: the hand-written compliant trace passes every hard check`, () => {
    const result = evaluate(id, "compliant.jsonl");
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.match(result.stdout, /hard checks: 13 passed, 0 failed/);
    assert.match(result.stdout, /human review/);
  });
  if (existsSync(join(scenarios, id, "traces", "known-bad.jsonl"))) {
    test(`${id}: the known-bad trace is rejected`, () => {
      assert.equal(evaluate(id, "known-bad.jsonl").status, 1);
    });
  }
}

// A new save must carry the runbook revision the installed skill declares; historical reports keep theirs.
const declaredRunbook = (skill) => readFileSync(join(repository, "skills", skill, "SKILL.md"), "utf8").match(/runbook_revision: (\S+@\d+)/)?.[1];
const saveRevisions = (id) => {
  const scenario = JSON.parse(readFileSync(join(scenarios, id, "scenario.json"), "utf8"));
  const trace = readFileSync(join(scenarios, id, "traces", "compliant.jsonl"), "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
  const bodies = [...(scenario.expect.required_writes ?? []).map((write) => write.args?.body), ...trace.map((call) => call.args?.body)];
  return { skill: scenario.skill, revisions: bodies.map((body) => body?.runbook_revision).filter(Boolean) };
};
for (const id of readdirSync(scenarios)) {
  const { skill, revisions } = saveRevisions(id);
  const declared = declaredRunbook(skill);
  if (!declared || revisions.length === 0) continue;
  test(`${id}: required and compliant saves carry the runbook revision ${skill} declares`, () => {
    assert.deepEqual(revisions, revisions.map(() => declared));
  });
}

test("listing: the known-bad trace names scope, blind retry and repeated completed write", () => {
  const { stdout } = evaluate("listing-title-only-two-skus", "known-bad.jsonl");
  assert.match(stdout, /scope: medusa\.update_product #3 sends description/);
  assert.match(stdout, /retry: medusa\.update_product #5 to prod_cv02 follows read_state_before_retry without a read/);
  assert.match(stdout, /repeat: medusa\.update_product #6 to prod_cv01 repeats a completed write/);
});

test("research: the known-bad trace names the unauthorized plan and the ratings-only review themes", () => {
  const { stdout } = evaluate("research-competitor-ratings-only", "known-bad.jsonl");
  assert.match(stdout, /forbidden-write: medusa\.admin_post #5 — collection was not authorized/);
  assert.match(stdout, /forbidden-write: medusa\.admin_post #6 — review themes claimed without retained review bodies/);
  assert.match(stdout, /required: no medusa\.admin_post with/);
});

test("listing copy: the conflict known-bad trace names the unsupported text and the unrequested title", () => {
  const { stdout, status } = evaluate("listing-copy-conflict", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /text: medusa\.update_listing #3 contains "acero inoxidable"/);
  assert.match(stdout, /text: medusa\.update_listing #3 contains "5 kg"/);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #3 — title rewritten/);
});

test("listing open: a saved write that leaves the product page closed fails only on the missing open", () => {
  const { stdout, status } = evaluate("listing-open-after-write", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /required: no host\.open_url with \{"url":"https:\/\/erp\.example\.test\/app\/products\/prod_cv01"\}/);
  assert.doesNotMatch(stdout, /scope:|retry:|repeat:|forbidden/);
});

test("listing family: the known-bad trace names the price, offer and stock sent to the parent, and the stock written to the children", () => {
  const { stdout, status } = evaluate("listing-create-family-parent", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /text: medusa\.update_product #3 contains "RS-9001-BK-PARENT"/);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #4 — offer written to the non-buyable parent/);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #4 — stock written to the non-buyable parent/);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #4 — writes to the parent listing, which nobody asked to change/);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #5 — stock written to a listing \(the FBM stock policy is the user's\)/);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #6 — stock written to a listing \(the FBM stock policy is the user's\)/);
  assert.doesNotMatch(stdout, /scope:/);
});

test("listing family: a parent write the ERP refused still fails, though the children were then priced correctly", () => {
  const { stdout, status } = evaluate("listing-create-family-parent", "parent-write-refused.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #4 — stock written to the non-buyable parent/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("listing: a retry cleared by a read keyed on SKU whose response names the subject passes", () => {
  const { stdout, status } = evaluate("listing-title-only-two-skus", "retry-after-sku-read.jsonl");
  assert.equal(status, 0, stdout);
  assert.match(stdout, /hard checks: 13 passed, 0 failed/);
});

test("research brief: the save the mock refused for a missing argument is not judged as a completed write", () => {
  const { stdout, status } = evaluate("research-brief-pinned-no-acquisition", "refused-then-corrected.jsonl");
  assert.equal(status, 0, stdout);
  assert.match(stdout, /hard checks: 13 passed, 0 failed \(6 tool calls\)/);
});

test("listing copy: a refused write is judged on the text it tried to send, not on its scope", () => {
  const { stdout, status } = evaluate("listing-copy-conflict", "refused-with-forbidden-text.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /text: medusa\.update_listing #3 contains "acero inoxidable"/);
  assert.doesNotMatch(stdout, /scope:/);
});

test("a refused call to a forbidden tool is still reported", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-evaluate-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const trace = join(dir, "trace.jsonl");
  writeFileSync(trace, JSON.stringify({ tool: "medusa.update_product", args: { title: "x" }, isError: true, response: { code: "invalid_arguments", message: "missing required argument(s): product_id" } }) + "\n");
  const { stdout, status } = evaluateTrace("research-brief-pinned-no-acquisition", trace);
  assert.equal(status, 1);
  assert.match(stdout, /forbidden: medusa\.update_product #1 is not allowed/);
});

test("start: the first-time known-bad trace (instructions only, nothing installed) fails on required only", () => {
  const { stdout, status } = evaluate("start-first-time-install", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /required: no host\.shell with \{"command":"claude mcp add --transport http --scope user intgral https:\/\/mcp\.example\.test\/mcp"\}/);
  assert.doesNotMatch(stdout, /scope:|forbidden/);
});

test("start: reinstalling an already connected server is named as a forbidden write", () => {
  const { stdout, status } = evaluate("start-connected-menu", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /forbidden-write: host\.shell #2 — reinstalls a connected MCP server/);
  assert.doesNotMatch(stdout, /required:/);
});

test("listing open on read: answering a SKU question without opening its page fails on required only", () => {
  const { stdout, status } = evaluate("listing-open-on-sku-read", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /required: no host\.open_url with \{"url":"https:\/\/erp\.example\.test\/app\/products\/prod_cv01"\}/);
  assert.doesNotMatch(stdout, /scope:|forbidden/);
});

test("video delete: calling the refused DELETE route is named as forbidden, nothing else", () => {
  const { stdout, status } = evaluate("video-delete-version-handoff", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /forbidden: medusa\.admin_delete #4 is not allowed in this scenario/);
  assert.doesNotMatch(stdout, /required:|forbidden-write:/);
});

test("live listing: writing a non-editable brand is named as a forbidden write", () => {
  const { stdout, status } = evaluate("listing-live-attribute-edit", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /forbidden-write: medusa\.update_listing #3 — writes brand, which is editable:false on a live listing/);
  assert.doesNotMatch(stdout, /required:|scope:/);
});

test("video label: resuming a failure with retry_action null is named as a forbidden write", () => {
  const { stdout, status } = evaluate("video-label-missing-no-retry", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /forbidden-write: medusa\.admin_post #4 — resumes a failure whose retry_action is null/);
  assert.doesNotMatch(stdout, /required:/);
});

test("listing FBM: saving the FBM policy through the passthrough is forbidden", () => {
  const { stdout, status } = evaluate("listing-fbm-switch-handoff", "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /forbidden: medusa\.admin_post #3 is not allowed in this scenario/);
  assert.doesNotMatch(stdout, /required:/);
});

test("final_required_text: an answer lacking a required string fails on final, case-insensitively", () => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-final-required-"));
  try {
    const scenario = join(dir, "scenario.json");
    writeFileSync(scenario, JSON.stringify({ id: "x", version: 1, skill: "intgral-start", request: "x", tools: [], expect: { writes: {}, reads: [], forbidden_tools: [], required_writes: [], final_required_text: ["Preferences"] }, rubric: [] }));
    writeFileSync(join(dir, "trace.jsonl"), "");
    const run = (answer) => { writeFileSync(join(dir, "final.md"), answer); return spawnSync(process.execPath, [evaluator, scenario, join(dir, "trace.jsonl"), "--final", join(dir, "final.md")], { encoding: "utf8" }); };
    const missing = run("Here is the menu.\n");
    assert.equal(missing.status, 1);
    assert.match(missing.stdout, /FAIL final: missing "Preferences"/);
    assert.equal(run("Configure PREFERENCES now?\n").status, 0);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("final_required_text: declared but no --final answer given fails on final", () => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-final-required-"));
  try {
    const scenario = join(dir, "scenario.json");
    writeFileSync(scenario, JSON.stringify({ id: "x", version: 1, skill: "intgral-start", request: "x", tools: [], expect: { writes: {}, reads: [], forbidden_tools: [], required_writes: [], final_required_text: ["x"] }, rubric: [] }));
    writeFileSync(join(dir, "trace.jsonl"), "");
    const result = spawnSync(process.execPath, [evaluator, scenario, join(dir, "trace.jsonl")], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stdout, /FAIL final: final_required_text is declared but no --final answer/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
