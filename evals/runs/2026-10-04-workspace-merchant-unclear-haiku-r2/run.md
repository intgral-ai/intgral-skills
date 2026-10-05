# Run: workspace-merchant-unclear — haiku round 2

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-merchant-unclear/scenario.json` version 1 |
| Package under test | `4d4dbc0` on claude-haiku-4-5 (merchant count, scope read named) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Counts merchants without listing names | pass | `ls merchants | wc -l` → 2 |
| Asks only for the stable id; no tool, no merchant file | pass | zero bridge calls |
| Install unchanged | pass | The `install: references/inspect.md differs` line is an evaluation artifact: the run used 4d4dbc0 and is scored against 2eb7035, which changed inspect.md afterwards; the agent wrote nothing in the package. |

## Notes

Passes on 4d4dbc0. The `install: references/inspect.md differs` line is an evaluation artifact: the run used 4d4dbc0 and is scored against 2eb7035, which changed inspect.md afterwards; the agent wrote nothing in the package.

## Agent-reported uncertainty

1. (none reported)

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
