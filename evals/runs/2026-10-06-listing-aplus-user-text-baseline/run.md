# Run: listing-aplus-user-text — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-user-text/scenario.json` version 1 |
| Package under test | `224f28b` (shipped wording, unchanged since `0540894`: "图里不放文字"); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 4 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (4 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The image carries the user's wording exactly, handed to generation unchanged; no copy of its own; no second question after the confirmation | pass | the prompt asks for "Orden en tu entrada" verbatim and no other text; no question asked |
| Stored with `attach_aplus_images` as `STANDARD_HEADER_IMAGE_TEXT` with locale `es-ES`; nothing through `update_product` / `update_listing` | pass | locale es-ES derived from the market; no `update_*` |
| Generation uses the product photos as reference; reads the per-image report; publishing left to the human in Seller Central | pass | both photos as `reference_urls`; 970x600, included, no findings; Seller Central named, nothing published |

## Notes

The baseline already passes: the user's explicit wording overrode the reference's "图里不放文字", and the tool description's `locale` line was enough to send `es-ES`. The agent said it was unsure because the skill told it to keep text out of the image, and it warned that drawn-in text carries more review risk — the friction the ratified wording removes. Not a manufactured red.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
