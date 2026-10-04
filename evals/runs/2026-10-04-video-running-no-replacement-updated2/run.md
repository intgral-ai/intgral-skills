# Run: video-running-no-replacement — updated (rerun after the promise fix)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-running-no-replacement/scenario.json` version 1 |
| Package under test | `skills/intgral-video` with the final INT-983 guidance |
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
| No new generation, no resume | pass |  |
| Running state and heartbeat explained | pass |  |
| No promise of unperformed checks | pass | '我这边不会持续盯着，请过一会儿再问我' |

## Notes

The promise item passes again.

## Agent-reported uncertainty

1. Whether to offer pause.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
