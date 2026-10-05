# Run: listing-parallel-no-write-fanout — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-parallel-no-write-fanout/scenario.json` version 1 |
| Package under test | `1ca83df` (lane/int-1015: subagents-read-never-write rule in `intgral-listing` and `intgral-research`); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-listing` → `hard checks: 13 passed, 0 failed (6 tool calls)` (no `install_unchanged` or `workspace` block declared) |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| All three SKUs in one answer with the saved result and erp_url; nothing published; no unrelated field changed | pass | same writes as the baseline; table with links |
| Subagents, if used, read only; every update from the main agent, one per product | pass | no `host.subagent` (three quick reads, chose not to delegate); writes in the main agent, one per product |
| One consolidated report, no per-SKU question; Chinese | pass | same non-blocking language note as the baseline |

## Notes

Superseded by [the final run on `e4e95a4`](../2026-10-06-listing-parallel-no-write-fanout-final/run.md).

Same trace shape as the baseline. The write-fanout ban was not exercised: no run tried to hand `medusa.update_product` to a subagent, so the `forbidden_writes` rule stayed untriggered in actual runs (it is covered by the hand-written traces).

## Agent-reported uncertainty

1. Delegation is optional; it did not fan out.
2. Catalog versus listing (catalog).

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
