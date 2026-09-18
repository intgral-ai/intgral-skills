> Contract reference captured from the development baseline. Discover the deployed endpoint schema before writing; example values are illustrative, not merchant facts.

## `market_research` report data

Declared `schema_revision: market_research/1`.

Required objects are `scope_decision`, `source_selection`, `measured_metrics`, `demand_hypotheses`, `trend_gaps`, `competition_prices`, and `opportunities`. `scope_decision.market` must equal the trusted scope market. Every observed claim needs evidence. Competition prices pin an exact `{evidence_id,source_ref,offer_id,observed_at}` and repeat the matching amount/currency/unit/quantity. Unsupported market size, sales, and growth stay null, unless a retained `research-market-measurement/1` record — including the observed-floor sales and market-size measurements an Amazon.es acquisition saves — is repeated exactly; hypotheses and unknowns are labelled explicitly.

An observed claim uses `{text,basis:"observed",observations:[{evidence_id,source_ref,observed_at}],limitations:[...]}`. Inference and unknown claims use `{text,basis,evidence_ids}`. This prevents an artifact-level citation from hiding which source row and date support an observation.

```json
{
  "scope_decision": {
    "market": "amazon.es",
    "category": "napkin holders",
    "period": "2026-09-07 snapshot",
    "decision_question": "Which opportunity merits more research?"
  },
  "source_selection": [{
    "evidence_id": "rart_amazon_...",
    "source_ref": "B000000001",
    "observed_at": "2026-09-07T19:15:06.739Z"
  }],
  "measured_metrics": {"market_size": null, "sales": null, "growth": null},
  "demand_hypotheses": [{
    "text": "A compact covered format may help a household table task.",
    "basis": "inference",
    "evidence_ids": ["rart_amazon_..."]
  }],
  "trend_gaps": [{
    "text": "No comparable dated trend series is retained.",
    "basis": "unknown",
    "evidence_ids": []
  }],
  "competition_prices": [{
    "label": "Example Brand B000000001",
    "amount": 12.99,
    "currency": "EUR",
    "unit": "item",
    "quantity": 1,
    "offer_id": "current",
    "evidence_id": "rart_amazon_...",
    "source_ref": "B000000001",
    "observed_at": "2026-09-07T19:15:06.739Z"
  }],
  "opportunities": [{
    "id": "covered-stack",
    "user_task": "Keep napkins presentable on a household table",
    "interpretation": "Explore a measured-fit format without claiming demand.",
    "evidence_ids": ["rart_amazon_..."],
    "counterevidence_ids": [],
    "unknowns": ["No review text, sales measurement, or trend series"],
    "action": "explore",
    "validation_next": "Measure the intended napkin and test the withdrawal task."
  }]
}
```
