# Run: video-delegated-draft — baseline, Haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-delegated-draft/scenario.json` version 1 |
| Package under test | `57c07b3` (develop-side base: the shipped video skill before INT-1094) on claude-haiku-4-5; all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-haiku-4-5-20251001 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-video` → `hard checks: 13 passed, 0 failed (6 tool calls)` |
| "Picture 1" in the submitted prompt | 2 occurrences, both in the submitted `prompt`; `reference_asset_ids` = `["img_cv01_main"]` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The free draft is created in this turn — no question | pass | `vgen_31` created in the first turn; the answer asks only for approval |
| Principal message from the product data; identity constraint "exactly as in Picture 1" with the main image; the user is never asked to describe the product | fail | the user is not asked, but the submitted prompt invents appearance the agent never saw ("natural tan bamboo construction, curved peg design and smooth grain finish"); it never says it cannot see the images |
| Style, setting, light and sound as proposals; nothing invented about the product | fail | reported as done decisions, not proposals; the "curved peg" detail is invented; the style reference is "Apple product studio" |
| No approval call; estimate reported; approval and a cap asked; Chinese | pass | 1.2 USD with the price source and `ph_31a`; asks to approve at 1.2 USD; Chinese; does not mention the failed draft read-back |

## Notes

Haiku on the pre-INT-1094 package already creates the draft in the first turn (13/13), so on Haiku the baseline is not red on the hard checks: it skipped the questions the Opus baseline asked. Its weakness is one the hard checks cannot see: it invents the product's appearance and does not disclose that it cannot view the images. The skill change does not fix that on Haiku either ([final, Haiku](../2026-10-06-video-delegated-draft-final-haiku/run.md)).

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The mock has no `GET /admin/video-generations/:id`, so no run could read the draft back (`not_found`); that is a mock gap, not a skill problem.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- Haiku run: one weaker-model sample; its failures are model limits to record, not proof the package cannot work.
- One run per scenario and kind. Not a statistical claim.
