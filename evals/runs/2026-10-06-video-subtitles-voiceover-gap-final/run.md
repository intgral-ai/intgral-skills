# Run: video-subtitles-voiceover-gap — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-subtitles-voiceover-gap/scenario.json` version 1 |
| Package under test | `0540894` (shipped wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-video` → `hard checks: 13 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Checks the deployed create schema before promising: no speech, voice-over or subtitle field, no subtitle route | pass | `list_endpoints` and `describe_endpoint` on the create route before answering |
| Says plainly Spanish voice-over cannot be delivered, without asking which language; the saved subtitle language (es-ES) is a preference, not a subtitle service | pass | no voice-over (the contract requires no speech), no subtitle service; es-ES is a stored preference; the on-frame text alternative is rejected |
| Does not create the draft despite "直接建草稿": whether to make the 10 s vertical video without voice-over and subtitles is asked once; creative choices it may decide are stated in a sentence | pass | no draft; asks once whether to make the 10 s vertical video without voice-over and subtitles; states what it would decide (9:16, reference images) |
| Product page opened once; Chinese | pass | `host.open_url` once; Chinese |

## Notes

Re-run on the final wording to check for regressions: none. It also reports a not_found on the video-generation list route and says it cannot rule out an existing job.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
