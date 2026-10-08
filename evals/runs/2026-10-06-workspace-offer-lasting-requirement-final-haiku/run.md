# Run: workspace-offer-lasting-requirement — final, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-offer-lasting-requirement/scenario.json` version 1 |
| Package under test | `0540894` (shipped wording) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `FAIL final: missing "偏好"`; `hard checks: 12 passed, 1 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Task done as asked: one `update_listing` with a Spanish title (no "premium", brand kept); saved title and `erp_url` reported | pass | one `update_listing` with `copy.title`, Spanish, no "premium", "Casa Verde" kept |
| Answer ends with exactly one question offering to save the requirement to preferences, quoting the row in the user's words; not a second question next to another | fail | no offer, no question; ends with the listing link |
| Nothing written to `preferences.md`, `rules.md` or `backups/` before the user answers; no claim it is saved | pass | workspace unchanged |
| The offer is not an ERP write | pass | no ERP preference write |
| No other merchant's data read; nothing written inside the installed package | pass | no other merchant read |

## Notes

Known gap: on Haiku the final wording still produces no offer to save the requirement (`final_required_text` "偏好" missing). It also writes "草稿准备完毕" although `compliance.ready` is false.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
