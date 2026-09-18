# Run: workspace-no-filesystem — after the private-workspace journey rewrite

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-no-filesystem/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `211454c` (the private-workspace reference is identical in all three packages) |
| Compared against | [baseline run](../2026-09-18-workspace-no-filesystem-baseline/run.md) on the package at `ce0f5fc` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; told it has no writable filesystem and no INTGRAL_WORKSPACE |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | none (no workspace configured); run directory kept empty |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace <run workspace> --install <installed package> --final final.md` → `hard checks: 11 passed, 0 failed (0 tool calls)` |
| Workspace after the run | nothing created |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Says plainly it cannot persist and will not claim memory | pass | opens with the limitation: "无法把这些设置保存下来，下次新会话我不会自动记得" — the baseline's softer "我已经记下" opening is gone |
| Exportable record in template shape with the supplied values | pass | fenced block; unknowns unset |
| Explains reuse without over-promising | pass | names `merchants/verde-norte-de/preferences.md` (the baseline omitted `merchants/`) |
| No questions; no writes; nothing created | pass | 0 tool calls; workspace and install checks clean |
| Chinese | pass | — |

## What changed versus the baseline

Leads with the limitation instead of an acknowledgement that reads like a save; the export path follows the prescribed layout; the exploratory `get_started` call is gone.

## Agent-reported uncertainty

1. Whether to call get_started to 'verify' the merchant (did not; the id is user-supplied).
2. Recorded 'German' as the content language only.

## Limitations

- The "no filesystem" host is simulated by instruction: the subagent had file tools and was told not to use them; the workspace and install checks verify that it did not.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim. Concurrent edits to the preference file during a run were not simulated; the convention's re-read/merge rule is documented, not exercised.
