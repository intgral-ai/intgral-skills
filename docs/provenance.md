# Provenance and exclusions

This repository was assembled from selected first-party content, not a subtree publication of the ERP's full Skill history.

| Public package | First-party baseline | Adaptation |
| --- | --- | --- |
| intgral-listing | listing-walkthrough, integration snapshot c9549a69 | Local references, private merchant workspace, removal of pilot brand rules |
| intgral-research | research-workflow, integration snapshot c9549a69; ad_video additions from develop f6f57a42 (INT-695) | Local references, self-contained analysis methods, fictional schema examples, explicit deployment limits |
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
| #379 `feat/ad-research` | `evidence-schemas.md` — a `schema_revision` list filter and the new `research-ad-video-observation/1` evidence contract (Meta / TikTok ad-library video observations) |
| #385 `feat/research-tab-linking` | `artifacts-and-reuse.md` — attaching a saved report revision to a product variant through `POST /admin/research/links` |
| #373 `codex/int-659-production-mcp` | listing `references/operate.md` (new) and `review.md` — an operator account that may review, confirm, publish and delete under user authorization; this changes the package's human-publishing boundary and needs its own decision before it is ported |

When one of those merges, port the delta with the same adaptations and record the new baseline commit here.
