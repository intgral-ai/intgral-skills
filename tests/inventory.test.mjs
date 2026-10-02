import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// Structural checks for the intgral-inventory package and its five behavioral scenarios.
// They prove the package carries the stock-change contract and the scenarios are well-formed;
// they are not a recorded agent run (see evals/README.md).
const repository = fileURLToPath(new URL("..", import.meta.url));
const packageDir = join(repository, "skills", "intgral-inventory");
const scenarios = join(repository, "evals", "scenarios");
const evaluator = join(repository, "scripts", "evaluate.mjs");
const markdown = (dir) => readdirSync(dir, { recursive: true }).map(String).filter((name) => name.endsWith(".md")).map((name) => join(dir, name));
const read = (file) => readFileSync(file, "utf8");
const evaluate = (id, trace) => spawnSync(process.execPath, [evaluator, join(scenarios, id, "scenario.json"), join(scenarios, id, "traces", trace)], { encoding: "utf8" });
const load = (id) => JSON.parse(read(join(scenarios, id, "scenario.json")));

const ids = {
  noSource: "inventory-no-source-quantity",
  estimate: "inventory-estimate-not-a-count",
  sheet: "inventory-sheet-with-fba-row",
  proposed: "inventory-propose-awaiting-confirmation",
  stale: "inventory-stale-line-reproposed"
};

test("the package entry names the three gateway tools and links every reference it ships", () => {
  assert.ok(existsSync(join(packageDir, "SKILL.md")), "skills/intgral-inventory/SKILL.md is missing");
  const entry = read(join(packageDir, "SKILL.md"));
  for (const tool of ["medusa.get_stock", "medusa.get_stock_change", "medusa.propose_stock_changes"]) assert.ok(entry.includes(tool), `entry does not name ${tool}`);
  const references = markdown(join(packageDir, "references"));
  assert.ok(references.length >= 3, "expected the source, proposal and refusal references");
  for (const file of references) {
    const name = file.slice(join(packageDir, "references").length + 1).replaceAll("\\", "/");
    assert.ok(entry.includes(`references/${name}`), `SKILL.md does not link references/${name}`);
  }
});

test("the package carries every rule the stock-change spec lists", () => {
  const text = markdown(packageDir).map(read).join("\n");
  const terms = [
    // read first, then propose
    "expected_stocked_quantity", "has_level", "adjust", "reason_note", "received", "damaged", "count_correction", "other",
    // sources
    "verbatim", "sheet", "row", "estimate",
    // after the proposal
    "awaiting_confirmation", "erp_url", "publication plan", "human", "refused", "warnings",
    // stale and expired
    "stale", "expired",
    // out of scope
    "FBA", "kit", "reservation"
  ];
  for (const term of terms) assert.ok(text.toLowerCase().includes(term.toLowerCase()), `the package never mentions "${term}"`);
  const codes = ["unknown_sku", "ambiguous_sku", "not_inventory_managed", "kit_variant", "fba_listing", "location_required", "location_not_allowed", "missing_expected", "missing_reason", "no_level_for_adjust", "negative_result", "below_reserved"];
  for (const code of codes) assert.ok(text.includes(code), `the refusal reference never names ${code}`);
});

test("the package never gives the agent a way to confirm, reject or claim a confirmation", () => {
  const text = markdown(packageDir).map(read).join("\n");
  assert.match(text, /never (?:calls?|call|uses?)[^.\n]*confirm/i, "the package must say the agent never confirms");
  assert.doesNotMatch(text, /admin_post[^.\n]*\/confirm\b(?![^.\n]*never)/i);
});

test("the five behavioral scenarios the skill spec lists exist, belong to intgral-inventory and are indexed", () => {
  const index = read(join(repository, "evals", "README.md"));
  for (const id of Object.values(ids)) {
    assert.ok(existsSync(join(scenarios, id, "scenario.json")), `scenario ${id} is missing`);
    assert.equal(load(id).skill, "intgral-inventory");
    assert.ok(existsSync(join(scenarios, id, "traces", "compliant.jsonl")), `${id} has no compliant trace`);
    assert.ok(index.includes(`scenarios/${id}/scenario.json`), `evals/README.md does not index ${id}`);
  }
});

