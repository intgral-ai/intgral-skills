import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1015: independent reads may fan out to subagents; a write or billed route never goes into one. The mocked
// `host.subagent` ability records what the subagent was given (`tools`), which is what the hard checks judge.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const evaluateTrace = (id, tracePath) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), tracePath], { encoding: "utf8" });
const evaluate = (id, trace) => evaluateTrace(id, join(scenarios, id, "traces", trace));
const failLines = (stdout) => stdout.split(/\r?\n/).filter((line) => line.startsWith("FAIL "));
const trace = (id, name) => readFileSync(join(scenarios, id, "traces", name), "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
const temp = (t) => { const dir = mkdtempSync(join(tmpdir(), "intgral-int1015-")); t.after(() => rmSync(dir, { recursive: true, force: true })); return dir; };
const writeTrace = (dir, calls) => { const path = join(dir, "trace.jsonl"); writeFileSync(path, calls.map((call) => JSON.stringify(call)).join("\n") + "\n"); return path; };

const knownBad = [
  ["research-parallel-readonly", "FAIL forbidden-write: host.subagent #3 — a write or billed route was handed to a subagent"],
  ["listing-parallel-no-write-fanout", "FAIL forbidden-write: host.subagent #1 — a write door was handed to a subagent"]
];
for (const [id, line] of knownBad) {
  test(`${id}: the known-bad trace fails on its one target and nothing else`, () => {
    const { stdout, status } = evaluate(id, "known-bad.jsonl");
    assert.equal(status, 1);
    assert.deepEqual(failLines(stdout), [line]);
    assert.match(stdout, /hard checks: 12 passed, 1 failed/);
  });
  test(`${id}: the same reads without a subagent pass the same checks`, () => {
    const { stdout, status } = evaluate(id, "sequential.jsonl");
    assert.equal(status, 0, stdout);
    assert.match(stdout, /hard checks: 13 passed, 0 failed/);
  });
}

test("research: one subagent per competitor at most", (t) => {
  const calls = trace("research-parallel-readonly", "compliant.jsonl");
  const { stdout, status } = evaluateTrace("research-parallel-readonly", writeTrace(temp(t), [...calls, calls.at(-1)]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ["FAIL budget: host.subagent called 5 times, more than 4"]);
});

test("research: a save outside any subagent is still refused by the scenario", (t) => {
  const post = { tool: "medusa.admin_post", args: { path: "/admin/research/artifacts", body: { record_type: "report" } }, isError: true, response: { code: "forbidden" } };
  const { stdout, status } = evaluateTrace("research-parallel-readonly", writeTrace(temp(t), [...trace("research-parallel-readonly", "sequential.jsonl"), post]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ["FAIL forbidden: medusa.admin_post #7 is not allowed in this scenario"]);
});

test("listing: a write before the SKU's current state was read fails on order", (t) => {
  const calls = trace("listing-parallel-no-write-fanout", "sequential.jsonl");
  const { stdout, status } = evaluateTrace("listing-parallel-no-write-fanout", writeTrace(temp(t), [calls[3], calls[0], calls[1], calls[2], calls[4], calls[5]]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ["FAIL order: medusa.update_product #1 — CV-HOOK-01 was written before its current state was read"]);
});

test("listing: a second write to the same product fails on budget and repeat", (t) => {
  const calls = trace("listing-parallel-no-write-fanout", "compliant.jsonl");
  const { stdout, status } = evaluateTrace("listing-parallel-no-write-fanout", writeTrace(temp(t), [...calls, calls.at(-1)]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), [
    "FAIL repeat: medusa.update_product #8 to prod_cv03 repeats a completed write",
    "FAIL budget: medusa.update_product called 4 times, more than 3"
  ]);
});
