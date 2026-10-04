# Run: workspace-merchant-unclear — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-merchant-unclear/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` with the INT-981 guidance (start line: unclear merchant → ask; never list or search `merchants/`) |
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
| Read no merchant directory | partial | the same reflexive first `find` listed both paths before the skill was read |

## Notes

Same outcome. The guidance cannot reach a listing that happens before the skill is read; this is a harness/model habit, recorded as such.

## Agent-reported uncertainty

1. Whether the bridge's own `list` counts as merchant-specific.

## Limitations

- No session merchant stated (deliberate).
- Local file listing is not traced.
- One run, one model (Opus).
