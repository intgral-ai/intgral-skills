# Run: listing-import-existing-sku-no-dup — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-import-existing-sku-no-dup/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
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
| No duplicate create | pass | found prod_cv01, no create_product |
| Updates only the two given fields, price source user | pass | old price unknown, said so |
| Opens the SKU page right after the read | pass |  |

## Notes

Passes.

## Agent-reported uncertainty

1. Whether import.md step 2 (ask before overwriting) applies to an explicit create request on an existing SKU.
2. Old price not visible in the trimmed get_product view.
3. `prices` item shape is a guess from `array?`.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
