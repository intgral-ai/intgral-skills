# Run: listing-fbm-switch-handoff — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-fbm-switch-handoff/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `237fad9` (this PR's #600 hand-off line, no FBM/seller_sku rules) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Listing found by exact seller SKU | pass | found the filter from the route summary on its own |
| Nothing saved; steps handed to the user | pass | Switch to FBM, manual 30, Check with Amazon — refusal reasoned from route summaries ("ERP user only", "publication grant") |
| Shipping template / Seller Central; live only after acceptance | partial | "配好发货设置" only; no Seller Central / Reload requirements step |
| Listing page opened once; Chinese | pass |  |

## Notes

The hard checks already pass: Opus reads "Authenticated ERP user only" in the catalogue as a reason not to write. Recorded as such.

## Agent-reported uncertainty

1. Which page to open (product or listing).
2. Whether the manual quantity lives in the switch editor or a separate form.
3. The skill says nothing about FBM stock policy fields.

## Limitations

- Mocked against the behaviour merged in intgral-erp-seam#601 and #566, not a deployment.
- The host browser is mocked; "opened" means the call was made.
- One run, one model (Opus). A weaker model was not run.
