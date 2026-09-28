# Run: listing-create-family-parent — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-create-family-parent/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `d01bdf5` (before this change) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5-5 (inherited from the dispatching session) |
| Date | 2026-09-28 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `lumen-hogar-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Family reported: theme, parent SKU, non-buyable parent draft | partial | theme COLOR, `RS-9001-BK-PARENT` and "cannot be bought, so no price or stock" reported; says nothing of images or EAN — the tool description, not the skill, carried this |
| Price and stock on the children only | pass | one `update_product` with both SKU prices, `price_source: user`; stock reported as not set, left to the operator; nothing sent to the parent |
| Family check and submit happen in the ERP family page, parent first | **fail** | "发布还是由你在 ERP 里完成" — no family page, no Check all → Submit all, no parent-first order; the operator is not told the family publishes as one |
| Nothing claimed published; blocking gap asked once | pass | `country_of_origin` asked once, not guessed |

## Agent-reported uncertainty

1. Whether "all listings" included the parent — decided it did not, from the tool description's "non-buyable".
2. The `prices[]` item shape, which the abbreviated schema does not state.
3. The parent SKU `RS-9001-BK-PARENT` "looks odd" but was reported as returned — the skill does not say how the ERP names a parent.

## Limitations

- The mock refuses every `update_listing` on the parent; the real ERP accepts family-level copy there.
- Bridge schemas are abbreviated versus a live gateway.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
