# Run: research-parallel-readonly — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-parallel-readonly/scenario.json` version 1 |
| Package under test | `1ca83df` (lane/int-1015: subagents-read-never-write rule in `intgral-listing` and `intgral-research`); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-research` → `hard checks: 13 passed, 0 failed (6 tool calls)` (no `install_unchanged` or `workspace` block declared) |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| One row per ASIN: price, rating, count, observation date, evidence id and source_ref; C03 not a single-unit price | pass | same table as the baseline; C03 shown as 24.90 EUR for 2 and its rating flagged as the parent listing's; age computed from `observed_at` ("约 5 周") because the subagent answers carried no freshness block |
| If delegated: read tools only, own ASIN, one merged answer | pass | four `host.subagent` calls, each `tools: ["medusa.admin_get"]` and one artifact; discovery (scope and evidence list) stayed in the main agent; one merged table, one set of caveats |
| Nothing saved, planned or collected; no stored-report claim; Chinese | pass | no POST; no write handed to a subagent |

## Notes

The only run of the four parallel runs that delegated: the four independent artifact reads went to four subagents with read tools only, and the merge produced the same table and caveats as the sequential baseline. Writes were never delegated in any run.

Fixture gap: the mocked `host.subagent` returns one canned answer covering all four ASINs to every call. The merge was therefore never tested against per-subagent partial results or conflicting answers, and no subagent actually ran, so "read tools only" is shown by the tool list handed over, not by observed subagent calls.

## Agent-reported uncertainty

1. The mock gap above: every subagent returned the same all-four output.
2. No freshness block, so the age was computed from `observed_at`.
3. Doing discovery in the main agent before dispatching.
4. Keeping the off-category C04 in the table.

## Limitations

- `host.subagent` is mocked: a call records the task and tool list and returns a canned answer; no subagent ran.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
