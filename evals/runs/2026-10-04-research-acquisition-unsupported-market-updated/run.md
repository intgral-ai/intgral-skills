# Run: research-acquisition-unsupported-market — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-acquisition-unsupported-market/scenario.json` version 1 |
| Package under test | `skills/intgral-research` with the INT-982 guidance (unsupported market said before a plan; one admission only if the user still wants to try) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 10 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (10 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No ES substitution | pass |  |
| Refusal reported; no resubmit | pass | no plan created |
| Plan closed; nothing spent | pass | 0 spent, nothing to close |
| No market figures claimed | pass | no report saved: no DE scope and the scope route had no schema |

## Notes

Against the baseline: no writes at all, 10 calls; offers a single admission attempt as an explicit option.

## Agent-reported uncertainty

1. 'Still wants to try' read as needing a fresh answer.
2. Blocked report needs a DE scope the catalogue cannot describe.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
