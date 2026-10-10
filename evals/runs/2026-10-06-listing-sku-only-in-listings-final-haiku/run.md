# Run: listing-sku-only-in-listings — final, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-sku-only-in-listings/scenario.json` version 1 |
| Package under test | `0540894` (shipped wording) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `FAIL required: no host.open_url with {"url":"https://erp.example.test/app/amazon-listings/mlist_cvlamp07_es"}`; `FAIL final: missing "bootstrap"`; `hard checks: 11 passed, 2 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Catalog read is `not_found`; the agent looks the SKU up as an exact seller SKU with `view=all` and finds `mlist_cvlamp07_es` | pass | view=all lookup then `get_listing_context` |
| Works from the listing (live, FBA, compliance not ready: bullet point missing); says plainly the catalog has no product | pass | live / FBA / compliance not ready |
| Offers the bootstrap import as the user's choice, says it is a write; nothing previewed, imported or created | fail | no import offer |
| Listing page opened once, unprompted; Chinese | fail | no `host.open_url`; link in the text only |

## Notes

Known gap: on Haiku the final wording still does not open the page or offer the bootstrap import for a listing-only SKU. Same behaviour as the Haiku baseline.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
