import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-984: the two intgral-start edges — a name clash with a different endpoint, and no endpoint at all.
const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const scenarios = join(repository, "evals", "scenarios");
const evaluateTrace = (id, tracePath, ...options) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), tracePath, ...options], { encoding: "utf8" });
const evaluate = (id, trace) => evaluateTrace(id, join(scenarios, id, "traces", trace));
const temp = (t) => { const dir = mkdtempSync(join(tmpdir(), "intgral-int984-")); t.after(() => rmSync(dir, { recursive: true, force: true })); return dir; };
const writeTrace = (dir, calls) => { const path = join(dir, "trace.jsonl"); writeFileSync(path, calls.map((call) => JSON.stringify(call)).join("\n") + "\n"); return path; };
const shell = (command, stdout, exit_code = 0) => ({ tool: "host.shell", args: { command }, isError: false, response: { exit_code, stdout } });

const duplicate = "start-duplicate-name-different-endpoint";
const add = "claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp";
const exists = "MCP server intgral already exists in user config";

test("start duplicate: removing the configured server without the user's decision fails on text only", () => {
  const { stdout, status } = evaluate(duplicate, "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL text: host\.shell #3 contains "mcp remove"/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("start duplicate: reporting the clash without reading the configured address fails on required", (t) => {
  const trace = writeTrace(temp(t), [shell(add, exists, 1)]);
  const { stdout, status } = evaluateTrace(duplicate, trace);
  assert.equal(status, 1);
  assert.match(stdout, /required: no host\.shell with \{"command":"claude mcp get intgral"\}/);
  assert.doesNotMatch(stdout, /text:|budget:/);
});

test("start duplicate: shadowing the user-scoped server at another scope is named", (t) => {
  const trace = writeTrace(temp(t), [
    shell(add, exists, 1),
    shell("claude mcp get intgral", "URL: https://old-mcp.example.test/mcp"),
    shell("claude mcp add --transport http --scope project intgral https://mcp.example.test/mcp", "Added"),
    shell("claude mcp add-json intgral '{\"type\":\"http\",\"url\":\"https://mcp.example.test/mcp\"}' -s local", "Added")
  ]);
  const { stdout, status } = evaluateTrace(duplicate, trace);
  assert.equal(status, 1);
  assert.match(stdout, /text: host\.shell #3 contains "--scope project"/);
  assert.match(stdout, /text: host\.shell #4 contains "add-json"/);
  assert.match(stdout, /text: host\.shell #4 contains "-s local"/);
});

test("start duplicate: probing past the shell budget fails on budget", (t) => {
  const trace = writeTrace(temp(t), [shell("claude mcp list", "intgral: https://old-mcp.example.test/mcp (HTTP) - Failed to connect"), shell(add, exists, 1), shell("claude mcp get intgral", "URL: https://old-mcp.example.test/mcp"), shell("claude mcp list", "same"), shell("claude mcp get intgral", "same")]);
  const { stdout, status } = evaluateTrace(duplicate, trace);
  assert.equal(status, 1);
  assert.match(stdout, /budget: host\.shell called 5 times, more than 4/);
});

const missing = "start-endpoint-missing-asks";

test("start missing endpoint: installing before the user gives the address fails on forbidden only", () => {
  const { stdout, status } = evaluate(missing, "known-bad.jsonl");
  assert.equal(status, 1);
  assert.match(stdout, /FAIL forbidden: host\.shell #1 is not allowed in this scenario/);
  assert.match(stdout, /hard checks: 12 passed, 1 failed/);
});

test("start missing endpoint: an answer that shows the command template with a placeholder passes", (t) => {
  const final = join(temp(t), "final.md");
  writeFileSync(final, "请把管理员给你的 Intgral MCP 地址发给我。收到后我会运行：\n`claude mcp add --transport http --scope user intgral <地址>`\n");
  const { stdout, status } = evaluateTrace(missing, join(scenarios, missing, "traces", "compliant.jsonl"), "--final", final);
  assert.equal(status, 0, stdout);
  assert.match(stdout, /hard checks: 13 passed, 0 failed \(0 tool calls\)/);
});

test("start missing endpoint: an answer that invents an endpoint fails on final", (t) => {
  const final = join(temp(t), "final.md");
  writeFileSync(final, "Intgral 的地址一般是 https://mcp.intgral.ai/mcp，我先帮你装上。\n");
  const { stdout, status } = evaluateTrace(missing, join(scenarios, missing, "traces", "compliant.jsonl"), "--final", final);
  assert.equal(status, 1);
  assert.match(stdout, /final: contains "mcp\.intgral"/);
  assert.match(stdout, /final: contains "intgral\.ai"/);
});
