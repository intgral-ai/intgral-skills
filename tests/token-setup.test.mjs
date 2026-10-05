import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";

// INT-1010: the bundled token setup takes the token in a local hidden-input window, checks it
// against the gateway and saves it to an environment variable — never echoing it.
const scripts = fileURLToPath(new URL("../skills/intgral-start/scripts/", import.meta.url));
const ps1 = join(scripts, "set-token.ps1");
const sh = join(scripts, "set-token.sh");
const GOOD = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

const has = (command, args) => spawnSync(command, args, { encoding: "utf8" }).status === 0;
const powershell = process.platform === "win32" ? "powershell.exe" : "pwsh";
const noPowerShell = has(powershell, ["-NoProfile", "-Command", "exit 0"]) ? false : `${powershell} not available`;
const noBash = has("bash", ["-c", "command -v curl"]) ? false : "bash with curl not available";

// A gateway stand-in: initialize answers 200 only for the known token.
async function gateway(t) {
  const server = createServer((request, response) => {
    request.resume();
    request.on("end", () => {
      const ok = request.method === "POST" && request.headers.authorization === `Bearer ${GOOD}`;
      response.writeHead(ok ? 200 : 401, { "content-type": "application/json" });
      response.end(ok ? '{"jsonrpc":"2.0","id":1,"result":{}}' : '{"error":"unauthorized"}');
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => server.close());
  return `http://127.0.0.1:${server.address().port}/mcp`;
}
// Async on purpose: a blocking spawnSync would stall the in-process gateway above.
const run = (command, args) => new Promise((resolve) => {
  const child = spawn(command, args);
  let stdout = "", stderr = "";
  child.stdout.on("data", (d) => (stdout += d));
  child.stderr.on("data", (d) => (stderr += d));
  child.on("close", (status) => resolve({ status, stdout, stderr }));
});
const pwsh = (script) => run(powershell, ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", `. '${ps1}'; ${script}`]);
const bash = (script) => run("bash", ["-c", `source '${sh.replace(/\\/g, "/")}'; ${script}`]);

test("Windows script starts with a UTF-8 BOM so Windows PowerShell 5.1 reads its Chinese text", () => {
  assert.deepEqual([...readFileSync(ps1).subarray(0, 3)], [0xef, 0xbb, 0xbf]);
});

test("Windows: a pasted identity=token line is reduced to the token; a multi-token line or blank is refused", { skip: noPowerShell }, async () => {
  const { stdout, stderr } = await pwsh(
    "foreach ($raw in @('lin-home=" + GOOD + "', '  " + GOOD + "  ', 'a=x,b=y', '', 'two words')) { $r = Resolve-IntgralToken $raw; '{0}|{1}' -f $r.Token, [bool]$r.Problem }"
  );
  assert.equal(stderr, "");
  assert.deepEqual(stdout.trim().split(/\r?\n/), [`${GOOD}|False`, `${GOOD}|False`, "|True", "|True", "|True"]);
});

test("Windows: an accepted token is saved and only its length is reported", { skip: noPowerShell }, async (t) => {
  const url = await gateway(t);
  const { stdout } = await pwsh(
    `$r = Invoke-IntgralTokenSetup -Url '${url}' -VarName 'INTGRAL_T1010' -Scope Process -Prompt { 'lin-home=${GOOD}' }; $r.Message; 'saved=' + $r.Saved; 'stored=' + ($env:INTGRAL_T1010 -eq '${GOOD}')`
  );
  assert.match(stdout, /saved=True/);
  assert.match(stdout, /stored=True/);
  assert.match(stdout, /64/);
  assert.equal(stdout.includes(GOOD), false, "the token must never be printed");
});

test("Windows: a rejected token is not saved and the HTTP status is named", { skip: noPowerShell }, async (t) => {
  const url = await gateway(t);
  const { stdout } = await pwsh(
    `$r = Invoke-IntgralTokenSetup -Url '${url}' -VarName 'INTGRAL_T1010' -Scope Process -Prompt { 'wrong-token' }; $r.Message; 'saved=' + $r.Saved; 'stored=' + [bool]$env:INTGRAL_T1010`
  );
  assert.match(stdout, /401/);
  assert.match(stdout, /saved=False/);
  assert.match(stdout, /stored=False/);
  assert.equal(stdout.includes("wrong-token"), false);
});

test("Windows: closing the window saves nothing", { skip: noPowerShell }, async (t) => {
  const url = await gateway(t);
  const { stdout } = await pwsh(`$r = Invoke-IntgralTokenSetup -Url '${url}' -VarName 'INTGRAL_T1010' -Scope Process -Prompt { $null }; 'saved=' + $r.Saved`);
  assert.match(stdout, /saved=False/);
});

test("macOS script: identity=token is reduced; multi-token lines and blanks are refused", { skip: noBash }, async () => {
  const { stdout } = await bash(
    `for raw in 'lin-home=${GOOD}' '  ${GOOD}  ' 'a=x,b=y' '' 'two words'; do t=$(intgral_resolve_token "$raw" 2>/dev/null); printf '%s|%s\\n' "$t" "$?"; done`
  );
  assert.deepEqual(stdout.trim().split(/\r?\n/), [`${GOOD}|0`, `${GOOD}|0`, "|1", "|1", "|1"]);
});

test("macOS script: the gateway check returns the status code without printing the token", { skip: noBash }, async (t) => {
  const url = await gateway(t);
  const { stdout } = await bash(`intgral_check_token '${url}' '${GOOD}'; intgral_check_token '${url}' wrong-token`);
  assert.deepEqual(stdout.trim().split(/\r?\n/), ["200", "401"]);
});
