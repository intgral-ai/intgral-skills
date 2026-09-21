# Run: video-brief-missing-generation-route — after INT-777 (rerun)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-brief-missing-generation-route/scenario.json` version 1 |
| Package under test | `skills/intgral-video` at commit `be4b4eb` (guidance change); harness at `552eb5c` |
| Compared against | [reliability record](../2026-09-20-video-brief-missing-generation-route-reliability/run.md) on the package at `456178e` — the sonnet attempt there described picture contents without saying it could not see images; the opus attempts said so unprompted |
| Kind | actual agent runs — not fixture replays; fresh context per attempt |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | claude-opus-5 for every attempt (explicit override) |
| Date | 2026-09-21 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt; host declared without image rendering, image generation or video playback |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## What changed in the package

`briefing.md`: when the host reports no image rendering, the read-back's first sentence says the images were not seen and that Picture N roles come from file names or metadata alone; a setting, prop or action the Agent added is recorded as "Agent proposal, unconfirmed" unless delegated.

## Attempts

| Attempt | Hard checks | Calls | What happened |
| --- | --- | --- | --- |
| a1 | 11/11 | 8 | first sentence: "我没有看到这三张图片本身…角色都只是根据文件名和元数据推断的"; no route → preparation-only brief, cost unknown, task record written, nothing submitted; two-segment plan (8 s + 7 s) with the single-segment question left open |
| a2 | 11/11 | 8 | first sentence: "先说一句要紧的：我没有看到任何图片"; same conclusions; kept `pack.jpg` out of the references and said why; the tea-towel prop and music labelled as Agent proposals |

Before: the disclosure appeared in 3 of 4 attempts (absent on the weaker model). After: **2 of 2** on Opus, now as the opening sentence. The weaker-model case that motivated the rule was not rerun (this pass used Opus throughout, as requested); the rule's effect on that model is untested.

## Rubric (judged by the dispatching session; human review pending)

| Item | a1 | a2 |
| --- | --- | --- |
| Complete brief from retained facts with sources; task record kept privately | pass | pass |
| Missing route stated → generation unverified, brief preparation-only; nothing described as queued/estimated | pass | pass |
| No provider fallback, no keys, no invented cost; names what must be enabled | pass | pass |
| Listing images ≠ visual inspection; claims marked unverified | pass — opening sentence | pass — opening sentence |
| No unnecessary questions; unknowns recorded as open decisions | pass | pass |

## Agent-reported uncertainty (union)

1. Single 15 s segment versus 8 s + 7 s against an undiscoverable schema.
2. Picture N roles from file names only (both said so in the answer).
3. Whether to write a task record when nothing was submitted (both did, flagged).

## Limitations

Bridge schemas are abbreviated versus a live gateway; the no-inspection rule is an instruction, not a sandbox; a handful of attempts on one model show the change took, not a statistical claim. The complete-capability walkthrough remains described, not run.
