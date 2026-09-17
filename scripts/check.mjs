import { readdirSync, readFileSync, existsSync, realpathSync } from "node:fs";
import { join, resolve, dirname, relative, isAbsolute, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Repository convention: single-line name/description; inline Markdown links.
// This publication gate is intentionally not a general YAML/Markdown parser.
const root = resolve(process.argv[2] === "--root" ? process.argv[3] : fileURLToPath(new URL("..", import.meta.url)));
const errors = [];
const error = (file, message) => errors.push(relative(root, file) + ": " + message);
const within = (base, target) => {
  const rel = relative(base, target);
  return rel !== ".." && !rel.startsWith(".." + sep) && !isAbsolute(rel);
};
function visit(directory, packageRoot) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isSymbolicLink()) { error(file, "symlinks are not portable package files"); continue; }
    if (entry.isDirectory()) { visit(file, packageRoot); continue; }
    if (!entry.name.endsWith(".md")) continue;
    const content = readFileSync(file, "utf8");
    if (/skill:\/\/|\bskills\.(?:list|read)\b/.test(content)) error(file, "remote skill dependency");
    if (/[A-Z]:[\\/](?:Users|home)[\\/]|\/(?:Users|home)\/[^/\s]+\/|file:\/\//i.test(content)) error(file, "private local path");
    for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      let target;
      try { target = decodeURIComponent(match[1].split("#")[0]); }
      catch { error(file, "invalid reference encoding"); continue; }
      if (!target || /^https?:\/\//.test(target)) continue;
      const destination = resolve(dirname(file), target);
      if (!within(packageRoot, destination)) { error(file, "reference outside package: " + target); continue; }
      if (!existsSync(destination)) { error(file, "missing reference " + target); continue; }
      if (!within(packageRoot, realpathSync(destination))) error(file, "reference outside package: " + target);
    }
  }
}
try {
  const skillsDir = join(root, "skills");
  const skills = readdirSync(skillsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  if (!skills.length) errors.push("No skill packages found");
  for (const skill of skills) {
    const packageRoot = realpathSync(join(skillsDir, skill.name));
    const license = join(packageRoot, "LICENSE");
    if (!existsSync(license) || !readFileSync(license, "utf8").trim()) error(license, "missing package LICENSE");
    const main = join(packageRoot, "SKILL.md");
    if (!existsSync(main)) { error(main, "missing SKILL.md"); continue; }
    const content = readFileSync(main, "utf8");
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "";
    const name = frontmatter.match(/^name: ([a-z0-9]+(?:-[a-z0-9]+)*)\s*$/m)?.[1];
    const description = frontmatter.match(/^description: (.+)$/m)?.[1]?.trim();
    if (!name || name.length > 64 || name !== skill.name) error(main, "frontmatter name must match package directory");
    if (!description || /^(?:["']{2}|[>|][-+]?)$/.test(description) || description.length > 1024) error(main, "frontmatter description must be a nonempty single line");
    visit(packageRoot, packageRoot);
  }
  if (!errors.length) console.log("Validated " + skills.length + " skill package(s).");
} catch (cause) { errors.push(cause.message); }
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
