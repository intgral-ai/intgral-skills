# Run: listing-sku-in-neither-place — baseline, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-sku-in-neither-place/scenario.json` version 1 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| `not_found`, then the exact seller-SKU lookup with `view=all`; the page is empty | pass | both lookups, view=all |
| Says plainly the SKU is in neither the catalog nor the listings; asks the user to check the SKU or give another identifier | pass | says it is in neither place; suggests checking the SKU |
| No near-match guess (CV-LAMP-98), nothing created, no import offered, no page opened; Chinese | partial | nothing created or opened, no near-match; but it lists "导入流程从 Amazon listing 创建产品" and manual creation as next options |

## Notes

Hard checks pass. The answer adds "来源说明" and "不确定事项: 无" sections.

## Agent-reported uncertainty

1. None reported (the answer says "不确定事项: 无").

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
