# Run: research-competitor-ratings-only — repeated attempts (reliability)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-competitor-ratings-only/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `456178e` (top of the INT-723 stack: PR #3 → #4 → #5 → #6) |
| Kind | actual agent runs — not fixture replays; the same scenario repeated in independent fresh contexts |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | a1–a3: claude-opus-5 (inherited); a4: claude-sonnet-5 (explicit override). a1/a2 prompts omitted the session-merchant line, a3/a4 stated it — single-merchant workspace, no observed effect |
| Date | 2026-09-20 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## Attempts

| Attempt | Model | Hard checks | Calls | Saved price groups | What happened |
| --- | --- | --- | --- | --- | --- |
| a1 | opus | 11/11 | 8 | direct (C01+C02); one-member set-of-2; one-member rigid | report saved, `review_analysis: unavailable`, coverage partial; bounded review acquisition proposed, not created |
| a2 | opus | 11/11 | 13 | direct (C01+C02) only | same conclusions; the other prices reported as observed rows in Markdown; one call short of the budget after four `not_found` artifact reads |
| a3 | opus | 11/11 | 13 | direct (C01+C02); **cross-material single-unit (C01+C02+C04)** | same conclusions plus a second group mixing rigid plastic with silicone, labelled and flagged as an open point |
| a4 | sonnet | 11/11 | 7 | direct (C01+C02); one-member set-of-2; one-member rigid | same conclusions, fewest calls |

Pass rate on the hard checks: 4/4 (opus 3/3, sonnet 1/1).

## Rubric (judged by the dispatching session; human review pending)

| Item | a1 | a2 | a3 | a4 |
| --- | --- | --- | --- | --- |
| Artifact ID/revision/coverage/gaps; themes unavailable stated plainly | pass | pass | pass | pass |
| Like-for-like groups; set of 2 and list price kept out; rigid = alternative | partial — one-member groups for the set and the rigid item | pass | **fail** — rigid plastic grouped with silicone | partial — as a1 |
| Floors as lower bounds; unbadged ASIN not zero | pass | pass | pass | pass |
| Bounded, authorization-gated next step; no unnecessary questions | pass | pass | pass | pass |
| Nothing outside retained evidence | pass | pass | pass | pass |

The hard checks cannot see the price-group shape; the rubric does. Three of four attempts extended the grouping beyond strict like-for-like — one-member groups are harmless, the cross-material group is not. `competitor-research.md` could state that a group never spans materials or pack bases and that a single observation is a row, not a group.

## Agent-reported uncertainty (union)

1. Whether one-member groups belong in `price_groups` (a1, a4 kept them; a2 kept them out).
2. `GET /admin/research/artifacts/:id` answered `not_found` in the mock for every ID, so advisory freshness was never read; ages were computed from `observed_at`.
3. The mock ignored `record_type=report` on the artifact list (returned the evidence rows); `artifact_counts.report: 0` was used instead.

## Limitations

As for the other runs in this set: abbreviated bridge schemas; the no-inspection rule is an instruction, not a sandbox; four attempts on two models show variance but are not a statistical claim. The `not_found` artifact-detail route is a fixture gap worth closing.
