# Run: start-connected-menu — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-connected-menu/scenario.json` version 1 |
| Package under test | `skills/intgral-start` + `skills/intgral-listing` at `e17a333` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Link is the get_started erp_url | pass | "打开 Intgral：https://erp.example.test/app/agent-activity" at the top |
| Numbered menu and a question | pass | the six-item menu; research/video marked as needing their skills |
| Nothing installed or reconfigured | pass | no host.shell call |
| Chinese and short | pass |  |

## Notes

Against the baseline: same single call; a shorter answer led by the link, with the full menu.

## Agent-reported uncertainty

1. Listing items 5–6 when those skills are absent.
2. Whether to pass client_capabilities to get_started.

## Limitations

- Host abilities (`host.shell`, `host.open_url`) are mocked on the Bash bridge: "installed" and "opened" mean the call was made, not that a client loaded the server or a page rendered.
- The agent was told not to inspect `scenario.json` and not to run `claude` itself; this is an instruction, not a sandbox (the real user config was checked afterwards and was untouched).
- One run, one model. Not a statistical claim.
