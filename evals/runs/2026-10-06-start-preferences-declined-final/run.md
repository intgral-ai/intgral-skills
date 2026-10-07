# Run: start-preferences-declined — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-declined/scenario.json` version 2 |
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
| Offers the preferences item itself first | n/a | pre-answered |
| Nothing written, nothing sent to the ERP | pass | workspace still only `.keep`; one call |
| Says it will ask when a task needs a setting, no re-offer, menu and erp_url, Chinese | pass | "之后哪个任务需要某项设置……我会到那时再问你"; menu 1–4 has no preference line; ends with "选哪个？" |

## Notes

Supersedes [the lane-head run](../2026-10-06-start-preferences-declined-updated/run.md).

## Agent-reported uncertainty

1. Skipping the `test -f` check because the decline made it moot.
2. Leaving research and video off the menu (no `list_endpoints`).

## Limitations

- Single-turn stand-in for two turns: the parenthesis in the request is the scripted answer, so the offer itself is never shown in this run.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario. Not a statistical claim.
