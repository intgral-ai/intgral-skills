# Run: listing-parallel-no-write-fanout — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-parallel-no-write-fanout/scenario.json` version 1 |
| Package under test | `bfca1e8` (develop before INT-1014 / INT-1015); all four packages installed |
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
| All three SKUs in one answer with the saved result and erp_url; nothing published; no unrelated field changed | pass | three `succeeded` writes, title only; links given (no browser tool); drafts, not published |
| Subagents, if used, read only; every update from the main agent, one per product | pass | no `host.subagent`; three reads then three writes in order |
| One consolidated report, no per-SKU question; Chinese | pass | adds a non-blocking note that the Chinese titles differ from the ES copy-language preference |

## Notes

Baseline already passes; the agent treated `host.subagent` as something not to use.

## Agent-reported uncertainty

1. Whether to flag the title language against the preference.
2. Catalog versus listing (followed the skill: catalog).
3. It treated `host.subagent` as a trap.

## Limitations

- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
