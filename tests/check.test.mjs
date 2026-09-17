import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("../scripts/check.mjs", import.meta.url));
function fixture(t, files = {}) {
  const root = mkdtempSync(join(tmpdir(), "intgral-skill-test-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const packageDir = join(root, "skills", "example-skill");
  mkdirSync(packageDir, { recursive: true });
  writeFileSync(join(packageDir, "LICENSE"), "MIT License\nCopyright (c) Example contributors\n");
  writeFileSync(join(packageDir, "SKILL.md"), "---\nname: example-skill\ndescription: Explain retained product evidence.\n---\n\n# Example\n\nAnswer the user's question.\n");
  for (const [name, content] of Object.entries(files)) {
    const target = join(packageDir, name);
    mkdirSync(join(target, ".."), { recursive: true });
    writeFileSync(target, content);
  }
  return root;
}
function check(root) {
  return spawnSync(process.execPath, [checker, "--root", root], { encoding: "utf8" });
}
test("an independently installed package validates without dependencies", (t) => {
  const result = check(fixture(t));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 skill/);
});
test("an installed package must carry its own redistribution license", (t) => {
  const root = fixture(t);
  rmSync(join(root, "skills", "example-skill", "LICENSE"));
  const result = check(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /LICENSE/);
});
test("a broken reference prevents publication and names the missing file", (t) => {
  const root = fixture(t, { "SKILL.md": "---\nname: example-skill\ndescription: Explain evidence.\n---\n\nRead [the method](references/missing.md).\n" });
  const result = check(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing.md/);
});
for (const [label, content, message] of [
  ["missing name", "---\ndescription: Explain evidence.\n---\n# Example", /frontmatter/],
  ["mismatched name", "---\nname: wrong-name\ndescription: Explain evidence.\n---\n# Example", /name/],
  ["empty description", "---\nname: example-skill\ndescription: \n---\n# Example", /description/],
  ["remote skill dependency", "---\nname: example-skill\ndescription: Explain evidence.\n---\nRead skill://intgral/old/SKILL.md", /remote skill/],
  ["private workstation dependency", "---\nname: example-skill\ndescription: Explain evidence.\n---\nRead C:\\Users\\someone\\private.md", /local path/],
]) {
  test(`rejects an unportable package: ${label}`, (t) => {
    const result = check(fixture(t, { "SKILL.md": content }));
    assert.equal(result.status, 1);
    assert.match(result.stderr, message);
  });
}
test("rejects a reference into a sibling package even when that file exists", (t) => {
  const root = fixture(t, { "SKILL.md": "---\nname: example-skill\ndescription: Explain evidence.\n---\nRead [method](../other/method.md)." });
  mkdirSync(join(root, "skills", "other"), { recursive: true });
  writeFileSync(join(root, "skills", "other", "method.md"), "Private sibling method");
  const result = check(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /outside package/);
});
test("validates references transitively in an isolated installed package", (t) => {
  const result = check(fixture(t, {
    "SKILL.md": "---\nname: example-skill\ndescription: Explain evidence.\n---\nRead [method](references/method.md).",
    "references/method.md": "Copy [template](../assets/template.md).",
    "assets/template.md": "# Task record",
  }));
  assert.equal(result.status, 0, result.stderr);
});
