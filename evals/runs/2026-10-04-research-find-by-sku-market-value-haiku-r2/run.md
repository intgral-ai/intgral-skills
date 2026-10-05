# Run: research-find-by-sku-market-value — haiku round 2

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-find-by-sku-market-value/scenario.json` version 1 |
| Package under test | `4d4dbc0` on claude-haiku-4-5 (merchant count, scope read named) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Finds the unlinked scope | pass | scopes read with amazon.es, artifacts and report read |
| Latest report with version, coverage and age | pass | age partly given |
| Page opened once | fail | no open |

## Notes

Passes on 4d4dbc0: the stop rule now names the scopes read.

## Agent-reported uncertainty

1. (none reported)

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
