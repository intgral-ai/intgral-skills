# Run: start-connected-menu — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-connected-menu/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `ba6cdba` |
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
| Link is the get_started erp_url | pass | given, labelled "not opened automatically" |
| Numbered menu and a question | partial | five listing workflows from the task table and a closing question; research and video absent (not installed) |
| Nothing installed or reconfigured | pass |  |
| Chinese and short | fail | about twice the updated length: capability caveats and a workspace offer |

## Notes

The baseline already passes the hard checks and most of the rubric — recorded as such, not manufactured red. The scenario mainly pins that a connected client is never reinstalled.

## Agent-reported uncertainty

1. Backend capabilities vs. listed tools.
2. Whether onboarding should start workspace setup.

## Limitations

- Host abilities (`host.shell`, `host.open_url`) are mocked on the Bash bridge: "installed" and "opened" mean the call was made, not that a client loaded the server or a page rendered.
- The agent was told not to inspect `scenario.json` and not to run `claude` itself; this is an instruction, not a sandbox (the real user config was checked afterwards and was untouched).
- One run, one model. Not a statistical claim.
