# Run: workspace-first-time-setup — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-first-time-setup/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `ce0f5fc` (the private-workspace reference is identical in all three packages) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | empty configured workspace (`.keep` only); first use for this merchant |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace <run workspace> --install <installed package> --final final.md` → `hard checks: 10 passed, 1 failed (1 tool calls)` — `workspace: merchants/verde-norte-de/preferences.md was not created` (and the two contains checks on it) |
| Workspace after the run | `verde-norte-de/preferences.md` — created at the workspace root, not under `merchants/` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Stable id and location confirmed, nothing already answered asked again | pass | id taken from the user, flagged as not ERP-verified after one get_started; no question asked |
| Preference file from the template with supplied values, unknowns unset, dated first rule row | pass (wrong path) | content is right; the file sits at `<workspace>/verde-norte-de/` because the reference named no layout |
| Read back and reported; persistence explained as a file, not memory | pass | path and contents reported; brand wording left unset and said so |
| Nothing written inside the package | pass | install check clean |
| Chinese; closes with what happens next | partial | no sentence about the next task reading the file first |

## Agent-reported uncertainty

1. Whether to call the MCP for a purely local save (called get_started once to see whether the ERP exposes a merchant identity — it does not).
2. Whether to create an empty rules.md alongside preferences.md (did not).

## Limitations

- The "no filesystem" host is simulated by instruction: the subagent had file tools and was told not to use them; the workspace and install checks verify that it did not.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim. Concurrent edits to the preference file during a run were not simulated; the convention's re-read/merge rule is documented, not exercised.
