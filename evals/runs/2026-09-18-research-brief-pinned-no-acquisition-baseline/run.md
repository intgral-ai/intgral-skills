# Run: research-brief-pinned-no-acquisition — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-pinned-no-acquisition/scenario.json` version 1 (see limitations) |
| Package under test | `skills/intgral-research` at commit `a93319a` (unchanged since the initial delivery; repository HEAD `b960487`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 12 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (12 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Pins market@2, comp@1, supplier@1; superseded v1 not used; freshness advisory, no refresh | pass | exactly those three; "v1 已被 v2 取代"; no plan or acquisition |
| Twelve sections; unknown sections cite nothing and say why | pass | "十二节齐全"; eight sections unknown with reasons |
| Proposals labelled proposed with a test; no pain points from the review-less report | pass | "提议（全部未批准）"; pain points unknown because no review bodies |
| Target cost unknown with components named; sample plan not authorized; no supplier selected | pass | freight/duty/VAT/inspection/packaging named; sample 2 件（未授权） |
| Artifact ID/revision/coverage/gaps; next steps are the unresolved decisions | pass | rart_report_col_brief_01 v1, partial, six gaps; decisions listed |

## Agent-reported uncertainty

1. The supplier report pinned evidence IDs that the scope did not list and direct reads rejected (scenario version 1 placed them in another scope — a fixture flaw, fixed in version 2); the agent cited the report, transcribed values, and surfaced the unreadability as a gap.
2. Whether private brand-wording preferences populate Brand Voice (kept unknown; quoted as non-evidence).
3. The `target_cost` basis shape (added comparable quantity/currency/date keys alongside the contract fields).

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock ignores query strings (e.g. `latest=false`) and matches on path only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
- Scenario version 1 pinned supplier evidence from another scope inside the supplier report, contradicting the same-scope contract; version 2 moves that evidence into the scope. Expectations did not change, so the updated run remains comparable.
