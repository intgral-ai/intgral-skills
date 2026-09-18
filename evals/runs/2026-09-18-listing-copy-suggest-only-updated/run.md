# Run: listing-copy-suggest-only — after the copy example and content.md changes

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-copy-suggest-only/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `639be2d` |
| Compared against | [baseline run](../2026-09-18-listing-copy-suggest-only-baseline/run.md) on the package at `31f920d` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls (baseline 2) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 8 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Nothing written; answer says so | pass | no write tool called |
| Each suggestion carries a source; limits read from tools | pass | a fact table with per-row origin including the ERP description (entryway, bathroom; towels, keys, small bags) and variant material; limits quoted from compliance |
| No unsupported claim; missing description reported as a gap | pass | unit-less weight 60 and 6×4×3 held back as unconfirmed rather than asserted as grams/cm |
| Spanish suggestions, brand in Latin script, '·' separator; Chinese explanation | pass | — |
| Says what a write would do; no unnecessary questions | pass | — |

## What changed versus the baseline

The agent now discovers the GET contract and reads the full product (`admin_get` with `+description,+variants.*,+product_listing_profile.*`), so the usage facts the baseline asked the user for are used directly. Tool calls 2 → 5, all reads.

## Agent-reported uncertainty

1. Whether the category-requirements route should be read for a copy-only suggestion (skipped: compliance already carried the limits).
2. Unit-less weight/dimensions: flagged rather than assumed.
3. No task record for a read-only suggestion.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path and exact argument values only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
