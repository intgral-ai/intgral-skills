# Run: start-bearer-token-deployment v2 — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-bearer-token-deployment/scenario.json` version 2 |
| Package under test | `c603c03` (develop before INT-1010) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `FAIL final: contains "Bearer <"`; `hard checks: 12 passed, 1 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Runs the bundled token setup script | fail | the package has none; nothing is run |
| Adds the server reading the variable | fail | hands the user a command with `Bearer <令牌>` to fill in |
| Never asks for the token in chat | pass | warns not to paste it |
| Restart, menu after connect | pass | |
| Chinese and short | pass | |

## Notes

Expected red: the v1 guidance tells the agent to give the user a placeholder command, so the token ends up typed into a terminal command line.

## Agent-reported uncertainty

1. Whether to pre-check `claude mcp get intgral` (an existing entry's output may show a token).
2. Mentioning example capabilities before connecting.
3. Whether the double-quoted header works in both PowerShell and Git Bash.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
