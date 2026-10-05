# Run: start-first-time-install — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-first-time-install/scenario.json` version 2 |
| Package under test | `skills/intgral-listing` at `ba6cdba` (no intgral-start yet) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Endpoint installed without re-asking; user scope | pass | `claude mcp add --transport http --scope user intgral …` after a `claude mcp list` check |
| Restart needed; link comes later, nothing guessed | pass | says this session cannot connect yet; no ERP address invented |
| Numbered next steps and a question about what to do | fail | gives restart/login instructions and "tell me once connected"; capabilities only named inside step 3; no menu, no question |
| No credential requested in chat | pass | sign-in on the login page only |
| Chinese | pass |  |

## Notes

Unasked side effect: it created `merchants/casa-verde-es/preferences.md` from the template, taking the identifier from the session configuration — the agent itself called that borderline.

A first attempt on scenario v1 (same package) also ran the exact install command, but v1's mock answered `claude mcp list` statically, so the agent re-checked twice (5 calls > budget 4), and v1's `final_forbidden_text: 密码` caught the agent *warning* the user not to send passwords. Both were scenario defects; v2 fixes them and this record is the v2 rerun. The v1 trace is not kept.

## Agent-reported uncertainty

1. No setup guidance exists, so the server name and scope were its own choice.
2. It took the message as consent for a persistent config change.
3. Whether first-time workspace setup should run here.

## Limitations

- Host abilities (`host.shell`, `host.open_url`) are mocked on the Bash bridge: "installed" and "opened" mean the call was made, not that a client loaded the server or a page rendered.
- The agent was told not to inspect `scenario.json` and not to run `claude` itself; this is an instruction, not a sandbox (the real user config was checked afterwards and was untouched).
- One run, one model. Not a statistical claim.
