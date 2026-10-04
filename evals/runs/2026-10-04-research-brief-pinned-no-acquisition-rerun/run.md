# Run: research-brief-pinned-no-acquisition — rerun

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-pinned-no-acquisition/scenario.json` version 3 |
| Package under test | `skills/intgral-research` at `777e149` (INT-979 scenario fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 10 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (10 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Superseded market v1 not used; pins @2/@1/@1 | pass | exact three-element upstream_versions — the new INT-979 hard check |
| Twelve sections; unknown sections cite nothing | pass | 7 of 12 unknown, mainly no review bodies |
| Proposals stay proposals; samples not authorized | pass |  |
| Observation dates and gaps visible; no collection | pass | quote expiry 2026-10-10 flagged |

## Notes

Rerun because the 2026-09-18…09-23 records predate `intgral-research@4` and fail the current required save (they already failed before INT-979). This run carries all four revisions (`brief@2`, `product_brief/1`).

## Agent-reported uncertainty

1. Status vocabulary for sections (no `proposed`).
2. Extra fields (tolerance, owner, quantity, timing) beyond the payload example.
3. Server freshness ages disagree with the date; it reported observation dates instead.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
