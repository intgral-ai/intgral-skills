# Run: listing-parallel-no-write-fanout — final

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-parallel-no-write-fanout/scenario.json` version 3 |
| Package under test | `e4e95a4` (final INT-1014 / INT-1015 wording; the skill text at the branch head `eebaf49` is identical); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (6 tool calls)` (the scenario declares no `install_unchanged` or `workspace` block, so those two checks pass vacuously). Against version 2 the same trace failed `order` three times ("CV-HOOK-0n was written before its current state was read"), because v2 accepted only a main-agent `get_product` by SKU as the read |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| The read before each write may be a main-agent get_product or a read-only subagent holding medusa.get_product; which SKUs it read is judged here | pass | three `host.subagent` calls, each holding only `medusa.get_product` and naming one SKU (CV-HOOK-01, -02, -03) in its task, all before the first write |
| All three SKUs in one answer with the saved result and erp_url; nothing published; no unrelated field changed | pass | three `succeeded` title-only writes; links given (no browser tool); drafts, not published |
| Subagents read only; every update from the main agent, one per product | pass | `medusa.update_product` never handed to a subagent; three writes in the main agent |
| One consolidated report, no per-SKU question; Chinese | pass | adds a non-blocking note that the Chinese titles differ from the ES copy-language preference |

## Notes

The first actual run in which listing reads were delegated. It first failed the `order` check of scenario version 2, which did not count a delegated read as reading current state; version 3 (`eebaf49`) accepts a read-only subagent holding `medusa.get_product` and leaves which SKUs it read to this rubric. The failure was in the check, not the behaviour: every write still followed a read of its SKU. The product ids the writes used came from the canned subagent answer. Supersedes [the lane-head run](../2026-10-06-listing-parallel-no-write-fanout-updated/run.md).

## Agent-reported uncertainty

1. The mocked subagent returned all three SKUs to every call.
2. Writing the user's Chinese titles against the ES language preference.
3. Skipping further detail reads.

## Limitations

- Fixture gap: the mocked `host.subagent` returns one canned answer covering every item to each call. No subagent actually ran, so "read tools only" is shown by the tool list handed over, not by observed subagent calls, and the merge was never tested against partial or conflicting subagent results.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario. Not a statistical claim.
