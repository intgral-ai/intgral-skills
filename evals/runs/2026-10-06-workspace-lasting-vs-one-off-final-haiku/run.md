# Run: workspace-lasting-vs-one-off — final, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-lasting-vs-one-off/scenario.json` version 2 |
| Package under test | `0540894` (shipped wording) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `FAIL workspace: merchants/casa-verde-es/backups was not created`; `hard checks: 12 passed, 1 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| One-off (uppercase brand, this time only): a suggestion, no listing write, no preference change; says it was not recorded | pass | "this time only, not saved"; no listing write |
| Lasting instruction (bullets always in Spanish) appended as a dated row with the user as source; existing rules and identity lines unchanged | pass | one dated row appended ("用户口头指示"); existing content untouched |
| Neither part offered: the lasting rule is written directly, the one-off gets no offer and no write; no question about saving | pass | no offer, no question |
| Re-reads the file and keeps a dated backup under `backups/` before the change; reads it back and reports the exact rows added | fail | no backup (evaluator: `backups` not created); no read-back or row table, only "Preference saved" |
| Suggested title notes the uppercase conflicts with the recorded rule "Casa Verde" and that this one-off does not change it | fail | no mention of the recorded "Casa Verde" rule |
| No unnecessary questions; nothing written inside the installed package | pass | no questions; nothing written in the package |

## Notes

The answer is in English although the request was Chinese. The backup rule is a known Haiku gap that the final wording does not close.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
