> Contract reference captured from the development baseline. Discover the deployed endpoint schema before writing; example values are illustrative, not merchant facts.

## Research evidence schemas, save and read

All routes are Admin-authenticated. Save evidence before a report. Reads never collect or synthesize data.

### Save and read

Create or reuse a scope:

```http
POST /admin/research/scopes
```

```json
{
  "external_key": "napkin-holders-amazon-es",
  "question": "Which napkin-holder opportunity merits more research?",
  "target_market": "amazon.es",
  "context": {
    "supplier_origin": "CN",
    "shipping_destination": "ES",
    "excluded_asins": ["B000000002"],
    "excluded_brands": ["Example Brand"]
  }
}
```

Save a retained observation:

```http
POST /admin/research/artifacts
```

```json
{
  "record_type": "evidence",
  "scope_id": "rscope_...",
  "save_key": "amazon-B000000001-2026-09-07",
  "schema_revision": "research-competitor-observation/1",
  "source": {
    "provider": "junglee/Amazon-crawler",
    "ingestion_mode": "retained",
    "source_type": "amazon_listing",
    "extractor_revision": "example-extractor-v1"
  },
  "source_observations": [{
    "source_ref": "B000000001",
    "source_url": "https://example.com/products/fictional-1",
    "observed_at": "2026-09-07T19:15:06.739Z"
  }],
  "data": {
    "asin": "B000000001",
    "brand": "Example Brand",
    "variant": "wood/metal weighted bar; structured 7 x 18 x 7 cm",
    "offers": [{
      "offer_id": "current",
      "price": 12.99,
      "currency": "EUR",
      "quantity": 1,
      "unit": "item",
      "shipping": null
    }],
    "provenance": {
      "sourceRunId": "ggO8htkw8gsb6bnTn",
      "sourceDatasetId": "BVBf5UHuFPDkbOKAa",
      "time_basis": "provider_run_finished_at"
    }
  },
  "coverage": {
    "status": "partial",
    "requested": 1,
    "returned": 1,
    "gaps": ["The original discovery run had failed requests; review text was not collected"]
  }
}
```

`observed_at` is the documented observation or collection bound. A provider-run completion time is not a page publication time. Omit it when unknown; do not manufacture a date. `save_key` identifies a retry: a new save returns `201`, the same key and payload returns the existing artifact with `200`, and changed content under that key returns `409` with `{code, message}` (`artifact_content_conflict`; an acquisition request key answers `request_content_conflict` the same way) — save the changed content under a new key. Create a new report revision with a new `save_key` and pin the intended upstream report IDs; the brief records those revisions as `id@version` values.

Save a report through the same route with `record_type: "report"`, `report_kind`, `schema_revision`, `skill_revision`, `runbook_revision`, `template_revision`, `markdown`, `data`, `coverage`, `upstream_evidence_ids`, and `upstream_report_ids`. Every referenced artifact must belong to the same scope. The server rebuilds deterministic values from the pinned evidence and stores the canonical result.

`schema_revision` identifies the structured report contract, `skill_revision` identifies the analysis skill or instruction set, `runbook_revision` identifies the workflow that produced the report, and `template_revision` identifies the analysis template used to organize this concrete report. All four are required on a new report save and describe distinct inputs to its production. Evidence records use `schema_revision` for their evidence contract and do not carry `template_revision`.

Discover a scope in a new Admin session, then read its summary, artifacts, or one artifact:

```http
GET /admin/research/scopes?external_key=napkin-holders-amazon-es&limit=20&offset=0
GET /admin/research/scopes/:scopeId
GET /admin/research/scopes/:scopeId/artifacts
GET /admin/research/scopes/:scopeId/artifacts?record_type=report
GET /admin/research/scopes/:scopeId/artifacts?record_type=report&latest=false
GET /admin/research/artifacts/:artifactId
```

Scope discovery returns `{scopes,count,limit,offset}`. A query filtered by `record_type=report` or `report_kind` returns only the latest version of each matching report by default; pass `latest=false` to request report history. Mixed artifact lists without a report filter keep their existing behavior. Artifact detail returns `{artifact,freshness}`. Freshness is advisory: it reports the saved record's age and, for reports, the age and coverage of transitive upstream evidence. It never performs collection and does not change the saved artifact.

### Evidence schemas

#### Amazon listing: `research-competitor-observation/1`

