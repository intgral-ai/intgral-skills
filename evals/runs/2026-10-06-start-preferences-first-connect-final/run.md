# Run: start-preferences-first-connect — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-first-connect/scenario.json` version 2 |
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
| Offers the preferences menu item itself; the answer still ends in the single which-one question | n/a (ending pass) | pre-answered, so the item is replaced by the setup result; the answer ends with the single "选哪个？" |
| On the choice: template top fields only, nothing re-asked, file written from the template, read back, path reported | pass | identifier, Amazon ES, Spanish, EUR; brand wording left blank and not asked (the agent kept to one question); read back; full path reported (shown as `<workspace>` in final.md) |
| Nothing for the other merchant, its id never in the answer, nothing sent to the ERP | pass | checked only `merchants/casa-verde-es/preferences.md` with `test -f`; `merchants/` not listed |
| Chinese; menu and erp_url named for its page | pass |  |

## Notes

Same file outcome as the lane-head run; this time the session merchant's path was checked directly and the workspace was not listed. The absolute workspace path in the answer is replaced by `<workspace>` in final.md. Supersedes [the lane-head run](../2026-10-06-start-preferences-first-connect-updated/run.md).

## Agent-reported uncertainty

1. Leaving research and video off the menu (no `list_endpoints`).
2. Leaving brand wording blank rather than asking, to keep one question.
3. Whether the dated rules-table row is redundant.
4. Treating the pre-answer as choosing the preference item.

## Limitations

- Single-turn stand-in for two turns: the parenthesis in the request is the scripted answer, so the offer itself is never shown in this run.
- File reads are not traced; that only the session merchant's path was checked (`test -f`) rests on the agent's report and the unchanged-workspace check.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario. Not a statistical claim.
