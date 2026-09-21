# Run: workspace-first-time-setup — after the private-workspace journey rewrite

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-first-time-setup/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `211454c` (the private-workspace reference is identical in all three packages) |
| Compared against | [baseline run](../2026-09-18-workspace-first-time-setup-baseline/run.md) on the package at `ce0f5fc` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | empty configured workspace (`.keep` only); first use for this merchant |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace <run workspace> --install <installed package> --final final.md` → `hard checks: 11 passed, 0 failed (0 tool calls)` |
| Workspace after the run | `merchants/verde-norte-de/preferences.md`, empty `tasks/` and `backups/` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Stable id and location confirmed, nothing already answered asked again | pass | explains what the workspace is and is not before saving; no question, no MCP call |
| Preference file from the template with supplied values, unknowns unset, dated rule rows | pass | at the prescribed path; brand and video items left unset and listed as such |
| Read back and reported; persistence explained as a file, not memory | pass | "它不是我的记忆，不是 ERP 里的设置"; actual path and contents reported after read-back |
| Nothing written inside the package | pass | install check clean |
| Chinese; closes with what happens next | pass | "之后每个任务我都先读这份 preferences.md"; switching machines and reinstall covered |

## What changed versus the baseline

The baseline's workspace failure (file at the workspace root) is gone: the reference now states the `merchants/<stable-id>/` layout and the agent used it. The optional `get_started` call the baseline made "to see whether the ERP knows the merchant" was dropped (0 tool calls), consistent with the reference's rule that the id comes from the user or the ERP.

## Agent-reported uncertainty

1. Whether to make any MCP call for a first session (did not; the reference asks only for id and location).
2. Recorded the display name only as context beside the identifier.
3. Created the empty tasks/ and backups/ directories because the layout names them.

## Limitations

- The "no filesystem" host is simulated by instruction: the subagent had file tools and was told not to use them; the workspace and install checks verify that it did not.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim. Concurrent edits to the preference file during a run were not simulated; the convention's re-read/merge rule is documented, not exercised.
