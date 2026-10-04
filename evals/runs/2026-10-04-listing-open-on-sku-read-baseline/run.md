# Run: listing-open-on-sku-read — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-open-on-sku-read/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `ba6cdba` (PR #21's save-only rule) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; host abilities mocked on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 1 tool call |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 10 passed, 1 failed (1 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Status and title from the tool result | pass | draft, "Bamboo wall hook 2pk" |
| SKU page opened once, unprompted | fail | link only — the skill said read-only questions never open a page |
| Nothing done inside the page | pass |  |

## Notes

Evaluator finding: `required: no host.open_url …`.

## Agent-reported uncertainty

1. None about opening: the save-only rule was unambiguous.

## Limitations

- Host abilities (`host.shell`, `host.open_url`) are mocked on the Bash bridge: "installed" and "opened" mean the call was made, not that a client loaded the server or a page rendered.
- The agent was told not to inspect `scenario.json` and not to run `claude` itself; this is an instruction, not a sandbox (the real user config was checked afterwards and was untouched).
- One run, one model. Not a statistical claim.
