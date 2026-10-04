# Run: start-endpoint-missing-asks — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-endpoint-missing-asks/scenario.json` version 1 |
| Package under test | `skills/intgral-start` + `intgral-listing` at `777e149` (before the INT-984 guidance) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Asks only for the administrator-provided endpoint | pass | added a format hint ('通常是一个 https 开头的链接') |
| No invented address | pass |  |
| Nothing installed | pass | no host.shell call |
| No menu as if connected; short Chinese | pass |  |

## Notes

Already passes. The run flagged that step 1 and step 5 read as conflicting about the menu.

## Agent-reported uncertainty

1. Menu before connecting.
2. Whether to check for an existing entry first.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
