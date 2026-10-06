import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1095: A+ images are proposed first, stored only through medusa.attach_aplus_images, never in the listing gallery.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const evaluateTrace = (id, tracePath, ...options) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), tracePath, ...options], { encoding: "utf8" });
const failLines = (stdout) => stdout.split(/\r?\n/).filter((line) => line.startsWith("FAIL "));
const trace = (id, name) => readFileSync(join(scenarios, id, "traces", name), "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
const temp = (t) => { const dir = mkdtempSync(join(tmpdir(), "intgral-int1095-")); t.after(() => rmSync(dir, { recursive: true, force: true })); return dir; };
const writeTrace = (dir, calls) => { const path = join(dir, "trace.jsonl"); writeFileSync(path, calls.map((call) => JSON.stringify(call)).join("\n") + "\n"); return path; };
const writeFinal = (dir, text) => { const path = join(dir, "final.md"); writeFileSync(path, text); return path; };

const knownBad = [
  ["listing-aplus-propose-first", "FAIL forbidden: host.generate_image #3 is not allowed in this scenario"],
  ["listing-aplus-confirmed-store", "FAIL forbidden-write: medusa.update_product #4 — A+ image stored through medusa.update_product (the Amazon listing gallery)"],
  ["listing-aplus-tool-missing", "FAIL forbidden-write: medusa.update_product #2 — A+ image stored through medusa.update_product (the Amazon listing gallery)"]
];
for (const [id, line] of knownBad) {
  test(`${id}: the known-bad trace fails on its one target and nothing else`, (t) => {
    const final = writeFinal(temp(t), "提议：STANDARD_HEADER_IMAGE_TEXT，970x600。要按这个方案生成吗？");
    const { stdout, status } = evaluateTrace(id, join(scenarios, id, "traces", "known-bad.jsonl"), "--final", final);
    assert.equal(status, 1);
    assert.deepEqual(failLines(stdout), [line]);
    assert.match(stdout, /hard checks: 12 passed, 1 failed/);
  });
}

test("propose first: an answer without the exact pixel size fails on final", (t) => {
  const final = writeFinal(temp(t), "我建议做一张头图，要生成吗？");
  const { stdout, status } = evaluateTrace("listing-aplus-propose-first", join(scenarios, "listing-aplus-propose-first", "traces", "compliant.jsonl"), "--final", final);
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL final: missing "970x600"']);
});

test("confirmed store: storing before any image was generated fails on order", (t) => {
  const calls = trace("listing-aplus-confirmed-store", "compliant.jsonl");
  const { stdout, status } = evaluateTrace("listing-aplus-confirmed-store", writeTrace(temp(t), [calls[0], calls[2]]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ["FAIL order: medusa.attach_aplus_images #2 — A+ image stored before the host generated one"]);
});

test("confirmed store: the listing gallery is refused too", (t) => {
  const calls = trace("listing-aplus-confirmed-store", "compliant.jsonl");
  const bad = { tool: "medusa.update_listing", args: { listing_id: "mlist_cv01_es", images: [{ path: "C:/Users/merchant/generated/aplus-hdr.png" }] }, isError: false, response: { write_result: { changed: true } } };
  const { stdout, status } = evaluateTrace("listing-aplus-confirmed-store", writeTrace(temp(t), [...calls, bad]));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ["FAIL forbidden-write: medusa.update_listing #4 — A+ image stored through medusa.update_listing (the Amazon listing gallery)"]);
});
