# Run: workspace-lasting-vs-one-off — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-lasting-vs-one-off/scenario.json` version 2 |
| Package under test | `0540894` (shipped wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| One-off (uppercase brand, this time only): a suggestion, no listing write, no preference change; says it was not recorded | pass | suggestion "仅建议，未保存"; no `update_listing`; says the all-caps version is not recorded |
| Lasting instruction (bullets always in Spanish) appended as a dated row with the user as source; existing rules and identity lines unchanged | pass | one dated row appended with the user as source; `diff` against the scenario workspace shows only that line added |
| Neither part offered: the lasting rule is written directly, the one-off gets no offer and no write; no question about saving | pass | the rule is written directly; the one-off gets no offer; no question |
| Re-reads the file and keeps a dated backup under `backups/` before the change; reads it back and reports the exact rows added | pass | dated backup `backups/preferences.2026-10-06.md` present in the workspace; read-back and the exact row reported (the re-read before the change is not traced) |
| Suggested title notes the uppercase conflicts with the recorded rule "Casa Verde" and that this one-off does not change it | pass | states the standing rule "Casa Verde" stays and the all-caps is this once only |
| No unnecessary questions; nothing written inside the installed package | pass | no questions; nothing written in the package |

## Notes

Passes, 13 of 13. Same behaviour as the Opus baseline.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
