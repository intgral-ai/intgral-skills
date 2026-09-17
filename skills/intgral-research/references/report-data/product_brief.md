> Contract reference captured from the development baseline. Discover the deployed endpoint schema before writing; example values are illustrative, not merchant facts.

## `product_brief` report data

`sections` contains exactly the twelve keys: `product_overview`, `target_audience`, `personas`, `problems_pain_points`, `competitive_landscape`, `differentiation`, `objections`, `switching_dynamics`, `customer_language`, `brand_voice`, `proof_points`, and `success_metrics`. Each has `status`, `heading`, `content`, and `evidence_ids`; the Markdown must contain the submitted heading and content. Supported/conflicted sections cite retained evidence; unknown sections remain explicit and do not invent citations.

Also supply non-empty `specifications`, `sample_plan`, and `validation_plan`, plus `target_cost` and `handoff`. Proposed values remain proposed. `handoff.upstream_versions` must equal the `id@version` values of the reports pinned by `upstream_report_ids`; all evidence and upstream reports must share the scope.

```json
{
  "sections": {
    "product_overview": {"status":"supported","heading":"1. Product Overview","content":"Explore a compact tabletop holder for folded napkins in Amazon Spain; no redesign or launch is approved.","evidence_ids":["rart_amazon_..."]},
    "target_audience": {"status":"unknown","heading":"2. Target Audience","content":"A task-based audience is proposed; demand size is unknown.","evidence_ids":[]},
    "personas": {"status":"unknown","heading":"3. Personas","content":"Demographic attributes are unavailable.","evidence_ids":[]},
    "problems_pain_points": {"status":"unknown","heading":"4. Problems & Pain Points","content":"No original review bodies establish pain prevalence.","evidence_ids":[]},
    "competitive_landscape": {"status":"supported","heading":"5. Competitive Landscape","content":"Five dated comparators have a Type-7 median of €23.99; shipping is unknown.","evidence_ids":["rart_amazon_..."]},
    "differentiation": {"status":"conflicted","heading":"6. Differentiation","content":"Measured fit is a candidate direction; uniqueness is unproven.","evidence_ids":["rart_amazon_..."]},
    "objections": {"status":"unknown","heading":"7. Objections","content":"Fit and value objections remain hypotheses.","evidence_ids":[]},
    "switching_dynamics": {"status":"unknown","heading":"8. Switching Dynamics","content":"Actual switching behavior is unknown.","evidence_ids":[]},
    "customer_language": {"status":"unknown","heading":"9. Customer Language","content":"No verifiable original review body is retained.","evidence_ids":[]},
    "brand_voice": {"status":"unknown","heading":"10. Brand Voice","content":"No approved brand rules were supplied.","evidence_ids":[]},
    "proof_points": {"status":"supported","heading":"11. Proof Points","content":"Evidence establishes dated listing identities, prices, and supplier listing terms only.","evidence_ids":["rart_amazon_...","rart_alibaba_..."]},
    "success_metrics": {"status":"unknown","heading":"12. Success Metrics","content":"Commercial outcomes have no approved baseline or target.","evidence_ids":[]}
  },
  "specifications": [{
    "attribute": "internal napkin fit",
    "unit": "cm",
    "baseline": "Conflicting listing dimensions; no physical measurement",
    "source_or_rationale": "Recorded listing dimensions are not physical measurements.",
    "validation_method": "Measure a physical cavity and the intended folded napkin.",
    "approval_status": "unknown"
  }],
  "target_cost": {
    "status": "unknown",
    "target_or_gap": "No approved target cost or complete landed-cost basis",
    "basis": "unknown",
    "assumptions": [],
    "evidence_ids": [],
    "gaps": ["No quote, packaging, inspection, freight, duty, tax, or margin basis"]
  },
  "sample_plan": [{
    "question": "Does the proposed cavity fit the intended folded napkin?",
    "cost_status": "unknown",
    "cost_basis_or_gap": "No supplier sample quote or authorized budget",
    "authorization_status": "not_authorized"
  }],
  "validation_plan": [{
    "method": "Physical fit and withdrawal task test",
    "threshold_status": "unknown",
    "threshold_or_gap": "No approved threshold until the target napkin and cavity are measured",
    "rationale": "Recorded listing dimensions conflict and cannot establish fit",
    "evidence_to_retain": ["Measured cavity, napkin dimensions, and observed task result"],
    "status": "not_started",
    "action_on_failure": "Revise dimensions before supplier inquiry."
  }],
  "handoff": {
    "upstream_versions": ["rart_competitor_...@1", "rart_market_...@1", "rart_supplier_...@1"],
    "unresolved_decisions": ["Physical dimensions", "material", "target cost", "sample authorization"],
    "intended_workspace_outcome": "Research-only brief; no product or SKU write"
  }
}
```

The report Markdown must have twelve distinct headings matching `heading` and include each corresponding `content`. `upstream_report_ids` contains the three raw IDs; `handoff.upstream_versions` contains their exact `id@version` values.
