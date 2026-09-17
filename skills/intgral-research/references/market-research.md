# Market research

Start from the approved question, market, supplied evidence, and retained dated observations; category or concept entry is valid without a product ID.

Listing evidence gives dated offer and directional opportunity context. Rank, rating count, listing count, search interest, and price are proxies — never sales, market size, market share, or willingness to pay. The one **floor** is Amazon's "bought in past month" badge: a per-listing lower bound summed only over the retained ASINs, never a category estimate. Compare trends only across compatible dates, geography, and metrics; separate seasonality from forecast uncertainty. Copies of one source are not corroboration.

## Analysis method

1. State the decision, geography, audience task and observation window. Define what evidence would change the decision before ranking opportunities.
2. Make an evidence table with source identities, dates, coverage and comparable prices. Deduplicate repeated listings and syndicated observations; retain exclusions and their reasons.
3. Separate measured demand from hypotheses inferred from offers, reviews or search interest. Compare each hypothesis against alternative explanations and counterevidence.
4. Evaluate each opportunity against the stated criteria, recording supported, conflicted and unknown outcomes. Recommend explore, hold or reject with the next bounded check that could resolve uncertainty.
5. Chart only comparable retained measurements. Label axes, units, dates, sample counts and missing coverage; show missing values as missing rather than zero. A chart never upgrades a proxy to a market measurement.

Save a directional opportunity report: question and market, evidence-backed demand signals, audience tasks, price and offer context, gaps, risks, counterevidence, explicit unknowns, and an `explore`, `hold`, or `reject` recommendation against stated criteria.

Save as `market_research` ([payload](report-data/market_research.md), [artifacts and reuse](artifacts-and-reuse.md)) with `template_revision: market_research@1` and `skill_revision: intgral-research/market@1`.

## Done when

- `market_research` data holds `scope_decision` (market equal to the scope's), `source_selection`, `measured_metrics` (null unless a retained measurement is repeated exactly), `demand_hypotheses`, `trend_gaps`, `competition_prices` (each pinning `{evidence_id, source_ref, offer_id, observed_at}`), and `opportunities`, each with an `explore`, `hold`, or `reject` action.
- Every observed claim pins `{evidence_id, source_ref, observed_at}` and repeats the retained amount, currency, unit, and quantity; every unknown is explicit.
- The save criteria in [artifacts and reuse](artifacts-and-reuse.md) hold, and the user has the artifact ID, revision, coverage status, and every gap.
