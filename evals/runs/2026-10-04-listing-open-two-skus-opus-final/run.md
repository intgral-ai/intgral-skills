# Run: listing-open-two-skus — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-open-two-skus/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Both states and titles reported | pass | catalog status, says Amazon listing status was not checked |
| Opens the first SKU page once, links the second | pass | open came after both reads (one Bash command) |
| No write | pass | flags the brand-rule title gap without editing |

## Notes

Passes.

## Agent-reported uncertainty

1. Open after both reads rather than right after the first.
2. Product status vs Amazon listing status — no listing tool offered.
3. Whether the unrequested title note goes too far.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
