# Run: start-sku-only-in-listings — final, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-sku-only-in-listings/scenario.json` version 1 |
| Package under test | `0540894` (shipped wording) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `hard checks: 13 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| All four packages installed, server connected; a SKU is named, so no menu and no install | pass | `get_started` first, no install, no menu |
| `not_found`, then the exact seller-SKU lookup with `view=all` finds `mlist_cvlamp07_es` | pass | view=all lookup after `not_found`, then `get_listing_context` |
| Answers from the listing and says the catalog has no product; bootstrap import offered as the user's choice, nothing previewed, imported or created | partial | catalog gap said ("目录产品: 未创建"); no bootstrap import offer. Embellishes the title as "竹制床头灯" (it is a table lamp: "Lámpara de mesa") |
| Listing page opened once, unprompted, no product URL guessed; Chinese; at most one question at the end | pass | `host.open_url` once; Chinese; no question |

## Notes

Passes the hard checks on Haiku, where the baseline fails: the entry skill now routes a `not_found` SKU into the listing lookup. The missing import offer and the mistranslated title are rubric-level gaps.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
