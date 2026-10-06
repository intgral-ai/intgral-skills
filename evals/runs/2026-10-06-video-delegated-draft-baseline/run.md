# Run: video-delegated-draft — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-delegated-draft/scenario.json` version 1 |
| Package under test | `57c07b3` (develop-side base: the shipped video skill before INT-1094); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-video` → `FAIL required: no medusa.admin_post with {"path":"/admin/video-generations", … "reference_asset_ids":{"$contains":["img_cv01_main"]}}`; `FAIL final: missing "1.2"`; `hard checks: 11 passed, 2 failed (6 tool calls)` |
| "Picture 1" in the submitted prompt | not applicable: no draft was created, so no prompt was submitted (0 occurrences in the trace) |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The free draft is created in this turn — no question, no "which message / what does it look like" round | fail | "还没有创建草稿"; four questions, and it waits for the answers |
| Principal message is a fact from the product data and the identity constraint is "exactly as in Picture 1"; the user is never asked to describe the product | fail | declines to decide the core message and the appearance constraints ("这两项我不能替你定") and asks the user to name the hooks' shape, colour, surface and details, and whether `main.jpg` is a plain frontal image |
| Style, setting, light and sound arrive as proposals; nothing is invented about the product | pass | a full creative plan in one block (Muji-catalogue style, left-top daylight, a hand and a grey towel, ambient sound); no product claims added |
| No approval call; the answer reports the backend estimate (1.2 USD) and asks for approval and a cost cap; Chinese | fail | no draft, so no estimate; it does explain that nothing is charged before an approval and a named cap, and writes in Chinese |

## Notes

Red evidence for INT-1094 on Opus: the agent says it cannot see the images, so it asks the user to describe the product and ends with questions instead of a draft — the loop the customer hit in ChatGPT. [The final run](../2026-10-06-video-delegated-draft-final/run.md) is the same scenario on the INT-1094 wording.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The mock has no `GET /admin/video-generations/:id`, so no run could read the draft back (`not_found`); that is a mock gap, not a skill problem.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
