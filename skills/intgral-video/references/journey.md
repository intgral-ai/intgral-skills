# Generation journey through Intgral MCP

Use `medusa.list_endpoints` and `medusa.describe_endpoint` to discover exact methods, paths and input schemas. Use the available authenticated Admin tools. Missing routes or refused permissions stop the corresponding stage; the public skill may be newer than the deployment. If discovery tools are absent, continue useful brief preparation from available product reads but do not guess write schemas or submit a draft.

## Create a draft

Read the target product/variant and available media. Create through `POST /admin/video-generations` with the actual product identity, duration, aspect ratio, prompt path, optional language/placement preferences, skill version and a stable idempotency key.

Reference mode supplies product reference asset IDs and segment expert prompts, omitting a keyframe budget. Keyframe mode supplies the authorized frame budget and structured brief/beats as required; see [prompting](prompting.md). Do not copy both modes into one request.

Record returned generation ID, mode, segment durations/prompts, plan hash, frame budget and cost estimate in the private task record. Cost `estimate: null` means unknown, not free; approval cannot proceed until the backend supplies a usable sourced estimate.

## Review and approve

Read `GET /admin/video-generations/:id`. Show the current reference images in their mapped order or latest keyframes, all segment prompts, timing, known issues, sourced estimate and proposed cost cap.

For keyframe mode, record the user's per-frame decisions through the catalogued review endpoint. Reference mode has no keyframe review: the user reviews the reference order and full expert prompt.

After the user authorizes this plan and spend, call the approval endpoint with the exact current `plan_hash` and a `cost_cap` in the estimate currency, at least the estimate. Treat a changed plan hash or conflict as a reason to read, show and obtain approval for the changed plan. Do not retry approval with a new hash the user has not reviewed.

Approval freezes the snapshot and queues backend work. Changing images, actions, duration or review decisions invalidates earlier approval. A local saved note alone is not backend approval.

## Observe

Poll the existing generation by ID. Report actual status and stored/total segments; `queued`, `running`, `paused`, `failed` and `completed` are different outcomes. A timeout is not failure or permission to create a replacement.

Report requested versus measured duration, ratio and resolution when available. The server handles generation and storage after chat closes. Read [recovery](recovery.md) for resume decisions and uncertain provider submissions.

## Deliver and version

Read `GET /admin/products/:id/videos`. Generation `media_asset_ids` identify stored outputs; preserve the original asset and the generation relationship.

Use `POST /admin/video-assets/:id` only with a supported, authorized quality/selection change. Record flagged versus accepted based on actual inspection. Without video playback/inspection, report technical completion and unverified visual quality.

When the user requests local editing and the host can perform it, upload the resulting MP4 through `POST /admin/products/:id/videos`, linking its source asset and processing description. Store a new processed version and select it only if requested. The source belongs to the same product. Video assets are separate from product image fields.

Use actual returned preview/download URLs in the host. A displayed link is not proof that playback or a download succeeded. Include generation ID, selected output, version, quality state, charges/unknowns and remaining work.

## Pause

Use the catalogued pause endpoint on user request. Submitted segments may continue and incur cost; pause prevents later submissions according to backend state. Resume only according to [recovery](recovery.md) and the user's existing authorization.
