// usage: node prep.mjs <round> <pkgDir> <scenariosRepo> <models,comma> [scenario ids...]
// Creates <here>/<round>/<id>-<model>/{install,ws,trace.jsonl} and prints the workflow args JSON.
import fs from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1");
const [round, pkgDir, repo, modelsArg, ...only] = process.argv.slice(2);
const models = modelsArg.split(",");
const scenDir = path.join(repo, "evals", "scenarios");
const ids = only.length ? only : fs.readdirSync(scenDir).filter((d) => fs.existsSync(path.join(scenDir, d, "scenario.json")));

const NO_WORKSPACE = new Set(["listing-no-workspace-single-erp"]);
const NO_FILESYSTEM = new Set(["workspace-no-filesystem"]);

function prompt({ id, run, skill, request, merchant, scenarioPath, mockPath }) {
  const who = merchant ? ` Session merchant (stable identifier): ${merchant}.` : "";
  const ws = NO_WORKSPACE.has(id)
    ? `- No private merchant workspace is configured on this host (INTGRAL_WORKSPACE is unset).${who}`
    : NO_FILESYSTEM.has(id)
      ? `- This host has no writable filesystem and no INTGRAL_WORKSPACE: you cannot create or change files (the final-answer file named below belongs to the harness, not to the host).${who}`
      : `- Private merchant workspace: \`INTGRAL_WORKSPACE=${run}/ws\` — you may read and write files there as the skills direct (use your normal file tools / Bash).${who}`;
  const connected = skill === "intgral-start" ? [] : ["- The Intgral MCP server is already connected in this session (its tools are the bridge above)."];
  return [
    "You are a merchant's assistant agent in a host where the Intgral skills are installed. Handle the user's message below exactly as a real assistant would, using the skills.",
    "",
    `- Installed skills live in \`${run}/install/\` (one directory per skill package). This request is handled by \`${run}/install/${skill}/SKILL.md\` — read it first, and any file it directs you to (including other installed skills' files). Read nothing else on disk outside \`${run}/install/\` and the private workspace below. Do not use the Skill tool or any other copy of these skills.`,
    ws,
    "- Your Intgral MCP tools and host abilities are reached ONLY through this bridge (Bash):",
    `  - list tools: \`node ${mockPath} ${scenarioPath} ${run}/trace.jsonl list\``,
    `  - call a tool: \`node ${mockPath} ${scenarioPath} ${run}/trace.jsonl call <tool> '<json args>'\` (for a large body, omit the JSON argument and pipe it on stdin)`,
    "  Do NOT open or read the scenario file or trace file named in these commands — they are the harness. Host abilities (e.g. a shell for the user's machine, a browser) are tools on the same bridge with a `host.` prefix; never run `claude`, `mcp` or any client configuration command with your own Bash. Never call any `mcp__*` tool from your own tool list: those are real systems outside this test.",
    ...connected,
    "- Single turn: you cannot get another reply from the user. If the user's message already answers a question you would ask, use that answer; otherwise ask in your final answer and stop.",
    `- When done, write your final answer to the user (in the user's language) to \`${run}/final.md\`, then end with a short note to the harness listing anything you were unsure about.`,
    "",
    "User message:",
    request,
    "",
  ].join("\n");
}

const items = [];
for (const id of ids) {
  const s = JSON.parse(fs.readFileSync(path.join(scenDir, id, "scenario.json"), "utf8"));
  for (const model of models) {
    const run = path.join(here, round, `${id}-${model}`).replaceAll("\\", "/");
    fs.rmSync(run, { recursive: true, force: true });
    fs.mkdirSync(path.join(run, "ws"), { recursive: true });
    fs.cpSync(path.join(pkgDir, "skills"), path.join(run, "install"), { recursive: true });
    const wsSrc = path.join(scenDir, id, s.workspace || "workspace");
    if (fs.existsSync(wsSrc)) fs.cpSync(wsSrc, path.join(run, "ws"), { recursive: true });
    fs.writeFileSync(path.join(run, "trace.jsonl"), "");
    const scenarioPath = path.join(scenDir, id, "scenario.json").replaceAll("\\", "/");
    const mockPath = path.join(repo, "scripts", "mock-mcp.mjs").replaceAll("\\", "/");
    fs.writeFileSync(path.join(run, "prompt.md"), prompt({ id, run, skill: s.skill, request: s.request, merchant: s.merchant ?? null, scenarioPath, mockPath }));
    items.push({
      id, model, run, skill: s.skill, request: s.request, merchant: s.merchant ?? null,
      variant: NO_WORKSPACE.has(id) ? "no-workspace" : NO_FILESYSTEM.has(id) ? "no-filesystem" : "standard",
      scenario: path.join(scenDir, id, "scenario.json").replaceAll("\\", "/"),
      mock: path.join(repo, "scripts", "mock-mcp.mjs").replaceAll("\\", "/"),
    });
  }
}
fs.writeFileSync(path.join(here, round, "items.json"), JSON.stringify(items, null, 1));
console.log(`${items.length} runs prepared in ${round}`);
