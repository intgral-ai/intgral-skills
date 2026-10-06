import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1090: a SKU the catalog lacks is looked up among listings before it is called missing; the bootstrap import is only offered.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const only = "listing-sku-only-in-listings", neither = "listing-sku-in-neither-place";
const evaluate = (t, id, trace, answer) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-int1090-")); t.after(() => rmSync(dir, { recursive: true, force: true }));
  const final = join(dir, "final.md"); writeFileSync(final, answer);
  return spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), join(scenarios, id, "traces", trace), "--final", final], { encoding: "utf8" });
};
const gap = "目录里还没有这个产品；bootstrap 导入由你决定。";
const missing = "CV-LAMP-99 在目录和 listing 里都没找到。";

test("only in listings: stopping at not_found fails on required (no listing lookup, no page)", (t) => {
  const { stdout, status } = evaluate(t, only, "known-bad.jsonl", gap);
  assert.equal(status, 1);
  assert.match(stdout, /FAIL required: no medusa\.admin_get with .*"view":"all"/);
  assert.match(stdout, /FAIL required: no host\.open_url/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("only in listings: running the bootstrap import in the same turn fails on forbidden only", (t) => {
  const { stdout, status } = evaluate(t, only, "bootstrap-same-turn.jsonl", gap);
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden: medusa\.request_bootstrap_apply #5/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("only in listings: an answer that omits the catalog gap or the import offer fails on final", (t) => {
  const silent = evaluate(t, only, "compliant.jsonl", "状态：在售。");
  assert.equal(silent.status, 1);
  assert.match(silent.stdout, /final: missing "目录"/);
  assert.match(silent.stdout, /final: missing "bootstrap"/);
  assert.equal(evaluate(t, only, "compliant.jsonl", gap).status, 0);
});

test("neither: guessing a near-match SKU fails on budget only", (t) => {
  const { stdout, status } = evaluate(t, neither, "known-bad.jsonl", missing);
  assert.equal(status, 1);
  assert.match(stdout, /FAIL budget: medusa\.get_product called 2 times, more than 1/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("neither: creating the missing product fails on forbidden only", (t) => {
  const { stdout, status } = evaluate(t, neither, "creates-product.jsonl", missing);
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden: medusa\.create_product #3/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("neither: an answer that offers the near-match fails on final, the plain answer passes", (t) => {
  const offered = evaluate(t, neither, "compliant.jsonl", "CV-LAMP-99 没找到，你是不是要找 CV-LAMP-98？listing 也没有。");
  assert.equal(offered.status, 1);
  assert.match(offered.stdout, /final: contains "CV-LAMP-98"/);
  assert.equal(evaluate(t, neither, "compliant.jsonl", missing).status, 0);
});
