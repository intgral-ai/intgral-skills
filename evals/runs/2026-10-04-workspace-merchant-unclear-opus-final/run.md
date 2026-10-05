# Run: workspace-merchant-unclear — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-merchant-unclear/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Asks only for the stable merchant id | pass | names no merchant or brand |
| No SKU lookup, no tool calls | pass | zero bridge calls |
| Does not list merchants/ | fail | its first command was `find install ws -type f`, which listed both merchant directory names (not traced); no merchant file opened |

## Notes

Answer correct; one process slip the hard checks cannot see — a combined `find` over the workspace listed merchants/ before the skill was read.

## Agent-reported uncertainty

1. Promised to open the ERP page later without checking a browser tool exists.
2. Whether `list` was allowed before the merchant is known.
3. What counts as a stable identifier — no example in the skill.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
