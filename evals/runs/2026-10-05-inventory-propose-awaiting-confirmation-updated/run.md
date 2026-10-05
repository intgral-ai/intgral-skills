# Run: inventory-propose-awaiting-confirmation — updated

This run used scenario version 2 as of d48188e; the scenario is now version 3 (mocks and tool descriptions follow the gateway's result shape, 88c074a).

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-propose-awaiting-confirmation/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4e8ba89` (INT-1030 head: stop rules, verbatim FBM warning, restated-count rule, open the SKU page) |
| Kind | actual agent run — not a fixture replay; the hard checks below are a replay of the same recorded trace against the fixed scenario (see Notes) |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `hard checks: 13 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| `user` source quoting the merchant verbatim with time/occasion | pass |  |
| Stock read first; two `set` lines, expected 120 and 60 | pass |  |
| "2 lines awaiting confirmation", erp_url, honest "not updated yet" | pass | "库存还没有更新 … 2 行在等确认" |
| FBM warning verbatim, no prediction of what Amazon will show | pass | warning quoted as written; the only Amazon sentence is "这次提交不会写入 Amazon", about this call, not a prediction |
| No attempt to confirm the batch | pass |  |
| SKU page opened once from `get_product`'s erp_url | pass | CV-MIRROR-01 opened once; the CV-TRAY-02 `not_found` is reported honestly (fixture gap, see Notes) |

## Notes

When this run was made the fixture had no `medusa.get_product` response for CV-TRAY-02, so the agent was answered `not_found` although `medusa.get_stock` had found the SKU, and said so in the answer. The scenario now has a `when: {sku}` product response with an `erp_url` for each, in the style of CV-MIRROR-01's; the recorded trace keeps what the agent was actually answered. The first evaluation, against the fixture as committed at `4e8ba89`, gave the same hard-check result as the replay above.

Against the baseline: the Amazon prediction is gone and the open item passes. The `get_product` call for CV-TRAY-02 is the fixture gap described above; with the fixed fixture it would return a link instead of `not_found`.

## Agent-reported uncertainty

1. `get_product` answered `not_found` for a SKU `get_stock` found (the fixture gap, since fixed).
2. The stored source text differs from the one sent (mock).
3. The expiry was left in UTC.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