`data` contains `asin`, optional `brand`, exact `variant`, and `offers[]`. Each offer has a stable `offer_id`, `price` (`number | null`), currency, quantity, unit, and optional comparison conditions such as size type, coupon, and shipping. Market and competitor reports reuse this same immutable snapshot. Report rows identify it with `{evidence_id, source_ref, offer_id}`; submitted prices and conditions must exactly match the retained offer.

Each observation may also carry an optional `demand` block recording what Amazon itself displayed on the listing page: `monthly_purchase_volume` is `{text, floor}` — the original "bought in past month" badge and the floor parsed out of it, with `floor: null` when the text carries no readable number — and `bestseller_ranks` is `[{rank, category}]`, ranks kept under their own names with their category. The block is additive: evidence saved before it existed remains valid, and it is `null` on a variant row synthesised from the parent listing's `variantDetails`, because the badge belongs to the one page that was scraped. A `floor` is a lower bound Amazon published, never a measured sales count.

Optional review analysis requires separate `research-competitor-review-observation/1` evidence containing actual review text and its review/source/variant identity. Ratings, counts, translations, and paraphrases are not review text. Use `review_analysis.status: "unavailable"` when no original body is retained.

```json
{
  "schema_revision": "research-competitor-review-observation/1",
  "source_observations": [{"source_ref": "review-R1", "observed_at": "2026-09-07T19:15:06.739Z"}],
  "data": {
    "reviews": [{
      "review_id": "review-R1",
      "asin": "B000000001",
      "variant": "wood/metal weighted bar; structured 7 x 18 x 7 cm",
      "body": "Original retained review body"
    }]
  }
}
```

This synthetic example illustrates the schema only; its identities, prices and review text are fictional and must not be saved as research evidence. An analyzed report supplies `review_analysis: {status:"analyzed",evidence_ids:["rart_review_..."],sampling_method:"bounded retained sample",variant_scope:"B000000001 exact variant",limitations:["Convenience sample"],findings:[{finding:"Observed finding",supporting_review_refs:["review-R1"],counterexample_review_refs:[]}]}`. The server reconstructs `sample_count` from distinct retained review bodies.

#### Market measurement: `research-market-measurement/1`

`data.measurement` contains `metric_kind`, `metric_value`, `unit`, `period`, `geography`, and `provenance`, which is `"measurement"` for a measured figure or `"observed_floor"` for a floor summed from observations. Search interest, rankings, ratings, and listing counts must retain their actual metric names; they cannot be submitted as sales, market size, or growth.

An Amazon.es discovery acquisition saves up to two of these itself, keyed `apify:<run_id>:measurement:sales` and `apify:<run_id>:measurement:market_size`: the sum of the retained ASINs' monthly purchase floors (`units/month`) and that sum weighted by each ASIN's own observed EUR price (`EUR/month`), both `provenance: "observed_floor"`, `period: "past month as of <YYYY-MM-DD>"`, `geography: "ES"`. `data.basis` names the `method` (`amazon_monthly_purchase_volume_floor`), the contributing `asins`, the `uncovered_asins` that were scraped but showed no readable badge, the `unpriced_asins` that showed no EUR price, and the per-ASIN `evidence_save_keys`. A synthesised variant row carries no demand block at all — its own page was never scraped — so it appears in neither `asins` nor `uncovered_asins`. Cite them like any measurement — repeat value, unit, period, geography, `provenance`, `evidence_id`, `source_ref` and `observed_at` — and carry the limitation "observed floor for N retained ASINs; ASINs without the badge contribute 0; not a category estimate". When no retained ASIN shows the badge nothing is saved and the acquisition coverage records the gap "no Amazon monthly purchase volume observed on retained ASINs".

#### Alibaba product: `alibaba-product-projection/v1`

Use `source_ref: "alibaba:product:<productId>"`. Preserve the retained `product`, `supplier`, and `detail` objects, including product/company IDs, native currency, MOQ, tier quantities and units, trade basis, sample fields, and lead-time ladders. A product-linked company may use `original_source_ref: "alibaba:company:<companyId>"`; the server checks the company ID inside the same projection. Listing terms remain `observed_listing`, not a quote or independent verification.

Quote and completed-check claims require `research-supplier-quote/1` and `research-verification-check/1` evidence respectively. A checked verification item needs retained check evidence. Platform badges and `isFactory` fields do not prove manufacturing origin or qualification.

