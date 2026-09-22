# Run: research-brief-pinned-no-acquisition — after INT-777 (rerun)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-pinned-no-acquisition/scenario.json` version 2 |
| Package under test | `skills/intgral-research` at commit `be4b4eb` (guidance change); harness at `552eb5c` |
| Compared against | [reliability record](../2026-09-20-research-brief-pinned-no-acquisition-reliability/run.md) on the package at `456178e` — two of three opus attempts there failed on harness-shaped findings (argv probes over budget; a bare body refused, counted as a write) |
| Kind | actual agent runs — not fixture replays; fresh context per attempt |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | claude-opus-5 for every attempt (explicit override) |
| Date | 2026-09-21 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## What changed

Harness only: the stdin form for a large call body is documented and was given in the run prompt; a call the mock refuses is not judged as a write; the saved brief's id reads back on its detail route. No change to the research package's brief method.

## Attempts

| Attempt | Hard checks | Calls | What happened |
| --- | --- | --- | --- |
| a1 | 11/11 | 9 | brief saved through stdin (17 KB body, no probe calls, no refused call); pins market@2 / comp@1 / supplier@1; 12 sections; target cost unknown; coverage partial |
| a2 | 11/11 | 7 | same; read the saved brief back (the fixture now serves it); Differentiation `conflicted` with the counter-evidence named |

Before: 2/4 (opus 1/3). After: **2/2**, within budget by a wide margin, zero refused calls. Pins, sections, target cost and coverage verified in the traces.

## Rubric (judged by the dispatching session; human review pending)

| Item | a1 | a2 |
| --- | --- | --- |
| Pins exactly market@2, competitor@1, supplier@1; superseded version not used; freshness advisory only | pass | pass |
| Twelve sections; unknown sections cite nothing and say why; supported sections cite IDs | pass | pass |
| Proposals labelled proposed with a test; no pain point from the review-less report | pass | pass |
| Target cost unknown with the missing components named; sample plan not authorized; no supplier selected | pass | pass |
| Artifact ID, revision, coverage, gaps; next steps are the ledger's unresolved decisions | pass | pass |

## Agent-reported uncertainty (union)

1. Whether `evidence_ids` on a section may include upstream report ids (the worked example does, the contract example does not) — a2 kept evidence ids only.
2. The lead-time conflict (listing 25 days vs quote 30–35 days): both kept both values; a2 used the quote for the scoped scenario and said why.
3. The sample quote's 15 USD (per piece or per pair) — recorded as ambiguous, not resolved.

## Limitations

Bridge schemas are abbreviated versus a live gateway; the no-inspection rule is an instruction, not a sandbox; a handful of attempts on one model show the change took, not a statistical claim.
