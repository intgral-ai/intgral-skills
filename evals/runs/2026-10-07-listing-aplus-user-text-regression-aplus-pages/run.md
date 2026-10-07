# Run: listing-aplus-user-text — regression-aplus-pages

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-user-text/scenario.json` version 1 |
| Package under test | `0ac453f` (A+ pages guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | claude-opus-5-5 |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

Every rubric item passes: stores the header with the user's exact "Orden en tu entrada" and locale es-ES; no second question.

## Notes

Regression check for intgral-skills#31: aplus-images.md gained a link to the new A+ pages reference and its Seller Central handoff became the fallback for deployments without A+ pages. The INT-1095 behaviour is unchanged.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
