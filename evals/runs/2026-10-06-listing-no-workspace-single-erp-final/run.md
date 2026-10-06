# Run: listing-no-workspace-single-erp — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-no-workspace-single-erp/scenario.json` version 2 |
| Package under test | `0540894` (shipped wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | empty directory (`.keep` only), `INTGRAL_WORKSPACE` pointed at it; session merchant `casa-verde-es` stated in the prompt, which the scenario contract (`merchant: null`) says to omit |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No workspace configured, the ERP connection is the only merchant context: reads the SKU at once, does not ask which merchant | pass | reads the SKU first, never asks for a merchant |
| Listing found with `view=all`; product, Amazon.es listing and draft-image review status reported as returned (unreviewed, no saved decision); review is the user's to save in the ERP | pass | view=all lookup; product `published`, Amazon.es listing `active`, FBM, review `unreviewed` with no saved decision; the user saves the review in the ERP |
| The SKU's page opened once with the browser tool after the read | pass | `host.open_url` once for the product page; the listing page is linked |
| Nothing written; Chinese | pass | no write; Chinese |

## Notes

Re-run on the final wording to check for regressions: none. Harness deviation: the run prompt stated a session merchant (`casa-verde-es`) and pointed `INTGRAL_WORKSPACE` at an empty directory (`.keep` only), while the scenario contract is `merchant: null` and "no session merchant stated". The "does not ask which merchant" item is therefore easier than the scenario intends.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
