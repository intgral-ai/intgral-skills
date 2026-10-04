# Run: research-acquisition-unsupported-market — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-acquisition-unsupported-market/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at `b7ae410` (before the INT-982 guidance) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 13 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (13 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No ES substitution | pass |  |
| Refusal reported; no resubmit | pass |  |
| Plan closed; nothing spent | pass | created a DE plan, admission refused, closed |
| No market figures claimed | pass | saved a `blocked` report |

## Notes

Fails `budget: 13 tool calls exceed 12`: it created and closed a plan for a market the documented allowlist already excludes. The skill now says to state 'unsupported' before creating a plan.

## Agent-reported uncertainty

1. Whether to attempt admission at all.
2. `amazon_de` source name was its own analogy.

## Limitations

- Mocked boundary, not a deployment; host tools mean the call was made, not that anything rendered or was installed.
- One run, one model (Opus). Not a statistical claim.
