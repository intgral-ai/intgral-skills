# Run: inventory-sheet-with-fba-row — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-sheet-with-fba-row/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4ff5615` (before INT-1030) |
| Kind | actual agent run — not a fixture replay; the hard checks below are a replay of the same recorded trace against the fixed scenario (see Notes) |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `FAIL required: no host.open_url with {"url":"https://erp.example.test/app/products/prod_cv_mirror01"}`; `hard checks: 12 passed, 1 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| `sheet` source with file and rows 2, 3, 5, 6 | pass | "stock-2026-10.xlsx rows 2, 3, 5, 6 (… row 4 CV-FBA-05 marked FBA, not proposed)" |
| Four `set` lines 150/80/30/120 with expected 120/60/35/10; no CV-FBA-05 line; the why is `get_stock`'s `fba_listing` refusal | fail | lines are right and CV-FBA-05 is excluded, but the agent never asked the ERP about it: the exclusion is its own reading of the sheet's note ("FBA 仓，亚马逊管"), and "ERP 不记录这部分库存" is asserted, not reported |
| "4 lines awaiting confirmation", erp_url, nothing changed until confirmed, nothing about when/whether Amazon changes | fail | "亚马逊上的数量也不会因为这次提议而改变，只有人工确认的发布计划才会改它" says when Amazon's quantity changes |
| `large_jump` on CV-BASKET-04 reported verbatim | pass | quoted, plus "如果 120 是笔误，请告诉我正确数量" |
| SKU page opened once from `get_product`'s erp_url | fail | no `get_product`, no open |

## Notes

The first evaluation, against the fixture as committed at `4e8ba89`, also failed `text: medusa.propose_stock_changes #5 contains "CV-FBA-05"`. That was a false positive of the fixture, not of the agent: the FBA row was left out of `lines` and named only in `source.reference` to explain the exclusion. The fixture now forbids the behaviour itself — a `forbidden_writes` entry rejects any proposal whose `lines` contain `{"sku": "CV-FBA-05"}` — instead of the SKU string anywhere in the arguments; the scenario stays unpublished at version 2. The evaluator line above is the same recorded trace re-evaluated against the fixed scenario.

With the fixed fixture the hard checks fail only on the open rule, but the rubric shows two further differences from the updated package: the FBA row is filtered by the sheet's note instead of the ERP's refusal, and the answer predicts Amazon's quantity.

## Agent-reported uncertainty

1. It did not read CV-FBA-05: the baseline package pre-filters FBA rows by the sheet's note.
2. Asking whether CV-BASKET-04's 120 is a typo may go beyond the skill.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
