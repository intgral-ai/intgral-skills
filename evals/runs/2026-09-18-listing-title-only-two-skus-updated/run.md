# Run: listing-title-only-two-skus — after tightening the entry

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-title-only-two-skus/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `31f920d` |
| Compared against | [baseline run](../2026-09-18-listing-title-only-two-skus-baseline/run.md) on the package at `a93319a` |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (inherited from the dispatching session) |
| Date | 2026-09-18 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 5 tool calls, same sequence as the baseline |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl` → `hard checks: 6 passed, 0 failed (5 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Both SKUs reported with actual result and erp_url; no rollback claimed | pass | per-SKU old → new title, both deep links |
| Unknown outcome for CV-HOOK-02 explained via the state read | pass | 502 + request_id, "没有盲目重试", read-back confirmed, "无需再写" |
| No unrelated field/listing described as changed; brand wording not a product fact | pass | "价格/图片/资料均未改动"; preferences read but only confirmed the requested titles already complied |
| No unnecessary questions; SKU 1 not blocked by SKU 2 | pass | no question asked |
| Publication left to the user; no approval/publication claim | pass | "没有发布；如需上架，请在 ERP 里操作" |

## What changed versus the baseline

- The baseline agent was unsure whether "标题" meant the product or the listing title and resolved it by offering the listing as a follow-up. This run reports no such uncertainty: the entry now states that a SKU-only request edits the product catalog and a listing needs an explicit listing_id.
- Files read shrank to SKILL.md, private-workspace.md, content.md and the merchant preferences; inspect.md and review.md were not needed for this path.
- Hard-check results, tool sequence and tool count are unchanged — the guidance change did not alter observed behavior, which is the intended outcome of a routing tightening.

## Agent-reported uncertainty

1. Whether the "read the private workspace at start" instruction applies to a pure field edit. It read the preferences; nothing changed as a result.
2. content.md step 5 says to read the returned `compliance`; `update_product` returned none for a catalog edit, so review.md was not loaded. This is the correct reading — compliance accompanies listing writes.

## Limitations

Same as the baseline: abbreviated schemas at the bridge, instruction-based (not sandboxed) isolation from the scenario file, one run on one model.
