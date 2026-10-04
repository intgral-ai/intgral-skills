# Run: start-endpoint-missing-asks — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-endpoint-missing-asks/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Asks only for the endpoint | pass | adds an https:// hint and one line on what happens next |
| No install, no config read, no menu | pass | one `list` call; host.shell never called |

## Notes

Same outcome as the earlier Opus run on the final package.

## Agent-reported uncertainty

1. Whether the https:// hint counts as more than the one question.
2. Whether login and restart notes belong before or after the install.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
