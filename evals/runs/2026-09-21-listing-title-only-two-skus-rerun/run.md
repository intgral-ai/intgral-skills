# Run: listing-title-only-two-skus — after INT-777 (rerun)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-title-only-two-skus/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `be4b4eb` (guidance change); harness at `552eb5c` |
| Compared against | [reliability record](../2026-09-20-listing-title-only-two-skus-reliability/run.md) on the package at `456178e` — the sonnet attempt there failed `retry` because a re-read by SKU was scripted with stale state and not recognised |
| Kind | actual agent runs — not fixture replays; fresh context per attempt |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | claude-opus-5 for every attempt (explicit override) |
| Date | 2026-09-21 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## What changed

Harness only: a read keyed on SKU whose response carries the product id now clears `read_state_before_retry`; the fixture answers post-write reads by either key with the written title. No package change.

## Attempts

| Attempt | Hard checks | Calls | What happened |
| --- | --- | --- | --- |
| a1 | 11/11 | 8 | both titles written; 502 on prod_cv02 → re-read showed the new title → no retry; the trimmed read of prod_cv01 still showed the old title once, so the agent confirmed through `admin_get` and reported the lag |

One attempt on Opus, which already passed this scenario 3/3 on 2026-09-20; the harness change is proven by the new evaluator tests (`retry-after-sku-read.jsonl`), not by this run.

## Rubric (judged by the dispatching session; human review pending)

All five items pass: both SKUs reported with their saved result and erp_url; the unknown outcome explained by the state read; nothing unrelated changed; no questions; publication left to the user.

## Limitations

Bridge schemas are abbreviated versus a live gateway; the no-inspection rule is an instruction, not a sandbox; a handful of attempts on one model show the change took, not a statistical claim.
