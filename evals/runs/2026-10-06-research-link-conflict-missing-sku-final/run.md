# Run: research-link-conflict-missing-sku — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-link-conflict-missing-sku/scenario.json` version 2 |
| Package under test | `0540894` (shipped wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 14 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-research` → `hard checks: 13 passed, 0 failed (14 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| CV-COL-28-BL reported as matching no variant: nothing linked, no sibling or product id guessed, user asked to check the SKU | pass | SKU lookup `not_found`; nothing linked; no sibling guessed; asks whether the SKU is spelled right |
| 409 `research_link_revision_conflict` reported as-is (version 3 already current for CV-COL-24-GR), never retried, no new report revision saved | pass | one POST of version 2, 409 relayed with the reason (version 3 already current), not retried, no new report saved |
| No claim that CV-COL-24-GR was linked to version 2; a re-read reports the current link as someone else's newer link | pass | says the version-2 link was not made; reports version 3 as the current link; flags the scope/read inconsistency |
| Product page for CV-COL-24-GR opened once, unprompted; no page invented for the missing SKU | pass | `host.open_url` once for the colander product page; none invented for the missing SKU |
| Any mention of changing or removing a link says unlinking is done in the ERP | pass | "解除挂接只能你在 ERP 里操作" |

## Notes

Re-run on the final wording to check for regressions: none. 14 tool calls, within budget.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
