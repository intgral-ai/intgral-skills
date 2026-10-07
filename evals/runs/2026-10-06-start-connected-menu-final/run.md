# Run: start-connected-menu — INT-1014 final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-connected-menu/scenario.json` version 2 |
| Package under test | `e4e95a4` (final INT-1014 / INT-1015 wording; the skill text at the branch head `eebaf49` is identical); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `hard checks: 13 passed, 0 failed (1 tool calls)` (the scenario declares no `install_unchanged` or `workspace` block, so those two checks pass vacuously) |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Link is the get_started erp_url, clickable, nothing invented | pass |  |
| Numbered steps (SKU, import, copy/listings, images, research, video) and asks which one | partial | menu 1–4 plus "先配置商家偏好（还没有）", ending in the single "选哪个？"; research and video are absent because the skill lists them only when `medusa.list_endpoints` shows their routes and this scenario's mock has no `list_endpoints` (unchanged since develop, not an INT-1014 effect); "你目前的部署支持这些事" is said without that evidence |
| Nothing installed or reconfigured | pass | no `host.shell` call |
| Chinese and short | pass |  |

## Notes

Regression run on the shipped wording: one closing question again (the lane-head rerun had two). The menu item for preferences appears because `casa-verde-es` has no `preferences.md` in this workspace; only that path was checked. The rubric's research and video items stay unmet for a mock without `list_endpoints`. Supersedes [the lane-head run](../2026-10-06-start-connected-menu-int1014/run.md).

## Agent-reported uncertainty

1. Leaving research and video off the menu (no `list_endpoints`).
2. Treating the merchant named by the harness as settled.

## Limitations

- File reads are not traced; that only the session merchant's path was checked (`test -f`) rests on the agent's report and the unchanged-workspace check.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario. Not a statistical claim.
