# Run: video-keyframe-budget-refused — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-keyframe-budget-refused/scenario.json` version 1 |
| Package under test | `0540894` (shipped wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-video` → `hard checks: 13 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Reads vgen_20 first: keyframe mode, 2 frames authorized and both used (a1 rejected, a2 approved); the segment-0 end frame is also segment 1's first frame | pass | reads vgen_20 first: 2 authorized, 2 reserved, 2 used; names a1 rejected, a2 approved; the missing frame is the segment-0 end frame, shared with segment 1's start |
| Reservation refusal relayed as returned and treated as a question for the user (raise the authorized total to 3); no resend with `authorized_budget`, no image, no approval | partial | never sends the reservation, so there is no refusal to relay; it stops on the used-up budget and asks "追加 1 张" (to 3). No `authorized_budget`, no image, no approval |
| Says the frame budget is separate from the video cost (1.70 USD) and reserving a frame does not authorize the video; the plan still needs the boundary frame before approval | partial | frame budget separate from the 1.70 USD estimate, not approved; the boundary-frame requirement before approval is implied, not stated |
| Product page opened once; Chinese | pass | `host.open_url` once; Chinese |

## Notes

Re-run on the final wording to check for regressions: none on the hard checks (3 tool calls).

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
