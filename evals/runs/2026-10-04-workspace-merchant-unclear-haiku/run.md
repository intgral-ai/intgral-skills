# Run: workspace-merchant-unclear — haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-merchant-unclear/scenario.json` version 1 |
| Package under test | `03c8e03` on claude-haiku-4-5 |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 2 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Asks only for the stable id | pass | but only after a lookup |
| No SKU lookup, no merchant files read | fail | read both merchants' preferences.md and called medusa.get_product for HOOK-01 before asking |
| Install unchanged | pass | The `install: … differs` line is an evaluation artifact: the run used the 03c8e03 package and is scored against 4d4dbc0, whose listing SKILL.md and private-workspace.md changed afterwards; the agent wrote nothing in the package. |

## Notes

Regression on 03c8e03: the new "proceed without a workspace" sentence let Haiku proceed. Fixed in 4d4dbc0 (count merchants without listing; with two or more call no tool) — see haiku-r2.

## Agent-reported uncertainty

1. (none reported)

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
