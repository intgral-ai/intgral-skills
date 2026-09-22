# Changelog

## 0.1.0 — Unreleased

- Three independently installable merchant skills: listing, research and video.
- Packaged local references and self-contained research methods.
- Private merchant workspace convention outside distribution files.
- Dependency-free content and isolated-install validation.
- Behavioral evaluation convention — scenario files, a scripted mock MCP boundary, a trace evaluator and recorded agent runs — introduced through the listing title-only journey (INT-724). Guidance only; no deployment requirement changes.
- Research: original synthetic worked examples for market, competitor, supplier and brief (positive, incomplete and conflicting variants); clarifications from baseline agent runs (report `schema_revision` declaration, floor sums as labelled lower bounds, partial reports saved rather than asked about, incomparable supplier bases, brief pinning); method revisions `intgral-research/<function>@2` (INT-725). Four research scenarios with recorded runs; the evaluator gains `forbidden_writes` and deep partial matching; the mock refuses calls missing required arguments.
- Listing copy: synthetic before/after title, bullet and localization example with claim sources and tool-read limits; content.md now reads the full product before writing, holds user-stated numbers without evidence, excludes filler scenes and translated promises (INT-728). Three copy scenarios with recorded runs; the evaluator gains `forbidden_write_text` and a present-value wildcard.
- Compatibility guide rewritten as per-workflow capability discovery: required capability, discovery step, preparation-only fallback and stop condition per stage; tested environments dated; release guidance separates content/method revisions from deployment requirements (INT-730). Guidance only; no deployment requirement changes.
- Video: rule-by-rule audit of the port against the ERP's video-walkthrough Skill at integration snapshot 22ffadae (PR #358), recorded in [docs/port-audit-video-22ffadae.md](docs/port-audit-video-22ffadae.md); the briefing now carries the round-based questioning (seven elements, six style axes, per-beat confirmation), the twelve challenge rules, beat types and delegation limits; the reference-image path carries the full expert-prompt template, twelve writing rules, a fictional worked prompt, duration guidance and positive phrasing with a preference avoid list; keyframe review completeness, the iteration ladder, and balance/rate-limit/provider-rejection recovery rows are added; the preference example and task record gain the style axes, storyboard, challenge and iteration sections — `intgral-video@3`, following INT-777's `@2` (INT-799). Guidance only; no deployment requirement changes.
- Listing entry tightened: single-field edits routed explicitly, SKU-only requests edit the product catalog, shared boundaries compressed; regulatory inference limits moved to the content reference.

No ERP or MCP gateway migration is included in this release candidate.
