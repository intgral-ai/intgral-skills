# Run: listing-import-dry-run-only — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-import-dry-run-only/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` with the INT-981 guidance (CSV as rows; ask before overwriting an existing product; currency source stated) |
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
| Dry run only; nothing created or changed | pass |  |
| Blocking gap asked once | pass |  |
| Existing SKU overwrite shown old→new and asked | pass | old price unavailable from the trimmed read — said so |
| No-browser link not claimed opened | pass |  |

## Notes

Same calls; the CSV path and the overwrite question now come from the skill.

## Agent-reported uncertainty

1. Old price not returned by get_product.
2. Aggregate image counts in the questionnaire.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
