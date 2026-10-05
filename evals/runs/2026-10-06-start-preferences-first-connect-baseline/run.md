# Run: start-preferences-first-connect — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-first-connect/scenario.json` version 1 |
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
| Asks the preference question itself (menu and link, then one question) | n/a | pre-answered: the baseline skill has no preference step; the agent acted on the parenthesis and put the preference section before the menu |
| On the yes: template top fields only, nothing re-asked, file written from the template, read back, path reported | pass | identifier, Amazon ES, Spanish, EUR from `assets/preferences.example.md` (found through `intgral-listing`'s private-workspace guide); read back; path given as `INTGRAL_WORKSPACE/merchants/casa-verde-es/preferences.md` |
| Nothing for the other merchant, its id never in the answer, nothing sent to the ERP | pass | workspace and final-text checks passed; one call, `medusa.get_started` |
| Chinese; menu and erp_url named for its page | pass | menu 1–4, link named as the agent-activity page |

## Notes

The baseline complies: the request pre-answers the question, and a package with no preference step still follows the listing skill's first-time setup on a stated yes. This scenario tests the write and the isolation, not the offer; `start-preferences-offer` was added (`ce42332`) to test the offer. Expected `install` failure only.

## Agent-reported uncertainty

1. Configuring preferences from the start skill, which says nothing about them.
2. Leaving research and video off the menu (no `list_endpoints`).
3. Not sending `client_capabilities`.
4. Recording the four values as a lasting-rules row as well.

## Limitations

- The `install` failure is expected: the baseline package (`bfca1e8`) is older than the repository's `intgral-start`, which the evaluator compares against. It says nothing about behaviour.
- Single-turn stand-in for two turns: the parenthesis in the request is the scripted answer to the preference question, so the question itself is never observed, and a package without the question can still comply.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
