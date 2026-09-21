# Run: research-competitor-ratings-only — after the worked examples and clarifications

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-competitor-ratings-only/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `1efd23f` |
| Compared against | [baseline run](../2026-09-18-research-competitor-ratings-only-baseline/run.md) on the package at `a93319a` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls (baseline 6) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 7 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Artifact ID/revision/coverage/gaps; themes unavailable stated plainly | pass | "差评主题这一半无法回答…评分只是计数，不能推出投诉主题" |
| Like-for-like groups; set of 2 and list price kept out; rigid = alternative | pass | one direct-eur-item group of two; 2-pack and rigid classified 替代品 with reasons; the per-unit 12.45 flagged as the agent's own arithmetic, not a retained price |
| Floors as lower bounds; unbadged ASIN not zero | pass | ≥200 / ≥500; B0FAKE0C04 "标识不可读" |
| Bounded, authorization-gated next step; no unnecessary questions | pass | ≤100 reviews per exact variant, after an approved frozen plan; not created |
| Nothing outside retained evidence | pass | — |

## What changed versus the baseline

The baseline's hesitation about saving a partial report without asking is gone (the reference now says so). One-member price groups were dropped in favour of a single like-for-like group with the other prices in Markdown — the stricter reading of the contract. Tool calls 6 → 5 (no failed read-back).

## Agent-reported uncertainty

1. Whether one-member price groups belong in price_groups (kept them out).
2. Whether a task record is wanted for a pure report save (minimal pointer written).
3. "不要新采集" versus proposing the bounded acquisition — proposed in prose only.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path only and ignores query strings.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
