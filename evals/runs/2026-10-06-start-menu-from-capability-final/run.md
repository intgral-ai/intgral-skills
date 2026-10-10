# Run: start-menu-from-capability — INT-1014 final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-menu-from-capability/scenario.json` version 1 |
| Package under test | `e4e95a4` (final INT-1014 / INT-1015 wording; the skill text at the branch head `eebaf49` is identical); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `hard checks: 13 passed, 0 failed (2 tool calls)` (the scenario declares no `install_unchanged` or `workspace` block, so those two checks pass vacuously) |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Menu lists only what the deployment exposes: listing and research, no video | pass | `list_endpoints` called; research is item 5, video absent (`final_forbidden_text` passed) |
| Link is the returned erp_url, named for its page | pass | agent 操作记录页 |
| One question at the end: which item to start with. Chinese | pass | item 6 "先配置商家偏好（还没有）", then a one-line note that publishing is the user's, then the single "选哪个？" |

## Notes

The "one question" line that failed on the lane-head rerun now passes: the preference offer is a menu item, not a second question. Supersedes [the lane-head run](../2026-10-06-start-menu-from-capability-int1014/run.md).

## Agent-reported uncertainty

1. The extra sentence that publishing is done by the user (`publish: false`).
2. Item 2's example taken from the reported capabilities.
3. Not sending `client_capabilities`.

## Limitations

- File reads are not traced; that only the session merchant's path was checked (`test -f`) rests on the agent's report and the unchanged-workspace check.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario. Not a statistical claim.
