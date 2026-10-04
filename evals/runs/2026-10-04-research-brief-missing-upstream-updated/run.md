# Run: research-brief-missing-upstream — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-missing-upstream/scenario.json` version 1 |
| Package under test | `skills/intgral-research` with the INT-982 guidance |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 11 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (11 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Saved without asking; no collection | pass |  |
| Missing supplier stage named; target cost unknown | pass | handoff.missing_upstream added |
| No pain points from review-less reports | pass |  |
| Proposals proposed; twelve sections | pass |  |
| IDs, coverage and gaps given | pass |  |

## Notes

Same outcome; no guidance in this area changed.

## Agent-reported uncertainty

1. No `proposed` section status.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
