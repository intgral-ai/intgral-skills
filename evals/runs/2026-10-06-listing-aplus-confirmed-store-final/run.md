# Run: listing-aplus-confirmed-store — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-confirmed-store/scenario.json` version 2 |
| Package under test | `0540894` (shipped wording); all four packages installed |
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
| One image generated for the header module and stored with `medusa.attach_aplus_images`; nothing through `update_product` / `update_listing` | pass | one generation with the two references, one `attach_aplus_images`; no `update_*` |
| Reads the per-image report (stored, size, included); says where the images are (the product page's A+ images, for the human to upload in Seller Central) | pass | per-image table (module, 970x600, included true, no findings); A+ images area; the human uploads in Seller Central and fills the module text fields |
| Generation uses the product photos from `medusa.view_product_images` as the reference; with no trusted photo it asks instead of generating from text alone | pass | `view_product_images` before `generate_image`; both photos passed as `reference_urls` |

## Notes

Passes on v2.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
