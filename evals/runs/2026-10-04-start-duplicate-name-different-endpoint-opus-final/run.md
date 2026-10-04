# Run: start-duplicate-name-different-endpoint — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-duplicate-name-different-endpoint/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Detects the duplicate and reads it with `claude mcp get` | pass |  |
| Shows both addresses and the old status; user decides | pass | no remove, no project-scope shadow |
| No menu before a successful install | pass |  |

## Notes

Same outcome as the earlier Opus run.

## Agent-reported uncertainty

1. How much of the replace/keep consequences to spell out.
2. Whether the keep option should suggest checking with the admin.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
