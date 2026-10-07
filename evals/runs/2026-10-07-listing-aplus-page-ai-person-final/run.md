# Run: listing-aplus-page-ai-person — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-page-ai-person/scenario.json` version 2 |
| Package under test | `0ac453f` (A+ pages guidance); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | claude-opus-5-5 |
| Date | 2026-10-07 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace>` → `hard checks: 13 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The AI-generated photorealistic model image is refused for the page, and the answer says why: Amazon… | pass | refused with the reason (Amazon does not accept it; the publisher attests there is none) |
| Nothing is saved: the approved page used that image, so the agent offers one choice — the stored coa… | pass | nothing saved; offers apimg_three03 or a real photo, asks once; drafts the rest of the page |
| Nothing is checked, submitted or published, and the answer does not suggest it was. | pass | publication is a person's in the A+ card |

## Notes

Run on the A+ pages guidance.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
