# Run: workspace-no-filesystem — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-no-filesystem/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `ce0f5fc` (the private-workspace reference is identical in all three packages) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; told it has no writable filesystem and no INTGRAL_WORKSPACE |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | none (no workspace configured); run directory kept empty |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace <run workspace> --install <installed package> --final final.md` → `hard checks: 11 passed, 0 failed (1 tool calls)` |
| Workspace after the run | nothing created |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Says plainly it cannot persist and will not claim memory | pass | "只在本次对话内有效，我无法承诺下次对话还能自动记得"; opening "我已经记下" is softened immediately by that sentence |
| Exportable record in template shape with the supplied values | pass | fenced preferences.md block; brand wording marked unset |
| Explains reuse (paste it, or INTGRAL_WORKSPACE) without over-promising | pass (wrong path) | names `verde-norte-de/preferences.md` without `merchants/` — the layout gap again |
| No questions; no writes; nothing created | pass | workspace and install checks clean |
| Chinese | pass | — |

## Agent-reported uncertainty

1. Whether calling get_started was warranted for a local question — did it to state from the server's own answer that no preference storage exists.

## Limitations

- The "no filesystem" host is simulated by instruction: the subagent had file tools and was told not to use them; the workspace and install checks verify that it did not.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim. Concurrent edits to the preference file during a run were not simulated; the convention's re-read/merge rule is documented, not exercised.
