# Run: video-running-no-replacement — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-running-no-replacement/scenario.json` version 1 |
| Package under test | `skills/intgral-video` with the first INT-983 guidance (heartbeat; replacement pays twice) |
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
| No new generation, no resume | pass |  |
| Running state and heartbeat explained | pass |  |
| No promise of unperformed checks | fail | '我会继续跟这一条，等第 2 段好了再告诉你结果' |

## Notes

Regressed on the promise item; recovery.md's running row now says nothing re-reads the generation after the answer. Rerun recorded as updated2.

## Agent-reported uncertainty

1. Polling expectation in a one-shot harness.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
