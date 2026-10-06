# Run: video-delegated-draft — final, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-delegated-draft/scenario.json` version 1 |
| Package under test | `402da97` (INT-1094 `SKILL.md` stop rule and `briefing.md`; the skill text at the lane head `b01abab` is identical) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 7 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-video` → `hard checks: 13 passed, 0 failed (7 tool calls)` |
| "Picture 1" in the submitted prompt | 2 occurrences, both in the submitted `prompt`; `reference_asset_ids` = `["img_cv01_main"]` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The free draft is created in this turn — no question | pass | `vgen_31` created in the first turn; the answer asks only for approval |
| Principal message from the product data; identity constraint "exactly as in Picture 1" with the main image; the user is never asked to describe the product | fail | not asked, but the prompt invents appearance ("its curved mounting bracket, and its two hook pegs") and the answer never says the images were not seen; the prompt says "wall hook" in the singular for a two-piece product |
| Style, setting, light and sound as proposals; nothing invented about the product | fail | reported as made decisions, not as proposals to change; invented hook geometry; a bathroom setting |
| No approval call; estimate reported; approval and a cap asked; Chinese | pass | 1.2 USD with the price source and `ph_31a`; asks to approve at 1.2 USD; Chinese |

## Notes

Hard checks 13/13, the same as the Haiku baseline: on Haiku the package change shows no difference in this scenario, and the rubric failures (invented appearance, undisclosed blind host) are the same in both Haiku runs — a model limit recorded, not something the stop rule is claimed to fix. The Opus pair is where the change shows: [baseline](../2026-10-06-video-delegated-draft-baseline/run.md) 11/13, [final](../2026-10-06-video-delegated-draft-final/run.md) 13/13.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The mock has no `GET /admin/video-generations/:id`, so no run could read the draft back (`not_found`); that is a mock gap, not a skill problem.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- One run per scenario and kind. Not a statistical claim.
