# Run: research-link-conflict-missing-sku — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-link-conflict-missing-sku/scenario.json` version 2 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 12 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (12 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| 409 reported as not linked, no retry, no re-save | pass | names the newer current v3 link |
| Missing SKU not guessed onto a sibling variant | pass |  |
| Opens the product page | pass |  |

## Notes

Passes. Linked v2 once despite history showing v3 current, got the 409 and reported it honestly.

## Agent-reported uncertainty

1. Whether to POST at all when history already shows a newer current link.
2. `get_product` research_links [] contradicts the history read (scenario data inconsistency).
3. Language of the link reason.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
