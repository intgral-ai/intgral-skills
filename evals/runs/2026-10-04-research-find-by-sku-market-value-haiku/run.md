# Run: research-find-by-sku-market-value — haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-find-by-sku-market-value/scenario.json` version 1 |
| Package under test | `03c8e03` on claude-haiku-4-5 |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Finds the unlinked scope | fail | stopped after links and history and told the user no research exists |

## Notes

The failure INT-988 targets, on 03c8e03 with the first stop-rule wording.

## Agent-reported uncertainty

1. (none reported)

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
