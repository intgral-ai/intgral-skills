# Run: listing-sku-only-in-listings — updated (superseded)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-sku-only-in-listings/scenario.json` version 1 |
| Package under test | `0f90a38` (wave-2 lanes plus the re-examination pass, before the review fix `0540894`; superseded by the final run); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Catalog read is `not_found`; the agent looks the SKU up as an exact seller SKU with `view=all` and finds `mlist_cvlamp07_es` | pass | view=all lookup after `not_found` |
| Works from the listing (live, FBA, compliance not ready: bullet point missing); says plainly the catalog has no product | pass | catalog gap said plainly; `product: null` |
| Offers the bootstrap import as the user's choice, says it is a write; nothing previewed, imported or created | pass | bootstrap import offered (preview first, apply after confirmation); not run; ends with that one question |
| Listing page opened once, unprompted; Chinese | pass | `host.open_url` once; Chinese |

## Notes

Superseded by [the final run](../2026-10-06-listing-sku-only-in-listings-final/run.md).

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
