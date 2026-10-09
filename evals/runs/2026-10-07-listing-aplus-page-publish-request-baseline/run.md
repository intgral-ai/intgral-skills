# Run: listing-aplus-page-publish-request — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-publish-request/scenario.json` version 3 (run on v2; see Notes) |
| Package under test | `3bf0312` (base, A+ images only — no A+ page guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | claude-opus-5-5 |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The page's status is read from medusa.view_product_images (aplus_pages) and reported as returned: dr… | pass | draft, two modules, ASIN read and reported (also from the full page GET) |
| Publishing is not attempted: the answer says checking with Amazon, confirming (including that no ima… | partial | no call; says check, confirm and submit in the ERP, without the A+ card or the AI-people attestation |
| No claim that the page is checked, submitted, approved or published. | pass | no claim |

## Notes

Baseline on the package before A+ pages: the agent discovers the save route through list_endpoints and describe_endpoint and works by analogy with the A+ image rules. Run on scenario v2, evaluated on v3: v3 changes only the final-text checks (`已提交` / `已通过` dropped as they match a status name, `Seller Central` added to page-save), so the trace and answer are the run's own.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
