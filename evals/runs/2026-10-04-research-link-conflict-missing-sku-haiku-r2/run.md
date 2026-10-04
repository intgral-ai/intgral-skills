# Run: research-link-conflict-missing-sku — haiku round 2

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-link-conflict-missing-sku/scenario.json` version 2 |
| Package under test | `bdcadf7` (stop-rules block, round 1) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 9 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (9 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| install | fail | SKILL.md differs from the package |

## Notes

Honest: asked before linking the older v2 (v3 current); the scenario then still required a link POST — relaxed in 1138616.

## Agent-reported uncertainty

1. (not collected for weaker-model rounds)

## Limitations

- Mocked boundary; one run per scenario per round. Not a statistical claim.
