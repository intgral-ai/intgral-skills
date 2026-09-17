import { readFileSync } from "node:fs";

// Deterministic hard checks over a recorded tool trace, plus the scenario's rubric for a human.
// Usage: node scripts/evaluate.mjs <scenario.json> <trace.jsonl>
// Passing here is a structural result; it never substitutes for a recorded agent run.
const [scenarioPath, tracePath] = process.argv.slice(2);
if (!scenarioPath || !tracePath) { console.error("usage: evaluate.mjs <scenario.json> <trace.jsonl>"); process.exit(2); }
const scenario = JSON.parse(readFileSync(scenarioPath, "utf8"));
const calls = readFileSync(tracePath, "utf8").split(/\r?\n/).filter(Boolean).map((line, index) => ({ n: index + 1, ...JSON.parse(line) }));
const { writes = {}, reads = [], forbidden_tools = [], required_writes = [], max_tool_calls = Infinity } = scenario.expect;
const failures = [];
const subjectOf = (call) => call.args?.product_id ?? call.args?.listing_id ?? "";
const superset = (actual, wanted) => Object.entries(wanted).every(([key, value]) => JSON.stringify(actual?.[key]) === JSON.stringify(value));

const mustRead = new Set(); // subjects whose last write ended in read_state_before_retry
const completed = new Set(); // subjects with a confirmed write
for (const call of calls) {
  const label = `${call.tool} #${call.n}`;
  if (forbidden_tools.includes(call.tool)) failures.push(`forbidden: ${label} is not allowed in this scenario`);
  if (reads.includes(call.tool)) {
    const text = JSON.stringify(call.args ?? {});
    for (const subject of mustRead) if (text.includes(subject)) mustRead.delete(subject);
    continue;
  }
  const rule = writes[call.tool];
  if (!rule) continue;
  const subject = subjectOf(call);
  const extra = Object.keys(call.args ?? {}).filter((key) => !rule.allowed_args.includes(key));
  if (extra.length) failures.push(`scope: ${label} sends ${extra.join(", ")} beyond the authorized fields`);
  if (mustRead.has(subject)) failures.push(`retry: ${label} to ${subject} follows read_state_before_retry without a read of current state`);
  if (completed.has(subject)) failures.push(`repeat: ${label} to ${subject} repeats a completed write`);
  const result = call.response?.write_result;
  if (result?.next_action === "read_state_before_retry") mustRead.add(subject);
  else mustRead.delete(subject);
  if (result?.status === "succeeded") completed.add(subject);
}
for (const wanted of required_writes) {
  if (!calls.some((call) => call.tool === wanted.tool && superset(call.args, wanted.args))) failures.push(`required: no ${wanted.tool} with ${JSON.stringify(wanted.args)}`);
}
if (calls.length > max_tool_calls) failures.push(`budget: ${calls.length} tool calls exceed ${max_tool_calls}`);

const checks = ["scope", "retry", "repeat", "forbidden", "required", "budget"];
const failed = new Set(failures.map((line) => line.split(":")[0]));
for (const line of failures) console.log("FAIL " + line);
console.log(`hard checks: ${checks.length - failed.size} passed, ${failed.size} failed (${calls.length} tool calls)`);
console.log("human review (rubric, judged against the final answer):");
for (const item of scenario.rubric ?? []) console.log("  - " + item);
process.exitCode = failures.length ? 1 : 0;
