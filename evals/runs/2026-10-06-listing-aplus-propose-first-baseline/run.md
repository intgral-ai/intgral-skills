# Run: listing-aplus-propose-first — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-propose-first/scenario.json` version 1 |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `FAIL final: missing "970x600"`; `hard checks: 12 passed, 1 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Proposes one module (`STANDARD_HEADER_IMAGE_TEXT`, 970x600) with the full prompt; look comes from the two existing images; no invented selling point | fail | no module and no full prompt: it asks the user which module and what size, saying the backend returns no A+ spec. It does plan the two existing images as reference and invents no selling point |
| Prompt keeps words out of the image | fail | plans a Spanish slogan on the image |
| Ends with exactly one question (generate with this plan?), says nothing generated or stored; publishing not offered (human uploads in Seller Central) | fail | three questions at the end (module and size, slogan, scene); says nothing was generated or stored; publishing not offered |

## Notes

Expected red: without the A+ guidance the agent has no module or size to propose (`final_required_text` "970x600" missing).

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
