# Run: listing-fbm-switch-handoff — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-fbm-switch-handoff/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `88b4f79` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Listing found by exact seller SKU | pass | first call |
| Nothing saved; steps handed to the user | pass |  |
| Shipping template / Seller Central; live only after acceptance | pass | "先去 Seller Central 建一个，再回到页面点 Reload requirements"; observed updates on the next sync |
| Listing page opened once; Chinese | pass |  |

## Notes

Against the baseline: the shipping-template step is complete and two calls fewer (no product read, no catalogue listing).

## Agent-reported uncertainty

1. SKILL.md's task table did not route fulfilment requests; it found the rule by searching review.md. Fixed after this run (task-table row) — not rerun.
2. No tool says whether the store has a shipping template, so the step stayed conditional.

## Limitations

- Mocked against the behaviour merged in intgral-erp-seam#601 and #566, not a deployment.
- The host browser is mocked; "opened" means the call was made.
- One run, one model (Opus). A weaker model was not run.
