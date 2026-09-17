# Run: listing-title-only-two-skus — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-title-only-two-skus/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `a93319a` (last change to the package before this run; repository HEAD `0ef7fc1`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 6 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Both SKUs reported with actual result and erp_url; no rollback claimed | pass | table per SKU, both deep links, no rollback language |
| Unknown outcome for CV-HOOK-02 explained via the state read | pass | 502 + request_id disclosed, "没有盲目重试", read-back showed the new title |
| No unrelated field/listing described as changed; brand wording not a product fact | pass | "profile / 价格 / 图片均未改动", listing explicitly untouched |
| No unnecessary questions; SKU 1 not blocked by SKU 2 | pass | no question asked; listing title offered as an optional follow-up |
| Publication left to the user; no approval/publication claim | pass | "仍是草稿状态…没有发布" |

## Agent-reported uncertainty

1. Whether "标题" means the product catalog title or the marketplace listing title. The agent chose the product title (no listing named, no listing tool offered) and offered the listing as a follow-up instead of asking.
2. Whether `medusa.get_started` is expected every session. It was not called; no connection or capability question arose.
3. Whether a read-back after a clean `succeeded` is expected. It was not done; the returned `updated` was used.

## Limitations

- The bridge is a CLI over scripted responses; tool schemas are abbreviated (`"title": "string?"`), so the skill's "read the inputSchema" step saw less than a live gateway exposes.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox. It reported reading only the installed package and the workspace.
- One run, one model. Not a statistical claim.
