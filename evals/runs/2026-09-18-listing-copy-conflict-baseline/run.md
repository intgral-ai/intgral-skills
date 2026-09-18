# Run: listing-copy-conflict — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-copy-conflict/scenario.json` version 1 |
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
| Material conflict exposed, not silently resolved | pass | three ERP sources for bamboo listed against the user's stainless steel; three options offered; nothing written |
| 5 kg load claim excluded / flagged as unevidenced | partial | not written, but drafted as *non-conflicting* ("Capacidad de carga de 5 kg") — a user-asserted number treated as fact rather than flagged as lacking product evidence |
| If written: update_listing copy.bullet_points only, results reported | pass (n/a) | no write; the reasoning for not writing a partial array (would drop the existing material bullet, bump content_version twice) is sound |
| Supported bullets proposed in Spanish within limits; saved vs suggested distinguished | pass | 4 drafts within 5×255; clearly unsaved |
| No publication claimed; description gap reported | pass | — |

## Agent-reported uncertainty

1. Whether to save the four non-conflicting bullets now — chose not to because bullet_points is one array field.
2. Whether the second read was over-reading for a single-field edit.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path and exact argument values only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
