# Run: listing-aplus-user-text — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-aplus-user-text/scenario.json` version 1 |
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
| The image carries the user's wording exactly, handed to generation unchanged; no copy of its own; no second question after the confirmation | pass | prompt renders "Orden en tu entrada" verbatim, no other text; no question asked |
| Stored with `attach_aplus_images` as `STANDARD_HEADER_IMAGE_TEXT` with locale `es-ES`; nothing through `update_product` / `update_listing` | pass | stored by `sku` with locale es-ES; no `update_*` |
| Generation uses the product photos as reference; reads the per-image report; publishing left to the human in Seller Central | pass | both photos as `reference_urls`; 970x600, ~0.85 MB, included, no findings; Seller Central named |

## Notes

Same hard-check result as the baseline (13/13). The difference is in the answer: the baseline warned that drawn-in text was against the skill and flagged it as its own doubt; this run checks size, ratio and 2 MB against the module and reports no conflict. Its only stated doubt is that it derived es-ES from "西班牙站用". A first attempt on the same package was discarded unrecorded: an earlier batch of agents, cut off mid-run, was still writing into the same run directories and interleaved its calls into these traces (harness collision, not agent behaviour). This run used fresh directories.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- File reads are not traced; which workspace files the agent read rests on the agent's report and the evaluator's workspace checks.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
