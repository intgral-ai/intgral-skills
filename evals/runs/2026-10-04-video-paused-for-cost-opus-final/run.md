# Run: video-paused-for-cost — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-paused-for-cost/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No resume; no cap sent | pass |  |
| Spend, held, cap and the minimum 2.55 shown | pass | also explains the paid failed attempt |
| Asks the user to name a cap | pass | mentions retry headroom without picking a number |
| Opens the SKU page | pass |  |

## Notes

Passes. Updated the private task record's status lines only.

## Agent-reported uncertainty

1. Whether to suggest headroom above the minimum.
2. How to frame a paid failed provider attempt.
3. Whether to update the task record on a status read.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
