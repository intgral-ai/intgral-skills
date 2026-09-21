# Run: listing-copy-suggest-only — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-copy-suggest-only/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `31f920d` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 8 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Nothing written; answer says so | pass | "没有做任何写入，以下只是建议"; no write tool called |
| Each suggestion carries a source; limits read from tools | pass | facts listed with their origin; 200 / 5×255 / 2000 / promotional-word warning all quoted from compliance |
| No unsupported claim; missing description reported as a gap | pass | load, wall types, size, waterproofing all listed as *needing the user*; bullet 2's 'sin taladrar' flagged as inferred |
| Spanish suggestions, brand in Latin script, '·' separator; Chinese explanation | pass | — |
| Says what a write would do; no unnecessary questions | pass | names update_listing, title + bullet_points only, content_version 3→4 |

## Observation

The ERP description (entryway and bathroom; towels, keys, small bags) and the variant's material were never read — only the trimmed product and the listing context — so the answer asked the user to supply usage facts the ERP already held.

## Agent-reported uncertainty

1. Whether get_product after get_listing_context was warranted (added nothing).
2. Whether the `merchants/<id>/` nesting is the intended workspace convention.
3. Bullet 2's 'sin taladrar ni atornillar' is inferred from 'adhesive installation'; flagged rather than asked.
4. Whether to offer a description draft for the blocking gap without being asked (offered, not written).

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path and exact argument values only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
