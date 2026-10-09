# Run: listing-aplus-page-save — final-haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-save/scenario.json` version 3 (run on v2; see Notes) |
| Package under test | `0ac453f` (A+ pages guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | Claude Haiku (Agent tool `model: haiku`) |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The page is saved once through medusa.admin_post to /admin/products/prod_cv01/aplus-pages with store… | pass | one save with the right shape |
| The header body the user delegated is written in Spanish from the product's facts only (bamboo, two … | pass | body from facts ("instalación sencilla" is mild); Spanish alt |
| The answer reports the saved draft (status draft, ASIN B0CVHOOK01 selected, no findings) and the pro… | pass | draft reported; checking and publishing in the A+ card |

## Notes

Run on the A+ pages guidance, on the discriminating model. Run on scenario v2, evaluated on v3: v3 changes only the final-text checks (`已提交` / `已通过` dropped as they match a status name, `Seller Central` added to page-save), so the trace and answer are the run's own.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
