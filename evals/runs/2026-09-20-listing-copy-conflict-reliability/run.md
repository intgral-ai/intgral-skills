# Run: listing-copy-conflict — repeated attempts (reliability)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-copy-conflict/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `456178e` (top of the INT-723 stack: PR #3 → #4 → #5 → #6) |
| Kind | actual agent runs — not fixture replays; the same scenario repeated in independent fresh contexts |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | a1–a3: claude-opus-5 (inherited); a4: claude-sonnet-5 (explicit override). a1/a2 prompts omitted the session-merchant line, a3/a4 stated it — single-merchant workspace, no observed effect |
| Date | 2026-09-20 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## Attempts

| Attempt | Model | Hard checks | Calls | What happened |
| --- | --- | --- | --- | --- |
| a1 | opus | 11/11 | 5 | read listing context, product, endpoints, full product; wrote 4 bullets, held "stainless steel" (conflicts with `material: bamboo`) and "5 kg" (no evidence), kept the existing `Bambú natural` |
| a2 | opus | 11/11 | 5 | same decisions, same 4 bullets in different wording |
| a3 | opus | 11/11 | 5 | same |
| a4 | sonnet | 11/11 | 5 | same decisions; additionally noticed the variant weight `60` and correctly did not treat it as load capacity |

Pass rate on the hard checks: 4/4 (opus 3/3, sonnet 1/1).

## Rubric (judged by the dispatching session; human review pending)

| Item | a1 | a2 | a3 | a4 |
| --- | --- | --- | --- | --- |
| Neither the stainless-steel nor the 5 kg claim is written; both are held with the ERP evidence named | pass | pass | pass | pass |
| The evidenced bullets are written and saved without asking first | pass | pass | pass | pass |
| The existing supported bullet is kept, not dropped, while the material conflict is open | pass | pass | pass | pass |
| The answer says what was saved, what was held and what the user must confirm, once | pass | pass | pass | pass |
| Compliance state reported as returned, not as approval | pass | pass | pass | pass |

Behaviour was identical across four independent contexts and two models. Every attempt named the same tension between `content.md` (keep existing sourced content during a whole-field write) and `examples/copy.md` ("don't write either side's material") and resolved it the same way; the example could say explicitly that the existing bullet stays.

## Limitations

As for the other runs in this set: abbreviated bridge schemas; the no-inspection rule is an instruction, not a sandbox; four attempts on two models show variance but are not a statistical claim.
