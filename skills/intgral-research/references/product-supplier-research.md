# Product and supplier research

Keep product discovery and company discovery distinct while preserving their links; never join companies by name alone. Product evidence covers identity, variants, specifications, images, price tiers, MOQ, customization, packaging, samples, tooling, lead time, trade terms, and destination; supplier evidence covers identity, location, linked products, claimed role, capabilities, capacity, similar work, quality, and qualification statements. Both stay **pending** verification where the source only makes a marketplace claim.

## Analysis method

Define must-have criteria, optional preferences, destination, comparable quantity and commercial basis before comparing candidates. Use separate approved product and supplier discovery capabilities; a missing capability leaves that stage pending.

For each candidate, record one supported/conflicted/unknown outcome per applicable criterion, with evidence and a verification action for each material unknown. Match products to companies only through retained source identifiers or explicit links. Distinguish claimed manufacturer status from independently checked capability. Rank only on declared criteria; explain ties, exclusions and coverage limits.

Prepare an unsent RFQ that asks only unresolved commercial or technical questions: exact variant, quantities, customization, packaging, sample terms, lead time, delivery basis and evidence needed for claimed qualifications. The research task produces a draft; it does not send messages, buy samples or select a supplier on the user's behalf.

Label each material claim: observed listing / pending verification, supplier statement / pending verification, scoped quote, independently checked (evidence, date, result), or unknown / conflicting. A badge, certificate image, quote, or marketplace label does not establish factory capability or qualification.

Keep quantity tiers, sample currency, customization MOQs, and quantity-dependent lead times separate from catalog prices; compare like-for-like variants, packaging, tiers, currency, tax, and delivery terms; separate advertised price, quote, estimate, and target cost. A landed-cost scenario names every component with source and date; a partial subtotal is not a landed cost or margin.

Save as `product_supplier_research` ([payload](report-data/product_supplier_research.md), [artifacts and reuse](artifacts-and-reuse.md)) with `template_revision: product_supplier_research@1` and `skill_revision: intgral-research/supplier@1`.

## Done when

- `product_supplier_research` data holds `opportunity_ref`, `criteria`, `commercial_basis` (every unknown cost component named), `products` and `suppliers` (distinct IDs, explicit links, one `criterion_outcomes` row per applicable criterion), `verification_ledger`, and an unsent `rfq`.
- Every term and claim carries an evidence state; `checked` cites check evidence; every cost scenario names every component, and quotes and costs repeat their evidence exactly.
- The save criteria in [artifacts and reuse](artifacts-and-reuse.md) hold, and the user has the artifact ID, revision, coverage status, and every gap.
