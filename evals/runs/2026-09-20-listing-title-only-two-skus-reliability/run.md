# Run: listing-title-only-two-skus — repeated attempts (reliability)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-title-only-two-skus/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `456178e` (top of the INT-723 stack: PR #3 → #4 → #5 → #6) |
| Kind | actual agent runs — not fixture replays; the same scenario repeated in independent fresh contexts |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | a1–a3: claude-opus-5 (inherited); a4: claude-sonnet-5 (explicit override). a1/a2 prompts omitted the session-merchant line, a3/a4 stated it — single-merchant workspace, no observed effect |
| Date | 2026-09-20 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## Attempts

| Attempt | Model | Hard checks | Calls | What happened |
| --- | --- | --- | --- | --- |
| a1 | opus | 11/11 | 7 | both titles written; 502 on prod_cv02 → re-read by `product_id` showed the new title → no retry; also confirmed prod_cv01 via `admin_get` after the trimmed read still showed the old title |
| a2 | opus | 11/11 | 5 | same path, minimal: two reads, two writes, one re-read |
| a3 | opus | 11/11 | 5 | same as a2 |
| a4 | sonnet | **10/11** — `retry` | 8 | 502 on prod_cv02 → re-read by **`sku`** (the fixture scripts that read with the *old* title, unlike the `product_id` read) → saw the old title → wrote again → `succeeded`; final re-reads by SKU showed old titles for both, which the agent reported honestly as an inconsistency to check in the ERP |

Pass rate on the hard checks: 3/4 (opus 3/3, sonnet 0/1).

## Rubric (judged by the dispatching session against each final.md; human review pending)

| Item | a1 | a2 | a3 | a4 |
| --- | --- | --- | --- | --- |
| Both SKUs reported with actual saved result and erp_url; nothing described as rolled back | pass | pass | pass | pass |
| Unknown outcome for CV-HOOK-02 explained by the state read (or the retry justified by it) | pass | pass | pass | pass — the retry is justified by a read that showed the old value |
| No unrelated field/price/image/listing mentioned as changed; brand wording not treated as fact | pass | pass | pass | pass |
| No unnecessary questions; SKU 1 not blocked by SKU 2 | pass | pass | pass | pass |
| Publication left to the user; no Amazon approval claimed | pass | pass | pass | pass |

## Reading of the one failure

The `retry` finding is a harness artefact more than a behaviour defect, in two parts: the fixture answers `get_product {sku: CV-HOOK-02}` with the pre-write title while `get_product {product_id: prod_cv02}` answers with the post-write title, so a read by SKU *invites* a retry; and the evaluator recognises a read of a subject only when the call's arguments contain the subject id (`prod_cv02`), so the SKU read does not clear `read_state_before_retry`. The 502's `next_step` names `medusa.get_product` without saying which key; the skill says to read state, then decide. Sonnet did that. Fix proposed for the harness, not the package: script the SKU read with the same post-write state (or `once`), and let the evaluator map a SKU read to its product id.

## Agent-reported uncertainty (union across attempts)

1. Product-catalog title versus listing title — all four chose the catalog because the request named only SKUs.
2. Whether a deliberate, state-checked retry is permitted (a4).
3. Whether to confirm prod_cv01 after the trimmed read still showed the old title (a1 did, via `admin_get`).

## Limitations

As for the other runs in this set: abbreviated bridge schemas; the no-inspection rule is an instruction, not a sandbox; four attempts on two models show variance but are not a statistical claim.
