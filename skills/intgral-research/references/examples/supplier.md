# Worked example: product and supplier research

Synthetic. Product and company IDs, prices, terms and dates are fictional and illustrate the method only. Nothing here is retained evidence; the RFQ below was never sent; reading it authorizes no acquisition, contact or purchase.

## Input

Opportunity `expandable-bamboo` from the market example. User: *Compare these three suppliers for 2,000 units delivered to Spain — which is cheapest? Prepare the questions for them.* Scope `rscope_ex_supply`, destination ES.

Retained evidence:

| evidence_id | kind | source_ref | observed_at | what it says |
| --- | --- | --- | --- | --- |
| rart_ex_p1 | alibaba-product-projection/v1 | alibaba:product:80001 (company 60001) | 2026-09-03 | expandable bamboo organizer; tiers 500-1,999 @ US $3.40/piece, 2,000-4,999 @ US $3.10/piece; MOQ 500; lead time 25 days ≤ 2,000; `isFactory: true`, badge "Verified Supplier" |
| rart_ex_p2 | alibaba-product-projection/v1 | alibaba:product:80002 (company 60002) | 2026-09-03 | expandable bamboo organizer; tier 1,000-2,999 @ US $2.85/piece; MOQ 1,000; lead time 30 days; `isFactory: false` |
| rart_ex_p3 | alibaba-product-projection/v1 | alibaba:product:80003 (company 60003) | 2026-09-03 | bamboo organizer 2-pack; tier 1,000-2,999 @ CN¥ 41.00/set; MOQ 300 sets; lead time 20 days ≤ 1,000 sets |
| rart_ex_q1 | research-supplier-quote/1 | quote:60001:Q-2026-088 | 2026-09-09 | company 60001: 2,000 × 33-50 cm, logo print, polybag, **FOB Ningbo**, USD, unit 3.05, valid until 2026-10-09, sample 2 pcs at USD 20, lead 30-35 days after deposit |

## Method

**Criteria first.** Must-have: (a) expandable 33-50 cm single unit; (b) evidence of bamboo machining capability. Preference: retail-ready packaging. Commercial basis: 2,000 units, USD, destination ES, trade terms FOB (the only quoted basis).

**Products and companies stay distinct.** Three product IDs, three company IDs, linked only through the projection's own company field. Company 60003's product is a 2-pack set — it fails criterion (a) as listed (`evidence_conflicts`: a set of two fixed trays is not an expandable single unit) and its CN¥ per-set tier is a different currency and quantity basis. It stays in the report with that outcome rather than being silently dropped or converted.

**Claim states.** Company 60001: unit price 3.05 USD is a *scoped quote* (FOB Ningbo, 2,000, valid to 2026-10-09); its listing tier 3.10 is *observed listing*. Company 60002: 2.85 is *observed listing / pending verification* with unknown trade basis — it is not comparable to 60001's FOB quote until the basis is known. "Verified Supplier" and `isFactory` are platform labels: capability stays `unknown` for all three until a `research-verification-check/1` is retained.

**Costs.** No landed cost can be computed. Unknown components: freight Ningbo→ES, duty, VAT, inspection, retail packaging. `cost_scenario` is null and `unknown_cost_components` names each. "Cheapest" is answered honestly: 60002 shows the lowest *number*, but on an unknown basis; 60001 is the only *comparable* figure and it is FOB only.

**Ranking.** On declared criteria: 60001 `hold_for_evidence` (quote in hand, capability unverified), 60002 `hold_for_evidence` (needs a quote on the same basis), 60003 `exclude` for criterion (a) with the reason recorded. No supplier is selected.

**RFQ draft.** Only unresolved questions, one set per candidate, unsent.

## Output

Report data excerpt (`product_supplier_research`, `template_revision: product_supplier_research@1`):

```json
{
  "opportunity_ref": "expandable-bamboo",
  "criteria": [{"id": "fit", "applies_to": "product", "importance": "must_have", "description": "expandable 33-50 cm single unit"}, {"id": "capability", "applies_to": "supplier", "importance": "must_have", "description": "evidence of bamboo machining capability"}],
  "commercial_basis": {"intended_quantity": 2000, "currency": "USD", "destination": "ES", "trade_terms": "FOB", "cost_basis": "one scoped FOB quote plus listing tiers", "cost_scenario": null, "unknown_cost_components": ["freight Ningbo→ES", "duty", "VAT", "inspection", "retail packaging"]},
  "suppliers": [{"id": "supplier-60002", "original_source_ref": "alibaba:company:60002", "evidence_id": "rart_ex_p2", "observed_at": "2026-09-03T07:44:00.000Z", "linked_product_ids": ["product-80002"], "moq": {"value": 1000, "unit": "piece", "condition": "listing minimum", "evidence_state": "observed_listing", "evidence_id": "rart_ex_p2", "source_ref": "alibaba:product:80002", "observed_at": "2026-09-03T07:44:00.000Z"}, "sample": {"evidence_state": "unknown", "reason": "no sample terms listed", "evidence_ids": []}, "capabilities": [], "qualifications": [], "gaps": ["trade basis of the 2.85 tier unknown", "capability unverified"], "disposition": "hold_for_evidence", "reasoning": ["lowest listed number but not on a comparable basis"], "criterion_outcomes": [{"criterion_id": "capability", "outcome": "unknown", "reason": "no verification check retained; isFactory:false is a platform field", "evidence_ids": []}]}],
  "verification_ledger": [{"claim": "Company 60001 machines bamboo in-house", "candidate_id": "supplier-60001", "evidence_ids": [], "status": "proposed"}],
  "rfq": {"status": "unsent", "questions": ["60002: quote 2,000 × 33-50 cm single unit, logo print, polybag, FOB Ningbo, USD, validity date", "60001: EXW and FOB side by side; retail box option and price; bamboo source and food-contact/finish test report", "60003: can you supply a single expandable unit rather than the 2-pack, and on what basis?"]}
}
```

What the user receives: artifact ID and revision; coverage `partial` with gaps *two of three candidates not quoted on the FOB basis; landed cost unknown; capability unverified for all*; the comparison table with each figure's state; the unsent RFQ; and the decision left to them, with the bounded next step being to obtain 60002's quote on the same basis.

## Incomplete variant: a quote that has expired

If `rart_ex_q1` carried `valid_until: 2026-08-31`, the price stays a *scoped quote* but the report marks it expired in the term's condition and the cost basis says so; the RFQ's first question becomes a re-validation. An expired quote is not replaced by the listing tier.

## Conflicting variant: two lead times for one supplier

If company 60001's projection listed 25 days and its quote said 30-35 days after deposit, the supplier row uses `{evidence_state: "conflicting", reason: "listing ladder and scoped quote disagree", references: [rart_ex_p1, rart_ex_q1]}` for lead time. The quote is the more specific statement (it names a start condition), and the report says which one a plan would rely on and why — without deleting the other.
