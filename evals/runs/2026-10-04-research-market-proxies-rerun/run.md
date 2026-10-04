# Run: research-market-proxies — rerun

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-market-proxies/scenario.json` version 2 |
| Package under test | `skills/intgral-research` at `777e149` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 14 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (14 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Measured metrics null; proxies and lower bounds; sum only as a labelled lower-bound inference | pass | '合计至少 700 件/月，只是这两个链接的下限，不代表整个品类' — the reworded D2 rubric |
| Retained dates; two dated points not a trend | pass |  |
| Explore/hold/reject with counterevidence and a bounded next check | pass | explore; review-body acquisition proposed |
| No collection | pass |  |
| Preferences not used as evidence | pass |  |

## Notes

Carries `market@2` and `market_research/1`.

## Agent-reported uncertainty

1. Extra `demand_observations` key beyond the payload example.
2. Server freshness ages vs dates.
3. Read-back route not served by the mock.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
