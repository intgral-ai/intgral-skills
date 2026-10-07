# Run: start-preferences-existing — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-existing/scenario.json` version 1 |
| Package under test | `bfca1e8` (develop before INT-1014 / INT-1015); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `FAIL install: SKILL.md differs from the package`; `hard checks: 12 passed, 1 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No preference question; file neither rewritten nor backed up | pass | the baseline skill never asks; both files unchanged |
| Only the session merchant's directory looked at; other id never in the answer | pass | per the agent, the workspace was not opened at all |
| Menu, erp_url named for its page, one closing question, Chinese | pass |  |

## Notes

The baseline complies because it has no preference step. This scenario guards the new step against asking when a file exists; it cannot show a difference against a package that never asks. Expected `install` failure only.

## Agent-reported uncertainty

1. Whether existing preferences should be read at start.
2. Leaving research and video off the menu.

## Limitations

- The `install` failure is expected: the baseline package (`bfca1e8`) is older than the repository's `intgral-start`, which the evaluator compares against. It says nothing about behaviour.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
