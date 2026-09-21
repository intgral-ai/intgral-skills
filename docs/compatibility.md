# Compatibility and capability discovery

Installing a package proves nothing about what the connected deployment can do. This guide takes each workflow from installation to a capability check whose outcome is one of three words:

- **execution-ready** — the required capability was discovered *and* confirmed by a contract the agent read (an input schema, a described endpoint, a runtime report), so the write stage can run when the user authorizes it;
- **preparation-only** — something required is absent, refused or unverified, so the agent prepares the artifact it can (a brief, a draft, an unsent RFQ, an exportable record) and stops before the dependent operation;
- **unknown** — discovery itself did not answer, and the agent says so instead of guessing.

Three things never establish a capability: a tool's *name* appearing in `tools/list`, a URL or hostname, and the fact that this repository documents the capability. Tool listing is registration, not authorization or backend availability; a hostname says nothing about function, permission or file reachability; a package may describe a route the deployment has not enabled. The only evidence is what the deployment returns.

## Discovery, in order

Every workflow discovers the same way. Later steps refine earlier ones; a stop at any step yields preparation-only.

| Step | Ask | What answers it |
| --- | --- | --- |
| 1 | Is the MCP connection authenticated and is an ERP behind it? | `medusa.get_started` (default `open_browser: false`) → `runtime.erp` is `available`, `unavailable` or `unconfigured`; `capabilities` is empty without an ERP |
| 2 | Which host abilities does the client itself have? | Fill `client_capabilities` only with what the host actually has (browser, file bytes, image generation, image rendering, local ERP access); omit unknowns. The gateway echoes them as `host_capability_source: caller_reported_not_verified` — reported, not verified |
| 3 | Which dedicated tools exist, with which input schema? | `tools/list` and each tool's `inputSchema`; the schema is the contract for that call |
| 4 | Which admin routes exist for this stage? | `medusa.list_endpoints` with the stage's prefix, then `medusa.describe_endpoint` for the exact method and path; the request schema it returns is the contract for the body |
| 5 | Does the stage's first inert read succeed? | The read route for the target entity; a `not_found`, `unauthorized` or `medusa_unavailable` here stops the stage |

`medusa_error` is a backend response, not a lost connection: keep its `code`, `next_step` and `request_id`, do not resend the same input blindly. `medusa_unavailable` is a connection or authentication failure: retry later as instructed.

## Listing

| Stage | Required capability | Discovered by | Preparation-only fallback | Stop when |
| --- | --- | --- | --- | --- |
| Query | `medusa.get_product` / `medusa.get_listing_context`; `medusa.admin_get` for fields the trimmed read omits | steps 1, 3, 4 | answer from the user's supplied facts, labelled as unsourced | the read returns `not_found` for the identifier the user gave |
| Import | `medusa.import_products` (or `medusa.create_product`) with a readable file or structured fields | step 3; `client_capabilities.file_bytes` for attachments | mapping table and per-SKU gaps without a write | the tool is absent or the host cannot read the file's bytes |
| Edit product fields | `medusa.update_product` | step 3 (its `inputSchema` names the patchable fields) | proposed copy in the answer, marked suggested, nothing saved | the field is not in the schema, or `price_source` is required and unknown |
| Edit listing copy/attributes | `medusa.update_listing`; category constraints through the discovered GET route | steps 3, 4 | draft copy with the constraints that could not be checked listed as gaps | the listing route is absent or the category schema is `unknown`/`none` for a blocking field |
| Images | `medusa.view_product_images`; `medusa.update_product` images; image review through `marketplace.get_image_review` | step 3; host image rendering for visual checks | counts and deep links; no visual acceptance claimed | the host cannot render images and the user needs a visual verdict |
| Recovery | `write_result` on every update tool, even on `isError` | the tool's output schema | read current state, report `completed_steps`, hand `unknown_steps` to the user | `next_action` is `read_state_before_retry` and the read route is unavailable |

Publication is never a capability of this package: the user publishes in the ERP.

## Research

| Stage | Required capability | Discovered by | Preparation-only fallback | Stop when |
| --- | --- | --- | --- | --- |
| Read retained evidence | `GET /admin/research/scopes`, `/scopes/:id/artifacts`, `/artifacts/:id` | step 4 with prefix `/admin/research`, then step 5 | analysis from the user's supplied evidence, labelled as unretained | no scope route is catalogued, or the scope's `external_key` returns nothing |
| Save a report | `POST /admin/research/artifacts` with the described request schema | step 4 (`describe_endpoint` on the POST) | the full report in the answer and, with a filesystem, in the private workspace — marked *not saved to ERP* | the POST is absent, refused, or returns a status other than `201`/`200` |
| Collect (acquisition) | an approved frozen plan, `POST /admin/research/plans`, admission of an acquisition with a supported capability and source | step 4; the plan schema names supported `capability`/`source` pairs | the bounded plan proposal (query, sources, ceilings) for the user to approve | the user did not authorize collection, the route is absent, or the requested market/source is not in the plan schema — never broaden to a supported one silently |
| Cancel / close | `POST /admin/research/acquisitions/:id/cancel`, plan close | step 4 | report the acquisition's last read state | the route is absent; a cancel is never simulated |

A `not_found` on the scope, or a missing POST, does not mean "no research": the four methods run on supplied evidence and produce a visibly partial artifact, unsaved.

## Video

