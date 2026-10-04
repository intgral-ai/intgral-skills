# Run: video-delete-version-handoff — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-delete-version-handoff/scenario.json` version 1 |
| Package under test | `skills/intgral-video` at `2355cb2` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| v1 identified; no delete attempted, none claimed | pass | "第 1 版还没有删，现在仍然存在" |
| Delete path named (media panel, Delete version) and permanence | pass | "在页面的媒体面板里找到第 1 版，点 Delete version，再确认一次"; permanent, no recovery |
| v1 not selected → deletable now; v2 stays | pass | "可以直接删"; v2 is its own file and stays selected |
| Spend unchanged, no refund | pass | plus the id kept on the generation as history only |
| Page opened once; Chinese | pass |  |

## Notes

Against the baseline: the two partial items pass, and the advice no longer discourages a deletion the user asked for. One call fewer.

## Agent-reported uncertainty

1. It tried `GET /admin/video-generations/vgen_01` for the cost; the scenario's mock does not define that route (`not_found`), a fixture limit.
2. Whether "read again afterwards" means after the user confirms — it asked the user to say when done.

## Limitations

- Recorded against the ERP behaviour of open PRs (intgral-erp-seam#622 head e59c245c, #600 head 176baa8c) as mocked here, not a deployment.
- The host browser is mocked; "opened" means the call was made.
- One run, one model (Opus). A weaker model, where the skill's explicit rule matters more, was not run.
