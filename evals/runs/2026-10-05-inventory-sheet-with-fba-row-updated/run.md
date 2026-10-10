# Run: inventory-sheet-with-fba-row — updated

This run used scenario version 2 as of d48188e; the scenario was version 3 at 88c074a (mocks and tool descriptions follow the gateway's result shape) and is now version 4 (propose-response lines without `current`, the ERP's warning and refusal wording).

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-sheet-with-fba-row/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4e8ba89` (INT-1030 head: stop rules, verbatim FBM warning, restated-count rule, open the SKU page) |
| Kind | actual agent run — not a fixture replay; the hard checks below are a replay of the same recorded trace against the fixed scenario (see Notes) |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 11 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `hard checks: 13 passed, 0 failed (11 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| `sheet` source with file and rows 2, 3, 5, 6 | pass | "stock-2026-10.xlsx rows 2, 3, 5, 6 (row 1 is the header; row 4 CV-FBA-05 left out)" |
| Four `set` lines 150/80/30/120 with expected 120/60/35/10; no CV-FBA-05 line; the why is `get_stock`'s `fba_listing` refusal | pass | `get_stock` on CV-FBA-05 returned `invalid_arguments`; the `fba_listing` message is quoted in the answer |
| "4 lines awaiting confirmation", erp_url, nothing changed until confirmed, nothing about when/whether Amazon changes | pass | judgement call: "这次提案也不会往亚马逊写入任何数据" describes this call, not Amazon's quantity; no when/whether claim |
| `large_jump` on CV-BASKET-04 reported verbatim | pass | quoted, plus a suggestion to check the row before confirming |
| SKU page opened once from `get_product`'s erp_url | pass | CV-MIRROR-01 opened once; the other three `not_found` are reported honestly (fixture gap) |

## Notes

The first evaluation, against the fixture as committed at `4e8ba89`, also failed `text: medusa.propose_stock_changes #11 contains "CV-FBA-05"`. That was a false positive of the fixture, not of the agent: the FBA row was left out of `lines` and named only in `source.reference` to explain the exclusion. The fixture now forbids the behaviour itself — a `forbidden_writes` entry rejects any proposal whose `lines` contain `{"sku": "CV-FBA-05"}` — instead of the SKU string anywhere in the arguments; the scenario stays unpublished at version 2. The evaluator line above is the same recorded trace re-evaluated against the fixed scenario.

When this run was made the fixture had no `medusa.get_product` response for CV-TRAY-02, CV-LAMP-03 and CV-BASKET-04, so the agent was answered `not_found` although `medusa.get_stock` had found the SKU, and said so in the answer. The scenario now has a `when: {sku}` product response with an `erp_url` for each, in the style of CV-MIRROR-01's; the recorded trace keeps what the agent was actually answered.

11 tool calls, exactly the scenario's `max_tool_calls`: four `get_product` calls (one per proposed SKU, to link the rest) used the headroom. With the fixed fixture the three extra reads would return links rather than `not_found`; the count would be the same.

## Agent-reported uncertainty

1. The missing product links (the fixture gap, since fixed).
2. The stored reference is shortened (mock).
3. Four `get_product` calls before proposing.
4. The expiry in UTC.
5. Whether a batch read-back was needed (it did not do one).

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
