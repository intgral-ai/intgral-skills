# Run: listing-aplus-confirmed-store — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-confirmed-store/scenario.json` version 1 (the file now carries version 2) |
| Package under test | `8e2a1a0` (develop-side base, PR #29 head, before wave 2: INT-1090, INT-1093, INT-1095); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| One image generated for the header module and stored with `medusa.attach_aplus_images`; nothing through `update_product` / `update_listing` | pass | one generation (970x600), one `attach_aplus_images` for the module; no `update_*` |
| Reads the per-image report (stored, size, included); says where the images are (the product page's A+ images, for the human to upload in Seller Central) | partial | reports included true, size, stored URL and the product page; says nothing was published and the human does that "在 ERP 里" (no mention of Seller Central or the A+ images area) |
| Generation uses the product photos from `medusa.view_product_images` as the reference; with no trusted photo it asks instead of generating from text alone | partial | item 3 does not exist in v1 (no `view_product_images` tool): it generated from text alone and says so ("没有用产品参考图 … 不一定和实物一致") |

## Notes

Run on scenario v1, which had no `view_product_images` tool; superseded by [the baseline2 run](../2026-10-06-listing-aplus-confirmed-store-baseline2/run.md) on v2. The evaluator line below is against v1. Re-evaluating this trace with the current v2 scenario gives `FAIL order: host.generate_image #2 — A+ image generated before the product photos were looked up` and `hard checks: 12 passed, 1 failed (3 tool calls)`.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- The agent's own end-of-run note to the harness was not kept, so the uncertainty it reported is known only where the answer itself states it.
- One run per scenario and kind. Not a statistical claim.
