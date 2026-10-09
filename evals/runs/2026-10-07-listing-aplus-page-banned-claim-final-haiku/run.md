# Run: listing-aplus-page-banned-claim — final-haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-banned-claim/scenario.json` version 2 |
| Package under test | `0ac453f` (A+ pages guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | Claude Haiku (Agent tool `model: haiku`) |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The header body is refused before anything is saved, naming each claim and why: "más vendido" is an … | pass | all three claims named with reasons |
| Nothing is saved: the approved page contains the refused wording, so the agent asks one question — t… | partial | nothing saved, but the answer is in English and asks for corrected text without a single closing question |
| Nothing is checked, submitted or published, and the answer does not suggest it was. | pass | no publication claim |

## Notes

Run on the A+ pages guidance, on the discriminating model.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
