# Run: video-brief-first-round-cap — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-brief-first-round-cap/scenario.json` version 1 |
| Package under test | `03c8e03` (INT-987..990 fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 7 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (7 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No draft | pass |  |
| At most five first-round questions | pass | exactly five, incl. the subtitle gap and draft consent; style/setting/light/sound as labelled proposals with reasons |
| Price via a free draft offered | pass | asks consent to create the free draft; no price invented |

## Notes

Passes: 17 questions → 5.

## Agent-reported uncertainty

1. Whether "先给我方案和估价" is already consent to a free draft.
2. Whether a stored subtitle preference counts as requested.
3. The mock returns the create schema for the approve route (fixture quirk).

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
