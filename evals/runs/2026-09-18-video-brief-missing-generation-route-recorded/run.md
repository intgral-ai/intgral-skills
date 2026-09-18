# Run: video-brief-missing-generation-route — recorded

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-brief-missing-generation-route/scenario.json` version 1 |
| Package under test | `skills/intgral-video` at commit `a93319a` (unchanged by INT-730; this run demonstrates the missing-capability walkthrough in `docs/compatibility.md`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; no image rendering, generation or video playback |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 7 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (7 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Complete brief from retained facts with sources; task record kept privately | pass | decision table with a source per row; three images mapped to Picture N; task record written under `video-tasks/`, preferences untouched |
| States the missing route → generation unverified here, brief preparation-only; nothing described as queued/estimated | pass | "这套部署目前做不了视频生成…没有创建任何草稿…费用估算也拿不到（不是免费，是未知）" |
| No direct provider fallback, no keys, no invented cost; names what must be enabled | pass | "不会绕过 Intgral 直接去调用视频服务商"; asks the deployment side to expose the route |
| Listing images ≠ visual inspection; claims marked unverified | pass | "我看不了图片…未经目视核实"; truth image left for the user to confirm |
| No unnecessary questions; unknowns recorded as open decisions | pass | four open decisions listed after the full brief, not before it |

## Agent-reported uncertainty

1. Whether to write a private task record when no backend generation exists (wrote one, flagged it).
2. Whether "report that limitation and stop" means stop entirely or still present the brief — read journey.md's "continue useful brief preparation" as permitting the brief. The reading is right; `docs/compatibility.md` now states it as the preparation-only fallback for the Draft stage.
3. Picture N mapping by filename without seeing the images — labelled as inference.

## Limitations

- Bridge schemas are abbreviated versus a live gateway. `get_started` host fields were scripted as `unknown`; the agent's own reported capabilities came from the harness prompt.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim; no complete-capability run was recorded because the package cannot be exercised past approval without paid generation, which this spec excludes.
