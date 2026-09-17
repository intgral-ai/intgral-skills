# Product brief

Build from exact saved evidence and report revisions. The brief performs zero acquisition: it never refreshes a source, selects a supplier, creates a product or SKU, or authorizes procurement. Missing upstream evidence limits the brief and never forces collection; name the missing stages and coverage.

## Synthesis method

Inventory the exact upstream report revisions and their coverage. Build a claim ledger connecting each proposed brief statement to those reports and their retained evidence. Reconcile conflicts explicitly; recency alone does not make one claim correct.

Write the sections below using supported findings, clearly labeled proposals and explicit gaps. Derive differentiation only against the actual comparator set. Keep proposed targets separate from measured baselines and identify how each proposal could be tested. Check the finished brief back against its claim ledger and pinned revisions before saving.

Keep all twelve sections, explicitly unknown ones included: Product Overview, Target Audience, Personas, Problems & Pain Points, Competitive Landscape, Differentiation, Objections, Switching Dynamics, Customer Language, Brand Voice, Proof Points, Success Metrics.

Material user, scenario, and differentiation claims keep the chain source observation → interpretation → product implication → counterevidence or unknown → proposed verification. Personas are task-based when demographics lack evidence. Customer language is short verifiable original quotation; translations and paraphrases stay separate.

Also include specifications (baseline, proposed target and tolerance, rationale, validation method, approval status), a target-cost basis (comparable quantity, currency, date, unknown components), a sample plan (quantity, rationale, cost, timing, owner, authorization), and a validation plan (threshold, evidence, owner, status, failure action).

Save as `product_brief` ([payload](report-data/product_brief.md), [artifacts and reuse](artifacts-and-reuse.md)) with `template_revision: product_brief@1` and `skill_revision: intgral-research/brief@1`.

## Done when

- `product_brief` data holds all twelve `sections` (each with status, heading, content, evidence IDs — unknown sections cite nothing), non-empty `specifications`, `sample_plan`, and `validation_plan`, `target_cost`, and `handoff` whose `upstream_versions` equal the `id@version` of every pinned upstream report.
- The Markdown carries the twelve headings and their content; every proposal stays marked proposed.
- The save criteria in [artifacts and reuse](artifacts-and-reuse.md) hold, and the user has the artifact ID, revision, coverage status, and every gap.
