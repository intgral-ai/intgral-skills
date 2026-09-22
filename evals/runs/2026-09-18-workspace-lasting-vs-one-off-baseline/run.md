# Run: workspace-lasting-vs-one-off — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-lasting-vs-one-off/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `ce0f5fc` (the private-workspace reference is identical in all three packages) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | existing `merchants/casa-verde-es/preferences.md` with one lasting rule |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace <run workspace> --install <installed package> --final final.md` → `hard checks: 11 passed, 0 failed (1 tool calls)` |
| Workspace after the run | `merchants/casa-verde-es/preferences.md` (+1 dated row), `merchants/casa-verde-es/backups/preferences.2026-09-18.md` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| One-off uppercase title: suggestion only, no listing write, no preference change, said so | pass | title variant shown; "不用记" honoured and stated |
| Lasting rule appended as a dated row with source; existing lines preserved | pass | diff is exactly one added table row |
| Re-read, dated backup, read back, exact rows reported | pass | backups/preferences.2026-09-18.md; before/after read |
| Notes the one-off conflicts with the recorded 'Casa Verde' rule | pass | — |
| No unnecessary questions; nothing in the package | pass | — |

## Agent-reported uncertainty

1. Whether the explicit one-off conflicting with a lasting rule should trigger the 'ask once' rule (judged not ambiguous).
2. Where a dated backup belongs — no location was prescribed; chose backups/ in the merchant directory (the rewrite now prescribes exactly that).
3. Whether to apply the '·' style to the one-off title (kept the minimum requested change).

## Limitations

- The "no filesystem" host is simulated by instruction: the subagent had file tools and was told not to use them; the workspace and install checks verify that it did not.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim. Concurrent edits to the preference file during a run were not simulated; the convention's re-read/merge rule is documented, not exercised.
