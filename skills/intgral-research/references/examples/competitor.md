# Worked example: competitor research

Synthetic. Identities, prices, ratings, review text and dates are fictional and illustrate the method only. Nothing here is retained evidence; reading it authorizes no acquisition.

## Input

Product context: the merchant's expandable bamboo drawer organizer, 33-50 cm, 7 compartments, for `amazon.es`. Question: *Which offers compete directly, and what do their customers report?* Own brand excluded by the scope.

Retained listing observations (`research-competitor-observation/1`), all 2026-08-30:

| evidence_id | source_ref | variant | current | list | rating (count) |
| --- | --- | --- | --- | --- | --- |
| rart_ex_01 | B0EX00001 | expandable bamboo 33-50 cm, 1 unit | 18.99 EUR | — | 4.5 (1,140) |
| rart_ex_02 | B0EX00002 | expandable bamboo 32-48 cm, 1 unit | 22.50 EUR | 26.90 EUR | 4.3 (640) |
| rart_ex_03 | B0EX00003 | fixed bamboo tray, set of 2 | 15.90 EUR | — | 4.6 (2,980) |
| rart_ex_04 | B0EX00004 | expandable plastic, 1 unit | 9.99 EUR | — | 3.9 (210) |

Retained review bodies (`research-competitor-review-observation/1`), `rart_ex_rev_01`, bounded sample for B0EX00001 only: 40 of 1,140 reviews, selected as the 40 most recent on 2026-08-30. Three of them, verbatim (fictional):

- review-R7 (2★, 2026-08-21): "Los separadores se mueven cuando abro el cajón, al final todo se mezcla."
- review-R12 (5★, 2026-08-18): "Encaja perfecto en mi cajón de 42 cm, la parte extensible no baila."
- review-R19 (3★, 2026-08-11): "Bonito pero el bambú llegó con una marca de agua en una esquina."

No review body is retained for B0EX00002, B0EX00003 or B0EX00004.

## Method

**Shortlist.** Four candidates. `direct`: B0EX00001, B0EX00002 (expandable bamboo, single unit). `alternative`: B0EX00003 (fixed, 2-unit set — different task fit and pack basis), B0EX00004 (expandable, plastic — same task, different material and price tier). Each classification names its reason; nothing is deduplicated because the four source_refs differ.

**Price groups.** One like-for-like group `direct-eur-item`: currency EUR, quantity 1, unit item, variant basis "expandable bamboo single unit", shipping `excluded_unknown`. Members: B0EX00001 current, B0EX00002 current. B0EX00002's list price is a separate offer_id, not a member of the current-price group. The server computes statistics; two members are two prices, not a band.

**Review coding.** Only `rart_ex_rev_01` supports customer-voice findings, and only for B0EX00001's exact variant. Sample: 40 analyzed of 1,140 available, most-recent selection — a convenience sample, stated as such. Coding against the question:

| Dimension | review-R7 | review-R12 | review-R19 |
| --- | --- | --- | --- |
| intended task | cutlery in a drawer | cutlery in a 42 cm drawer | unknown |
| reported failure | dividers shift when the drawer opens | — | cosmetic water mark |
| reported benefit | — | expandable part stays put at 42 cm | appearance |
| purchase objection | — | — | — |

Two reviews contradict each other on divider stability (R7 versus R12); both stay in the finding as supporting and counterexample refs. A theme count is stated only when the coding supports it: "dividers shift" appears in 6 of 40 coded reviews; "expandable part stable" in 9 of 40. Those are counts within a convenience sample of one variant, not prevalence.

**Ratings without bodies.** B0EX00002's 4.3 (640) and B0EX00004's 3.9 (210) establish nothing about *why*. They are reported as rating summaries; no theme is attributed to them.

## Output

Report data excerpt (`competitor_research`, `template_revision: competitor_research@1`):

```json
{
  "candidates": [
    {"evidence_id": "rart_ex_01", "source_ref": "B0EX00001", "classification": "direct", "selection_reason": "expandable bamboo, single unit, 33-50 cm", "variant": "33-50 cm, 7 compartments"},
    {"evidence_id": "rart_ex_03", "source_ref": "B0EX00003", "classification": "alternative", "selection_reason": "fixed tray sold as a 2-unit set; different task fit and pack basis", "variant": "fixed, set of 2"}
  ],
  "price_groups": [{"id": "direct-eur-item", "label": "Direct single-unit current prices; shipping unknown", "comparison": {"currency": "EUR", "quantity": 1, "unit": "item", "variant_basis": "expandable bamboo single unit", "shipping": "excluded_unknown"}, "members": [{"evidence_id": "rart_ex_01", "source_ref": "B0EX00001", "offer_id": "current"}, {"evidence_id": "rart_ex_02", "source_ref": "B0EX00002", "offer_id": "current"}]}],
  "review_analysis": {"status": "analyzed", "evidence_ids": ["rart_ex_rev_01"], "sampling_method": "40 most recent of 1,140 on 2026-08-30 (convenience sample)", "variant_scope": "B0EX00001 exact variant only", "limitations": ["one variant", "no bodies for the other three candidates", "recency-biased sample"], "findings": [{"finding": "Dividers shifting when the drawer opens is a reported failure (6/40); stability at ~42 cm is a reported benefit (9/40).", "supporting_review_refs": ["review-R7"], "counterexample_review_refs": ["review-R12"]}]}
}
```

What the user receives: artifact ID and revision; coverage `partial` with gaps *review bodies for three of four candidates not retained; one-variant convenience sample*; the price group with its two dated prices; the divider-stability finding with both quotations in the original Spanish and translations kept separate; and the bounded next check — a review acquisition for B0EX00002 (≤ 100 reviews, exact variant) if the merchant authorizes a plan.

## Incomplete variant: ratings only

Same input without `rart_ex_rev_01`. Candidates and price groups are unchanged. `review_analysis` becomes `{"status": "unavailable", "reason": "No original review body is retained; ratings 4.5 (1,140), 4.3 (640), 4.6 (2,980), 3.9 (210) are counts, not themes"}`. The report contains no complaint theme, no "customers say", and no inference from the star distribution. The user is told plainly that the complaint question cannot be answered from retained evidence, and is offered the bounded acquisition as a next step — proposed, not started.

## Conflicting variant

If B0EX00001 had two retained observations on the same day with different variant strings ("33-50 cm" and "33-55 cm"), the candidate row keeps the one whose `source_url` and `observed_at` the price cites and lists the other under exclusions as a variant conflict; the review finding's `variant_scope` names which one the reviews were attached to. A conflict is shown, not resolved by picking the more convenient value.
