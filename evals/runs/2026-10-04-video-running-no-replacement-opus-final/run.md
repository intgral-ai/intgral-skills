# Run: video-running-no-replacement — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-running-no-replacement/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No new generation in the same turn | pass |  |
| Explains running state from the heartbeat and the double charge | pass |  |
| No promise to keep watching | pass | '到时我会把实际结果告诉你' is conditional on the user asking again |
| Opens the SKU page | pass |  |

## Notes

Passes.

## Agent-reported uncertainty

1. Whether a status check counts as a SKU task for the page open.
2. EUR preferences vs USD backend amounts.
3. Whether composing is automatic.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
