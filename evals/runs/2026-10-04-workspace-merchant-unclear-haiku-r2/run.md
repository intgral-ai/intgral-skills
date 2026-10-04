# Run: workspace-merchant-unclear — haiku round 2

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-merchant-unclear/scenario.json` version 1 |
| Package under test | `bdcadf7` (stop-rules block, round 1) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 2 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| install | fail | SKILL.md differs from the package |
| final | fail | contains "casa-verde-es" |
| final | fail | contains "verde-norte-de" |
| final | fail | contains "Casa Verde" |
| final | fail | contains "Verde Norte" |

## Notes

No tool calls, but the answer named both merchants and their brands.

## Agent-reported uncertainty

1. (not collected for weaker-model rounds)

## Limitations

- Mocked boundary; one run per scenario per round. Not a statistical claim.
