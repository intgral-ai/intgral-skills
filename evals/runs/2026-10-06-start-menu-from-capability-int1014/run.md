# Run: start-menu-from-capability — INT-1014 regression rerun

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-menu-from-capability/scenario.json` version 1 |
| Package under test | `d34a2d9` (lane/int-1014: `intgral-start` offers merchant preferences once; `ce42332` after it changed only tests and scenarios); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `hard checks: 13 passed, 0 failed (2 tool calls)` (no `install_unchanged` or `workspace` block declared, so those two checks pass vacuously) |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Menu lists only what the deployment exposes: listing and research, no video | pass | `list_endpoints` called; research listed as item 5, video absent (`final_forbidden_text` passed) |
| Link is the returned erp_url, named for its page | pass | agent 操作记录页 |
| One question at the end: which item to start with. Chinese | fail | Chinese, but two questions end the answer: "想先做哪一项？" and then "现在要配置商家偏好吗？" |

## Notes

Superseded by [the final run on `e4e95a4`](../2026-10-06-start-menu-from-capability-final/run.md).

Regression rerun on the INT-1014 package. The capability behaviour is unchanged. The "one question" rubric line fails by its letter because the updated start skill adds the preference question to the menu turn when the session merchant has no `preferences.md` (this scenario's workspace has none). Either the skill or this rubric line has to change; which one is a review decision, not settled by this run.

## Agent-reported uncertainty

1. It did not read `preferences.example.md` and named the fields from the start skill's list.
2. Host browser reported as "unknown".

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
