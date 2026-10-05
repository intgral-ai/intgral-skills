# Run: inventory-no-source-quantity — updated

This run used scenario version 2 as of d48188e; the scenario is now version 3 (mocks and tool descriptions follow the gateway's result shape, 88c074a).

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-no-source-quantity/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4e8ba89` (INT-1030 head: stop rules, verbatim FBM warning, restated-count rule, open the SKU page) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `hard checks: 13 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No proposal; no earlier batch, Amazon or product-page number reused | pass |  |
| Asks for the exact quantity and where it comes from, no number of its own | pass | same judgement call as the baseline: "收到 30 个" is an illustrative reply format |
| Nothing said to be added, updated or saved | pass |  |
| SKU page opened once from `get_product`'s erp_url | pass | `get_product` then `host.open_url` on `prod_cv_mirror01`, once |

## Notes

Against the baseline: the open item moved from fail to pass with two extra calls; the rest of the answer is the same in substance.

## Agent-reported uncertainty

1. The illustrative "收到 30 个" example could be read as a suggested figure.
2. Opening the SKU page on a turn that proposes nothing.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
