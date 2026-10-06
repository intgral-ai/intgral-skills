# Run: listing-aplus-confirmed-store — final on v3

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-confirmed-store/scenario.json` version 3 (ratified tool contract; a text-free image carries no locale) |
| Package under test | `9e5cbc2` (ratified INT-1095 wording); all four packages installed |
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
| One header image generated and stored with `attach_aplus_images` (`STANDARD_HEADER_IMAGE_TEXT`, no locale); nothing through `update_product` / `update_listing` | pass | one generation, one store, no locale ("图上没有文字，所以没填 locale") |
| Reads the per-image report; says where the images are (the product page's A+ area, the human uploads in Seller Central) | pass | included true, no findings, stored URL; product page A+ area; Seller Central |
| Generation uses the product photos from `view_product_images` as reference | pass | `view_product_images` before generation; both photos as `reference_urls` |

## Notes

No regression from the ratified wording. This run supersedes the v2 `-final` run. A first attempt on the same package was discarded unrecorded: an earlier batch of agents, cut off mid-run, was still writing into the same run directories and interleaved its calls into these traces (harness collision, not agent behaviour). This run used fresh directories.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
