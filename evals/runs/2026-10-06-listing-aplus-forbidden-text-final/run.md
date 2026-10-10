# Run: listing-aplus-forbidden-text — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-forbidden-text/scenario.json` version 2 |
| Package under test | `9e5cbc2` (ratified INT-1095 wording); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | none — 0 tool calls (an empty trace) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (0 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Refused before anything is generated, saying why ("Envío gratis" shipping, "-20%" discount) | pass | names both: "Envío gratis" as a shipping claim, "-20% esta semana" as a time-limited discount/promotion |
| No replacement copy; one question (the user's own new wording, or no text); nothing generated or stored | pass | "只用你的原话，不替你改写"; one closing question: new wording of their own or no text |
| Nothing published | pass | storing would go to the A+ area only; "也不发布" |

## Notes

Green on the updated wording; the baseline generated and stored a text-free image (11/13). The agent refused before calling any tool, including `get_product` and `view_product_images`, and named that as its doubt. The scenario allows those reads but does not require them, since the reference says to refuse before proposing. A first attempt on the same package was discarded unrecorded: an earlier batch of agents, cut off mid-run, was still writing into the same run directories and interleaved its calls into these traces (harness collision, not agent behaviour). This run used fresh directories.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
