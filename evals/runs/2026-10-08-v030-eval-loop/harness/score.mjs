// usage: node score.mjs <scenario.json> <runDir> <skill>
// Runs the evaluator with workspace/install/final checks; prints the evaluator output, then the trace call list.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const [scenario, run, skill] = process.argv.slice(2);
const repo = path.resolve(path.dirname(scenario), "..", "..", "..");
const final = path.join(run, "final.md");
const args = [path.join(repo, "scripts", "evaluate.mjs"), scenario, path.join(run, "trace.jsonl"),
  "--workspace", path.join(run, "ws"), "--install", path.join(run, "install", skill), "--final", final];
const r = spawnSync(process.execPath, args, { encoding: "utf8" });
console.log(`EVALUATOR_EXIT=${r.status}`);
console.log((r.stdout || "") + (r.stderr || ""));
console.log(`FINAL_EXISTS=${fs.existsSync(final)}`);
const trace = fs.readFileSync(path.join(run, "trace.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
console.log(`TRACE (${trace.length} calls):`);
for (const [i, c] of trace.entries()) console.log(`${i + 1}. ${c.tool} ${JSON.stringify(c.args).slice(0, 300)}${c.isError ? "  [isError]" : ""}`);
