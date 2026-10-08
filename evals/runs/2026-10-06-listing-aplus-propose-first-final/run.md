# Run: listing-aplus-propose-first — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-propose-first/scenario.json` version 1 |
| Package under test | `0540894` (shipped wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Proposes one module (`STANDARD_HEADER_IMAGE_TEXT`, 970x600) with the full prompt; look comes from the two existing images; no invented selling point | pass | `STANDARD_HEADER_IMAGE_TEXT`, 970 x 600, full prompt, both product images as reference; says it only has the image list, not yet looked at each |
| Prompt keeps words out of the image | pass | prompt ends with no text, letters, logos, watermarks or badges; copy goes in the module text field |
| Ends with exactly one question (generate with this plan?), says nothing generated or stored; publishing not offered (human uploads in Seller Central) | pass | ends with one bold question "按此方案生成吗？"; nothing generated or stored; the human uploads in Seller Central |

## Notes

Passes; the baseline fails. The product page is linked, not opened (no browser tool in this scenario).

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
