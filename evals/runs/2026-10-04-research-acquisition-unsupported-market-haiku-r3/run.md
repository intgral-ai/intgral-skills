# Run: research-acquisition-unsupported-market — haiku round 3

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-acquisition-unsupported-market/scenario.json` version 2 |
| Package under test | `1138616` (stop rules round 3) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| All hard checks | pass |  |

## Notes

Passes.

## Agent-reported uncertainty

1. (not collected for weaker-model rounds)

## Limitations

- Mocked boundary; one run per scenario per round. Not a statistical claim.
