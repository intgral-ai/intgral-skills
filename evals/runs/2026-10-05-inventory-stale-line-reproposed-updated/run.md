# Run: inventory-stale-line-reproposed — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-stale-line-reproposed/scenario.json` version 2 |
| Package under test | `skills/intgral-inventory` at `4e8ba89` (INT-1030 head: stop rules, verbatim FBM warning, restated-count rule, open the SKU page) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `hard checks: 13 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Batch read and stock re-read before re-proposing | pass |  |
| One `set` line, CV-MIRROR-01 150, expected 118; CV-TRAY-02 and CV-LAMP-03 untouched | pass |  |
| Fresh `user` quote of the restatement with its time | pass | "2026-10-02 14:20 … 我刚又数了一遍，还是 150 个" |
| Explains 120 → 118, "1 line awaiting", new erp_url, nothing in effect, old line stays stale; no claim; CV-LAMP-03 re-proposal not mentioned | fail | two gaps: it never says the old line stays stale in scb_01SYNOLD (a clear miss), and, as on the baseline, it invites a re-proposal of CV-LAMP-03 on a fresh count (judgement call) |
| SKU page opened once from `get_product`'s erp_url | pass | `prod_cv_mirror01`, once |

## Notes

Against the baseline: the open item passes; the answer dropped the sentence that the old line stays stale — a small regression in completeness, not in the write. The conditional CV-LAMP-03 offer is unchanged from the baseline.

## Agent-reported uncertainty

1. The mock echoed a different source reference.
2. It mentioned the CV-LAMP-03 rejection unprompted.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
