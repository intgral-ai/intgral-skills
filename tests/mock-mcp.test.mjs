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
const runOn = (scenarioPath, trace, ...args) => spawnSync(process.execPath, [mock, scenarioPath, trace, ...args], { encoding: "utf8" });
const run = (trace, ...args) => runOn(scenario, trace, ...args);

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

test("a call missing a required argument is refused as invalid_arguments and still recorded", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const trace = join(dir, "trace.jsonl");
  const result = JSON.parse(run(trace, "call", "medusa.update_product", JSON.stringify({ title: "no product id" })).stdout);
  assert.equal(result.isError, true);
  assert.equal(result.code, "invalid_arguments");
  assert.match(result.message, /product_id/);
  assert.equal(readFileSync(trace, "utf8").trim().split("\n").length, 1);
});

test("a read by SKU after the write shows the post-write title, like the read by product_id", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const trace = join(dir, "trace.jsonl");
  const before = JSON.parse(run(trace, "call", "medusa.get_product", JSON.stringify({ sku: "CV-HOOK-02" })).stdout);
  assert.equal(before.products[0].title, "Bamboo wall hook 4pk");
  run(trace, "call", "medusa.update_product", JSON.stringify({ product_id: "prod_cv02", title: "Casa Verde 竹制壁挂挂钩 · 4 件装" }));
  const after = JSON.parse(run(trace, "call", "medusa.get_product", JSON.stringify({ sku: "CV-HOOK-02" })).stdout);
  assert.equal(after.products[0].title, "Casa Verde 竹制壁挂挂钩 · 4 件装");
});

test("every artifact a research scope lists is readable on its own detail route", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const id of ["research-competitor-ratings-only", "research-brief-pinned-no-acquisition"]) {
    const path = join(repository, "evals", "scenarios", id, "scenario.json");
    const trace = join(dir, `${id}.jsonl`);
    const listing = JSON.parse(runOn(path, trace, "call", "medusa.admin_get", JSON.stringify({ path: "/admin/research/scopes/rscope_colander_es/artifacts" })).stdout);
    for (const artifact of listing.artifacts) {
      const detail = JSON.parse(runOn(path, trace, "call", "medusa.admin_get", JSON.stringify({ path: `/admin/research/artifacts/${artifact.id}` })).stdout);
      assert.equal(detail.artifact?.id, artifact.id, `${id} ${artifact.id}: ${JSON.stringify(detail)}`);
      assert.equal(detail.freshness?.status, "advisory");
    }
  }
});

test("the brief scenario serves a read-back of the report its save returns", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const path = join(repository, "evals", "scenarios", "research-brief-pinned-no-acquisition", "scenario.json");
  const trace = join(dir, "trace.jsonl");
  const saved = JSON.parse(runOn(path, trace, "call", "medusa.admin_post", JSON.stringify({ path: "/admin/research/artifacts", body: { record_type: "report" } })).stdout);
  const back = JSON.parse(runOn(path, trace, "call", "medusa.admin_get", JSON.stringify({ path: `/admin/research/artifacts/${saved.artifact.id}` })).stdout);
  assert.equal(back.artifact?.id, "rart_report_col_brief_01");
  assert.equal(back.freshness?.status, "advisory");
});

test("a body too large for the Windows command line is read from stdin", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const path = join(repository, "evals", "scenarios", "research-brief-pinned-no-acquisition", "scenario.json");
  const trace = join(dir, "trace.jsonl");
  const markdown = "collapsible silicone colander, retained evidence. ".repeat(900);
  const input = JSON.stringify({ path: "/admin/research/artifacts", body: { record_type: "report", markdown } });
  assert.ok(input.length > 40000, `the body is only ${input.length} bytes, too small to prove the point`);
  const result = spawnSync(process.execPath, [mock, path, trace, "call", "medusa.admin_post"], { encoding: "utf8", input });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(readFileSync(trace, "utf8").trim()).args.body.markdown, markdown);
});

test("a read by product_id after the write shows the post-write title too", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "intgral-mock-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const trace = join(dir, "trace.jsonl");
  const before = JSON.parse(run(trace, "call", "medusa.get_product", JSON.stringify({ product_id: "prod_cv01" })).stdout);
  assert.equal(before.products[0].title, "Bamboo wall hook 2pk");
  run(trace, "call", "medusa.update_product", JSON.stringify({ product_id: "prod_cv01", title: "Casa Verde 竹制壁挂挂钩 · 2 件装" }));
  const after = JSON.parse(run(trace, "call", "medusa.get_product", JSON.stringify({ product_id: "prod_cv01" })).stdout);
  assert.equal(after.products[0].title, "Casa Verde 竹制壁挂挂钩 · 2 件装");
});
