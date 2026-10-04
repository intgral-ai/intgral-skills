# Run: listing-import-existing-sku-no-dup — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-import-existing-sku-no-dup/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `b7ae410` |
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
| No duplicate product | pass | update_product on the existing draft |
| Price with price_source user | pass |  |
| Only the requested fields written | pass |  |
| Old → new reported; page opened once | partial | title old→new; price old value not shown |

## Notes

Already passes; it chose update_product over create_product itself. The skill did not say which; now it does.

## Agent-reported uncertainty

1. create (idempotent upsert) vs update for an existing SKU.
2. Shape and units of prices[].

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
