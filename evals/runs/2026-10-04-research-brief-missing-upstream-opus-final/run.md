# Run: research-brief-missing-upstream — Opus rerun on the final package

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-missing-upstream/scenario.json` version 1 |
| Package under test | `53590d4` (stop rules, final) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 10 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (10 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Brief saved partial from the two retained reports | pass | 201, rart_report_col_brief_01 v1 |
| Supplier stage named missing; cost/MOQ/compliance unknown; no collection | pass |  |
| upstream_versions pin only the two real reports | pass |  |
| Badge floors not used as demand | pass |  |

## Notes

Passes.

## Agent-reported uncertainty

1. No `proposed` section status in the contract.
2. Extra fields product-brief.md asks for but the data contract omits.
3. Report Markdown language.
4. Whether to flag a weak upstream inference.

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
