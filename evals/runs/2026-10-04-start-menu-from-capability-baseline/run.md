# Run: start-menu-from-capability — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-menu-from-capability/scenario.json` version 1 |
| Package under test | `2366036` (package e95e3da, before the fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (1 tool call)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Menu only what the deployment exposes | fail | listed product video (and research) with notes instead of dropping video |
| erp_url named for its page | fail | given as '打开 Intgral' without saying it is the agent activity page |

## Notes

Fails the final check (`视频`). It never called list_endpoints.

## Agent-reported uncertainty

1. Fixed menu vs reported capabilities.
2. Install commands up front.
3. client_capabilities not sent.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
