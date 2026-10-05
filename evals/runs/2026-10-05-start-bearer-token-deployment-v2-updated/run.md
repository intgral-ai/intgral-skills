# Run: start-bearer-token-deployment v2 — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-bearer-token-deployment/scenario.json` version 2 |
| Package under test | `feat/token-setup-dialog` working tree (INT-1010: `intgral-start` 0.2.0 with `scripts/set-token.ps1` / `set-token.sh`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls; the install directory is shown as `<install>` |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `hard checks: 13 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Runs the bundled token setup script first | pass | the Windows script with `-Url`, before any add |
| Adds the server reading the variable | pass | single-quoted `${INTGRAL_MCP_TOKEN}` header, no token or placeholder |
| Never asks for the token in chat | pass | |
| Restart, menu after connect | pass | menu 1–4 without a link; research/video deferred to after restart |
| Chinese and short | pass | |

## Notes

A first updated attempt is not recorded: the scenario's mock answered `claude mcp add` with the script's fallback message, so the agent rightly reported the install as unconfirmed. The mock now matches the documented add command exactly; the scenario stayed unpublished at version 2.

## Agent-reported uncertainty

1. Whether step 3's header install replaces step 2's plain install (it did; the skill could say so outright).
2. It could only say the window would appear after running the script, in this single-turn harness.
3. Showing the menu before the restart that makes the links and route checks available.

## Limitations

- Mocked boundary; the script's window and the gateway check were not exercised here (they are covered by `tests/token-setup.test.mjs` and one manual run on Windows against a live gateway). The macOS Keychain/LaunchAgent save path has not run on a Mac.
- One run per scenario and kind. Not a statistical claim.
