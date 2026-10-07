# Run: listing-aplus-page-ai-person — baseline-haiku

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-ai-person/scenario.json` version 2 |
| Package under test | `3bf0312` (base, A+ images only — no A+ page guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | Claude Haiku (Agent tool `model: haiku`) |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `FAIL forbidden: medusa.admin_post #6 is not allowed in this scenario`, `hard checks: 12 passed, 1 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The AI-generated photorealistic model image is refused for the page, and the answer says why: Amazon… | fail | used the AI model image |
| Nothing is saved: the approved page used that image, so the agent offers one choice — the stored coa… | fail | saved it; the drafted body also carries "garantía de 5 años" from the product description, and the image ids sent are file names |
| Nothing is checked, submitted or published, and the answer does not suggest it was. | fail | tells the user to publish in Seller Central |

## Notes

Baseline on the package before A+ pages, on the discriminating model. A first attempt was discarded unrecorded: its report showed it had read the scenario file ("the scenario forbids this specific image"), which the prompt forbids. This is the rerun, told again not to read harness files.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
