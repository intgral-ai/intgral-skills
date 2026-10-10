import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1090 through the entry skill: intgral-start handles a SKU the catalog lacks by looking it up among listings, opening the listing page and naming the catalog gap.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const id = "start-sku-only-in-listings";
const scenario = join(repository, "evals", "scenarios", id);
const evaluate = (t, trace, answer) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-start-int1090-")); t.after(() => rmSync(dir, { recursive: true, force: true }));
  const final = join(dir, "final.md"); writeFileSync(final, answer);
  return spawnSync(process.execPath, [evaluator, join(scenario, "scenario.json"), join(scenario, "traces", trace), "--final", final], { encoding: "utf8" });
};
const gap = "CV-LAMP-07 在 Amazon 上在售，但目录里还没有这个产品；要不要 bootstrap 导入由你决定。";

test("start: stopping at not_found fails on required (no listing lookup, no page)", (t) => {
  const { stdout, status } = evaluate(t, "known-bad.jsonl", "目录里没有 CV-LAMP-07。");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL required: no medusa\.admin_get with .*"view":"all"/);
  assert.match(stdout, /FAIL required: no host\.open_url/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("start: previewing the bootstrap import in the same turn fails on forbidden only", (t) => {
  const { stdout, status } = evaluate(t, "bootstrap-same-turn.jsonl", gap);
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden: medusa\.request_bootstrap_preview #6/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("start: an answer that reports the listing without the catalog gap fails on final, the gap answer passes", (t) => {
  const silent = evaluate(t, "compliant.jsonl", "CV-LAMP-07 在售，缺一条卖点。");
  assert.equal(silent.status, 1);
  assert.match(silent.stdout, /final: missing "目录"/);
  assert.equal(evaluate(t, "compliant.jsonl", gap).status, 0);
});
