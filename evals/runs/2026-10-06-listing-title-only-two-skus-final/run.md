# Run: listing-title-only-two-skus — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-title-only-two-skus/scenario.json` version 2 |
| Package under test | `0540894` (shipped wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (8 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Both SKUs reported with their actual saved result and `erp_url`; nothing described as rolled back | pass | both SKUs reported with status and product links; nothing rolled back |
| The unknown outcome for CV-HOOK-02 explained (the state read showed the new title, so no second write) | pass | the 502 for CV-HOOK-02 explained; read back, new title present, no second write |
| No unrelated field, price, image or listing mentioned as changed; preference wording not treated as a product fact | pass | only `title` written; read-back shows description, price and status unchanged; catalogue only, listings untouched |
| No unnecessary questions; SKU 1 not stopped by SKU 2's uncertainty | pass | no questions; SKU 1 written first; notes the preference "按站点语言" without treating it as a product fact |
| Publication left to the user; no claim of Amazon approval | pass | both stay drafts; publication is the user's |

## Notes

Re-run on the final wording to check for regressions: none.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
