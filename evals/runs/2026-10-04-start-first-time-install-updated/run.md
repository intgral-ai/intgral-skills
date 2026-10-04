# Run: start-first-time-install — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-first-time-install/scenario.json` version 2 |
| Package under test | `skills/intgral-start` + `skills/intgral-listing` at `e17a333` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Endpoint installed without re-asking; user scope | pass | one call, the documented command |
| Restart needed; link comes later, nothing guessed | pass | "链接要等连上以后由 Intgral 给出" |
| Numbered next steps and a question about what to do | pass | the six-item menu, then "你想先做哪一项？" — the baseline's failing item |
| No credential requested in chat | pass |  |
| Chinese | pass |  |

## Notes

No workspace file created. Against the baseline: the menu item moved from fail to pass, and the call count fell from 3 to 1 (no pre-check with `claude mcp list` — the skill does not ask for one).

## Agent-reported uncertainty

1. Pointing to `/mcp` for sign-in is its own addition.
2. It flagged research/video as needing installation up front, while the skill says to name a missing skill when it is picked.

## Limitations

- Host abilities (`host.shell`, `host.open_url`) are mocked on the Bash bridge: "installed" and "opened" mean the call was made, not that a client loaded the server or a page rendered.
- The agent was told not to inspect `scenario.json` and not to run `claude` itself; this is an instruction, not a sandbox (the real user config was checked afterwards and was untouched).
- One run, one model. Not a statistical claim.
