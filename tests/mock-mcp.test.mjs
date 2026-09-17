import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repository = fileURLToPath(new URL("..", import.meta.url));
const mock = join(repository, "scripts", "mock-mcp.mjs");
const scenarioDir = join(repository, "evals", "scenarios", "listing-title-only-two-skus");
const scenario = join(scenarioDir, "scenario.json");
const run = (trace, ...args) => spawnSync(process.execPath, [mock, scenario, trace, ...args], { encoding: "utf8" });

test("the mock lists the scenario's tool contracts like tools/list", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const result = run(join(dir, "trace.jsonl"), "list");
  assert.equal(result.status, 0, result.stderr);
  const tools = JSON.parse(result.stdout);
  assert.deepEqual(tools.map((tool) => tool.name).sort(), ["medusa.admin_get", "medusa.get_product", "medusa.get_started", "medusa.update_listing", "medusa.update_product"]);
  assert.ok(tools.every((tool) => tool.inputSchema && tool.description && !("responses" in tool)));
});

test("an unknown write is served once, then the state read shows it committed, and every call lands in the trace", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const trace = join(dir, "trace.jsonl");
  const first = JSON.parse(run(trace, "call", "medusa.update_product", JSON.stringify({ product_id: "prod_cv02", title: "x" })).stdout);
  assert.equal(first.isError, true);
  assert.equal(first.write_result.next_action, "read_state_before_retry");
  const read = JSON.parse(run(trace, "call", "medusa.get_product", JSON.stringify({ product_id: "prod_cv02" })).stdout);
  assert.equal(read.products[0].title, "Casa Verde 竹制壁挂挂钩 · 4 件装");
  const second = JSON.parse(run(trace, "call", "medusa.update_product", JSON.stringify({ product_id: "prod_cv02", title: "x" })).stdout);
  assert.equal(second.write_result.status, "succeeded");
  const missing = JSON.parse(run(trace, "call", "medusa.get_product", JSON.stringify({ sku: "NOPE" })).stdout);
  assert.equal(missing.code, "not_found");
  const lines = readFileSync(trace, "utf8").trim().split("\n").map((line) => JSON.parse(line));
  assert.deepEqual(lines.map((line) => [line.tool, line.isError]), [["medusa.update_product", true], ["medusa.get_product", false], ["medusa.update_product", false], ["medusa.get_product", true]]);
  assert.deepEqual(lines[0].args, { product_id: "prod_cv02", title: "x" });
});

test("calling a tool the scenario does not define is an error, not an invented response", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const result = run(join(dir, "trace.jsonl"), "call", "medusa.publish_listing", "{}");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /not available/);
});
