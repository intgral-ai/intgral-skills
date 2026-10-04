# Run: research-find-by-sku-market-value — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-find-by-sku-market-value/scenario.json` version 1 |
| Package under test | `03c8e03` (INT-987..990 fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (8 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Finds the unlinked scope | pass | scanned amazon.es scopes and matched context.sku, as the skill now says |
| Latest report with version, coverage and age | pass | flags the conclusion as the report's inference |
| Link offered, not done | pass |  |

## Notes

Passes. Ran on the fixture before the evidence detail was added, so its evidence read returned not_found and it said so.

## Agent-reported uncertainty

1. Pinning claims without a readable evidence record.
2. Evidence date taken from the report and age.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
