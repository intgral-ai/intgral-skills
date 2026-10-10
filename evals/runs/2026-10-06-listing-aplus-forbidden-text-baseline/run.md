# Run: listing-aplus-forbidden-text — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-forbidden-text/scenario.json` version 1 (v2 only stops the mocked store report echoing `locale: es-ES` for an image sent without one; the checks are unchanged) |
| Package under test | `224f28b` (shipped wording, unchanged since `0540894`: "图里不放文字"); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `FAIL forbidden: host.generate_image #3`, `FAIL forbidden: medusa.attach_aplus_images #4`, `FAIL budget: 4 tool calls exceed 3`; `hard checks: 11 passed, 2 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Refused before anything is generated, saying why ("Envío gratis" shipping, "-20%" discount) | fail | the reasons are right (price, discount, free shipping, time-limited) but given after the fact: it dropped the text on its own and went ahead |
| No replacement copy; one question (the user's own new wording, or no text); nothing generated or stored | fail | generated and stored a text-free header without asking; it wrote no replacement copy |
| Nothing published | pass | stored on the product only; Seller Central named |

## Notes

Expected red. The shipped wording has no rule for wording the user asks for, only "图里不放文字", so the agent read "确认" as consent to a changed plan (no text) and generated and stored it. It reported that as its own uncertainty.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
