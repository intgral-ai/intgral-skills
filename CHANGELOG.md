# Changelog

## 0.1.0 — Unreleased

- Three independently installable merchant skills: listing, research and video.
- Packaged local references and self-contained research methods.
- Private merchant workspace convention outside distribution files.
- Dependency-free content and isolated-install validation.
- Behavioral evaluation convention — scenario files, a scripted mock MCP boundary, a trace evaluator and recorded agent runs — introduced through the listing title-only journey (INT-724). Guidance only; no deployment requirement changes.
- Research: original synthetic worked examples for market, competitor, supplier and brief (positive, incomplete and conflicting variants); clarifications from baseline agent runs (report `schema_revision` declaration, floor sums as labelled lower bounds, partial reports saved rather than asked about, incomparable supplier bases, brief pinning); method revisions `intgral-research/<function>@2` (INT-725). Four research scenarios with recorded runs; the evaluator gains `forbidden_writes` and deep partial matching; the mock refuses calls missing required arguments.
- Compatibility guide rewritten as per-workflow capability discovery: required capability, discovery step, preparation-only fallback and stop condition per stage; tested environments dated; release guidance separates content/method revisions from deployment requirements (INT-730). Guidance only; no deployment requirement changes.
- Listing entry tightened: single-field edits routed explicitly, SKU-only requests edit the product catalog, shared boundaries compressed; regulatory inference limits moved to the content reference.

No ERP or MCP gateway migration is included in this release candidate.
