# Run: listing-live-attribute-edit — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-live-attribute-edit/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `9d60501` (develop) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| CN saved from the user's confirmation | pass |  |
| Brand not written, editable:false explained | pass | found from the schema it chose to read; the skill has no editable rule |
| Push handed to Check with Amazon → confirm → submit | pass | described as Check then Submit; it hesitated whether "推到亚马逊" authorized the plan route and chose not to call it |
| Listing page opened once | pass |  |
| Chinese; nothing else changed | pass |  |

## Notes

The baseline already passes the hard checks and the rubric: Opus read the product-type schema, whose `editable` flag and the catalogued route summaries carry the facts. Recorded as such. The guidance makes the schema read and the hand-off explicit rather than a model's inference.

## Agent-reported uncertainty

1. No rule for editable:false on a live listing.
2. Whether "push to Amazon" authorizes calling the publication-plan route.
3. Precheck had no request schema in the mock, so it skipped it.

## Limitations

- Recorded against the ERP behaviour of open PRs (intgral-erp-seam#622 head e59c245c, #600 head 176baa8c) as mocked here, not a deployment.
- The host browser is mocked; "opened" means the call was made.
- One run, one model (Opus). A weaker model, where the skill's explicit rule matters more, was not run.
