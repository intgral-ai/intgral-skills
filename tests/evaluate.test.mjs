import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const evaluate = (id, trace) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), join(scenarios, id, "traces", trace)], { encoding: "utf8" });

for (const id of readdirSync(scenarios)) {
  test(`${id}: the hand-written compliant trace passes every hard check`, () => {
    const result = evaluate(id, "compliant.jsonl");
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.match(result.stdout, /hard checks: 8 passed, 0 failed/);
    assert.match(result.stdout, /human review/);
  });
  if (existsSync(join(scenarios, id, "traces", "known-bad.jsonl"))) {
    test(`${id}: the known-bad trace is rejected`, () => {
      assert.equal(evaluate(id, "known-bad.jsonl").status, 1);
    });
  }
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
