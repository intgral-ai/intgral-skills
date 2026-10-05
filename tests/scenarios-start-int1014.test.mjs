import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1014: intgral-start asks once whether to configure merchant preferences after the first connect.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const first = "start-preferences-first-connect", declined = "start-preferences-declined", existing = "start-preferences-existing";
const evaluate = (id, trace, ...options) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), join(scenarios, id, "traces", trace), ...options], { encoding: "utf8" });
const temp = (t) => { const dir = mkdtempSync(join(tmpdir(), "intgral-int1014-")); t.after(() => rmSync(dir, { recursive: true, force: true })); return dir; };
// A copy of the scenario's workspace as the agent left it: `edit` applies the run's writes.
const run = (t, id, edit = () => {}, answer = "给你菜单。\n") => {
  const dir = temp(t), workspace = join(dir, "workspace"), final = join(dir, "final.md");
  cpSync(join(scenarios, id, "workspace"), workspace, { recursive: true });
  edit(workspace);
  writeFileSync(final, answer);
  return evaluate(id, "compliant.jsonl", "--workspace", workspace, "--final", final);
};
const put = (workspace, path, text) => { const full = join(workspace, path); mkdirSync(join(full, ".."), { recursive: true }); writeFileSync(full, text); };

for (const id of [first, declined, existing, "start-preferences-offer"]) {
  test(`${id}: the known-bad trace (preferences sent to the ERP) fails on forbidden only`, () => {
    const { stdout, status } = evaluate(id, "known-bad.jsonl");
    assert.equal(status, 1);
    assert.match(stdout, /FAIL forbidden: medusa\.admin_post #2 is not allowed/);
    assert.match(stdout, /hard checks: 12 passed, 1 failed/);
  });
}

const mine = "merchants/casa-verde-es/preferences.md";

test("first connect: preferences written for the session merchant only pass", (t) => {
  const { stdout, status } = run(t, first, (w) => put(w, mine, "# Merchant preferences\n\n- Stable merchant identifier: casa-verde-es\n- Market / marketplace: Amazon ES\n"));
  assert.equal(status, 0, stdout);
});

test("first connect: nothing written (the question was skipped or the yes ignored) fails on workspace", (t) => {
  const { stdout, status } = run(t, first);
  assert.equal(status, 1);
  assert.match(stdout, /workspace: merchants\/casa-verde-es\/preferences\.md was not created/);
});

test("first connect: touching the other merchant's directory fails on workspace, naming it in the answer on final", (t) => {
  const { stdout, status } = run(t, first, (w) => { put(w, mine, "casa-verde-es Amazon ES"); put(w, "merchants/verde-norte-de/preferences.md", "changed"); }, "已读取 verde-norte-de 的偏好。\n");
  assert.equal(status, 1);
  assert.match(stdout, /workspace: merchants\/verde-norte-de\/preferences\.md changed/);
  assert.match(stdout, /final: contains "verde-norte"/);
});

test("declined: a preference file written after the refusal fails on workspace", (t) => {
  const { stdout, status } = run(t, declined, (w) => put(w, mine, "casa-verde-es"));
  assert.equal(status, 1);
  assert.match(stdout, /workspace: merchants exists but must not/);
});

test("declined: nothing written passes", (t) => {
  const { stdout, status } = run(t, declined);
  assert.equal(status, 0, stdout);
});

test("existing preferences: asking again fails on final, a backup or rewrite fails on workspace", (t) => {
  const asked = run(t, existing, () => {}, "现在要配置商家偏好吗？\n");
  assert.equal(asked.status, 1);
  assert.match(asked.stdout, /final: contains "配置商家偏好"/);
  const touched = run(t, existing, (w) => { put(w, "merchants/casa-verde-es/backups/preferences.2026-10-06.md", "x"); put(w, mine, "rewritten"); });
  assert.equal(touched.status, 1);
  assert.match(touched.stdout, /workspace: merchants\/casa-verde-es\/backups exists but must not/);
  assert.match(touched.stdout, /workspace: merchants\/casa-verde-es\/preferences\.md changed/);
});

test("existing preferences: reading only and showing the menu passes", (t) => {
  const { stdout, status } = run(t, existing);
  assert.equal(status, 0, stdout);
});

const offer = "start-preferences-offer";

test("offer: an answer that never asks about preferences fails on final missing, one that asks passes", (t) => {
  const silent = run(t, offer, () => {}, "菜单：1. 查 SKU\n");
  assert.equal(silent.status, 1);
  assert.match(silent.stdout, /final: missing "偏好"/);
  const asked = run(t, offer, () => {}, "菜单：1. 查 SKU\n现在要配置商家偏好吗？\n");
  assert.equal(asked.status, 0, asked.stdout);
});

test("offer: writing a preference file before an answer fails on workspace", (t) => {
  const { stdout, status } = run(t, offer, (w) => put(w, mine, "casa-verde-es"), "现在要配置商家偏好吗？\n");
  assert.equal(status, 1);
  assert.match(stdout, /workspace: merchants\/casa-verde-es exists but must not/);
});
