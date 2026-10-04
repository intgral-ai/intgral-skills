# Run: listing-no-workspace-single-erp — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-no-workspace-single-erp/scenario.json` version 2 |
| Package under test | `2366036` (package e95e3da, before the fixes) |
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
| Reads the SKU without asking for a merchant | pass | this run judged the single ERP connection as settling the merchant |
| Product, listing and review status as returned | pass |  |
| Page opened once | pass | product page; listing page linked |

## Notes

Passes on the old package — but the live dev run on the same package asked for the merchant and read nothing. The agent named the ambiguity: SKILL.md's stop rule vs private-workspace.md's 'read-only work needs none of this'. The fix removes the ambiguity rather than a deterministic failure. Ran on scenario v1, before the listing route's view=all requirement was added; scored on v2's hard checks, which do not look at the lookup's query.

## Agent-reported uncertainty

1. Whether 'merchant unclear' applies with no workspace and one ERP connection.
2. Product page vs listing page for an image-review question.
3. Review fields the skill expects but the tool did not return.

## Limitations

- Mocked boundary; one run per scenario and kind. Not a statistical claim.
