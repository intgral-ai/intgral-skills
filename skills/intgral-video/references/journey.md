# Generation journey through Intgral MCP

Use `medusa.list_endpoints` and `medusa.describe_endpoint` to discover exact methods, paths and input schemas. Use the available authenticated Admin tools. Missing routes or refused permissions stop the corresponding stage; the public skill may be newer than the deployment. If discovery tools are absent, continue useful brief preparation from available product reads but do not guess write schemas or submit a draft. A conflict response carries a message: relay it to the user as returned, and neither retry the same call nor switch to another route to get past it.

## Create a draft

Read the target product/variant and available media. Create through `POST /admin/video-generations` with the actual product identity, duration, aspect ratio and resolution from the deployed schema, prompt path, optional language/placement preferences, skill version and a stable idempotency key. Record the desired result and the executable result separately when they differ, and report both.

Reference mode supplies product reference asset IDs and segment expert prompts, omitting a keyframe budget. Keyframe mode supplies the authorized frame budget and structured brief/beats as required; see [prompting](prompting.md). Do not copy both modes into one request.

Record returned generation ID, mode, segment durations/prompts, plan hash, frame budget and cost estimate in the private task record. The estimate exists only once a draft does: before one, the price is unknown, and creating the draft — free, nothing generated — is how to learn it, with the user's agreement. Cost `estimate: null` means unknown, not free; approval cannot proceed until the backend supplies a usable sourced estimate.

## Review and approve

Read `GET /admin/video-generations/:id`. Show the current reference images in their mapped order or latest keyframes, all segment prompts, timing, known issues, sourced estimate and proposed cost cap, together with the recorded brief decisions and their sources; a decision without a source stops here. In keyframe mode, place each beat's compiled English sentence beside its frame: the user confirms that English, not the Agent's paraphrase.

For keyframe mode, record the user's per-frame decisions through the catalogued review endpoint. Reference mode has no keyframe review: the user reviews the reference order and full expert prompt.

After the user authorizes this plan and spend, call the approval endpoint with the exact current `plan_hash` and a `cost_cap` in the estimate currency, at least the estimate. Treat a changed plan hash or conflict as a reason to read, show and obtain approval for the changed plan. Do not retry approval with a new hash the user has not reviewed. Record in the task record the `plan_hash` the user actually reviewed; an earlier "approve it" covers only that hash. A frame approved since by another ERP user is not this user's review: show what changed and ask again.

Approval freezes the snapshot and queues backend work. Changing images, actions, duration or review decisions invalidates earlier approval. A local saved note alone is not backend approval.

## Observe

Poll the existing generation by ID. Report actual status and stored/total segments; `queued`, `running`, `paused`, `failed` and `completed` are different outcomes. A timeout is not failure or permission to create a replacement.

Report requested versus measured duration, ratio and resolution when available, and the stored assets' probe results (codec, frame rate, audio track, AI-content label) as returned. The server handles generation and storage after chat closes; do not trigger the same work again to speed it up. Read [recovery](recovery.md) for resume decisions and uncertain provider submissions.

## Deliver and version

Read `GET /admin/products/:id/videos`. Generation `media_asset_ids` identify stored outputs; preserve the original asset and the generation relationship.

Use `POST /admin/video-assets/:id` only with a supported, authorized quality/selection change. Record flagged versus accepted based on actual inspection. Without video playback/inspection, report technical completion and unverified visual quality.

When the user requests local editing and the host can perform it, upload the resulting MP4 through `POST /admin/products/:id/videos`, linking its source asset and processing description. Store a new processed version and select it only if requested. The source belongs to the same product. Video assets are separate from product image fields.

Every generated video keeps its AIGC provenance label (container metadata `mdta:AIGC`), and every final carries the burned-in label `Generado con IA · AI-generated` (the EU AI Act Article 50 disclosure; the final asset records it as `source.ai_label`). Edit the stored original with its metadata kept, e.g. `ffmpeg -i original.mp4 … -map_metadata 0 -movflags +use_metadata_tags out.mp4`, and never crop, cover or blur the burned-in label or promise a version without it. An upload that lost the label is refused with a 400 before anything is stored: fix the file and upload it once; never resend the same file.

Use actual returned preview/download URLs in the host. A displayed link is not proof that playback or a download succeeded. Include generation ID, selected output, version, quality state, charges/unknowns and remaining work.

Deleting a version is a person's act in the ERP: the product page's media panel, **Delete version**, with a confirmation. The catalogue lists `DELETE /admin/video-assets/:id`, but agents are not granted it: never call it, and never claim a version was deleted. Tell the user what deletion does: the version row and its stored file go permanently; the generation, its cost and spend record stay (no refund), and its `media_asset_ids` keep the id as history only. A processed version made from the deleted one is its own file and stays. The selected version cannot be deleted (409): the user picks another first — change the selection with `POST /admin/video-assets/:id` only when the user asks. Deleting the newest version frees its number for the next one. Afterwards, read the product's videos again before reporting what remains.

## Pause

Use the catalogued pause endpoint on user request. Submitted segments may continue and incur cost; pause prevents later submissions according to backend state. Resume only according to [recovery](recovery.md) and the user's existing authorization.
