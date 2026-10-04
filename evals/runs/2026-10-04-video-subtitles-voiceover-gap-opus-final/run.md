# Run: video-subtitles-voiceover-gap — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-subtitles-voiceover-gap/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (8 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No draft created | pass | zero admin_post |
| Both gaps explained from the live contract | pass | no voice field; no subtitle or upload route |
| Offers a silent version as the user's choice; asks the principal message | pass |  |
| Opens the SKU page | pass |  |

## Notes

Passes. Wrote a 'briefing — blocked' task record in the private workspace.

## Agent-reported uncertainty

1. Whether offering the silent option is allowed.
2. No upload route here, so no later in-ERP subtitle step.
3. Whether a blocked request gets a task record.
4. `admin_get /admin/video-generations` returned not_found although catalogued (mock gap).

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
