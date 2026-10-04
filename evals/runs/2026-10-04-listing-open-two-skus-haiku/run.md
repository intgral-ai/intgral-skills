# Run: listing-open-two-skus — haiku (weaker-model check)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-open-two-skus/scenario.json` version 1 |
| Package under test | package at `2b7a0a1` (PR #24 head, all INT-978 guidance) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Answered from tool results | pass |  |
| First SKU's page opened | fail | no host.open_url at all |

## Notes

Missed the open-the-SKU-page rule.

## Agent-reported uncertainty

1. (Haiku reported none.)

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
