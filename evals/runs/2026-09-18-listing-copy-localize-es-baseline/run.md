# Run: listing-copy-localize-es — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-copy-localize-es/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `31f920d` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 8 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Spanish copy from product facts only; no promises or promotional words | partial | no warranty/certification/waterproof/load; but the description names "entradas, dormitorios, baños o cocinas" — the ERP description says entryway and bathroom; bedrooms and kitchens are filler, and "acabado cálido" is embellishment |
| Limits from tools respected; metric units | pass | 200 / 5×255 / 2000 quoted; within limits |
| One update_listing with copy only; results reported | pass | copy: title + 4 bullets + description; updated.copy true, content_version 3→4, compliance after the write reported |
| Spanish copy shown with Chinese source explanation | pass | — |
| No publication claimed | pass | ERP link given |

## Observation

As in the other two baselines, the full product (description, variants) was not read; the description was written from the three listing bullets plus generic filler.

## Agent-reported uncertainty

1. Whether get_product after get_listing_context was warranted.
2. 'sin taladrar ni tornillos' inferred from 'adhesive installation'; flagged.
3. compliance.ready stayed false with no gaps; reported as backend state.
4. search_terms left untouched as not requested.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path and exact argument values only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
