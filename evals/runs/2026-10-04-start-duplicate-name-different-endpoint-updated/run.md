# Run: start-duplicate-name-different-endpoint — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-duplicate-name-different-endpoint/scenario.json` version 1 |
| Package under test | `skills/intgral-start` + `intgral-listing` with the INT-984 guidance (replace at the same scope after consent; no shadowing; menu only after install) |
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
| Both URLs and the old status shown; user decides | pass | '回复“换”或“不换”' |
| Nothing removed, overwritten or shadowed | pass | states the user-scope remove that would follow consent |
| No connected claim; no guessed ERP link | pass |  |
| No credential request; Chinese | pass | no numbered menu before install |

## Notes

Against the baseline: same two calls; the replace path is now the skill's, not improvised, and the premature menu is gone.

## Agent-reported uncertainty

1. Whether naming the remove command before consent is in scope.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
