# Run: video-label-missing-no-retry — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-label-missing-no-retry/scenario.json` version 1 |
| Package under test | `skills/intgral-video` at `88b4f79` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Failure reported from the generation | pass | names the missing `mdta:AIGC` container label |
| No resume, no new generation; new one needs approval | pass |  |
| Why the label matters; segments kept; spend stated | pass | "欧盟 AI 法案第 50 条的披露要求，没有标签的成片不能上线"; segments kept; 1.20 of 2.00 USD |
| Page opened once; Chinese | pass |  |

## Notes

Against the baseline: the disclosure reason is now stated, and the operator check comes from the skill rather than the model. One call fewer.

## Agent-reported uncertainty

1. It skipped endpoint discovery because the recovery row rules out any write.
2. "No refund" is inferred, not a backend field.

## Limitations

- Mocked against the behaviour merged in intgral-erp-seam#601 and #566, not a deployment.
- The host browser is mocked; "opened" means the call was made.
- One run, one model (Opus). A weaker model was not run.
