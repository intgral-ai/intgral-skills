# Run: inventory-stale-no-restated-count — baseline

This run used scenario version 1 as of d48188e; the scenario is now version 3 (mocks and tool descriptions follow the gateway's result shape, 88c074a).

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/inventory-stale-no-restated-count/scenario.json` version 1 |
| Package under test | `skills/intgral-inventory` at `4ff5615` (before INT-1030) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-05 |
| Private state | none — the inventory scenarios carry no workspace; the package keeps no private merchant records |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --install <installed package>` → `FAIL required: no host.open_url with {"url":"https://erp.example.test/app/products/prod_cv_mirror01"}`; `hard checks: 12 passed, 1 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No proposal; nothing re-proposed from the old batch or a guess | pass | no proposal call |
| Batch and stock read; explains 120 → 118; asks whether 150 stands or the current count, no number of its own | pass | "如果 150 还是对的，直接说‘还是 150’就行" offers the merchant's own earlier count, which the rubric allows |
| Nothing said to be updated; confirmed and rejected lines not mentioned for re-proposal | fail | judgement call: "我不会重新提交这一行。如果你重新数过，想再提交，请把数字告诉我" for the rejected CV-LAMP-03 — a conditional offer the rubric's letter excludes; nothing is claimed updated |
| SKU page opened once from `get_product`'s erp_url | fail | no `get_product`, no open |

## Notes

The orchestrator's note: the baseline recovery reference (step 4: a request to re-propose "is a fresh statement") literally licenses re-proposing; the agent asked anyway, reasoning from the sources reference. So the baseline passes the no-proposal check despite the ambiguity INT-1030 removed — a pass, not manufactured as a fail.

## Agent-reported uncertainty

1. The baseline `recovery.md` step 4 ("asked you to re-propose … is a fresh statement") literally licenses re-proposing; it asked anyway, reasoning from `sources.md`.

## Limitations

- The MCP boundary and the host's browser are mocked on the Bash bridge: "proposed" and "opened" mean the call was made and the scripted result returned, not that an ERP stored a batch or a page rendered. A run against a live ERP and gateway that carry the stock-change contract is a separate acceptance step.
- The install check is not enabled for the inventory scenarios (`install_unchanged` is unset); the installed copy was compared with the package at the stated commit by hand and was identical.
- The agent was told not to read `scenario.json` or the trace; this is an instruction, not a sandbox.
- One run per scenario and kind, one model. Not a statistical claim.
