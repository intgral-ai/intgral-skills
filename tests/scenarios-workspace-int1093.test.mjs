import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1093: a requirement stated mid-task without "always" is offered for saving at the end (one final question, row quoted), written only after a yes.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const offer = "workspace-offer-lasting-requirement", lasting = "workspace-lasting-vs-one-off";
const evaluate = (id, trace, ...options) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), join(scenarios, id, "traces", trace), ...options], { encoding: "utf8" });
const temp = (t) => { const dir = mkdtempSync(join(tmpdir(), "intgral-int1093-")); t.after(() => rmSync(dir, { recursive: true, force: true })); return dir; };
// The scenario's workspace as the agent left it: `edit` applies the run's file writes; `answer` is its final text.
const run = (t, answer, edit = () => {}) => {
  const dir = temp(t), workspace = join(dir, "workspace"), final = join(dir, "final.md");
  cpSync(join(scenarios, offer, "workspace"), workspace, { recursive: true });
  edit(workspace);
  writeFileSync(final, answer);
  return evaluate(offer, "compliant.jsonl", "--workspace", workspace, "--final", final);
};
const put = (workspace, path, text) => { const full = join(workspace, path); mkdirSync(join(full, ".."), { recursive: true }); writeFileSync(full, text); };
const saved = "标题已改并保存。\n要把「标题里别用 premium 这个词」存进偏好吗？\n";

test("offer: the known-bad trace (the preference sent to the ERP) fails on forbidden only", (t) => {
  const final = join(temp(t), "final.md");
  writeFileSync(final, saved);
  const { stdout, status } = evaluate(offer, "known-bad.jsonl", "--final", final);
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden: medusa\.admin_post #3 is not allowed/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("offer: the task done, the row quoted in the final question, preferences untouched passes", (t) => {
  const { stdout, status } = run(t, saved);
  assert.equal(status, 0, stdout);
});

test("offer: an answer that never offers to save the requirement fails on final", (t) => {
  const { stdout, status } = run(t, "标题已改并保存，没有用 premium。\n");
  assert.equal(status, 1);
  assert.match(stdout, /final: missing "偏好"/);
});

test("offer: writing the preference (or its backup) before the user says yes fails on workspace", (t) => {
  const { stdout, status } = run(t, saved, (w) => {
    put(w, "merchants/casa-verde-es/backups/preferences.2026-10-06.md", "x");
    put(w, "merchants/casa-verde-es/preferences.md", "| 2026-10-06 | 标题里别用 premium 这个词 | 用户 |");
  });
  assert.equal(status, 1);
  assert.match(stdout, /workspace: merchants\/casa-verde-es\/preferences\.md changed/);
  assert.match(stdout, /workspace: merchants\/casa-verde-es\/backups exists but must not/);
});

test("explicit lasting plus one-off: asking whether to save either one fails on final", (t) => {
  const answer = join(temp(t), "final.md");
  writeFileSync(answer, "已记下：卖点用西班牙语。\n这次的大写标题要把「全大写 CASA VERDE」存进偏好吗？\n");
  const { stdout, status } = evaluate(lasting, "compliant.jsonl", "--final", answer);
  assert.equal(status, 1);
  assert.match(stdout, /final: contains "偏好吗"/);
});
