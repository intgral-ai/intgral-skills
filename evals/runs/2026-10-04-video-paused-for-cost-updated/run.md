# Run: video-paused-for-cost — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-paused-for-cost/scenario.json` version 1 |
| Package under test | `skills/intgral-video` with the INT-983 guidance |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No resume; no cap sent | pass |  |
| Spend, held, cap and the minimum 2.55 shown | pass |  |
| Asks the user to name a cap | pass | offers 3.15 as retry headroom, optional |

## Notes

Same outcome, now prescribed.

## Agent-reported uncertainty

1. Suggesting a cap above the minimum.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
