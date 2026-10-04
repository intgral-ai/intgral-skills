# Run: research-competitor-ratings-only — rerun

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-competitor-ratings-only/scenario.json` version 2 |
| Package under test | `skills/intgral-research` at `777e149` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 7 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (7 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Artifact, revision, coverage and gaps; themes unavailable | pass |  |
| Like-for-like price group; set and plastic excluded | pass | two points called 'not a band' |
| Badge floors as per-listing lower bounds | pass | not summed; no zero for the badge-less ASIN |
| Bounded review acquisition proposed, not started | pass |  |
| Own brand excluded | pass |  |

## Notes

Carries `competitor@3` and `competitor_research/1` (the earlier records carried `competitor@1`).

## Agent-reported uncertainty

1. Whether a 2 cm size difference splits a price group.
2. Submitting one-member groups.
3. Detail read-back route not served by the mock.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
