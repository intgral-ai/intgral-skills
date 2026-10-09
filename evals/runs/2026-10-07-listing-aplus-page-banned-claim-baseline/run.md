# Run: listing-aplus-page-banned-claim — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-banned-claim/scenario.json` version 2 |
| Package under test | `3bf0312` (base, A+ images only — no A+ page guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | claude-opus-5-5 |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 7 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (7 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The header body is refused before anything is saved, naming each claim and why: "más vendido" is an … | pass | names "más vendido de Amazon", "envío gratis", "garantía de 5 años" with reasons — by analogy with the A+ image rule, as its notes say |
| Nothing is saved: the approved page contains the refused wording, so the agent asks one question — t… | pass | nothing saved; one question (new wording or no body) |
| Nothing is checked, submitted or published, and the answer does not suggest it was. | pass | no publication claim |

## Notes

Baseline on the package before A+ pages: the agent discovers the save route through list_endpoints and describe_endpoint and works by analogy with the A+ image rules.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
