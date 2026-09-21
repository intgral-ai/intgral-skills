# Changelog

## 0.1.0 — 2026-09-21 (tag `v0.1.0`)

- Three independently installable merchant skills: listing, research and video.
- Packaged local references and self-contained research methods.
- Private merchant workspace convention outside distribution files.
- Dependency-free content and isolated-install validation.
- Behavioral evaluation convention — scenario files, a scripted mock MCP boundary, a trace evaluator and recorded agent runs — introduced through the listing title-only journey (INT-724). Guidance only; no deployment requirement changes.
- Research: original synthetic worked examples for market, competitor, supplier and brief (positive, incomplete and conflicting variants); clarifications from baseline agent runs (report `schema_revision` declaration, floor sums as labelled lower bounds, partial reports saved rather than asked about, incomparable supplier bases, brief pinning); method revisions `intgral-research/<function>@2` (INT-725). Four research scenarios with recorded runs; the evaluator gains `forbidden_writes` and deep partial matching; the mock refuses calls missing required arguments.
- Private workspace convention rewritten as a journey with a fixed layout — first-time setup, lasting versus one-off, switching merchants, reinstall, no filesystem — identical across the three packages and pinned by a test (INT-727). Four workspace scenarios with recorded runs; the evaluator checks the run workspace, the installed package and the final answer; reinstall preservation is a test.
- Listing copy: synthetic before/after title, bullet and localization example with claim sources and tool-read limits; content.md now reads the full product before writing, holds user-stated numbers without evidence, excludes filler scenes and translated promises (INT-728). Three copy scenarios with recorded runs; the evaluator gains `forbidden_write_text` and a present-value wildcard.
- Compatibility guide rewritten as per-workflow capability discovery: required capability, discovery step, preparation-only fallback and stop condition per stage; tested environments dated; release guidance separates content/method revisions from deployment requirements (INT-730). Guidance only; no deployment requirement changes.
- Listing entry tightened: single-field edits routed explicitly, SKU-only requests edit the product catalog, shared boundaries compressed; regulatory inference limits moved to the content reference.
- Repeated agent runs as reliability evidence (INT-776), and the fixes they surfaced (INT-777): the private workspace never names or reads another merchant to resolve an unclear one and stops at the question when the host cannot ask; the video read-back states when images were not seen and marks Agent-added props as unconfirmed proposals — `intgral-video@2`; competitor price groups agree on every comparison condition, single observations are rows — `intgral-research/competitor@3`. Harness: the evaluator recognises a state read by its response, judges a call the mock refused on what it tried to send rather than as a completed write, fixtures answer post-write reads by SKU and artifact detail routes, and the stdin form for large call bodies is documented and pinned by a test.

No ERP or MCP gateway migration is included in this release.
