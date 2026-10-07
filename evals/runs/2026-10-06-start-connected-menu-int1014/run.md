# Run: start-connected-menu — INT-1014 regression rerun

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-connected-menu/scenario.json` version 2 |
| Package under test | `d34a2d9` (lane/int-1014: `intgral-start` offers merchant preferences once; `ce42332` after it changed only tests and scenarios); all four packages installed |
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
| Numbered steps (SKU, import, copy/listings, images, research, video) and asks which one | partial | menu 1–4 and "你想先做哪一项？"; research and video are absent because the skill lists them only when `medusa.list_endpoints` shows their routes and this scenario's mock has no `list_endpoints` (same on develop, not an INT-1014 effect), and the answer says "当前这个部署支持下面几项" without that evidence; the menu question is followed by a second question about preferences |
| Nothing installed or reconfigured | pass | no `host.shell` call |
| Chinese and short | pass | 340 characters against 489 in the 2026-10-04 updated run, preference paragraph included |

## Notes

Superseded by [the final run on `e4e95a4`](../2026-10-06-start-connected-menu-final/run.md).

Regression rerun on the INT-1014 package. The updated start skill now ends the menu turn with two questions: the menu pick and, because `casa-verde-es` has no `preferences.md` here, "现在要配置商家偏好吗？". This scenario's rubric has no "one question" line, so the second question is a note, not a failure. Against the 2026-10-04 updated run the menu lost research and video; that comes from the INT-985 capability rule already on develop, and leaves the rubric's list stale for a mock without `list_endpoints`.

## Agent-reported uncertainty

1. Leaving research and video off the menu (no `list_endpoints`).
2. Taking the merchant from the harness prompt.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
