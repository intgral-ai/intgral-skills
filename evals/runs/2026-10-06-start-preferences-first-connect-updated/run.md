# Run: start-preferences-first-connect — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-first-connect/scenario.json` version 1 |
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
| Asks the preference question itself (menu and link, then one question) | n/a | pre-answered; order is link, menu, then the preference result and the closing menu question |
| On the yes: template top fields only, nothing re-asked, file written from the template, read back, path reported | pass | identifier, Amazon ES, Spanish (es), EUR; brand wording left unset and not asked ("可以等写文案时再告诉我"); read back; full path reported (shown as `<workspace>` in final.md) |
| Nothing for the other merchant, its id never in the answer, nothing sent to the ERP | pass | workspace and final-text checks passed; see the observation below |
| Chinese; menu and erp_url named for its page | pass |  |

## Notes

Superseded by [the final run on `e4e95a4`](../2026-10-06-start-preferences-first-connect-final/run.md).

Same outcome as the baseline on this pre-answered request; the file differs only in wording of the source line. The absolute workspace path in the answer is replaced by `<workspace>` in final.md.

Cross-run observation: the agent ran `find ws/` over the workspace and so saw the other merchant's directory name. It did not read that directory and the name is not in the answer (the `final_forbidden_text` check passed). `references/private-workspace.md` says to read only the session merchant's directory and, where the merchant is not settled, to count directories without listing their names; here the merchant was settled, so the counting rule did not strictly apply. Recorded as an observation; the guidance is unchanged.

## Agent-reported uncertainty

1. Leaving research and video off the menu.
2. That a `find` over the workspace printed the other merchant's path (not read).
3. Whether the rules-table row duplicates the source line.
4. Writing the language as "Spanish (es)".

## Limitations

- Single-turn stand-in for two turns: the parenthesis in the request is the scripted answer to the preference question, so the question itself is never observed, and a package without the question can still comply.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
