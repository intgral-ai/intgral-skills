# Provenance and exclusions

This repository was assembled from selected first-party content, not a subtree publication of the ERP's full Skill history.

| Public package | First-party baseline | Adaptation |
| --- | --- | --- |
| intgral-listing | listing-walkthrough, integration snapshot c9549a69 | Local references, private merchant workspace, removal of pilot brand rules |
| intgral-research | research-workflow, integration snapshot c9549a69; ad_video additions from develop f6f57a42 (INT-695); product links from #385 (merged f6f57a42, contract re-read on develop b88fe91c) | Local references, self-contained analysis methods, fictional schema examples, explicit deployment limits |
| intgral-inventory | none: there is no first-party ERP Skill for stock. Authored from the INT-909 decision record (Q6, Q7, Q18, Q20), the INT-910 backend spec and the gateway tool contracts at intgral-erp-seam `feat/stock-changes-gateway` `058849c2` (INT-919/920; the tool descriptions, schemas and `docs/maps/stock-changes.md`), **carried ahead of their merge** | Original text and fictional SKUs; the rules the ERP and gateway enforce (source, expected quantity, refusal codes, human confirmation) are restated from the contract, not copied code; unshipped parts (reasoned `adjust` lines, most refusal codes and warnings) follow the INT-910 spec and are marked as deployment requirements |
| intgral-video | video-walkthrough, integration snapshot 22ffadae (PR #358) | Separate reference/keyframe paths, private state outside installation, focused recovery guidance; the briefing rounds, challenge rules, expert-prompt writing rules and recovery branches carried rule by rule ([audit](port-audit-video-22ffadae.md)); deployment values (enumerations, limits, prices) read from the live schema and estimate rather than restated |

The c9549a69 snapshot combines research and video development work; the video-walkthrough tree at 22ffadae is byte-identical to it, and 22ffadae is the last first-party copy before the ERP removes its bundled Skill, so this package is the complete carrier. The presence of either snapshot is not a claim that the work is deployed. ERP code and Git history were not imported or modified.

## Third-party method disposition

The original research router referred to five method packages. None is distributed here:

| Previous dependency | Public replacement |
| --- | --- |
| market-insight-product-selection | Question/criteria/evidence/counterevidence opportunity method in the market reference |
| product-review-intelligence-collector | Retained review provenance, sample accounting and exclusions in the competitor reference |
| customer-voice-analyzer | Evidence-linked review coding in the competitor reference |
| product-supplier-sourcing | Candidate criteria, verification ledger and unsent RFQ method in the sourcing reference |
| product-marketing-brief | Pinned-report synthesis and claim ledger in the brief reference |

No redistribution permission for these packages was established in the inspected source tree. Newly authored methods meet Intgral's report needs; they are not copies of the excluded method packages.

Excluded also: developer skills, merchant-specific brand manuals, actual merchant preference files, local task history, recorded research fixtures, provider secrets and all other vendored skills. Public examples use fictional identities. An ES source identifier in a contract example records a supported development capability, not a customer setting.

Links: [Agent Skills format](https://agentskills.io/specification), [Skills CLI](https://github.com/vercel-labs/skills), [MiniMax H3](https://github.com/MiniMax-AI/MiniMax-H3).

## Re-verification against the ERP integration branch (2026-09-20, INT-776)

The three packages were compared file by file with the first-party manuals on the ERP repository's `develop` at `e73d29eb` (2026-09-20) and, for video, `video-generation-v1` at `22ffadae`, because the video manual is not on `develop` yet.

| Package | ERP source on that commit | Result |
| --- | --- | --- |
| intgral-listing | `apps/mcp-gateway/mcp-skills/intgral/listing-walkthrough` | byte-identical to the snapshot `c9549a69`; differences are the adaptations in the table above only (relative links, private-workspace rule in place of the pilot brand file, the inference-free fact rule) |
| intgral-research | `apps/mcp-gateway/mcp-skills/intgral/research-workflow` | byte-identical to the snapshot; the five contract copies (`evidence-schemas.md`, `report-data/*.md`) differ only in fictionalised identifiers and the header line — every field, enum and rule is the same |
| intgral-video | `apps/mcp-gateway/mcp-skills/intgral/video-walkthrough` on `video-generation-v1` | unchanged since the snapshot |

Nothing on `develop` is unported. Content that exists only in open, unmerged ERP pull requests is deliberately **not** carried here until it merges, because an unmerged contract is not agreed:

| ERP pull request | What it changes in a first-party manual |
| --- | --- |
| #358 `video-generation-v1` | the video manual itself (the source of intgral-video) |
| #434 `feat/int-736-review-follow-ups` | the retained video-reference routes (`/admin/research/video-references`) — **carried ahead of its merge** as INT-738 (intgral-skills #15) and declared a deployment requirement in 0.2.0; recheck the routes when it merges |
| `feat/stock-changes-gateway` (INT-919/920) and the INT-910 stock-change backend, not yet a pull request into `develop` | the three stock tools (`medusa.get_stock`, `medusa.get_stock_change`, `medusa.propose_stock_changes`), the `/admin/stock-changes` and `/admin/stock-levels` routes and their line rules — **carried ahead of their merge** as `intgral-inventory` (INT-923), declared a deployment requirement in the changelog; recheck the tool schemas, the refusal codes, the warnings and the `adjust` line shape when they merge |
| #373 `codex/int-659-production-mcp` | listing `references/operate.md` (new) and `review.md` — an operator account that may review, confirm, publish and delete under user authorization; this changes the package's human-publishing boundary and needs its own decision before it is ported |

When one of those merges, port the delta with the same adaptations and record the new baseline commit here.

## Ported after the re-verification

| ERP pull request | Baseline | Ported into | Adaptation |
| --- | --- | --- | --- |
| #379 `feat/ad-research` (closed; its delta reached `develop` in the #385 merge `f6f57a42`) | the `research-ad-video-observation/1` evidence contract and `schema_revision` filter in `evidence-schemas.md` at `f6f57a42` | intgral-research `references/evidence-schemas.md` and `acquisition.md` (INT-702, intgral-skills #14, `runbook_revision: intgral-research@2`) | Carried verbatim apart from the four contract-copy differences recorded in the ERP's `skills-contract-pin.json` notes. |
| #385 `feat/research-tab-linking`, merged at `f6f57a42` | the attach instruction in `research-workflow/references/artifacts-and-reuse.md` at `f6f57a42`; the link contract re-read on `develop` `b88fe91c` — `docs/workflow/research-report-api.md` (report bodies and product links), gateway `docs/medusa-api.md` and `docs/permissions.md`, the `medusa.get_product` / `medusa.list_product_research_history` registry and schemas, and the `/admin/research/links` route and link store | intgral-research `references/artifacts-and-reuse.md` "Product links" (2026-09-29, `runbook_revision: intgral-research@4`) | The one-sentence attach instruction is expanded from the contract rather than carried verbatim: exact-SKU variant resolution, the `{artifact_id, variant_id, reason}` body with `listing_id` only for an Amazon listing of that variant, confirmation from the returned link, replacement within variant + scope + report kind with history kept, the `research_link_revision_conflict` refusal, unlink as ERP-only and its soft-delete block, and the read side (`research_links` on SKU lookups, the history tool, `research_error`, absence without `research:read`). Fictional identifiers in the scenario `research-link-report-to-sku`; no ERP code or route shape is copied. |
