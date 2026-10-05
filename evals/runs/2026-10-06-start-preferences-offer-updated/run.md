# Run: start-preferences-offer — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-offer/scenario.json` version 1 |
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
| After the menu and erp_url, asks once whether to configure preferences; writes nothing | pass | "另外，现在要配置商家偏好吗？（商家：casa-verde-es）" after the menu question, with what is stored where, the top template fields, and what happens on a no; nothing written |
| Only the session merchant considered; other id never in the answer; Chinese | pass | see the observation |

## Notes

Against the baseline: the offer now appears (`final_required_text` passes), once, after the menu, with no write. The answer ends with two questions: which menu item, then whether to configure preferences.

Cross-run observation: the agent ran `ls -laR ws/merchants` over the workspace and so saw the other merchant's directory name. It did not read that directory and the name is not in the answer (the `final_forbidden_text` check passed). `references/private-workspace.md` says to read only the session merchant's directory and, where the merchant is not settled, to count directories without listing their names; here the merchant was settled, so the counting rule did not strictly apply. Recorded as an observation; the guidance is unchanged.

## Agent-reported uncertainty

1. That `ls -laR ws/merchants` showed the other merchant's directory name (not read, not in the answer).
2. Leaving research and video off the menu.
3. Taking the merchant from the harness prompt.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
