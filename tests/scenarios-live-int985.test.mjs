import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-985: five journeys from the 2026-10-04 live dev test — a SKU question with no private workspace, research found
// by the market value, a video plan with an estimate, a token-based deployment, and a menu built from live routes.
// Each known-bad trace fails on its one target only.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const evaluateTrace = (id, tracePath, ...options) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), tracePath, ...options], { encoding: "utf8" });
const evaluate = (id, trace, ...options) => evaluateTrace(id, join(scenarios, id, "traces", trace), ...options);
const failLines = (stdout) => stdout.split(/\r?\n/).filter((line) => line.startsWith("FAIL "));
const compliant = (id) => readFileSync(join(scenarios, id, "traces", "compliant.jsonl"), "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
const temp = (t) => { const dir = mkdtempSync(join(tmpdir(), "intgral-int985-")); t.after(() => rmSync(dir, { recursive: true, force: true })); return dir; };
const writeTrace = (dir, calls) => { const path = join(dir, "trace.jsonl"); writeFileSync(path, calls.map((call) => JSON.stringify(call)).join("\n") + (calls.length ? "\n" : "")); return path; };
const writeFinal = (dir, text) => { const path = join(dir, "final.md"); writeFileSync(path, text); return path; };

const knownBad = [
  ["listing-no-workspace-single-erp", 'FAIL required: no marketplace.get_image_review with {"listing_id":"mlist_lh02_es"}'],
  ["research-find-by-sku-market-value", 'FAIL required: no medusa.admin_get with {"path":"/admin/research/scopes/rscope_colander_es/artifacts"}'],
  ["video-brief-first-round-cap", "FAIL forbidden-write: medusa.admin_post #4 — a draft was created before the user agreed to one"],
  ["start-bearer-token-deployment", 'FAIL text: host.shell #1 contains "Bearer <"'],
  ["start-menu-from-capability", "FAIL required: no medusa.get_started with {}"]
];
for (const [id, line] of knownBad) {
  test(`${id}: the known-bad trace fails on its one target and nothing else`, () => {
    const { stdout, status } = evaluate(id, "known-bad.jsonl");
    assert.equal(status, 1);
    assert.deepEqual(failLines(stdout), [line]);
    assert.match(stdout, /hard checks: 12 passed, 1 failed/);
  });
}

test("no workspace: stopping at the merchant question reads nothing and fails on required and final", (t) => {
  const dir = temp(t);
  const { stdout, status } = evaluateTrace("listing-no-workspace-single-erp", writeTrace(dir, []), "--final", writeFinal(dir, "请先告诉我这是哪个商家？请给我该商家的稳定标识。\n"));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), [
    'FAIL required: no medusa.get_product with {"sku":"LH-TBL-02"}',
    'FAIL required: no marketplace.get_image_review with {"listing_id":"mlist_lh02_es"}',
    'FAIL final: contains "稳定标识"',
    'FAIL final: contains "哪个商家"'
  ]);
});

test("research: the source id as a market filter returns no scope, so the report is never reached", (t) => {
  const calls = compliant("research-find-by-sku-market-value");
  const wrong = { ...calls[3], args: { path: "/admin/research/scopes", query: { target_market: "amazon_es" } }, response: { scopes: [], count: 0 } };
  const { stdout, status } = evaluateTrace("research-find-by-sku-market-value", writeTrace(temp(t), [...calls.slice(0, 3), wrong]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL required: no medusa.admin_get with {"path":"/admin/research/scopes/rscope_colander_es/artifacts"}']);
});

test("video: an answer that already names a draft id is caught even without the POST in the trace", (t) => {
  const dir = temp(t);
  const { stdout, status } = evaluateTrace("video-brief-first-round-cap", writeTrace(dir, compliant("video-brief-first-round-cap")), "--final", writeFinal(dir, "草稿 vgen_31 已建好，估价 1.20 USD。\n"));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL final: contains "vgen_"']);
});

test("token deployment: asking the user to paste the token is named", (t) => {
  const dir = temp(t);
  const { stdout, status } = evaluateTrace("start-bearer-token-deployment", writeTrace(dir, []), "--final", writeFinal(dir, "请把令牌发给我，我来帮你装好。\n"));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL final: contains "把令牌发给我"']);
});

test("menu: listing product video on a deployment without video routes is named", (t) => {
  const dir = temp(t);
  const { stdout, status } = evaluateTrace("start-menu-from-capability", writeTrace(dir, compliant("start-menu-from-capability")), "--final", writeFinal(dir, "1. 查 SKU\n2. 调研\n3. 产品视频\n"));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL final: contains "视频"']);
});

test("no workspace: a listing lookup without view=all gets the empty review queue, so the review is never read", (t) => {
  const calls = compliant("listing-no-workspace-single-erp");
  const queue = { ...calls[1], args: { path: "/admin/amazon/listings", query: { seller_sku: "LH-TBL-02" } }, response: { listings: [], count: 0, view: "needs_review" } };
  const { stdout, status } = evaluateTrace("listing-no-workspace-single-erp", writeTrace(temp(t), [calls[0], queue]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL required: no marketplace.get_image_review with {"listing_id":"mlist_lh02_es"}']);
});
