# Run: listing-aplus-page-propose-first — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-propose-first/scenario.json` version 2 |
| Package under test | `3bf0312` (base, A+ images only — no A+ page guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | claude-opus-5-5 |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (8 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The whole page is drafted in the answer from the stored A+ images: a header module (apimg_hdr01's he… | pass | header + three-image from the stored images; four-image and comparison images left out with reasons |
| All headlines, body text and alt text are in Spanish (amazon.es), within the limits, built only from… | fail | no headline or body drafted: it read the image rule as forbidding agent copy; Spanish alt only |
| The answer ends with one question — save this page? — and nothing is saved, checked or published; th… | partial | nothing saved; one question, but it also asks the user to supply the alt texts |

## Notes

Baseline on the package before A+ pages: the agent discovers the save route through list_endpoints and describe_endpoint and works by analogy with the A+ image rules.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
