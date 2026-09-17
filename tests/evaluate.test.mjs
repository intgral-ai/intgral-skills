import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarioDir = join(repository, "evals", "scenarios", "listing-title-only-two-skus");
const scenario = join(scenarioDir, "scenario.json");
const evaluate = (trace) => spawnSync(process.execPath, [evaluator, scenario, join(scenarioDir, "traces", trace)], { encoding: "utf8" });

test("a compliant title-only trace passes every hard check and lists the rubric for human review", () => {
  const result = evaluate("compliant.jsonl");
  assert.equal(result.status, 0, result.stderr + result.stdout);
  assert.match(result.stdout, /hard checks: 6 passed, 0 failed/);
  assert.match(result.stdout, /human review/);
});

test("the known-bad trace is rejected for scope, blind retry and repeated completed write", () => {
  const result = evaluate("known-bad.jsonl");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /scope: medusa\.update_product #3 sends description/);
  assert.match(result.stdout, /retry: medusa\.update_product #5 to prod_cv02 follows read_state_before_retry without a read/);
  assert.match(result.stdout, /repeat: medusa\.update_product #6 to prod_cv01 repeats a completed write/);
});
