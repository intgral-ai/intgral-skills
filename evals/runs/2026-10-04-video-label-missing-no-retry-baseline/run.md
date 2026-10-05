# Run: video-label-missing-no-retry — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-label-missing-no-retry/scenario.json` version 1 |
| Package under test | `skills/intgral-video` at `237fad9` (this PR's #622 guidance, no label rules) |
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
| Failure reported from the generation | pass | stage, retry_action null and the backend message quoted |
| No resume, no new generation; new one needs approval | pass | from the generic retry_action=null row |
| Why the label matters; segments kept; spend stated | partial | segments and 1.20/2.00 USD stated; the label explained only as "AI content source tag" — no disclosure duty |
| Page opened once; Chinese | pass |  |

## Notes

The hard checks already pass from the generic retry_action=null row. On its own initiative it suggested asking operations to confirm the fix before paying again — that judgement was folded into the guidance (88b4f79) before the updated run.

## Agent-reported uncertainty

1. Whether to create a free draft right away.
2. Whether a lost label is a deployment defect a new generation would hit again.

## Limitations

- Mocked against the behaviour merged in intgral-erp-seam#601 and #566, not a deployment.
- The host browser is mocked; "opened" means the call was made.
- One run, one model (Opus). A weaker model was not run.
