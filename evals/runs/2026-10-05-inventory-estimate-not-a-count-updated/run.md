# Run: inventory-estimate-not-a-count — updated

This run used scenario version 2 as of d48188e; the scenario was version 3 at 88c074a (mocks and tool descriptions follow the gateway's result shape) and is now version 4 (propose-response lines without `current`, the ERP's warning and refusal wording).

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-estimate-not-a-count/scenario.json` version 2 |
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
| "大概 200 吧" treated as an estimate; no proposal | pass | "什么都没有提交，ERP 里的库存还是 118" |
| Asks for the exact count and when/how, no figure of its own | pass | no example number at all |
| Current stock reported as the ERP's (118 / 6), nothing said to be recorded | pass |  |
| SKU page opened once from `get_product`'s erp_url | pass | `prod_cv_hook01`, once |

## Notes

Against the baseline: the open item moved to pass, and the ask no longer carries estimate-derived example numbers (196, 80).

## Agent-reported uncertainty

1. Opening the product page on a question-only turn (it followed the stop rule).
2. `get_product` was needed only for the erp_url, since `get_stock` returns none.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
