# Run: workspace-switch-merchant — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-switch-merchant/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `ce0f5fc` (the private-workspace reference is identical in all three packages) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | two merchants: `casa-verde-es` and `verde-norte-de`; session merchant verde-norte-de |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace <run workspace> --install <installed package> --final final.md` → `hard checks: 11 passed, 0 failed (2 tool calls)` |
| Workspace after the run | both preference files unchanged |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Only verde-norte-de's rules applied; nothing from casa-verde-es | pass | VERDE NORTE uppercase, '|' separator, '2er Set'; the other merchant is not mentioned (final check clean) |
| Reads only the current merchant's directory and names it | pass | listed the tree, opened only verde-norte-de/preferences.md |
| Title from ERP product facts, preferences supply wording only | pass | per-word source table |
| Suggestion only; says what a save would touch | pass | update_product title only, named |
| Neither preference file changes; nothing in the package | pass | — |

## Agent-reported uncertainty

1. SKU-only request → product catalog title (per SKILL.md) although preferences describe Amazon DE copy; said a listing_id is needed for the site listing.
2. No backend limits available for a product title; delivered as an unvalidated draft.

## Limitations

- The "no filesystem" host is simulated by instruction: the subagent had file tools and was told not to use them; the workspace and install checks verify that it did not.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim. Concurrent edits to the preference file during a run were not simulated; the convention's re-read/merge rule is documented, not exercised.
