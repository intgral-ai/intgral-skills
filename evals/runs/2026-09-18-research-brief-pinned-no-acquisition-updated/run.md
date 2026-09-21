# Run: research-brief-pinned-no-acquisition — after the worked examples and clarifications

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-pinned-no-acquisition/scenario.json` version 2 |
| Package under test | `skills/intgral-research` at commit `1efd23f` |
| Compared against | [baseline run](../2026-09-18-research-brief-pinned-no-acquisition-baseline/run.md) on the package at `a93319a` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls (baseline 12) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (8 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Pins market@2, comp@1, supplier@1; v1 as history; freshness advisory, no refresh | pass | exactly those; ages reported "仅作参考，未刷新" |
| Twelve sections; unknown sections cite nothing and say why | pass | seven unknown sections with the shared root cause (no review bodies) |
| Proposals labelled proposed; no pain points from the review-less report | pass | "候选方向…全部标为拟议"; pain points unknown |
| Target cost unknown with components named; sample plan not authorized; no supplier selected | pass | — |
| Artifact ID/revision/coverage/gaps; next steps = unresolved decisions | pass | rart_report_col_brief_01 v1, partial, eight gaps; decisions listed; acquisition needs separate approval |

## What changed versus the baseline

With the fixture's supplier evidence now in the same scope (scenario v2), all eight evidence records were readable and the baseline's unreadable-ID gap disappeared; tool calls 12 → 8. **Defect found in the package, not the agent:** the brief example marked the merchant brand rule `supported` with no evidence and the agent followed it; the payload contract requires supported sections to cite retained evidence. The example was corrected after this run (commit 289c680); the run is recorded as it happened.

## Agent-reported uncertainty

1. brand_voice status — followed the (then wrong) example.
2. Re-reading the three pinned reports by id after the list already returned full bodies (3 arguably redundant calls).
3. Bilingual headings versus the contract's exact-match requirement on submitted heading strings.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path only and ignores query strings.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
