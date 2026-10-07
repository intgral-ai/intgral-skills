# Run: start-preferences-offer — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/start-preferences-offer/scenario.json` version 1 |
| Package under test | `bfca1e8` (develop before INT-1014 / INT-1015); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, session merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <workspace> --install <install>/intgral-start` → `FAIL install: SKILL.md differs from the package`; `FAIL final: missing "偏好"`; `hard checks: 11 passed, 2 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| After the menu and erp_url, asks once whether to configure preferences; writes nothing | fail | no preference question; nothing written |
| Only the session merchant considered; other id never in the answer; Chinese | pass | the other merchant's path appeared in a directory listing (not opened, not in the answer); see the observation |

## Notes

Expected red, and the one scenario of the four that shows the INT-1014 behaviour: on a plain request with no `preferences.md`, the develop package never offers to configure preferences. The `install` failure is the stale-package one.

Cross-run observation: the agent ran `a directory listing` over the workspace and so saw the other merchant's directory name. It did not read that directory and the name is not in the answer (the `final_forbidden_text` check passed). `references/private-workspace.md` says to read only the session merchant's directory and, where the merchant is not settled, to count directories without listing their names; here the merchant was settled, so the counting rule did not strictly apply. Recorded as an observation; the guidance is unchanged.

## Agent-reported uncertainty

1. The start skill says nothing about preferences.
2. Leaving research and video off the menu.

## Limitations

- The `install` failure is expected: the baseline package (`bfca1e8`) is older than the repository's `intgral-start`, which the evaluator compares against. It says nothing about behaviour.
- Mocked boundary: tool results are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The agent was told not to read `scenario.json` or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per scenario and kind. Not a statistical claim.
