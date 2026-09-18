# Run: research-competitor-ratings-only — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-competitor-ratings-only/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `a93319a` (unchanged since the initial delivery; repository HEAD `b960487`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Artifact ID/revision/coverage/gaps; themes unavailable stated plainly; ratings not presented as themes | pass | rart_report_col_comp_01 v1, partial; "差评主题无法给出…评分不是评论"; review_analysis unavailable in the save |
| Like-for-like: set of 2 not mixed in; list vs current separate; shipping excluded; rigid = alternative | pass | the 2-pack and list price each in their own one-member group, labelled not a band; rigid classified 替代品 |
| Floors as per-listing lower bounds; unbadged ASIN not zero | pass | "月购买量是 Amazon 公布的下限，不是销量"; B0FAKE0C04 null |
| Bounded, authorization-gated next step; no unnecessary questions | pass | amazon.reviews plan proposed for named ASINs, not created; no question asked |
| Nothing outside retained evidence; own brand excluded | pass | — |

## Agent-reported uncertainty

1. Whether to save a partial report without asking first (saved, per the Done-when).
2. Whether to ask about a review acquisition when the core question is unanswerable (offered, not asked).
3. Whether one-member price groups are wanted (included as visible partial findings).
4. A read-back GET of the saved report returned not_found on this mock (no artifact-detail response was scripted); not retried.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock ignores query strings (e.g. `latest=false`) and matches on path only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
