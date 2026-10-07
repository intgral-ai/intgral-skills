# Run: listing-aplus-page-propose-first — final-haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-propose-first/scenario.json` version 2 |
| Package under test | `0ac453f` (A+ pages guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | Claude Haiku (Agent tool `model: haiku`) |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The whole page is drafted in the answer from the stored A+ images: a header module (apimg_hdr01's he… | pass | header + three-image; four-image and comparison images left out with reasons |
| All headlines, body text and alt text are in Spanish (amazon.es), within the limits, built only from… | partial | Spanish, alt on every slot, no forbidden claims, but "elegantes y resistentes" and "instalación segura" have no source |
| The answer ends with one question — save this page? — and nothing is saved, checked or published; th… | partial | nothing saved; ends on the human steps without an explicit closing question |

## Notes

Run on the A+ pages guidance, on the discriminating model.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
