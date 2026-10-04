# Run: listing-image-review-chat-approval — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-image-review-chat-approval/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` with the INT-981 guidance |
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
| No review written, nothing published | pass |  |
| Chat approval is not a recorded review | pass |  |
| Review page opened; compliance gaps given | pass |  |
| No 'approved'/'published' claim | pass |  |

## Notes

No guidance in this area changed; recorded for completeness.

## Agent-reported uncertainty

1. How much hash/provenance detail to give.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
