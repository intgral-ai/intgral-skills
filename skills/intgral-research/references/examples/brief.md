# Worked example: product brief

Synthetic. The upstream reports, IDs, versions and quotations are fictional and illustrate the synthesis method only. Nothing here is retained evidence; a brief performs zero acquisition.

## Input

User: *Write and save a product brief from the existing market, competitor and supplier research. Do not collect anything new.* Scope `rscope_ex_org`.

Retained reports, read through the catalogued routes (`latest=false` to see history):

| artifact | version | kind | created | coverage | freshness |
| --- | --- | --- | --- | --- | --- |
| rart_ex_market | 1 | market_research | 2026-08-31 | partial | superseded |
| rart_ex_market | **2** | market_research | 2026-09-02 | partial (no review bodies, no measurement) | evidence 14 days old, advisory |
| rart_ex_comp | 1 | competitor_research | 2026-09-04 | partial (bodies for one variant) | evidence 16 days old, advisory |
| rart_ex_supplier | 1 | product_supplier_research | 2026-09-10 | partial (landed cost unknown) | evidence 7-13 days old, advisory |

The merchant's private preferences supply a brand tone rule ("plain, no superlatives"). That is an approved brand rule, not a product fact.

## Method

**Inventory and pin.** `upstream_report_ids: [rart_ex_market, rart_ex_comp, rart_ex_supplier]`; `handoff.upstream_versions: ["rart_ex_market@2", "rart_ex_comp@1", "rart_ex_supplier@1"]`. Version 1 of the market report is superseded and not pinned. Freshness is reported as advisory age; nothing is refreshed.

**Claim ledger.** Every candidate statement is traced to a report and its evidence, and typed:

| Proposed statement | Source | Type |
| --- | --- | --- |
| Two direct offers at 18.99-22.50 EUR (2026-08-30) | market@2 competition_prices | supported |
| Buyers choose expandable formats for unknown drawer widths | market@2 demand_hypotheses | proposal (hypothesis) |
| Dividers shifting is a reported failure (6/40, one variant) | comp@1 review_analysis | supported, bounded |
| Customers of B0EX00002 complain about … | — | **not available** (no bodies) |
| Target price 19.90 EUR | none | proposal |
| Unit cost ≈ 3.05 USD FOB | supplier@1 quote | supported as FOB only; landed cost unknown |

**Reconcile.** market@2 pins the 2026-08-30 prices; comp@1 pins the same evidence — consistent. The supplier report's product is 33-50 cm; the market report's user task is drawer-width fit — consistent. No conflict to resolve; if there had been one, recency alone would not decide it.

**Write twelve sections.** Supported sections cite evidence; unknown sections cite nothing and say why; proposals are labelled proposed with a test.

## Output

Report data excerpt (`product_brief`, `template_revision: product_brief@1`):

```json
{
  "sections": {
    "product_overview": {"status": "supported", "heading": "1. Product Overview", "content": "Proposed: an expandable bamboo cutlery organizer, 33-50 cm, for Amazon Spain. Two direct offers were observed at 18.99 and 22.50 EUR on 2026-08-30. No launch is approved.", "evidence_ids": ["rart_ex_market", "rart_ex_01", "rart_ex_02"]},
    "problems_pain_points": {"status": "supported", "heading": "4. Problems & Pain Points", "content": "Reported (one competitor variant, 40-review convenience sample): dividers shift when the drawer opens (6/40); a counterexample reports stability at 42 cm. Prevalence is unknown.", "evidence_ids": ["rart_ex_comp", "rart_ex_rev_01"]},
    "personas": {"status": "unknown", "heading": "3. Personas", "content": "Task-based only: a household organizing cutlery in a drawer of unknown width. Demographics are not evidenced.", "evidence_ids": []},
    "customer_language": {"status": "supported", "heading": "9. Customer Language", "content": "Original: \"Encaja perfecto en mi cajón de 42 cm, la parte extensible no baila.\" Translation kept separate: fits my 42 cm drawer perfectly, the expandable part does not wobble.", "evidence_ids": ["rart_ex_rev_01"]},
    "brand_voice": {"status": "supported", "heading": "10. Brand Voice", "content": "Merchant rule: plain wording, no superlatives. This is an approved brand rule, not a product fact.", "evidence_ids": []},
    "success_metrics": {"status": "unknown", "heading": "12. Success Metrics", "content": "No approved baseline or target; proposed: first-month sell-through against the per-listing floors is not a valid target because floors are lower bounds.", "evidence_ids": []}
  },
  "specifications": [{"attribute": "expanded width", "unit": "cm", "baseline": "competitors list 32-48 and 33-50", "source_or_rationale": "listing strings, not measurements", "proposed_target": "33-50 (proposed)", "validation_method": "measure a sample and three typical drawers", "approval_status": "proposed"}],
  "target_cost": {"status": "unknown", "target_or_gap": "3.05 USD FOB Ningbo quoted for 2,000; landed cost unknown", "basis": "supplier@1 scoped quote", "assumptions": [], "evidence_ids": ["rart_ex_supplier", "rart_ex_q1"], "gaps": ["freight", "duty", "VAT", "inspection", "retail packaging", "margin target"]},
  "sample_plan": [{"question": "Do the dividers hold when the drawer is opened repeatedly?", "cost_status": "known", "cost_basis_or_gap": "2 samples at 20 USD per supplier@1 quote", "authorization_status": "not_authorized"}],
  "validation_plan": [{"method": "open-close test with loaded dividers", "threshold_status": "unknown", "threshold_or_gap": "no approved threshold", "rationale": "the only retained failure theme", "evidence_to_retain": ["sample, drawer dimensions, observed movement"], "status": "not_started", "action_on_failure": "revise divider retention before any supplier decision"}],
  "handoff": {"upstream_versions": ["rart_ex_market@2", "rart_ex_comp@1", "rart_ex_supplier@1"], "unresolved_decisions": ["target price", "landed cost", "sample authorization", "supplier selection"], "intended_workspace_outcome": "Research-only brief; no product or SKU write"}
}
```

What the user receives: the artifact ID and revision; coverage `partial` with gaps *no review bodies for two direct competitors; landed cost unknown; no measured demand*; the three pinned versions; the list of unresolved decisions as next steps. No plan is created; no supplier is contacted.

## Incomplete variant: a missing upstream report

Without `rart_ex_supplier`, the brief is still written: `target_cost.status: unknown` with gap "no supplier research retained", `sample_plan.cost_status: unknown`, and `handoff.upstream_versions` lists two reports. The brief names the missing stage; it does not trigger supplier discovery.

## Conflicting variant: proposal drifting into fact

A draft section reading "Customers want a 33-50 cm organizer" is caught at the ledger check: the width is a proposal derived from competitor listings, and "want" claims demand that no evidence measures. It is rewritten as "Proposed: 33-50 cm, matching the two observed direct offers; buyer preference is untested" and marked proposed with its validation method.