test("a quantity with no merchant source and an estimate never reach the proposal tool", () => {
  for (const id of [ids.noSource, ids.estimate]) {
    assert.ok(load(id).expect.forbidden_tools.includes("medusa.propose_stock_changes"), `${id} must forbid the proposal tool`);
  }
});

test("no scenario lets the agent confirm or reject: the generic write doors are forbidden", () => {
  for (const id of Object.values(ids)) {
    const forbidden = load(id).expect.forbidden_tools;
    for (const tool of ["medusa.admin_post", "medusa.admin_patch", "medusa.admin_delete"]) assert.ok(forbidden.includes(tool), `${id} does not forbid ${tool}`);
  }
});

test("known-bad traces: an invented count is proposed for the no-source and estimate scenarios", () => {
  for (const id of [ids.noSource, ids.estimate]) {
    const { stdout, status } = evaluate(id, "known-bad.jsonl");
    assert.equal(status, 1, stdout);
    assert.match(stdout, /forbidden: medusa\.propose_stock_changes #\d+ is not allowed/);
  }
});

test("known-bad trace: the FBA row is proposed from the sheet", () => {
  const { stdout, status } = evaluate(ids.sheet, "known-bad.jsonl");
  assert.equal(status, 1, stdout);
  assert.match(stdout, /text: medusa\.propose_stock_changes #\d+ contains "CV-FBA-05"/);
});

test("known-bad trace: an agent-kind source and a confirm attempt are rejected, and the answer may not claim an update", () => {
  const { stdout, status } = evaluate(ids.proposed, "known-bad.jsonl");
  assert.equal(status, 1, stdout);
  assert.match(stdout, /text: medusa\.propose_stock_changes #\d+ contains ""kind":"agent""/);
  assert.match(stdout, /forbidden: medusa\.admin_post #\d+ is not allowed/);
});

test("known-bad trace: the stale line is re-proposed with the expected quantity from before it went stale", () => {
  const { stdout, status } = evaluate(ids.stale, "known-bad.jsonl");
  assert.equal(status, 1, stdout);
  assert.match(stdout, /text: medusa\.propose_stock_changes #\d+ contains ""expected_stocked_quantity":120"/);
});

test("the stale scenario requires a read of the batch and of current stock before the re-proposal", () => {
  const scenario = load(ids.stale);
  assert.ok(scenario.expect.reads.includes("medusa.get_stock") && scenario.expect.reads.includes("medusa.get_stock_change"));
  const trace = read(join(scenarios, ids.stale, "traces", "compliant.jsonl")).split("\n").filter(Boolean).map((line) => JSON.parse(line).tool);
  const firstWrite = trace.indexOf("medusa.propose_stock_changes");
  assert.ok(firstWrite > trace.indexOf("medusa.get_stock_change") && trace.indexOf("medusa.get_stock_change") !== -1, "the batch is read before the proposal");
  assert.ok(firstWrite > trace.indexOf("medusa.get_stock") && trace.indexOf("medusa.get_stock") !== -1, "current stock is read before the proposal");
});

test("the compliant sheet trace proposes four lines and the proposal sends no line for the FBA SKU", () => {
  const calls = read(join(scenarios, ids.sheet, "traces", "compliant.jsonl")).split("\n").filter(Boolean).map((line) => JSON.parse(line));
  const proposals = calls.filter((call) => call.tool === "medusa.propose_stock_changes");
  assert.equal(proposals.length, 1);
  assert.equal(proposals[0].args.lines.length, 4);
  assert.equal(proposals[0].args.source.kind, "sheet");
  assert.ok(!JSON.stringify(proposals[0].args).includes("CV-FBA-05"));
});
