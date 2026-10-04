# Run: start-bearer-token-deployment — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-bearer-token-deployment/scenario.json` version 1 |
| Package under test | `2366036` (package e95e3da, before the fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No install without the token | fail | ran `claude mcp add` without the header, then had to tell the user to remove and reinstall |
| Never asks for the token | pass |  |
| Header command for the user | pass | improvised; the skill had no token path |

## Notes

Fails the hard check (`mcp add` via host.shell). The skill assumed client sign-in only.

## Agent-reported uncertainty

1. Bearer tokens not covered.
2. Header name assumed.
3. Successful add then get/list finding nothing not covered.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
