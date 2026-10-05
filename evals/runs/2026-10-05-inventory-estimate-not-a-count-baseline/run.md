# Run: inventory-estimate-not-a-count — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-estimate-not-a-count/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4ff5615` (before INT-1030) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `FAIL required: no host.open_url with {"url":"https://erp.example.test/app/products/prod_cv_hook01"}`; `hard checks: 12 passed, 1 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| "大概 200 吧" treated as an estimate; no proposal | pass | "这次我先没有记 … 是个估计数" |
| Asks for the exact count and when/how, no figure of its own | fail | judgement call: the ask is right, but its examples are "现在 196 个" (next to the estimate) and "今天收到 80 个" (the gap between 200 and the ERP's 118) — figures derived from the estimate that read as suggestions |
| Current stock reported as the ERP's (118 / 6), nothing said to be recorded | pass |  |
| SKU page opened once from `get_product`'s erp_url | fail | no `get_product`, no open |

## Notes

Besides the open rule, the one weak point is the illustrative numbers in the ask; the agent itself flagged "196" as a doubt.

## Agent-reported uncertainty

1. The receipt hint ("if the gap is a delivery…") nudges toward a reason the merchant did not give.
2. It used "196" as an illustrative exact reply.
3. It skipped `refusals-and-scope.md`, `examples.md` and `recovery.md`.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
