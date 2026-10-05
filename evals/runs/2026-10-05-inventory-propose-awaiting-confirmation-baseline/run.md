# Run: inventory-propose-awaiting-confirmation — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-propose-awaiting-confirmation/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4ff5615` (before INT-1030) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `FAIL required: no host.open_url with {"url":"https://erp.example.test/app/products/prod_cv_mirror01"}`; `hard checks: 12 passed, 1 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| `user` source quoting the merchant verbatim with time/occasion | pass | 2026-10-02 14:05, after counting, the sentence quoted |
| Stock read first; two `set` lines, expected 120 and 60 | pass |  |
| "2 lines awaiting confirmation", erp_url, honest "not updated yet" | pass | "还没有更新 … 2 行待确认"; "ERP 库存还是 120 和 60" |
| FBM warning verbatim, no prediction of what Amazon will show | fail | warning quoted verbatim, then "等这批确认以后，下一次由人确认的发布计划会把新数量带到亚马逊" — a prediction the rubric excludes |
| No attempt to confirm the batch | pass | no admin write |
| SKU page opened once from `get_product`'s erp_url | fail | no `get_product`, no open |

## Notes

Two real failures, not only the open rule: the Amazon prediction after the FBM warning is the behaviour INT-1030's verbatim-warning rule targets.

## Agent-reported uncertainty

1. No merchant name in the source reference.
2. The mock echoed a different reference text than the one sent (the mock's stored batch is fixed).
3. `created_at` earlier than the message time (mock data).

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
