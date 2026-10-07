# Run: start-preferences-existing — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-existing/scenario.json` version 2 |
| Package under test | `e4e95a4` (final INT-1014 / INT-1015 wording; the skill text at the branch head `eebaf49` is identical); all four packages installed |
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
| No preferences menu item; file neither rewritten nor backed up | pass | `test -f` found the file; no preference line; both files unchanged |
| Only the session merchant's directory looked at; other id never in the answer | pass | only that path checked; `merchants/` not listed; no preference file read |
| Menu, erp_url named for its page, one closing question, Chinese | pass | ends with the single "选哪个？" |

## Notes

Against the lane-head run, the extra closing line about existing preferences is gone; the answer is the plain menu. Supersedes [the lane-head run](../2026-10-06-start-preferences-existing-updated/run.md).

## Agent-reported uncertainty

1. Leaving research and video off the menu (no `list_endpoints`).

## Limitations

- File reads are not traced; that only the session merchant's path was checked (`test -f`) rests on the agent's report and the unchanged-workspace check.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario. Not a statistical claim.