#### Supplier supporting terms and costs

The following objects are synthetic schema examples, not actual supplier evidence. Save only fields present in a retained statement, quote, check, or cost observation. `data.terms` may contain `moq`, `sample`, and `lead_time`; a report term must exactly repeat every typed value and condition from the cited object.

```json
{
  "schema_revision": "research-supplier-terms/1",
  "source_observations": [{"source_ref":"statement:example-1","observed_at":"2026-09-08T12:00:00.000Z"}],
  "data": {
    "supplier": {"companyId":"000000001","country":"CN"},
    "terms": {
      "moq": {"value":500,"unit":"piece","condition":"custom box revision A"},
      "sample": {"quantity":2,"price":null,"currency":null,"unit":"piece","timing":"7 days","condition":"after specification approval"},
      "lead_time": {"min_days":20,"max_days":25,"kind":"production","start_condition":"deposit received","quantity_min":500,"quantity_max":1000}
    }
  }
}
```

```json
{
  "schema_revision": "research-supplier-quote/1",
  "source_observations": [{"source_ref":"quote:example-1","observed_at":"2026-09-08T12:00:00.000Z"}],
  "data": {
    "quote": {
      "subject_ref":"alibaba:company:000000001",
      "scope":"custom box revision A",
      "valid_until":"2026-10-01",
      "trade_terms":"FOB",
      "delivery_terms":"30 days after deposit",
      "currency":"USD",
      "quantity":1000,
      "components":[{"name":"goods","amount":800},{"name":"packaging","amount":50}]
    },
    "terms": {"moq":{"value":500,"unit":"piece","condition":"custom box revision A"}}
  }
}
```

A `basis:"quote"` cost scenario repeats the quote currency, quantity, and uniquely named components exactly. The quote also identifies a supplier represented in the report, its specification scope, trade terms, delivery terms, and `valid_until`; use `null` for `valid_until` when the quote does not state a validity date. Each component uses `basis:"observed"` and cites the quote evidence ID. If any component is calculated or proposed, use `basis:"estimate"` for the scenario. A quote whose validity date has passed remains historical evidence; saving it neither refreshes nor extends that date.

```json
{
  "schema_revision": "research-verification-check/1",
  "source_observations": [{"source_ref":"check:example-1","observed_at":"2026-09-09T09:00:00.000Z"}],
  "data": {
    "verification": {"subject_ref":"alibaba:company:000000001","candidate_id":"supplier-000000001","claim":"Production plan supports the stated lead time","verifier":"Example auditor","checked_at":"2026-09-09T08:30:00.000Z","result":"Documents checked"},
    "terms": {"lead_time":{"min_days":20,"max_days":25,"kind":"production","start_condition":"deposit received","quantity_min":500,"quantity_max":1000}}
  }
}
```

For an observed cost outside a full supplier quote, use one immutable component per artifact:

```json
{
  "schema_revision": "research-cost-observation/1",
  "source_observations": [{"source_ref":"cost:example-freight","observed_at":"2026-09-09T09:00:00.000Z"}],
  "data": {"cost_component":{"name":"freight","amount":120,"currency":"USD","quantity":1000}}
}
```

### Rejections and limits

- Missing or cross-scope evidence/upstream report IDs: invalid data.
- Altered price, currency, unit, quantity, date, ASIN, product/company ID, MOQ, tier, or lead time: invalid data.
- Own ASIN/brand included after trusted scope exclusions, conflicting duplicate candidate, or more than 20 deduplicated candidates: invalid data.
- Incomparable group conditions or submitted statistics that disagree with canonical Type-7 results: invalid data. A one-item group is returned with `is_price_band: false`.
- Review analysis without actual retained text, or checked supplier state without the required evidence schema: invalid data.
- Same save key with changed content: conflict. A rejected save never hides a prior valid revision.
- Evidence/report coverage is `complete`, `partial`, or `blocked` with explicit gaps. Collection success, report availability, and independent verification remain separate states.

Markdown is retained narrative. The server validates the structured data and, for product briefs, the required section text; it does not generally parse narrative price claims. Callers must keep Markdown consistent with the returned canonical data.

JSON examples are caller input; server-computed fields (competitor `statistics`, supplier `identity_summary`, canonical report-data `schema_revision`) are returned, never submitted.
