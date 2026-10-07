import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-980: order, per-tool max_calls, $contains and undeclared tools, each on a minimal inline scenario.
const evaluator = fileURLToPath(new URL("../scripts/evaluate.mjs", import.meta.url));
const tool = (name) => ({ name, description: name, inputSchema: {}, responses: [{ result: {} }] });
function run(t, expect, calls, tools = ["medusa.get_listing_context", "medusa.update_listing", "host.open_url", "medusa.admin_post"]) {
  const dir = mkdtempSync(join(tmpdir(), "intgral-checks-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  writeFileSync(join(dir, "scenario.json"), JSON.stringify({ id: "x", version: 1, skill: "intgral-listing", request: "x", tools: tools.map(tool),
    expect: { writes: { "medusa.update_listing": { allowed_args: ["listing_id", "copy"] }, "medusa.admin_post": { allowed_args: ["path", "body"] } }, reads: ["medusa.get_listing_context"], ...expect }, rubric: [] }));
  writeFileSync(join(dir, "trace.jsonl"), calls.map((call) => JSON.stringify({ isError: false, response: {}, ...call })).join("\n"));
  return spawnSync(process.execPath, [evaluator, join(dir, "scenario.json"), join(dir, "trace.jsonl")], { encoding: "utf8" });
}
const read = { tool: "medusa.get_listing_context", args: { listing_id: "l1" } };
const write = { tool: "medusa.update_listing", args: { listing_id: "l1", copy: { title: "t" } } };
const order = [{ label: "writes before reading the listing", first: { tool: "medusa.get_listing_context", args: { listing_id: "l1" } }, then: { tool: "medusa.update_listing", args: { listing_id: "l1" } } }];

test("order: a write with no earlier matching read fails, naming the call and the label", (t) => {
  const result = run(t, { order }, [write, read]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /FAIL order: medusa\.update_listing #1 — writes before reading the listing/);
});

test("order: read then write passes, and the summary counts thirteen hard checks", (t) => {
  const result = run(t, { order }, [read, write]);
  assert.equal(result.status, 0, result.stdout);
  assert.match(result.stdout, /hard checks: 13 passed, 0 failed/);
});

test("max_calls: a second open of the same tool beyond its limit is a budget failure", (t) => {
  const open = { tool: "host.open_url", args: { url: "https://erp.example.test/a" } };
  const result = run(t, { max_calls: { "host.open_url": 1 } }, [open, { ...open, args: { url: "https://erp.example.test/b" } }]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /FAIL budget: host\.open_url called 2 times, more than 1/);
});

test("$contains: an array matches when every listed item partially matches some element", (t) => {
  const post = { tool: "medusa.admin_post", args: { path: "/p", body: { ids: [{ id: "b", v: 1 }, { id: "a", v: 2 }] } } };
  const wanted = { required_writes: [{ tool: "medusa.admin_post", args: { body: { ids: { $contains: [{ id: "a" }] } } } }] };
  assert.equal(run(t, wanted, [post]).status, 0);
  const missing = run(t, { required_writes: [{ tool: "medusa.admin_post", args: { body: { ids: { $contains: [{ id: "c" }] } } } }] }, [post]);
  assert.equal(missing.status, 1);
  assert.match(missing.stdout, /FAIL required: no medusa\.admin_post/);
  const forbidden = run(t, { forbidden_writes: [{ label: "names a", tool: "medusa.admin_post", args: { body: { ids: { $contains: [{ id: "a" }] } } } }] }, [post]);
  assert.match(forbidden.stdout, /FAIL forbidden-write: medusa\.admin_post #1 — names a/);
});

test("undeclared: a call to a tool the scenario does not define fails", (t) => {
  const result = run(t, {}, [read, { tool: "medusa.create_product", args: { sku: "x" } }]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /FAIL undeclared: medusa\.create_product #2 is not a tool of this scenario/);
});

test("order: `first` may be a list of alternatives; any earlier match satisfies it", (t) => {
  const either = [{ ...order[0], first: [{ tool: "medusa.get_listing_context", args: { listing_id: "l2" } }, order[0].first] }];
  assert.equal(run(t, { order: either }, [read, write]).status, 0);
  assert.equal(run(t, { order: either }, [write, read]).status, 1);
});
