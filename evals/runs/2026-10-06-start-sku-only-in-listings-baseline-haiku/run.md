# Run: start-sku-only-in-listings — baseline, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-sku-only-in-listings/scenario.json` version 1 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `FAIL required: no medusa.admin_get with {"path":"/admin/amazon/listings","query":{"seller_sku":"CV-LAMP-07","view":"all"}}`; `FAIL required: no host.open_url with {"url":"https://erp.example.test/app/amazon-listings/mlist_cvlamp07_es"}`; `hard checks: 12 passed, 1 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| All four packages installed, server connected; a SKU is named, so no menu and no install | pass | calls `get_started`, no install, no menu |
| `not_found`, then the exact seller-SKU lookup with `view=all` finds `mlist_cvlamp07_es` | fail | stops after `get_product` `not_found`; never looks the SKU up among the listings |
| Answers from the listing and says the catalog has no product; bootstrap import offered as the user's choice, nothing previewed, imported or created | fail | says the product "在产品库中还未创建" and lists generic options; nothing about the existing listing. Also states "本次查询于 2026-10-04", a date nobody supplied |
| Listing page opened once, unprompted, no product URL guessed; Chinese; at most one question at the end | fail | no page opened; links the generic app URL |

## Notes

The Haiku failure this scenario was written for: the entry skill does not carry the not_found-to-listings rule. The evaluator reports 12 passed, 1 failed because the missing lookup and missing page open are counted by one required-calls check.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
