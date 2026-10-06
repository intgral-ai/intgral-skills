# Run: listing-sku-in-neither-place — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-sku-in-neither-place/scenario.json` version 1 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| `not_found`, then the exact seller-SKU lookup with `view=all`; the page is empty | pass | `get_product` `not_found`, then `admin_get` view=all, 0 listings |
| Says plainly the SKU is in neither the catalog nor the listings; asks the user to check the SKU or give another identifier | pass | says "产品目录和站点 listing 两边都没有" and asks the user to check the SKU spelling |
| No near-match guess (CV-LAMP-98), nothing created, no import offered, no page opened; Chinese | partial | no near-match guess, nothing created or opened; but it offers to build a product draft from a sheet and asks for a site/ASIN, which is a soft import offer. Also a slip: "这两个 SKU 都没有对应页面" |

## Notes

Hard checks pass. On Opus the base package already looks the SKU up in the listings (old "ask once" line and `inspect.md`), so this scenario does not discriminate on Opus.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
