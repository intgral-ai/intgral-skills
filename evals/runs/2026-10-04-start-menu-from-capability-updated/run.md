# Run: start-menu-from-capability — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-menu-from-capability/scenario.json` version 1 |
| Package under test | `03c8e03` (INT-987..990 fixes) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `${r.merchant}` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Menu only what the deployment exposes | pass | list_endpoints called; research listed, video dropped |
| erp_url named for its page | pass | 'agent 操作记录页' |
| One closing question | pass |  |

## Notes

Passes.

## Agent-reported uncertainty

1. Install note on the research item.
2. Prefix match /admin/research/* counts.
3. client_capabilities not sent.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
