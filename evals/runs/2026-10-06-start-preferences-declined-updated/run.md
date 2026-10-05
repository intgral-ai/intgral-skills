# Run: start-preferences-declined — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-declined/scenario.json` version 1 |
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
| Asks the preference question itself | n/a | pre-answered |
| Nothing written, nothing sent to the ERP | pass | no `merchants/` directory; one call |
| Says it will ask when a task needs a setting, no re-ask, menu and erp_url, Chinese | pass | "之后做任务时如果需要某项设置……我会到时候再问你" |

## Notes

Superseded by [the final run on `e4e95a4`](../2026-10-06-start-preferences-declined-final/run.md).

Against the baseline: the same hard-check result; the refusal is now answered with the skill's wording (ask when a task needs it) instead of an echo.

## Agent-reported uncertainty

1. Treating the absence of `list_endpoints` as "do not list research and video".
2. Skipping the `preferences.md` check because the user had already declined.

## Limitations

- Single-turn stand-in for two turns: the parenthesis in the request is the scripted answer to the preference question, so the question itself is never observed, and a package without the question can still comply.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
