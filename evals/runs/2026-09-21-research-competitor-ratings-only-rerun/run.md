# Run: research-competitor-ratings-only — after INT-777 (rerun)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-competitor-ratings-only/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `be4b4eb` (guidance change); harness at `552eb5c` |
| Compared against | [reliability record](../2026-09-20-research-competitor-ratings-only-reliability/run.md) on the package at `456178e` — three of four attempts there extended `price_groups` beyond like-for-like |
| Kind | actual agent runs — not fixture replays; fresh context per attempt |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | claude-opus-5 for every attempt (explicit override) |
| Date | 2026-09-21 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## What changed in the package

`competitor-research.md`: a price group holds only offers that agree on every comparison condition; a single observation is a row in the Markdown, not a group; a cross-material or cross-pack comparison is prose labelled as an inference. Method revision `intgral-research/competitor@3`. Harness: the four evidence rows are now served on `GET /admin/research/artifacts/:id`.

## Attempts

| Attempt | Hard checks | Calls | Saved price groups | What happened |
| --- | --- | --- | --- | --- |
| a1 | 11/11 | 9 | direct (C01+C02) only | report saved with `skill_revision: intgral-research/competitor@3`, `review_analysis: unavailable`, coverage partial; the 2-pack per-unit figure and the rigid item stated as inferences in prose |
| a2 | 11/11 | 9 | direct (C01+C02) only | same; classified the 2-pack as `direct` with the pack-basis limit in its reason (a1/a3: `alternative`) |
| a3 | 11/11 | 9 | direct (C01+C02) only | same |

Before: like-for-like grouping in 1 of 4 attempts. After: **3 of 3**, verified in the saved bodies, not from the agents' reports. All three picked up the `@3` revision from the reference.

## Rubric (judged by the dispatching session; human review pending)

| Item | a1 | a2 | a3 |
| --- | --- | --- | --- |
| Artifact ID/revision/coverage/gaps; themes unavailable stated plainly | pass | pass | pass |
| Like-for-like groups; set of 2 and list price kept out; rigid = alternative | pass | pass — 2-pack classified direct, but kept out of the group | pass |
| Floors as lower bounds; unbadged ASIN not zero | pass | pass | pass |
| Bounded, authorization-gated next step; no unnecessary questions | pass | pass | pass |
| Nothing outside retained evidence | pass | pass | pass |

## Agent-reported uncertainty (union)

1. `direct` versus `alternative` for the synthesised 2-pack row — split 1:2; either way it stays out of the price group.
2. Read-back of the saved report answered `not_found` (the fixture serves the evidence rows, not the id the save returns), so no server-computed statistics were echoed; none were asserted.
3. Whether to include the demand floors the merchant did not ask about (all did, labelled as lower bounds).

## Limitations

Bridge schemas are abbreviated versus a live gateway; the no-inspection rule is an instruction, not a sandbox; a handful of attempts on one model show the change took, not a statistical claim. The saved report's read-back is a remaining fixture gap in this scenario.
