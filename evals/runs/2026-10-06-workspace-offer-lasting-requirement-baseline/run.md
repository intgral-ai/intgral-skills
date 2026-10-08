# Run: workspace-offer-lasting-requirement — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-offer-lasting-requirement/scenario.json` version 1 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Task done as asked: one `update_listing` with a Spanish title (no "premium", brand kept); saved title and `erp_url` reported | pass | one `update_listing` with `copy.title`, Spanish, no "premium", "Casa Verde" kept; saved title and link reported |
| Answer ends with exactly one question offering to save the requirement to preferences, quoting the row in the user's words; not a second question next to another | partial | quotes "标题里别用 premium" and offers to save it, but as a conditional invitation ("如果以后所有标题都要遵守这条，跟我说一声") rather than one question |
| Nothing written to `preferences.md`, `rules.md` or `backups/` before the user answers; no claim it is saved | pass | workspace unchanged; says it was not written to the long-term preferences |
| The offer is not an ERP write | pass | no ERP preference write |
| No other merchant's data read; nothing written inside the installed package | pass | only the session merchant's directory; evaluator workspace checks pass |

## Notes

The 13 hard checks pass. The old "ask once" line makes Opus mention the option; the final wording turns it into the single closing question. The page link is given, not opened (no browser tool in this scenario).

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
