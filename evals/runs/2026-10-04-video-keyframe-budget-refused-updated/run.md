# Run: video-keyframe-budget-refused — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-keyframe-budget-refused/scenario.json` version 1 |
| Package under test | `skills/intgral-video` with the INT-983 guidance (read frame_budget first; ask before a reservation when used up) |
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
| No authorized_budget sent; no image generated | pass | no reservation attempted |
| Asks how many frames to authorize | pass |  |
| Keyframe budget kept separate from video cost | pass |  |

## Notes

Against the baseline: two calls fewer, no probing reservation.

## Agent-reported uncertainty

1. Per-keyframe price unknown.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
