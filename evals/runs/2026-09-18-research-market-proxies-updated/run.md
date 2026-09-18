# Run: research-market-proxies — after the worked examples and clarifications

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-market-proxies/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `1efd23f` |
| Compared against | [baseline run](../2026-09-18-research-market-proxies-baseline/run.md) on the package at `a93319a` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls (baseline 10) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (8 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Sales/market size/growth null; floors as lower bounds; unbadged ASIN not zero | pass | "测量到的需求：零"; ≥700 labelled "只覆盖这两条 listing，是下限"; B0FAKE0C04 "不计入（不是 0）" |
| Two dated observations kept as points, not averaged | pass | "不平均、不当趋势"; the August row kept out of competition_prices and in trend_gaps, as the example shows |
| explore/hold/reject with counterevidence and one bounded next check | pass | explore with an explicit why-not-hold/reject; two bounded checks proposed, none started |
| Artifact ID/revision/coverage/gaps; no acquisition; no unnecessary questions | pass | rart_report_col_market_01 v1, partial; declared revisions incl. schema_revision market_research/1 |
| Own brand/preferences not used as evidence | pass | — |

## What changed versus the baseline

The three baseline uncertainties (report schema_revision, summing floors, the alternative in competition_prices) are gone: the agent cites the declared `market_research/1`, states the sum as a lower-bound inference, and keeps the alternative labelled outside the group. Tool calls 10 → 8.

## Agent-reported uncertainty

1. The mock ignores the record_type filter (known mock limit).
2. Whether the August price belongs in competition_prices or only in trend_gaps — followed the worked example.
3. Read-back of the new report returned not_found on this mock (no artifact-detail response for a freshly saved id).

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path only and ignores query strings.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
