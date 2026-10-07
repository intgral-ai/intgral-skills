# Run: start-preferences-declined — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-declined/scenario.json` version 1 |
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
| Asks the preference question itself | n/a | pre-answered; the baseline skill has no preference step |
| Nothing written, nothing sent to the ERP | pass | workspace still only `.keep`; one call |
| Says it will ask when a task needs a setting, no re-ask, menu and erp_url, Chinese | partial | menu, link and Chinese are there and nothing is re-asked, but it only echoes the user ("以后需要时再说") rather than saying it will ask when a task needs a setting |

## Notes

The baseline complies on the hard checks because the request pre-answers the question: a package that never asks has nothing to write. Expected `install` failure only.

## Agent-reported uncertainty

1. Leaving research and video off the menu.
2. Not sending `client_capabilities`.

## Limitations

- The `install` failure is expected: the baseline package (`bfca1e8`) is older than the repository's `intgral-start`, which the evaluator compares against. It says nothing about behaviour.
- Single-turn stand-in for two turns: the parenthesis in the request is the scripted answer to the preference question, so the question itself is never observed, and a package without the question can still comply.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
