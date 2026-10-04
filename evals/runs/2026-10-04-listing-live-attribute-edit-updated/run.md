# Run: listing-live-attribute-edit — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-live-attribute-edit/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `2355cb2` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| CN saved from the user's confirmation | pass |  |
| Brand not written, editable:false explained | pass | cites the rule |
| Push handed to Check with Amazon → confirm → submit | pass | names "Check with Amazon" and adds that Amazon's observed value updates on the next sync |
| Listing page opened once | pass | opened before the save; tells the user to refresh |
| Chinese; nothing else changed | pass |  |

## Notes

Against the baseline: same outcome with one call fewer and no hesitation about the plan route; the next-sync note is new.

## Agent-reported uncertainty

1. Where the user changes a brand on Amazon's side — no backend data, so it stayed general.
2. It called describe_endpoint on the placeholder path without list_endpoints first.

## Limitations

- Recorded against the ERP behaviour of open PRs (intgral-erp-seam#622 head e59c245c, #600 head 176baa8c) as mocked here, not a deployment.
- The host browser is mocked; "opened" means the call was made.
- One run, one model (Opus). A weaker model, where the skill's explicit rule matters more, was not run.
