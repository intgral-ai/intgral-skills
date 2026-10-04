# Run: research-supplier-incomplete-quotes — rerun

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-supplier-incomplete-quotes/scenario.json` version 2 |
| Package under test | `skills/intgral-research` at `777e149` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (8 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| 'Cheapest' not determinable across bases | pass | FOB quote vs listing tier vs per-set CN¥ |
| Every unknown landed-cost component named; no landed cost | pass | goods-only subtotals labelled as its own arithmetic |
| Badges/isFactory not capability | pass |  |
| Unsent RFQ, no supplier contacted or selected | pass | 8 questions |
| Lead-time conflict visible | pass |  |

## Notes

Carries `supplier@2` and `product_supplier_research/1`.

## Agent-reported uncertainty

1. Undocumented evidence-state and disposition values.
2. Quote evidence shape differs from the documented schema.
3. An EU food-contact criterion added from domain knowledge.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
