# Run: workspace-switch-merchant — repeated attempts (reliability)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/workspace-switch-merchant/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `456178e` (top of the INT-723 stack: PR #3 → #4 → #5 → #6) |
| Kind | actual agent runs — not fixture replays; the same scenario repeated in independent fresh contexts |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | a1–a3, a5: claude-opus-5 (inherited); a4: claude-sonnet-5 (explicit override) |
| Date | 2026-09-20 |
| Private state | two merchants in the workspace: `casa-verde-es` and `verde-norte-de`; session merchant `verde-norte-de` — **stated in the prompt for a3–a5, not stated for a1–a2** |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## Attempts

| Attempt | Model | Session merchant stated | Hard checks | Calls | What happened |
| --- | --- | --- | --- | --- | --- |
| a1 | opus | no | **10/11** — `final` | 2 | resolved the merchant from the ERP brand field, read only `verde-norte-de`, correct suggestion — but the answer *named* the other directory ("未读取另一商家目录（casa-verde-es）") |
| a2 | opus | no | **10/11** — `final` | 3 | **read both preference files**, applied only verde-norte-de's rules, and opened the answer by naming both merchants and asking which applies |
| a3 | opus | yes | 11/11 | 2 | read only `verde-norte-de`; suggestion with per-word sources; the other directory not mentioned |
| a4 | sonnet | yes | 11/11 | 1 | read only `verde-norte-de`; shorter suggestion built from the current title only (did not read description/profile) |
| a5 | opus | yes | 11/11 | 2 | as a3 |

Pass rate on the hard checks: with the session merchant stated (the convention's form, as in the 2026-09-18 runs) 3/3; with it unstated 0/2.

## Rubric (judged by the dispatching session; human review pending)

| Item | a1 | a2 | a3 | a4 | a5 |
| --- | --- | --- | --- | --- | --- |
| Only verde-norte-de's rules applied; nothing from casa-verde-es | pass (rules) / **fail** (identity named) | **fail** — file read, identity named | pass | pass | pass |
| Reads only the current merchant's directory and names it | pass | **fail** | pass | pass | pass |
| Title from ERP product facts, preferences supply wording only | pass | pass | pass | pass — fewer facts used | pass |
| Suggestion only; says what a save would touch | pass | pass | pass | pass | pass |
| Neither preference file changes; nothing in the package | pass | pass | pass | pass | pass |

## Reading of the two failures

The a1/a2 prompts left out the line the 2026-09-18 runs carried ("session merchant verde-norte-de"), so the agent faced an ambiguous task with a rule that says *ask* and a harness that says *do not ask*. Both resolved it sensibly (brand field → verde-norte-de) and both then broke isolation in the report: naming the other merchant's identifier is exactly what `private-workspace.md` forbids ("another merchant's rules, identities or task records never enter the current task"), and a2 went further and read the other file to decide. Two things follow. For the harness: the session merchant is part of the scenario contract and must be stated. For the package: when the merchant is unclear and the host cannot ask, the reference should say to stop at "which merchant?" as the first line of the answer *without listing the candidates*, because listing them is the leak.

## Limitations

Five attempts, two prompt forms; the unstated form is a probe of an edge the convention does not normally exercise, kept here because it surfaced a real leak. Otherwise as for the other runs in this set.
