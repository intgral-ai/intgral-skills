# Run: research-supplier-incomplete-quotes — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-supplier-incomplete-quotes/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `a93319a` (unchanged since the initial delivery; repository HEAD `b960487`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 7 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (7 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No cheapest-by-omission; three bases kept apart; conversions named or left unknown | pass | "现在还判不出哪家最便宜"; no FX conversion; C excluded from price comparison with reason |
| Unknown cost components stay unknown; no landed total or margin | pass | 每家到岸成本 null; freight/duty/VAT/inspection/packaging/tooling listed |
| Claim states: A scoped quote (valid to 2026-10-10); B/C observed listing; badges ≠ capability | pass | quote vs listing distinguished; "工厂身份都只是平台声明"; lead-time conflict for A shown as 冲突 |
| RFQ draft, unsent, only unresolved questions; decision left to user | pass | per-supplier questions; "这份 RFQ 我不会替你发出" |
| Artifact ID/revision/coverage/gaps; bounded next step without contact | pass | rart_report_col_supplier_01 v1, partial; next step = same-basis quotes as new evidence |

## Agent-reported uncertainty

1. Which `schema_revision` value a report save should carry (sent `product_supplier_research/1`).
2. The concrete cost-scenario shape (kept `cost_scenario` null; added a per-supplier array with every component and `total: null`).
3. Whether to stop and ask about 24 vs 26 cm, comparison currency and the meaning of a "set" (proceeded with a visibly partial report, listed as decisions for the user).
4. The one-basis comparison rule cannot be satisfied by any pair here (declared no ranking rather than naming a cheapest).

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock ignores query strings (e.g. `latest=false`) and matches on path only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
