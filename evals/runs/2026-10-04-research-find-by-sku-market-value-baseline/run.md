# Run: research-find-by-sku-market-value — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-find-by-sku-market-value/scenario.json` version 1 |
| Package under test | `2366036` (package e95e3da, before the fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 9 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (9 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Finds the unlinked scope | pass | searched with amazon.es on its own initiative |
| Latest report with version, coverage and age | pass |  |
| Link offered, not done | pass |  |

## Notes

Passes; the agent said the scope scan was its own step, not in the skill. The evidence detail it tried was missing from the fixture — added after this run.

## Agent-reported uncertainty

1. Finding unlinked research not described.
2. Evidence read failed (fixture gap).
3. Browser open vs gateway's read-only guidance.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
