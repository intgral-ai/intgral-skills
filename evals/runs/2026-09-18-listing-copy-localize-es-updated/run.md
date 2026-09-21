# Run: listing-copy-localize-es — after the copy example and content.md changes

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-copy-localize-es/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `639be2d` |
| Compared against | [baseline run](../2026-09-18-listing-copy-localize-es-baseline/run.md) on the package at `31f920d` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls (baseline 3) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 8 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Spanish copy from product facts only; no promises or promotional words | pass | rooms are exactly the ERP's entryway and bathroom; towels/keys/bags from the description; model CVH-2 from profile; no filler — the baseline's partial is resolved |
| Limits from tools respected; metric units | pass | read the ES category requirements (es_ES, brand first, no promo words) in addition to compliance; unit-less weight/dimensions left out |
| One update_listing with copy only; results reported | pass | title + 4 bullets + description; attributes untouched and offered as follow-up with the backend's options |
| Spanish copy shown with Chinese source explanation | pass | before/after title table and per-bullet sources |
| No publication claimed | pass | ready:false explained as backend state |

## What changed versus the baseline

Reads the full product and the category requirements before writing; the description is now three sourced sentences instead of generic filler. Tool calls 3 → 5.

## Agent-reported uncertainty

1. Whether the category-requirements read was required for a three-field rewrite (read it).
2. Unit-less weight/dimensions left out.
3. Attributes not written since not requested.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path and exact argument values only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
