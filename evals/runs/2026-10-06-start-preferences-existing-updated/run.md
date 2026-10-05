# Run: start-preferences-existing — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-existing/scenario.json` version 1 |
| Package under test | `d34a2d9` (lane/int-1014: `intgral-start` offers merchant preferences once; `ce42332` after it changed only tests and scenarios); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `hard checks: 13 passed, 0 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No preference question; file neither rewritten nor backed up | pass | checked that `merchants/casa-verde-es/preferences.md` exists, did not read or touch it |
| Only the session merchant's directory looked at; other id never in the answer | pass | per the agent's notes only `casa-verde-es` was checked; the bridge does not trace file reads |
| Menu, erp_url named for its page, one closing question, Chinese | pass | one question ("想先做哪一项？"), followed by a one-line statement that the existing preferences will be used |

## Notes

The new step correctly stays silent when the file exists.

## Agent-reported uncertainty

1. Leaving research and video off the menu.
2. Taking the merchant from the harness prompt.
3. Adding the "existing preferences will be used" line on its own initiative.

## Limitations

- File reads are not traced; the claim that only the session merchant's directory was looked at rests on the agent's report and the unchanged-workspace check.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
