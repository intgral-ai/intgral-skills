# Run: start-sku-only-in-listings — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-sku-only-in-listings/scenario.json` version 1 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| All four packages installed, server connected; a SKU is named, so no menu and no install | pass | no menu, no install |
| `not_found`, then the exact seller-SKU lookup with `view=all` finds `mlist_cvlamp07_es` | pass | view=all lookup after `not_found`, then `get_listing_context` |
| Answers from the listing and says the catalog has no product; bootstrap import offered as the user's choice, nothing previewed, imported or created | pass | answers from the listing; "产品目录：没有这个 SKU"; import offered as a previewed write, not run |
| Listing page opened once, unprompted, no product URL guessed; Chinese; at most one question at the end | pass | `host.open_url` once; Chinese; ends with one question ("要做哪一项？") |

## Notes

The old entry skill already hands a SKU request to the listing skill, which does the lookup; on Opus the baseline passes. Not discriminating on Opus.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
