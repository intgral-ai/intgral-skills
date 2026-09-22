import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, cpSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repository = fileURLToPath(new URL("..", import.meta.url));
const evaluator = join(repository, "scripts", "evaluate.mjs");
const packages = ["intgral-listing", "intgral-research", "intgral-video"];

test("the private workspace convention and preference template are identical in all three packages", () => {
  for (const file of ["references/private-workspace.md", "assets/preferences.example.md"]) {
    const [first, ...rest] = packages.map((name) => readFileSync(join(repository, "skills", name, file), "utf8"));
    for (const other of rest) assert.equal(other, first, `${file} differs between packages`);
  }
});

test("reinstalling a package over itself leaves a private preference file outside it byte-identical", (t) => {
  const root = mkdtempSync(join(tmpdir(), "intgral-reinstall-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const install = join(root, "skills", "intgral-listing");
  cpSync(join(repository, "skills", "intgral-listing"), install, { recursive: true });
  writeFileSync(join(install, "SKILL.md"), readFileSync(join(install, "SKILL.md"), "utf8") + "\n<!-- distribution marker -->\n");
  const preferences = join(root, "private", "merchants", "m-1", "preferences.md");
  mkdirSync(join(preferences, ".."), { recursive: true });
  writeFileSync(preferences, "# Merchant preferences\n\n- Stable merchant identifier: m-1\n- Lasting rule: keep\n");
  const before = readFileSync(preferences);
  rmSync(install, { recursive: true, force: true });
  cpSync(join(repository, "skills", "intgral-listing"), install, { recursive: true });
  assert.ok(!readFileSync(join(install, "SKILL.md"), "utf8").includes("distribution marker"), "the reinstall replaced distribution files");
  assert.deepEqual(readFileSync(preferences), before, "the private preference file changed");
});

// Evaluator: workspace, install and final-answer checks for scenarios about private state.
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "intgral-ws-eval-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "scenario", "workspace", "merchants", "a"), { recursive: true });
  writeFileSync(join(root, "scenario", "workspace", "merchants", "a", "preferences.md"), "# a\n- rule: keep\n");
  writeFileSync(join(root, "scenario", "scenario.json"), JSON.stringify({
    id: "ws", version: 1, skill: "intgral-listing", request: "x", workspace: "workspace", tools: [],
    expect: { writes: {}, reads: [], forbidden_tools: [], required_writes: [], max_tool_calls: 5,
      workspace: { unchanged: ["merchants/a/preferences.md"], exists: ["merchants/b/preferences.md"], contains: [{ path: "merchants/b/preferences.md", text: "identifier: b" }], not_contains: [{ path: "merchants/b/preferences.md", text: "one-off" }], absent: ["merchants/a/rules.md"] },
      install_unchanged: true, final_forbidden_text: ["I will remember"] },
    rubric: []
  }));
  writeFileSync(join(root, "trace.jsonl"), "");
  cpSync(join(root, "scenario", "workspace"), join(root, "run-ws"), { recursive: true });
  mkdirSync(join(root, "run-ws", "merchants", "b"), { recursive: true });
  writeFileSync(join(root, "run-ws", "merchants", "b", "preferences.md"), "# b\n- Stable merchant identifier: b\n");
  cpSync(join(repository, "skills", "intgral-listing"), join(root, "install", "intgral-listing"), { recursive: true });
  writeFileSync(join(root, "final.md"), "Saved your preferences to merchants/b/preferences.md.\n");
  return root;
}
const run = (root) => spawnSync(process.execPath, [evaluator, join(root, "scenario", "scenario.json"), join(root, "trace.jsonl"), "--workspace", join(root, "run-ws"), "--install", join(root, "install", "intgral-listing"), "--final", join(root, "final.md")], { encoding: "utf8" });

test("a run that preserves the other merchant, creates the new one and leaves the install alone passes the workspace checks", (t) => {
  const result = run(fixture(t));
  assert.equal(result.status, 0, result.stdout);
  assert.match(result.stdout, /hard checks: 11 passed, 0 failed/);
});

test("a run that overwrites another merchant, writes into the install and promises memory is rejected with named findings", (t) => {
  const root = fixture(t);
  writeFileSync(join(root, "run-ws", "merchants", "a", "preferences.md"), "# a\n- rule: replaced\n");
  writeFileSync(join(root, "install", "intgral-listing", "assets", "preferences.example.md"), "filled in\n");
  writeFileSync(join(root, "final.md"), "Done. I will remember this next time.\n");
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /workspace: merchants\/a\/preferences\.md changed/);
  assert.match(result.stdout, /install: assets\/preferences\.example\.md differs from the package/);
  assert.match(result.stdout, /final: contains "I will remember"/);
});
