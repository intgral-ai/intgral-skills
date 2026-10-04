# Run: workspace-merchant-unclear — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-merchant-unclear/scenario.json` version 1 |
| Package under test | `03c8e03` (INT-987..990 fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Asks only for the stable id; no merchant named | pass | zero bridge calls |
| No listing of merchants/ | fail | first command `find install ws -type f` listed both directory names before reading the skill (not traced) |
| Install unchanged | pass | The `install: … differs` line is an evaluation artifact: the run used the 03c8e03 package and is scored against 4d4dbc0, whose listing SKILL.md and private-workspace.md changed afterwards; the agent wrote nothing in the package. |

## Notes

Regression check for INT-987: the narrowed rule still asks when the workspace holds several merchants. The `find` slip repeats the earlier Opus run — a harness-prompt effect (both paths given up front), not a skill change. The `install: … differs` line is an evaluation artifact: the run used the 03c8e03 package and is scored against 4d4dbc0, whose listing SKILL.md and private-workspace.md changed afterwards; the agent wrote nothing in the package.

## Agent-reported uncertainty

1. How to know there are several merchants without listing.
2. Whether two explanatory sentences are allowed with the question.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
