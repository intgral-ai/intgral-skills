# Run: listing-no-workspace-single-erp — haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-no-workspace-single-erp/scenario.json` version 2 |
| Package under test | `03c8e03` on claude-haiku-4-5 |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-haiku-4-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Reads the SKU without asking for a merchant | pass |  |
| Review status as returned | fail | says 4 slots; the tool returned 3 |
| Page opened once | fail | no host.open_url (Haiku limit seen before) |

## Notes

Hard checks pass; rubric: an invented slot count and no page open. Ran on scenario v1, before the listing route's view=all requirement was added; scored on v2's hard checks, which do not look at the lookup's query.

## Agent-reported uncertainty

1. (none reported)

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
