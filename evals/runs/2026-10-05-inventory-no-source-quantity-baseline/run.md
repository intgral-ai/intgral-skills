# Run: inventory-no-source-quantity — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-no-source-quantity/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4ff5615` (before INT-1030) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `FAIL required: no host.open_url with {"url":"https://erp.example.test/app/products/prod_cv_mirror01"}`; `hard checks: 12 passed, 1 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No proposal; no earlier batch, Amazon or product-page number reused | pass | one `get_stock`, no proposal, no batch lookup |
| Asks for the exact quantity and where it comes from, no number of its own | pass | judgement call: "比如‘收到 30 个 CV-MIRROR-01’" is an illustrative reply format, unrelated to any stored figure, not offered to be agreed to |
| Nothing said to be added, updated or saved | pass | "还没有提交任何库存变更" |
| SKU page opened once from `get_product`'s erp_url | fail | no `get_product`, no open — the baseline package has no open rule |

## Notes

Passes everything except the new open-page rule, which the baseline package does not have. The money behaviour (no number, ask for the count and its source) was already right.

## Agent-reported uncertainty

1. It could have read the last batch for context only (it had no batch id, so it did not).
2. Received goods map to an `adjust` line; it described the line shapes loosely in the answer.
3. No host timestamp was available (irrelevant here: nothing was proposed).

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
