# Provenance and exclusions

This repository was assembled from selected first-party content, not a subtree publication of the ERP's full Skill history.

| Public package | First-party baseline | Adaptation |
| --- | --- | --- |
| intgral-listing | listing-walkthrough, integration snapshot c9549a69 | Local references, private merchant workspace, removal of pilot brand rules |
| intgral-research | research-workflow, integration snapshot c9549a69 | Local references, self-contained analysis methods, fictional schema examples, explicit deployment limits |
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
