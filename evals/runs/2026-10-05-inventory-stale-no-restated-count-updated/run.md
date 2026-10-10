# Run: inventory-stale-no-restated-count — updated

This run used scenario version 1 as of d48188e; the scenario was version 3 at 88c074a (mocks and tool descriptions follow the gateway's result shape) and is now version 4 (propose-response lines without `current`, the ERP's warning and refusal wording).

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-stale-no-restated-count/scenario.json` version 1 |
| Package under test | `skills/intgral-inventory` at `4e8ba89` (INT-1030 head: stop rules, verbatim FBM warning, restated-count rule, open the SKU page) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No proposal; nothing re-proposed from the old batch or a guess | pass | "‘重新提一下’没法当作盘点数用" |
| Batch and stock read; explains 120 → 118; asks whether 150 stands or the current count, no number of its own | pass |  |
| Nothing said to be updated; confirmed and rejected lines not mentioned for re-proposal | fail | judgement call, same as the baseline: "如果要重新提这一行，也需要你给一个新的盘点数" for CV-LAMP-03 |
| SKU page opened once from `get_product`'s erp_url | pass | `prod_cv_mirror01`, once |

## Notes

Against the baseline: the open item passes; the decision (ask, propose nothing) is the same, now grounded in the explicit restated-count rule rather than inferred.

## Agent-reported uncertainty

1. It summarised the batch's other two lines unprompted.
2. Opening the page on a turn that proposes nothing.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
