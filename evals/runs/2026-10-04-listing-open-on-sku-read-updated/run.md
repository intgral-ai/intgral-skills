# Run: listing-open-on-sku-read — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-open-on-sku-read/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `e17a333` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Status and title from the tool result | pass |  |
| SKU page opened once, unprompted | pass | host.open_url on the returned erp_url right after the read; "产品页已经在浏览器里打开了" |
| Nothing done inside the page | pass |  |

## Notes

Against the baseline: the open item moved from fail to pass with one extra call.

## Agent-reported uncertainty

1. inspect.md step 4 opened with "仅用户明确要求打开页面…", which reads as forbidding the open; it followed the SKILL.md pointer. Fixed after this run in 68dca70 (step 4 now leads with the SKU rule and scopes open_browser to get_started) — not rerun.

## Limitations

- Host abilities (`host.shell`, `host.open_url`) are mocked on the Bash bridge: "installed" and "opened" mean the call was made, not that a client loaded the server or a page rendered.
- The agent was told not to inspect `scenario.json` and not to run `claude` itself; this is an instruction, not a sandbox (the real user config was checked afterwards and was untouched).
- One run, one model. Not a statistical claim.
