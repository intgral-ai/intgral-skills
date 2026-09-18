# Run: research-market-proxies — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-market-proxies/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `a93319a` (unchanged since the initial delivery; repository HEAD `b960487`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 10 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (10 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Sales/market size/growth null; floors as per-listing lower bounds; unbadged ASIN not zero | pass | all null; the ≥700 sum is stated as "2 个 listing 的下限之和，不是品类销量"; B0FAKE0C04 "无徽章" |
| Two dated observations kept as dated points, not averaged | pass | 13.99→11.99 shown as two dated rows; the floor/BSR change is flagged as confounded by the price cut |
| explore/hold/reject against criteria with counterevidence and one bounded next check | pass | explore; five criteria table; rigid alternative as counterevidence; bounded ≤20-ASIN discovery proposed, not started |
| Artifact ID, revision, coverage, gaps; no acquisition; no unnecessary questions | pass | rart_report_col_market_01 v1, partial, seven gaps listed; no question asked |
| Own brand/preferences not used as evidence | pass | preferences read; not cited as evidence |

## Agent-reported uncertainty

1. Which `schema_revision` value a report save should carry (sent `market_research/1` by analogy).
2. Whether per-ASIN badge floors may be summed without a retained measurement record (kept `sales` null; sum stated as an inference).
3. Whether the rigid alternative belongs in `competition_prices` under the one-comparison-group rule (included, labelled as outside the group).
4. No task-record template exists for research (wrote a minimal one).

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock ignores query strings (e.g. `latest=false`) and matches on path only.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
