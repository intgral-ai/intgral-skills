> Contract reference captured from the development baseline. Discover the deployed endpoint schema before writing; example values are illustrative, not merchant facts.

## `product_supplier_research` report data

Required objects are `opportunity_ref`, `commercial_basis`, `products`, `suppliers`, `verification_ledger`, and optional unsent `rfq`. Product and company IDs remain distinct and link explicitly. Observed tiers, MOQ, sample terms, lead time, capabilities, and qualifications each carry their evidence state and source reference. Quantity, unit, currency, variant, and trade basis must match retained evidence.

```json
{
  "opportunity_ref": "covered-stack",
  "criteria": [
    {"id":"product-fit","applies_to":"product","importance":"must_have","description":"Relevant enclosure mechanism"},
    {"id":"supplier-capability","applies_to":"supplier","importance":"must_have","description":"Evidence of relevant manufacturing capability"}
  ],
  "commercial_basis": {
    "intended_quantity": null,
    "currency": null,
    "destination": "ES",
    "trade_terms": null,
    "cost_basis": "historical retained listing",
    "cost_scenario": null,
    "unknown_cost_components": ["packaging", "inspection", "freight", "duty and tax"]
  },
  "products": [{
    "id": "product-0000000000001",
    "supplier_id": "supplier-000000001",
    "original_source_ref": "alibaba:product:0000000000001",
    "evidence_id": "rart_alibaba_...",
    "observed_at": "2026-01-01T12:00:00.000Z",
    "variant_interpretation": "sliding-lid bamboo tissue box",
    "specs": [],
    "price_tiers": [{
      "amount": 0.85,
      "currency": "US $",
      "unit": "piece",
      "min_quantity": 1000,
      "max_quantity": 2999,
      "source_variant": "0000000000001",
      "offer_basis": "FOB",
      "value_basis": "observed",
      "evidence_id": "rart_alibaba_...",
      "source_ref": "alibaba:product:0000000000001",
      "observed_at": "2026-01-01T12:00:00.000Z"
    }],
    "gaps": ["Exact dimensions and concept fit are unknown"],
    "criterion_outcomes": [{
      "criterion_id": "product-fit",
      "outcome": "evidence_supports",
      "reason": "The retained listing has a sliding lid",
      "evidence_ids": ["rart_alibaba_..."]
    }]
  }],
  "suppliers": [{
    "id": "supplier-000000001",
    "original_source_ref": "alibaba:company:000000001",
    "evidence_id": "rart_alibaba_...",
    "observed_at": "2026-01-01T12:00:00.000Z",
    "linked_product_ids": ["product-0000000000001"],
    "moq": {
      "value": 1000,
      "unit": "piece",
      "condition": "listing minimum",
      "evidence_state": "observed_listing",
      "evidence_id": "rart_alibaba_...",
      "source_ref": "alibaba:product:0000000000001",
      "observed_at": "2026-01-01T12:00:00.000Z"
    },
    "sample": null,
    "lead_time": {
      "min_days": 30,
      "max_days": 30,
      "kind": "production",
      "start_condition": "unknown",
      "quantity_min": 1,
      "quantity_max": 5000,
      "evidence_state": "observed_listing",
      "evidence_id": "rart_alibaba_...",
      "source_ref": "alibaba:product:0000000000001",
      "observed_at": "2026-01-01T12:00:00.000Z"
    },
    "capabilities": [],
    "qualifications": [],
    "gaps": ["Manufacturer identity and capability are unverified"],
    "disposition": "hold_for_evidence",
    "reasoning": ["A related enclosure is listed, but suitability is unknown"],
    "criterion_outcomes": [{
      "criterion_id": "supplier-capability",
      "outcome": "unknown",
      "reason": "No manufacturing verification was retained",
      "evidence_ids": []
    }]
  }],
  "verification_ledger": [{
    "claim": "Supplier can manufacture the proposed revision",
    "candidate_id": "supplier-000000001",
    "evidence_ids": [],
    "status": "proposed"
  }],
  "rfq": {"status": "unsent", "questions": ["Can you quote an approved revision?"]}
}
```

Cost scenarios list every component. A null amount uses basis `unknown`; a numeric amount names its method. Any unknown component forces `total: null`; otherwise total must equal the components. The server adds a supplier `identity_summary` from retained identity fields. It does not promote a claimed role, country, badge, quote, or listing term into verified manufacturing origin.

Unknown terms or claims use `{evidence_state:"unknown",reason,evidence_ids:[]}`. Conflicting terms use `{evidence_state:"conflicting",reason,references:[{evidence_id,source_ref,observed_at}]}`; each reference is unique and resolves to retained candidate evidence. Criteria have `applies_to` and each applicable candidate supplies exactly one `criterion_outcomes` row. `evidence_supports` and `evidence_conflicts` require candidate-appropriate evidence; `unknown` can have none.

`research-supplier-quote/1` uses `data.quote` with the cited `subject_ref`, `scope`, explicit `valid_until` date or null, `trade_terms`, `delivery_terms`, `currency`, and `quantity`; quote-backed cost scenarios must match the last two and any non-null commercial-basis trade terms. `subject_ref` must bind to an `alibaba:company:<companyId>` supplier represented in the report. `research-verification-check/1` uses `data.verification:{subject_ref,candidate_id,claim,verifier,checked_at,result}`. A `verification_ledger` row with `status:"checked"` must cite matching check evidence.
