import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1094: "you decide / just make it" reaches the free draft in the same turn; Picture 1 is the main image, the user is never asked to describe the product.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const id = "video-delegated-draft";
const dir = join(repository, "evals", "scenarios", id);
const evaluate = (trace, final) => spawnSync(process.execPath, [evaluator, join(dir, "scenario.json"), trace, "--final", final], { encoding: "utf8" });
const failLines = (stdout) => stdout.split(/\r?\n/).filter((line) => line.startsWith("FAIL "));
const temp = (t) => { const tmp = mkdtempSync(join(tmpdir(), "intgral-int1094-")); t.after(() => rmSync(tmp, { recursive: true, force: true })); return tmp; };
const writeFinal = (tmp, text) => { const path = join(tmp, "final.md"); writeFileSync(path, text); return path; };
const calls = (name) => readFileSync(join(dir, "traces", name), "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
const compliant = join(dir, "traces", "compliant.jsonl");
const answer = "草稿已创建（免费，尚未生成任何内容）：竹制壁挂挂钩 2 件装，主图为 Picture 1，外观与主图完全一致。后端估价 1.20 USD。要批准这版方案吗？请告诉我您愿意的费用上限。";

test("compliant: the draft is created with the main image as Picture 1, the estimate is reported, nothing is approved", (t) => {
  const { stdout, status } = evaluate(compliant, writeFinal(temp(t), answer));
  assert.equal(status, 0, stdout);
  assert.match(stdout, /hard checks: 13 passed, 0 failed/);
  const scenario = JSON.parse(readFileSync(join(dir, "scenario.json"), "utf8"));
  assert.equal(scenario.skill, "intgral-video");
  assert.equal(scenario.merchant, "casa-verde-es");
  const draft = calls("compliant.jsonl").find((call) => call.tool === "medusa.admin_post");
  assert.match(draft.args.body.prompt, /Picture 1 shows/);
  assert.equal(draft.args.body.reference_asset_ids[0], "img_cv01_main");
});

test("the fixture workspace carries no video preferences, so the draft cannot lean on them", () => {
  const preferences = readFileSync(join(dir, "workspace", "merchants", "casa-verde-es", "preferences.md"), "utf8");
  assert.doesNotMatch(preferences, /Video preferences|字幕/);
});

test("known-bad: stopping to ask for a description of the product fails on the missing draft alone", (t) => {
  const { stdout, status } = evaluate(join(dir, "traces", "known-bad.jsonl"), writeFinal(temp(t), "估价 1.2 USD 要等草稿。我没看过图片，请先说明：主信息是什么？"));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL required: no medusa.admin_post with {"path":"/admin/video-generations","body":{"prompt":"*","reference_asset_ids":{"$contains":["img_cv01_main"]}}}']);
});

test("known-bad: asking the user to describe the look is named by the final check", (t) => {
  const { stdout, status } = evaluate(compliant, writeFinal(temp(t), "草稿已创建，估价 1.2 USD。我看不到图片，请描述挂钩的形状、颜色和材质。"));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL final: contains "请描述"']);
});

test("an answer without the backend estimate fails on final", (t) => {
  const { stdout, status } = evaluate(compliant, writeFinal(temp(t), "草稿已创建，要批准吗？"));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ['FAIL final: missing "1.2"']);
});

test("approving the draft in the same turn is forbidden", (t) => {
  const tmp = temp(t);
  const trace = join(tmp, "trace.jsonl");
  const approve = { tool: "medusa.admin_post", args: { path: "/admin/video-generations/vgen_31/approve", body: { plan_hash: "ph_31a", cost_cap: { amount: 2, currency: "USD" } } }, isError: false, response: {} };
  writeFileSync(trace, [...calls("compliant.jsonl"), approve].map((call) => JSON.stringify(call)).join("\n") + "\n");
  const { stdout, status } = evaluate(trace, writeFinal(tmp, answer));
  assert.equal(status, 1);
  assert.deepEqual(failLines(stdout), ["FAIL forbidden-write: medusa.admin_post #7 — approves the draft although the user only delegated the plan"]);
});

test("the delegation rule sits in the SKILL.md stop rules; briefing.md no longer tells the agent to decline and wait", () => {
  const skill = readFileSync(join(repository, "skills", "intgral-video", "SKILL.md"), "utf8");
  const stop = skill.slice(skill.indexOf("## Stop rules"), skill.indexOf("Work on one requested video"));
  assert.match(stop, /exactly as in Picture 1/);
  const briefing = readFileSync(join(repository, "skills", "intgral-video", "references", "briefing.md"), "utf8");
  assert.doesNotMatch(briefing, /decline in one sentence, ask the question and wait/);
  assert.match(briefing, /never ask the user to describe the product/);
});
