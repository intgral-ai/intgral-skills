# Worked example: market research

Synthetic. Every identity, price, count and date below is fictional and illustrates the method only. Nothing here is retained evidence, and reading an example never authorizes an acquisition.

## Input

Question (scope `rscope_ex_org`, market `amazon.es`): *Is an expandable bamboo drawer organizer worth exploring?* The user asked for a report from retained evidence and no new collection.

Retained evidence, read through the catalogued artifact routes:

| evidence_id | source_ref | observed_at | variant | current price | rating (count) | "bought in past month" | rank |
| --- | --- | --- | --- | --- | --- | --- | --- |
| rart_ex_01 | B0EX00001 | 2026-08-30 | expandable bamboo, 1 unit | 18.99 EUR | 4.5 (1,140) | "Más de 300" → floor 300 | 2,410 Hogar y cocina |
| rart_ex_02 | B0EX00002 | 2026-08-30 | expandable bamboo, 1 unit | 22.50 EUR (list 26.90) | 4.3 (640) | "Más de 100" → floor 100 | — |
| rart_ex_03 | B0EX00003 | 2026-08-30 | fixed bamboo tray, set of 2 | 15.90 EUR | 4.6 (2,980) | "" → floor null | 1,120 Hogar y cocina |
| rart_ex_04 | B0EX00004 | 2026-08-30 | expandable plastic, 1 unit | 9.99 EUR | 3.9 (210) | "Más de 50" → floor 50 | — |
| rart_ex_01_jul | B0EX00001 | 2026-07-28 | expandable bamboo, 1 unit | 20.99 EUR | 4.5 (1,020) | "Más de 200" → floor 200 | 3,050 Hogar y cocina |

No `research-market-measurement/1` record is retained. The scope excludes the merchant's own brand.

## Method

1. **Decision and window.** Decision: explore, hold or reject the expandable bamboo format. Window: the 2026-08-30 snapshot, with one earlier point for B0EX00001. What would change the decision: measured sales, review text showing the task, or a price floor below the plastic alternative.
2. **Evidence table.** Five rows, four listings. `rart_ex_03` is a 2-unit set of a *fixed* tray — a different variant basis; it stays in the table as an alternative, not in the expandable price group. `rart_ex_01` and `rart_ex_01_jul` are the same ASIN on two dates: two dated points, not a trend and never averaged.
3. **Measured versus inferred.** Measured demand: none. `measured_metrics` stays `{market_size: null, sales: null, growth: null}`. The badge floors are per-listing lower bounds: B0EX00001 ≥ 300, B0EX00002 ≥ 100, B0EX00004 ≥ 50 units in the past month; B0EX00003 shows no readable badge and contributes nothing — not zero. Rating counts and ranks are proxies. Hypothesis: "buyers choose expandable formats to fit unknown drawer widths" — inferred from the offer set; alternative explanation: bamboo looks better in photos regardless of expansion. Counterevidence: the fixed tray has the most ratings and the best rank.
4. **Evaluate.** Criteria: (a) at least two direct offers above 15 EUR — supported; (b) evidence that expansion is the buying reason — unknown; (c) demand beyond floors — unknown. Result: **explore**, because (a) holds and the unknowns are cheap to resolve; not "reject" because nothing contradicts the hypothesis, not "hold" because a bounded check exists.
5. **Chart.** Not produced: three prices on one date is a table, not a series.

## Output

Report data excerpt (`market_research`, `template_revision: market_research@1`):

```json
{
  "scope_decision": {"market": "amazon.es", "category": "drawer organizers", "period": "2026-08-30 snapshot (+ 2026-07-28 point for B0EX00001)", "decision_question": "Is an expandable bamboo organizer worth exploring?"},
  "measured_metrics": {"market_size": null, "sales": null, "growth": null},
  "demand_hypotheses": [{"text": "Expandable formats are chosen to fit unknown drawer widths.", "basis": "inference", "evidence_ids": ["rart_ex_01", "rart_ex_02", "rart_ex_04"]}],
  "trend_gaps": [{"text": "B0EX00001: 20.99 EUR (2026-07-28) and 18.99 EUR (2026-08-30) are two dated points, not a series.", "basis": "unknown", "evidence_ids": ["rart_ex_01_jul", "rart_ex_01"]}],
  "competition_prices": [{"label": "B0EX00001", "amount": 18.99, "currency": "EUR", "unit": "item", "quantity": 1, "offer_id": "current", "evidence_id": "rart_ex_01", "source_ref": "B0EX00001", "observed_at": "2026-08-30T08:02:11.000Z"}],
  "opportunities": [{"id": "expandable-bamboo", "user_task": "Organize cutlery in a drawer of unknown width", "interpretation": "Two direct offers at 18.99-22.50 EUR; demand size unknown; the fixed tray is the strongest-rated alternative.", "evidence_ids": ["rart_ex_01", "rart_ex_02"], "counterevidence_ids": ["rart_ex_03", "rart_ex_04"], "unknowns": ["sales beyond per-listing floors", "why buyers choose expandable", "seasonality"], "action": "explore", "validation_next": "Retain review bodies for B0EX00001 and B0EX00002, bounded to 100 reviews each, and code them for the drawer-fit task."}]
}
```

What the user receives: the artifact ID and revision, coverage `partial` with gaps *no review bodies, no measurement record, no trend series*, the explore decision against the three criteria, the per-listing floors labelled as lower bounds, and the one bounded next check — proposed, not started, because collection needs an approved plan.

## Incomplete or conflicting variant

Suppose `rart_ex_02` had been observed twice on 2026-08-30 — once at 22.50 EUR and once at 19.90 EUR from a syndicated copy of the same page. The two rows are one source; the later copy is deduplicated and listed under exclusions with its reason. If instead the two prices came from the same crawler at different times of one day, both stay in the table as dated points and `competition_prices` carries the one the report cites, with the other named in `trend_gaps` as an intraday conflict. Neither case produces an average, and neither changes `measured_metrics` from null.

If the user had asked "how big is this market?", the honest answer is the same table: floors summed over the three badged ASINs give ≥ 450 units in the past month *for those listings* — a lower bound, never a category size — and the report says so in the limitation.
