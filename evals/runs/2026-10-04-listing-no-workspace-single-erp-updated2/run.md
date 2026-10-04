# Run: listing-no-workspace-single-erp — updated round 2

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-no-workspace-single-erp/scenario.json` version 2 |
| Package under test | `2eb7035` (listing lookup with view=all) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, no session merchant stated |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Reads the SKU without asking for a merchant | pass |  |
| Listing found with view=all | pass | `seller_sku=LH-TBL-02&view=all` on the first try |
| Review status as returned | pass | unreviewed, 3 slots, provenance unknown |
| Page opened once | pass | product page; listing page linked |

## Notes

Passes on scenario v2, which serves the listing only with view=all.

## Agent-reported uncertainty

1. Product page vs listing page when the question is about the listing.
2. Review fields the skill expects but the tool did not return.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
