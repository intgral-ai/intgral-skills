import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Deterministic hard checks over a recorded tool trace, plus the scenario's rubric for a human.
// Usage: node scripts/evaluate.mjs <scenario.json> <trace.jsonl> [--workspace <run dir>] [--install <installed package dir>] [--final <final.md>]
// Passing here is a structural result; it never substitutes for a recorded agent run.
const [scenarioPath, tracePath, ...rest] = process.argv.slice(2);
const option = (name) => { const index = rest.indexOf(name); return index === -1 ? undefined : rest[index + 1]; };
if (!scenarioPath || !tracePath) { console.error("usage: evaluate.mjs <scenario.json> <trace.jsonl> [--workspace dir] [--install dir] [--final file]"); process.exit(2); }
const scenario = JSON.parse(readFileSync(scenarioPath, "utf8"));
// A run that made no tool call has no trace file; that is an empty trace, not an error.
const calls = (existsSync(tracePath) ? readFileSync(tracePath, "utf8") : "").split(/\r?\n/).filter(Boolean).map((line, index) => ({ n: index + 1, ...JSON.parse(line) }));
const { writes = {}, reads = [], forbidden_tools = [], forbidden_writes = [], forbidden_write_text = [], required_writes = [], max_tool_calls = Infinity, workspace = {}, install_unchanged = false, final_forbidden_text = [] } = scenario.expect;
const failures = [];
const subjectOf = (call) => call.args?.product_id ?? call.args?.listing_id ?? "";
// Deep partial match: every key in `wanted` must be present in `actual` with an equal value; objects recurse; "*" accepts any present value.
const matches = (actual, wanted) => wanted === "*" ? actual !== undefined : wanted !== null && typeof wanted === "object" && !Array.isArray(wanted)
  ? actual !== null && typeof actual === "object" && Object.entries(wanted).every(([key, value]) => matches(actual[key], value))
  : JSON.stringify(actual) === JSON.stringify(wanted);

const mustRead = new Set(); // subjects whose last write ended in read_state_before_retry
const completed = new Set(); // subjects with a confirmed write
for (const call of calls) {
  const label = `${call.tool} #${call.n}`;
  if (forbidden_tools.includes(call.tool)) failures.push(`forbidden: ${label} is not allowed in this scenario`);
  // A call the mock refused for a missing argument never reached the tool: it is neither a read nor a write, only budget.
  if (call.isError && call.response?.code === "invalid_arguments") continue;
  if (reads.includes(call.tool)) {
    // A read names its subject in the arguments (product_id) or only in the response (a read keyed on SKU).
    const text = JSON.stringify([call.args ?? {}, call.response ?? {}]);
    for (const subject of mustRead) if (text.includes(subject)) mustRead.delete(subject);
    continue;
  }
  const rule = writes[call.tool];
  if (!rule) continue;
  const subject = subjectOf(call);
  const extra = Object.keys(call.args ?? {}).filter((key) => !rule.allowed_args.includes(key));
  if (extra.length) failures.push(`scope: ${label} sends ${extra.join(", ")} beyond the authorized fields`);
  for (const rule of forbidden_writes) if (rule.tool === call.tool && matches(call.args, rule.args)) failures.push(`forbidden-write: ${label} — ${rule.label}`);
  const text = JSON.stringify(call.args ?? {}).toLowerCase();
  for (const needle of forbidden_write_text) if (text.includes(needle.toLowerCase())) failures.push(`text: ${label} contains "${needle}"`);
  if (mustRead.has(subject)) failures.push(`retry: ${label} to ${subject} follows read_state_before_retry without a read of current state`);
  if (completed.has(subject)) failures.push(`repeat: ${label} to ${subject} repeats a completed write`);
  const result = call.response?.write_result;
  if (result?.next_action === "read_state_before_retry") mustRead.add(subject);
  else mustRead.delete(subject);
  if (result?.status === "succeeded") completed.add(subject);
}
for (const wanted of required_writes) {
  if (!calls.some((call) => call.tool === wanted.tool && matches(call.args, wanted.args))) failures.push(`required: no ${wanted.tool} with ${JSON.stringify(wanted.args)}`);
}
if (calls.length > max_tool_calls) failures.push(`budget: ${calls.length} tool calls exceed ${max_tool_calls}`);

// Private state after the run: compared against the scenario's own workspace fixture and the repository's package.
const files = (dir) => existsSync(dir) ? readdirSync(dir, { recursive: true }).map(String).filter((entry) => statSync(join(dir, entry)).isFile()).map((entry) => entry.replaceAll("\\", "/")).sort() : [];
const same = (a, b) => existsSync(a) && existsSync(b) && readFileSync(a).equals(readFileSync(b));
const runWorkspace = option("--workspace");
if (runWorkspace) {
  const original = join(dirname(scenarioPath), scenario.workspace ?? "workspace");
  for (const path of workspace.unchanged ?? []) if (!same(join(original, path), join(runWorkspace, path))) failures.push(`workspace: ${path} changed or disappeared`);
  for (const path of workspace.exists ?? []) if (!existsSync(join(runWorkspace, path))) failures.push(`workspace: ${path} was not created`);
  for (const path of workspace.absent ?? []) if (existsSync(join(runWorkspace, path))) failures.push(`workspace: ${path} exists but must not`);
  for (const { path, text } of workspace.contains ?? []) if (!existsSync(join(runWorkspace, path)) || !readFileSync(join(runWorkspace, path), "utf8").includes(text)) failures.push(`workspace: ${path} does not contain "${text}"`);
  for (const { path, text } of workspace.not_contains ?? []) if (existsSync(join(runWorkspace, path)) && readFileSync(join(runWorkspace, path), "utf8").includes(text)) failures.push(`workspace: ${path} must not contain "${text}"`);
}
const installDir = option("--install");
if (installDir && install_unchanged) {
  const packageDir = fileURLToPath(new URL(`../skills/${scenario.skill}`, import.meta.url));
  const expected = files(packageDir), actual = files(installDir);
  for (const path of actual) if (!expected.includes(path)) failures.push(`install: ${path} was written inside the installed package`);
  for (const path of expected) if (!same(join(packageDir, path), join(installDir, path))) failures.push(`install: ${path} differs from the package`);
}
const finalPath = option("--final");
if (finalPath && existsSync(finalPath)) {
  const answer = readFileSync(finalPath, "utf8").toLowerCase();
  for (const needle of final_forbidden_text) if (answer.includes(needle.toLowerCase())) failures.push(`final: contains "${needle}"`);
}

const checks = ["scope", "retry", "repeat", "forbidden", "forbidden-write", "text", "required", "budget", "workspace", "install", "final"];
const failed = new Set(failures.map((line) => line.split(":")[0]));
for (const line of failures) console.log("FAIL " + line);
console.log(`hard checks: ${checks.length - failed.size} passed, ${failed.size} failed (${calls.length} tool calls)`);
console.log("human review (rubric, judged against the final answer):");
for (const item of scenario.rubric ?? []) console.log("  - " + item);
process.exitCode = failures.length ? 1 : 0;
