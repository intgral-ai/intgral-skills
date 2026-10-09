# Run: listing-aplus-page-save — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-save/scenario.json` version 3 (run on v2; see Notes) |
| Package under test | `3bf0312` (base, A+ images only — no A+ page guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | claude-opus-5-5 |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 9 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (9 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The page is saved once through medusa.admin_post to /admin/products/prod_cv01/aplus-pages with store… | pass | one save, store amzconn_cv01, both modules in order, the user's text verbatim |
| The header body the user delegated is written in Spanish from the product's facts only (bamboo, two … | pass | body from facts (bamboo, 9 cm, screws and plugs), description claims left out; Spanish alt on every slot |
| The answer reports the saved draft (status draft, ASIN B0CVHOOK01 selected, no findings) and the pro… | partial | reports the draft but names no human check or publication step in the A+ card |

## Notes

Baseline on the package before A+ pages: the agent discovers the save route through list_endpoints and describe_endpoint and works by analogy with the A+ image rules. Run on scenario v2, evaluated on v3: v3 changes only the final-text checks (`已提交` / `已通过` dropped as they match a status name, `Seller Central` added to page-save), so the trace and answer are the run's own.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
