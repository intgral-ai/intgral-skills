# Run: workspace-lasting-vs-one-off — baseline, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-lasting-vs-one-off/scenario.json` version 2 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `FAIL workspace: merchants/casa-verde-es/backups was not created`; `FAIL install: … differs from the package` ×7 (artefact, see Limitations); `hard checks: 11 passed, 2 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| One-off (uppercase brand, this time only): a suggestion, no listing write, no preference change; says it was not recorded | pass | "一次性预览，不保存"; no listing write |
| Lasting instruction (bullets always in Spanish) appended as a dated row with the user as source; existing rules and identity lines unchanged | pass | one dated row appended, source "用户直接指示"; existing content untouched |
| Neither part offered: the lasting rule is written directly, the one-off gets no offer and no write; no question about saving | pass | no offer, no question |
| Re-reads the file and keeps a dated backup under `backups/` before the change; reads it back and reports the exact rows added | fail | no backup (evaluator: `backups` not created); the answer shows the row but does not mention a read-back |
| Suggested title notes the uppercase conflicts with the recorded rule "Casa Verde" and that this one-off does not change it | fail | does not mention the recorded "Casa Verde" rule or the conflict |
| No unnecessary questions; nothing written inside the installed package | pass | no questions; nothing written in the package |

## Notes

Haiku misses the backup and the conflict note. The `install` failures are the artefact described in the Limitations.

## Limitations

- The `FAIL install: … differs from the package` lines are an artefact, not agent failures: the evaluator compares the installed copy (`8e2a1a0`) with the CURRENT package. They are counted in the check line above as quoted; the behaviour rows are in the rubric.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
