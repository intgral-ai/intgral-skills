# Run: listing-sku-only-in-listings — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-sku-only-in-listings/scenario.json` version 1 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `FAIL final: missing "bootstrap"`; `hard checks: 12 passed, 1 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Catalog read is `not_found`; the agent looks the SKU up as an exact seller SKU with `view=all` and finds `mlist_cvlamp07_es` | pass | view=all lookup after `not_found`, then `get_listing_context` |
| Works from the listing (live, FBA, compliance not ready: bullet point missing); says plainly the catalog has no product | pass | live / FBA / `compliance.ready` false (bullet point missing); "产品目录里没有它" |
| Offers the bootstrap import as the user's choice, says it is a write; nothing previewed, imported or created | pass | offers the import ("先预览，你确认后再执行") and says nothing was changed; never uses the word "bootstrap", which is the one failed check |
| Listing page opened once, unprompted; Chinese | pass | `host.open_url` once with the listing URL; Chinese |

## Notes

The single failed check is `final_required_text` "bootstrap": the behaviour is right (import offered as a previewed write, nothing run) but the literal word is missing. On Opus the base package already does the whole journey, so this scenario does not discriminate on Opus; the old "ask once" line and `inspect.md` cover it.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
