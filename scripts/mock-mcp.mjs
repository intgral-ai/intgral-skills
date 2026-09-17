import { readFileSync, appendFileSync, existsSync } from "node:fs";

// The mocked MCP boundary for a scenario: scripted responses, every call appended to a JSONL trace.
//   node scripts/mock-mcp.mjs <scenario.json> <trace.jsonl> list
//   node scripts/mock-mcp.mjs <scenario.json> <trace.jsonl> call <tool> '<json args>'   (args may also come on stdin)
// The trace is the mock's only state: a response marked "once" is served the first time its "when" matches.
const [scenarioPath, tracePath, command, tool, rawArgs] = process.argv.slice(2);
if (!scenarioPath || !tracePath || !command) { console.error("usage: mock-mcp.mjs <scenario.json> <trace.jsonl> list | call <tool> <json args>"); process.exit(2); }
const scenario = JSON.parse(readFileSync(scenarioPath, "utf8"));
if (command === "list") {
  console.log(JSON.stringify(scenario.tools.map(({ responses, ...contract }) => contract), null, 2));
  process.exit(0);
}
const contract = scenario.tools.find((entry) => entry.name === tool);
if (!contract) { console.error(`tool ${tool} is not available in this scenario`); process.exit(1); }
const args = JSON.parse(rawArgs ?? readFileSync(0, "utf8") ?? "{}");
const matches = (when = {}, subject = args) => Object.entries(when).every(([key, value]) => subject?.[key] === value);
const previous = existsSync(tracePath) ? readFileSync(tracePath, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line)) : [];
// A "once" response is consumed by an earlier matching call already in the trace.
const chosen = contract.responses.find((candidate) => matches(candidate.when)
  && !(candidate.once && previous.some((call) => call.tool === tool && matches(candidate.when, call.args))));
const isError = !chosen || "error" in chosen;
const response = chosen ? (chosen.error ?? chosen.result) : { code: "unmatched", message: "no scripted response for these arguments" };
appendFileSync(tracePath, JSON.stringify({ tool, args, isError, response }) + "\n");
console.log(JSON.stringify(isError ? { isError: true, ...response } : response, null, 2));
