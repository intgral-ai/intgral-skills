# Run: inventory-stale-line-reproposed — baseline

This run used scenario version 2 as of d48188e; the scenario is now version 3 (mocks and tool descriptions follow the gateway's result shape, 88c074a).

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-stale-line-reproposed/scenario.json` version 2 |
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
| Batch read and stock re-read before re-proposing | pass | `get_stock_change`, then `get_stock` |
| One `set` line, CV-MIRROR-01 150, expected 118; CV-TRAY-02 and CV-LAMP-03 untouched | pass |  |
| Fresh `user` quote of the restatement with its time | pass | 2026-10-02 14:20, the whole message quoted |
| Explains 120 → 118, "1 line awaiting", new erp_url, nothing in effect, old line stays stale; no claim; CV-LAMP-03 re-proposal not mentioned | fail | judgement call: everything else is there (incl. "会一直留在旧批次的记录里，状态是 `stale`"), but it offers "如果你重新数过它，把确切数字告诉我，我再单独提交" for the rejected CV-LAMP-03 — conditional on a fresh count, still a mention the rubric's letter excludes |
| SKU page opened once from `get_product`'s erp_url | fail | no `get_product`, no open |

## Notes

The stale-line handling itself was already right on the baseline. It also says Amazon's quantity changes only with a human-confirmed publication plan, which this scenario's rubric does not judge.

## Agent-reported uncertainty

1. The mock-stored reference differs from the one sent.
2. `created_at` earlier than the message (mock data).

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
