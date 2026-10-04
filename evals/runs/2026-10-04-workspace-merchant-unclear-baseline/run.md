# Run: workspace-merchant-unclear — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-merchant-unclear/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `b7ae410` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 0 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Asks for the stable identifier first | pass |  |
| No candidate named; nothing merchant-specific | pass |  |
| Read no merchant directory | partial | a first `find` over the workspace listed both merchant paths (not opened) — invisible to the evaluator |

## Notes

Hard checks pass. The listing of `merchants/` happened before the agent read the skill; the skill's start line now says not to list or search it.

## Agent-reported uncertainty

1. Whether an ERP lookup may settle the merchant.
2. Whether backend product reads count as merchant-specific.

## Limitations

- The run prompt states no session merchant (the scenario's `merchant` is null) — a deliberate exception to the README rule.
- Local file listing is not traced; the 'no directory read' item is judged from the agent's own report.
- One run, one model (Opus).
