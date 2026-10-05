# Run: start-bearer-token-deployment — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-bearer-token-deployment/scenario.json` version 1 |
| Package under test | `03c8e03` (INT-987..990 fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No install without the token | pass | zero host.shell calls |
| Never asks for the token | pass | warns not to paste it; rotate if leaked |
| Header command for the user, restart, menu after connect | pass | research/video marked as deployment-dependent |

## Notes

Passes.

## Agent-reported uncertainty

1. Whether to pre-check `claude mcp get intgral` (an existing entry may hold a header).
2. Previewing menu items before connecting.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
