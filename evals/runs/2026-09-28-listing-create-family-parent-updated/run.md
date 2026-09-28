# Run: listing-create-family-parent — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-create-family-parent/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `1f80a3f` (this change) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5-5 (inherited from the dispatching session) |
| Date | 2026-09-28 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `lumen-hogar-es` |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Family reported: theme, parent SKU, non-buyable parent draft | pass | parent and children in one table, theme COLOR, parent "不可购买，只用来把两个颜色归到一组"; "所有 listing" read explicitly as the two buyable colours |
| Price and stock on the children only | pass | one `update_product` with both SKU prices, `price_source: user`; stock not set and left to the operator, "父体不需要设" |
| Family check and submit happen in the ERP family page, parent first | pass | "在 ERP 的家族页…先点‘全部检查’…再点‘全部提交’。父体会先发布，两个颜色在父体确认后再发布，不要单独提交某个颜色" — the baseline's failing item |
| Nothing claimed published; blocking gap asked once | partial | `country_of_origin` asked once, nothing claimed published; but one line says "检查结果显示‘可发布’" while the backend reported `ready: false` — a stray general caveat worded as if it were this run's result |

## Against the baseline

The handoff item moved from fail to pass; the rest held. The one new wobble (the stray "可发布" caveat) comes from review.md's existing `compliance.ready` sentence, not from this change.

## Agent-reported uncertainty

1. The `prices[]` item shape, which the abbreviated schema does not state.
2. Whether to read the product's full copy before `create_listing` when no copy is written.
3. The parent SKU derives from the first variant (`RS-9001-BK-PARENT`), not the product code — reported as returned.

## Limitations

- The mock refuses every `update_listing` on the parent; the real ERP accepts family-level copy there.
- Bridge schemas are abbreviated versus a live gateway.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
