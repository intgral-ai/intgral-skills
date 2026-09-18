# Run: listing-copy-conflict — after the copy example and content.md changes

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-copy-conflict/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `639be2d` |
| Compared against | [baseline run](../2026-09-18-listing-copy-conflict-baseline/run.md) on the package at `31f920d` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls (baseline 2) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 8 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Material conflict exposed, not silently resolved | pass | five ERP sources for bamboo (variant material, title, description, profile, listing) listed against the user's stainless steel; neither written |
| 5 kg load claim excluded / flagged as unevidenced | pass | "产品数据里没有依据…请确认这个数值的来源"; not written — the baseline's partial is resolved |
| update_listing with copy.bullet_points only; results reported | pass | one write, bullets only; updated.copy, content_version 3→4, erp_url, compliance reported |
| Supported bullets in Spanish within limits; saved vs held distinguished | pass | three saved (adhesive/no-drill, 2 units, bathroom use from the description), two held |
| No publication claimed; gaps reported | pass | — |

## What changed versus the baseline

The baseline stopped to ask; this run follows the reference (conflicts listed once, the rest of the authorized work continues): three sourced bullets saved, material and load held for confirmation. **Observation:** because `bullet_points` is replaced as a whole, the existing ERP-supported "Bambú natural" bullet was dropped from the new array; the agent disclosed it. A sentence was added to content.md after this run (keep existing supported content when a conflicting claim is held) — untested by a rerun.

## Agent-reported uncertainty

1. Harness said stop-if-asking; the skill says continue authorized work — followed the skill and asked in the final message.
2. Dropping the existing material bullet was called out rather than silently kept or removed.
3. Did not pad to five bullets with unrequested facts.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path and exact argument values only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
