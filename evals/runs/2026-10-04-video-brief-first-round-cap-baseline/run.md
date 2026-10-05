# Run: video-brief-first-round-cap — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-brief-first-round-cap/scenario.json` version 1 |
| Package under test | `2366036` (package e95e3da, before the fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No draft | pass |  |
| At most five first-round questions | fail | 17 numbered questions, style one axis each |
| Price via a free draft offered | pass | explained that the price comes with the free draft but held it until the brief is complete |

## Notes

Hard checks pass; rubric fails on the 17-question round — the target of INT-989.

## Agent-reported uncertainty

1. Saved subtitle preference treated as a material gap.
2. Whether 'show me a price' justifies an early draft.
3. No cap on first-round questions.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
