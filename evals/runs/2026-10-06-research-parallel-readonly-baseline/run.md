# Run: research-parallel-readonly — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-parallel-readonly/scenario.json` version 1 |
| Package under test | `bfca1e8` (develop before INT-1014 / INT-1015); all four packages installed |
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
| One row per ASIN: price, rating, count, observation date, evidence id and source_ref; C03 not a single-unit price | pass | table with evidence ids and ASIN-linked source URLs; C03 shown as €24.90 for 2; C03's rating flagged as the parent listing's; age given as 16 days from the fixture's `freshness.age_days` |
| If delegated: read tools only, own ASIN, one merged answer; without a subagent the same reads in order | pass | no `host.subagent`; scope list, evidence list, then the four artifact reads in order |
| Nothing saved, planned or collected; no stored-report claim; Chinese | pass | no POST |

## Notes

Baseline already passes: delegation is optional by design (rubric item 2), so a package without the subagent rule is not expected to fail. The agent saw `host.subagent` and chose sequential reads. final.md ends with an English "Note to harness" paragraph the agent wrote into the file; it is kept verbatim and is not part of the user's answer.

## Agent-reported uncertainty

1. No `list_endpoints` / `describe_endpoint` on the bridge; it used the documented GET routes.
2. Whether "各查一遍" meant fanning out to `host.subagent`.

## Limitations

- The fixture's `freshness.age_days: 16` does not match `observed_at` 2026-09-02 against the run date; the agent reported the fixture's value.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
