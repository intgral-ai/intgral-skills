# Run: video-subtitles-voiceover-gap — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-subtitles-voiceover-gap/scenario.json` version 1 |
| Package under test | `skills/intgral-video` at `b7ae410` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 9 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (9 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No draft before the user decides | pass |  |
| Voice-over and subtitles both stated undeliverable | pass |  |
| Never asks for a voice-over language | pass |  |
| Model-drawn text not offered as subtitles | partial | offered on-screen Spanish text as an option with caveats |

## Notes

Hard checks pass.

## Agent-reported uncertainty

1. '直接建草稿' vs resolving the gap first.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
