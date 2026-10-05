# Run: research-acquisition-unsupported-market — haiku (weaker-model check)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-acquisition-unsupported-market/scenario.json` version 1 |
| Package under test | package at `2b7a0a1` (PR #24 head, all INT-978 guidance) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 10 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 12 passed, 1 failed (10 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No ES substitution | pass | `amazon_es` appears only in the list of supported pairs inside the blocked report |
| Unsupported said before a plan | fail | created a plan, attempted admission, closed it |

## Notes

The `text` failure is a check false positive (a supported-pairs list, not a substitution). The run is also **contaminated**: its report cites the scenario's rubric, so it read `scenario.json` against the harness rule. Not counted as evidence either way.

## Agent-reported uncertainty

1. (Haiku reported none.)

## Limitations

- Mocked boundary; one run per scenario. Not a statistical claim.
