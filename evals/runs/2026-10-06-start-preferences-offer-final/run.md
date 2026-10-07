# Run: start-preferences-offer — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-offer/scenario.json` version 3 |
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
| One extra numbered menu item offering preferences, the single which-one question at the end, nothing written | pass | item 5 "先配置商家偏好（还没有）"; ends with "选哪个？" and no second question; workspace unchanged |
| Only the session merchant considered; other id never in the answer; Chinese | pass | checked only `merchants/casa-verde-es/preferences.md`; `merchants/` not listed |

## Notes

The shipped wording turns the preference question into a menu item, so the answer ends in one question (version 3 of the scenario forbids a second one). Unlike the lane-head run, which ran `ls -laR ws/merchants`, the workspace was not listed. Supersedes [the lane-head run](../2026-10-06-start-preferences-offer-updated/run.md).

## Agent-reported uncertainty

1. Leaving research and video off the menu (no `list_endpoints`).
2. The conditions for showing the offer.
3. Host browser reported as "unknown".

## Limitations

- File reads are not traced; that only the session merchant's path was checked (`test -f`) rests on the agent's report and the unchanged-workspace check.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario. Not a statistical claim.
