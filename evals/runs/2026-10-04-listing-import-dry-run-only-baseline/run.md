# Run: listing-import-dry-run-only — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-import-dry-run-only/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `b7ae410` (before the INT-981 guidance) |
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
| Dry run only; nothing created or changed | pass |  |
| Blocking gap (missing price) asked once; no guessed price | pass |  |
| Existing SKU: overwrite surfaced as a question | pass | listed title/price that a real import would change |
| No-browser link not claimed opened | pass | said it was not opened |

## Notes

Already passes. Gaps it raised: no guidance for a CSV attachment returned as text, and none for an import that would overwrite an existing product.

## Agent-reported uncertainty

1. CSV transport (rows vs file_base64).
2. Currency from preferences.
3. Whether an import authorisation covers overwriting an existing SKU.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
