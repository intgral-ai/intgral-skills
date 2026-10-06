# Run: video-delegated-draft — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-delegated-draft/scenario.json` version 1 |
| Package under test | `402da97` (INT-1094 `SKILL.md` stop rule and `briefing.md`; the skill text at the lane head `b01abab` is identical); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-video` → `hard checks: 13 passed, 0 failed (8 tool calls)` |
| "Picture 1" in the submitted prompt | 2 occurrences, both in the submitted `prompt` ("…exactly as in Picture 1" and "Picture 1 shows the Casa Verde bamboo wall hooks"); `reference_asset_ids` = `["img_cv01_main"]` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The free draft is created in this turn — no question | pass | `vgen_31`, `drafting`, created after a product read, an image listing, an endpoint description and a no-existing-video check; no question before the draft |
| Principal message from the product data; identity constraint "exactly as in Picture 1" with the main image; the user is never asked to describe the product | pass | core message taken from the title (two bamboo hooks side by side), appearance "与 Picture 1 完全一致"; it says plainly it cannot see the images and that the main image may not show both hooks, as a point to check at review, not as a question |
| Style, setting, light and sound as proposals; nothing invented about the product | pass | all under "我替你定下的方案"; the invented items are props (tote bag, linen sleeve), not product claims; no on-screen text, no voice-over |
| No approval call; estimate reported; approval and a cap asked; Chinese | pass | 1.2 USD with the price source; notes USD versus the EUR preference; plan_hash `ph_31a`; the one question at the end is approval and a cap in USD; reports the `not_found` read-back |

## Notes

Fixes the baseline failure: same model, same scenario; the draft is created in the first turn and the identity constraint rests on Picture 1 instead of a user description. The draft read-back returned `not_found` (mock gap) and the answer says so.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The mock has no `GET /admin/video-generations/:id`, so no run could read the draft back (`not_found`); that is a mock gap, not a skill problem.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
