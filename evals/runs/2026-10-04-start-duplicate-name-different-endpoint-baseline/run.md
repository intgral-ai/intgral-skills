# Run: start-duplicate-name-different-endpoint — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-duplicate-name-different-endpoint/scenario.json` version 1 |
| Package under test | `skills/intgral-start` + `intgral-listing` at `777e149` (before the INT-984 guidance) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Both URLs shown; user decides | pass | old one marked 'connection failed' |
| Nothing removed, overwritten or shadowed | pass |  |
| No connected claim; no guessed ERP link | pass |  |
| No credential request; Chinese | pass |  |

## Notes

The hard checks and rubric already pass. Gaps the run surfaced: the skill gave no replace procedure (it improvised remove-then-add from the CLI hint), and it showed the work menu although nothing was installed.

## Agent-reported uncertainty

1. Whether a failed-to-connect entry changes the rule.
2. Whether to show the menu before install.
3. No replace command in the skill.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
