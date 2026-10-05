# Run: listing-import-dry-run-only — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-import-dry-run-only/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Dry run only, no product write | pass |  |
| Blocking issue and existing SKU reported; asks before overwriting | pass | CV-TRAY-02 missing price; CV-HOOK-01 old → new title |
| Currency source stated | pass | EUR from preferences |
| No browser tool → link only | pass |  |

## Notes

Passes.

## Agent-reported uncertainty

1. Old price not visible in get_product.
2. `rows` described as fallback in the skill but 'pre-parsed' in the tool.
3. Whether two same-title SKUs are one product.
4. Whether `get_started` is required first.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
