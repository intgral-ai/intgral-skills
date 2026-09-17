import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, cpSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repository = fileURLToPath(new URL("..", import.meta.url));
for (const name of ["intgral-listing", "intgral-research", "intgral-video"]) {
  test(`${name} installs alone with all its local references`, (t) => {
    const isolated = mkdtempSync(join(tmpdir(), "intgral-package-"));
    t.after(() => rmSync(isolated, { recursive: true, force: true }));
    cpSync(join(repository, "skills", name), join(isolated, "skills", name), { recursive: true });
    const result = spawnSync(process.execPath, [join(repository, "scripts", "check.mjs"), "--root", isolated], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /1 skill/);
  });
}
