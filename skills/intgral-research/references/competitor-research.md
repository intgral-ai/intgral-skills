# Competitor research

Use exact product, family, and variant context, known specifications, target market, optional seeds, and own-brand and source exclusions. Shortlist at most 20 competitors (fewer is valid), explaining direct/alternative classification, source membership, exclusions, and deduplication.

Worked example with a ratings-only variant and a variant conflict: [examples/competitor.md](examples/competitor.md).

## Analysis method

Only retained review bodies support customer-voice findings. Preserve raw review identity, text, date, rating, source and variant. Mark duplicates and exclusions in the analysis without deleting retained evidence. Record how the sample was selected, how many reviews were available and how many were analyzed; a convenience sample is not representative demand.

Code each usable review against the question: intended task, usage context, desired outcome, reported benefit, reported failure and purchase objection. Leave absent dimensions unknown. Attach evidence references to every theme, distinguish customer reports from verified product facts, and retain contradictory examples. State a theme's count and denominator only when the coding supports them; keep overlapping themes explicit. Ratings without review bodies cannot establish themes. Translate separately from original quotations.

Compare like-for-like variants and offers, keeping current, list, and conditional prices, currency, pack basis, shipping, coupon, availability, specifications, positioning, source URL, and observation date separate. A review finding cites actual review text with variant attribution, sample method and count, dates, and counterexamples; ratings alone cannot establish complaint themes.

A price group holds only offers that agree on every comparison condition: material class, pack basis and quantity, currency, condition and shipping basis. A single observation is a row in the Markdown, not a group. Any comparison across material or pack basis is prose labelled as an inference, never structured data.

Save the product, market, question, shortlist and reasons, comparable evidence, review findings or explicit unavailability, interpretations, gaps, and next checks. With no usable listing evidence the outcome is unavailable or failed — an honest gap, never an invented comparison. When listings are retained but review bodies are not, the report is still saved: candidates and price groups are complete, `review_analysis` is `unavailable`, coverage is `partial`, and the bounded review acquisition is proposed as the next step rather than asked about first.

Save as `competitor_research` ([payload](report-data/competitor_research.md), [artifacts and reuse](artifacts-and-reuse.md)) with `template_revision: competitor_research@1` and `skill_revision: intgral-research/competitor@3`.

## Done when

- `competitor_research` data holds `candidates` (at most 20, each classified with a reason), `price_groups` (like-for-like members, prices only), and `review_analysis` — `analyzed` with retained review bodies, otherwise `unavailable` with its reason.
- With no usable listing evidence the report is unavailable or failed, never an invented comparison.
- The save criteria in [artifacts and reuse](artifacts-and-reuse.md) hold, and the user has the artifact ID, revision, coverage status, and every gap.