| Stage | Required capability | Discovered by | Preparation-only fallback | Stop when |
| --- | --- | --- | --- | --- |
| Brief | product facts through the listing reads; the private workspace for preferences | steps 1, 3; filesystem for persistence | the brief and task record, exportable in chat when no filesystem exists — stated as unsaved | never; a brief is always preparable from supplied facts |
| Draft | `POST /admin/video-generations` and the mode it accepts (reference-image or keyframe) | step 4 with prefix `/admin/video`; the described schema shows the mode fields | the full plan, prompts, reference mapping and an *unknown* cost | the route is absent — this deployment's video support is **unverified**, not "coming" |
| Keyframes | the keyframe budget field in the draft schema; host image generation and rendering for review | step 4; `client_capabilities.image_generation` / `image_rendering` | reference-image mode, or a written frame description without generated frames | the deployment exposes no keyframe mode, or the host cannot show frames |
| Approve | the approval endpoint, a sourced `estimate` and the current `plan_hash` | step 4; `GET /admin/video-generations/:id` | show the plan and estimate; no approval call | `estimate` is `null` (unknown, not free), the hash changed, or the user has not authorized this exact plan and cap |
| Observe / recover | `GET /admin/video-generations/:id`, pause and resume routes | step 4 | report the last read state and the private task record | a `submission_unknown` outcome — a new paid attempt needs explicit authorization |
| Deliver | `GET /admin/products/:id/videos`; host video playback for inspection | step 4; host capability | technical completion with *visual quality unverified* | the host cannot play the media and the user needs a visual verdict |
| Local processing / upload | host media tools; `POST /admin/products/:id/videos` | host capability; step 4 | describe the processing; keep the source asset | the host cannot process media or the upload route is absent |

Voice-over and speech are outside the documented contract in every deployment; subtitles are a processing step, not a stored preference. A stored preference never implies the capability.

## Two synthetic walkthroughs

Both use the same fictional merchant, `casa-verde-es`, and product `CV-HOOK-01`.

**Complete capability set.** `get_started` reports `runtime.erp: available`; `tools/list` includes `medusa.get_product` and the admin transport; `list_endpoints` with prefix `/admin/video` returns `POST /admin/video-generations`, `GET /admin/video-generations/:id`, the approval, pause and resume routes and `GET /admin/products/:id/videos`; `describe_endpoint` on the POST shows `reference_asset_ids` and `expert_prompts` — reference-image mode is supported. The agent reads the product and its images, writes the brief, creates the draft with an idempotency key, reads it back, shows the images in mapped order with the full prompt and the sourced estimate, and waits for the user to authorize that plan hash and cost cap. This is **execution-ready**; nothing is generated until the user says so.

**Missing capability set.** Same start, but `list_endpoints` with prefix `/admin/video` returns only `GET /admin/products/:id/videos`, and `describe_endpoint` on `POST /admin/video-generations` answers `not_found`. The agent still reads the product, writes the complete brief with sourced decisions and a task record, and tells the user that this deployment exposes no video-generation route — so video generation is **unverified** here, the brief is **preparation-only**, and no provider is called directly. It does not ask for API keys, does not try another host, and does not describe the brief as queued. This walkthrough is recorded as an actual agent run: [video-brief-missing-generation-route](../evals/runs/2026-09-18-video-brief-missing-generation-route-recorded/run.md).

## Tested environments

| Claim | Environment | Date | Evidence |
| --- | --- | --- | --- |
| The three packages install alone and their references resolve | Windows 11, Node 24.14.0; GitHub CI on ubuntu-latest and windows-latest, Node 24 | 2026-09-17 | [validation](validation.md) |
| Installer copy and replacement preserve a private preference file | Skills CLI 1.7.0, Codex target, copy mode, Windows | 2026-09-17 | [validation](validation.md) |
| Behavior against a mocked MCP boundary (listing, research, video) | Claude Code desktop, claude-opus-5, scripted mock | 2026-09-18 | [evals](../evals/README.md) |
| Behavior against a live authenticated ERP | — | — | **not verified**; deliberately separate acceptance |
| Any client other than the Codex install target and the Claude Code subagent | — | — | **not verified**; discovery and UI support must be checked per client |
| Paid video or image generation, real report saves, supplier contact | — | — | **not exercised** |

A deployment that is not in this table is unverified. "Unverified" is the honest state, not a defect report: the packages are written so that a missing capability yields a bounded preparation-only result rather than a wrong action.

Research acquisition examples reflect an ES-limited development baseline (`amazon_es`, `alibaba_com` with destination `ES`); they are not generic marketplace defaults, and another market must be supported by the live plan schema. Research schema examples use fictional identities and are never evidence.

## Revisions and release guidance

Two kinds of change travel separately and are announced separately.

| Kind | Identified by | Changes when | Requires a backend change |
| --- | --- | --- | --- |
| Content and method | package `metadata.version` (repository version, `0.1.0` for this candidate); research `skill_revision: intgral-research/<function>@N` (`@2` since INT-725, competitor `@3` since INT-777); `runbook_revision: intgral-research@1`; `template_revision: <report_kind>@1`; report `schema_revision: <report_kind>/1` (the package's declaration — the deployed route stores any non-empty string); video `skill_version: intgral-video@2` (`@2` since INT-777) | the guidance, examples or analysis method change | no |
| Deployment requirement | the routes and tool schemas in the tables above; the plan schema's supported capability/source pairs; approval, review and recovery endpoints | the ERP or gateway exposes, removes or reshapes a route | yes — and until it is deployed, the package must describe it as unverified |

Release notes name which kind each entry is. A content revision never claims a route exists; a deployment requirement never changes a historical report's or task's declared identities — every saved report keeps the `runbook`, `skill`, `template` and `schema` revisions it was saved with, and every task keeps its `skill_version`. Reading an older artifact with a newer package is expected and does not rewrite it.

Package and scenario validation do not establish live ERP behavior, a paid video result or universal host support. End-to-end service acceptance is deliberately separate from building this repository — see [validation evidence](validation.md).
