# Run: research-supplier-incomplete-quotes — after the worked examples and clarifications

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-supplier-incomplete-quotes/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `1efd23f` |
| Compared against | [baseline run](../2026-09-18-research-supplier-incomplete-quotes-baseline/run.md) on the package at `a93319a` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 6 tool calls (baseline 7) |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 6 passed, 1 failed (6 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| No cheapest-by-omission; bases kept apart | pass | "现在还判不出哪家最便宜"; A quote / B listing / C CN¥-per-set each with its problem named; no FX conversion |
| Unknown cost components stay unknown; no landed total | pass | A × 2000 = 2,560 USD explicitly "不是到西班牙的落地成本"; eight missing components listed |
| Claim states; badges ≠ capability; lead-time conflict visible | pass | 7 ledger rows all proposed; "平台标签，不算证据"; 25 vs 30–35 days kept as conflict |
| RFQ unsent, only unresolved questions; decision left to user | pass | common basis + per-supplier questions; "我不会替你发送" |
| Artifact ID/revision/coverage/gaps; bounded next step without contact | pass | rart_report_col_supplier_01 v1, partial; next = same-basis quotes uploaded as new evidence |

## What changed versus the baseline

**Hard-check failure, recorded as observed:** call #5 sent the bare report body as `admin_post` arguments (no `path`/`body`), which the evaluator flags as `scope`; the mock answered `not_found` and the agent corrected itself on call #6 with a compliant `{path, body}` save. This is a bridge-usage slip, not a research-method failure — a real MCP client would have refused the malformed call; the mock now does so too (commit 289c680, after this run). The baseline uncertainties about schema_revision, cost-scenario shape and whether to ask before saving are gone; 70003 was kept as hold_for_evidence rather than excluded, with the single-unit question in the RFQ.

## Agent-reported uncertainty

1. No literal evidence-state token for a scoped quote in the contract text (used `scoped_quote`).
2. The quote carries unit_price but no components[], so a quote-basis cost scenario was not constructible; left null.
3. Whether the 2-pack candidate should be excluded or held (held).
4. The merchant preference names EUR but no FX rate is retained; kept observed currencies, named the conversion as unknown.

## Limitations

- Bridge schemas are abbreviated versus a live gateway; the mock matches on path only and ignores query strings.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
