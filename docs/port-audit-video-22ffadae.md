# Port audit: intgral-video against video-walkthrough at 22ffadae (INT-799)

Source of truth: the ERP's bundled Skill `apps/mcp-gateway/mcp-skills/intgral/video-walkthrough/` at integration snapshot `22ffadae` (origin/video-generation-v1, PR #358): `SKILL.md` and seven references, 822 lines. That tree is byte-identical to the `c9549a69` snapshot the package was first ported from, and it is the last first-party copy before the ERP deletes its bundle (ERP PR #407), so `skills/intgral-video/` must carry every user-facing rule on its own.

Method: every rule, step, refusal condition, required field, cost or approval boundary, prompt-format rule, recovery branch, preference or task-record field and briefing question in the eight ERP files was listed and matched against the package. Each row below ends in one of three states:

- **carried** — a counterpart already existed; the location is the package file and section.
- **added** — ported in this change (INT-799); the location names the file and section.
- **excluded** — not restated, with a reason a reviewer can check and, for any deployment value, where the agent obtains it at runtime.

Valid exclusion reasons are ERP-internal mechanics, merchant-specific data, third-party dependency or detail, and duplication of a rule already present. Line references are to the ERP file at `22ffadae`. Package paths are relative to `skills/intgral-video/`.

Result across 162 rows: **43 rules added outright, 34 existing rules extended, 71 carried unchanged, 14 rows excluded** (plus 18 deployment values or ERP-internal details excluded inside otherwise carried rows); **no user-facing rule was dropped**. Everything excluded is either restated elsewhere in the package, obtained from the deployed schema, tool description or sourced estimate at runtime, or is merchant/provider/ERP-internal detail. The guidance changed, so the package declares `skill_version: intgral-video@3` (`@2` is taken by INT-777 on the 0.1.0 release branch); `metadata.version` stays at the repository version `0.1.0` per the [release guidance](compatibility.md#revisions-and-release-guidance).

## SKILL.md (97 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| Frontmatter description: one SKU, 4–15 s (35 max, segmented above 15), reference mode default, 0 keyframes, Agent-written three-field prompt, keyframes only on drift, approve then generate, originals and processed versions stored, lasting vs one-off (L3) | SKILL.md description and steps 1–5; prompting.md "Two prompt paths" (35 s ceiling with backend split) | carried; ceiling added |
| One target video per task; speak only from actual tool results; unperformed checks reported as not checked (L9–10) | SKILL.md intro and step 5 | carried |
| Installation: copy the directory into the host's skills directory (L14–15) | Repository [installation guide](installation.md); the package itself is installer-agnostic | excluded — ERP-internal install path under a merchant-named directory; the public install procedure is documented at repository level |
| Lasting preferences live only in the local copy; the gateway does not save them; back up before an update (L16–17) | private-workspace.md (workspace outside the package; dated backup before a change) | carried (adapted: outside the package rather than inside the local copy) |
| Task record per task copied from the template; answers, storyboard, challenge conclusions, request and iterations recorded there; resume from it (L18–20) | assets/task-record-template.md intro, "Storyboard", "Challenge record", "Iterations and recovery" | carried; storyboard and challenge sections added |
| Read preferences first, then ask only what preferences and product data cannot answer; every item has a source; no source, no task (L21–22) | briefing.md intro and "Rounds" ("The draft is created only when every decision row has a source") | carried; draft gate added |
| Script and subtitle languages recorded separately; pt-BR is not pt-PT (L23) | briefing.md table, Text row (regional variant) | added |
| No voice-over: do not ask about dubbing (L24) | SKILL.md "Capabilities" ("never ask the user to choose a voice-over language") | added |
| Lasting vs one-off table: one-off edits change only this plan; explicit future intent updates preferences and is not re-asked; praise or self-assessment changes nothing; ambiguous intent asked once (L28–33) | private-workspace.md "Applying and changing rules"; briefing.md "Rounds" (never re-ask a sourced decision) | carried |
| Lasting answers from the briefing go to the avoid list and are written positively (L34) | prompting.md "Positive phrasing"; assets/preferences.example.md "Avoid list" | added |
| A verified local processing method may be offered for reuse; written only with agreement and only as executable steps (L35) | assets/preferences.example.md "Verified processing methods" | added |
| Preference change procedure: read latest, name conflicts, keep the previous version, write, log, read back, report (L37–38) | private-workspace.md "Applying and changing rules"; preferences.example.md "Lasting rules and changes" | carried (adapted: dated backup outside the package instead of an in-file previous version) |
| A running generation uses frozen inputs; later preference changes are not retroactive (L39) | private-workspace.md ("A lasting change does not retroactively change an approved backend snapshot") | carried |
| Capability check: confirm the video routes are catalogued and POST is permitted; otherwise do only what is possible, report the blocker, never impersonate with another endpoint (L43–44) | SKILL.md step 2; journey.md intro; [compatibility guide](compatibility.md#video) | carried |
| Default reference mode: truth images (≤5) attached directly, no keyframes; server status note (L45) | SKILL.md step 3; prompting.md "Reference images" | carried; the server-status note is excluded — ERP-internal implementation status; the agent confirms the mode from the returned `mode` field |
| Keyframes only in keyframe mode, produced by the host image tool; without it, say so and stop before keyframes (L46) | keyframes.md last paragraph | carried |
| No dubbing or dialogue; the compiled path adds the no-speech sentence, expert prompts must contain it; no dialogue tags (rejected); subtitles are post-processing, recorded in preferences and in the request's language field, reported as "saved, not implemented"; the user decides whether to proceed without subtitles, no silent downgrade (L47–50) | SKILL.md "Capabilities"; prompting.md "Reference images" (required sentence, tags, length) and "Compiled keyframe mode" (compiled path adds it) | carried; user decision and compiled-path sentence added |
| Distinguish desired from executable; report both (L51) | journey.md "Create a draft"; assets/task-record-template.md "Desired result / executable result" | carried; reporting rule added |
| Journey pointers (L55–58) | SKILL.md steps 1–5 link the references | carried |
| Step 1 sourcing: pick clear consistent product images; web search allowed when insufficient with sources kept; external material gives composition, lighting and mood only; no invented size, price or effect (L60–61) | SKILL.md "Facts and costs"; briefing.md "Rounds" (external references with sources, never product truth) | carried; web-reference allowance added |
| Step 2 reference-mode request: one truth image per product, ≤5, order = Picture N, no keyframe budget, 4–15 s single segment, aspect ratio required, expert prompt in the segment, prompt shown beside images at review (L62–66) | journey.md "Create a draft"; prompting.md "Reference images" | carried; one-per-product added |
| Step 2 keyframe-mode request: brief fields (style, setting, lighting with direction, product name and nonempty preserve, soundscape, music or null), beats (≥1.5 s, action, shot, camera; sum = segment; last beat static hold), duration split by the backend, resolution, aspect ratio, idempotency key, authorized keyframe budget only (L67–73) | prompting.md "Compiled keyframe mode"; briefing.md "Read-back"; journey.md "Create a draft" (resolution from the deployed schema) | carried; resolution and preserve size added. Default aspect ratio and the 768P value are excluded — deployment defaults; the agent reads them from `describe_endpoint` on the draft route |
| Step 3 keyframes: segment 0 first frame; every non-final segment's last frame is the next first frame; reserve → generate with the host tool (same ratio, ≥720 p, centred, no motion blur) → store with sources and prompt; ratio errors keep the reservation; budget refusals go back to the user; a reviewed slot is a paid redo; ratio is decided by the first frame (L74–79) | keyframes.md steps 1–4 and the following paragraphs | carried; budget refusal, ratio-from-first-frame, motion blur and text legibility added |
| Step 4 review: show all images with their Picture N (or keyframes), the brief decisions with values and sources, per-segment plan with the full English prompt, duration and estimate; distortion, wrong color or wrong text stops for a correction or an explicit acceptance with the issue written; per-frame decisions recorded; unreviewed frames do not pass (L80–82) | journey.md "Review and approve"; keyframes.md step 4 | carried; decisions-with-sources display and the stop-on-defect rule added |
| Step 5 approve: estimate with source shown; approve with the current plan hash and a cap at least the estimate; any frame, action, camera, duration or review change alters the hash; null estimate blocks approval; snapshot frozen (L83–85) | journey.md "Review and approve" | carried |
| Step 6 generate: backend submits, downloads, stores, composes; completed outputs are product media; chat can close; progress reported as real segment counts, never an invented percentage (L86–88) | journey.md "Observe" | carried |
| Step 7 quality and versions: technical completion is not acceptance; record flagged/accepted after viewing; processed uploads become a new selected version with the original kept; pause unsubmitted segments on a problem; no promised cancellation or refund; no automatic paid redo (L89–92) | journey.md "Deliver and version" and "Pause"; recovery.md last paragraph | carried |
| Do not: batch, concurrent or pick-a-favorite runs; repeated calls to choose; MP4 into product images; API keys in chat; bypass a conflict with a direct tool; treat a mock or another host's result as this host's acceptance (L96–97) | SKILL.md "Facts and costs" and "Capabilities"; journey.md "Deliver and version" (video assets separate from image fields) and intro (conflict relayed, not retried); recovery.md (no provider keys) | carried; mock/other-host rule added |

## references/grilling.md (121 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| Every decision has a source before submission; the Agent does not guess for the merchant; rounds, one question per item, recount between rounds; answers written as they arrive; no source, no approval; resume from the record (L3–7) | briefing.md "Rounds"; assets/task-record-template.md intro | added (round procedure); source gate carried |
| Five sources: user, preference, product data, agent-chosen, unverified (L11–19) | briefing.md paragraph 2 | carried |
| Unverified counts as filled; the claim stays out of actions and on-screen text (L21) | briefing.md paragraph 3 | carried (made explicit) |
| Principal message and identity constraints are never agent-chosen; stop and wait (L22, L117–121) | briefing.md paragraphs 2–3 | carried; decline-and-ask pattern added |
| Item 1 purpose/platform, drives duration and ratio defaults (L28) | briefing.md table, Purpose | carried; default hint added |
| Item 2 principal message, one thing (L29) | briefing.md table, Principal message | carried |
| Item 3 identity constraints: Agent drafts the appearance from product images, the user corrects line by line (L30) | briefing.md table, Identity constraints | added |
| Item 4 variables: background, light, props, hands (L31) | briefing.md table, Creative flexibility | carried; hands added |
| Item 5 opening and closing; closing is a full static hold (L32) | briefing.md table, Opening and closing; "Read-back" | carried |
| Item 6 per beat: type (hero, feature demonstration, abstract visualization, lifestyle, closing hold; a feature claim proposes a demonstration beat), action, shot and camera, seconds (L33) | briefing.md table, Beats | added (types and demonstration rule) |
| Item 7 references: each labelled with one role (rhythm, palette, lighting, attitude, clothing, environment, product detail); exactly one truth image per product; style references not attached, translated into sentences (L34) | briefing.md table, References; prompting.md "Reference images" | added (role list, one per product, not attached) |
| Item 8 casting, hands only allowed (L35) | briefing.md table, Casting | carried |
| Item 9 sound: physical ambient, specific music or none (L36) | briefing.md table, Sound | carried |
| Item 10 on-screen text ≤32 characters; spelling and consistency not guaranteed (L37) | briefing.md table, Text; prompting.md "Compiled keyframe mode" | added |
| Item 11 mode: reference by default with 0 keyframes; keyframe mode only when the iteration ladder's subject step still drifts; boundary frames shared; frame count user-authorized (L38) | SKILL.md step 3; prompting.md "Iteration"; keyframes.md | carried; ladder added |
| Item 12 unverified claims summarised and asked; only in the record (L39) | briefing.md table, Unknowns; SKILL.md "Facts and costs" | carried |
| Seven prompt elements (subject, action, scene, camera, lighting, style, sound); camera movement then amplitude; lighting has a direction; one variable at a time (L43–45) | briefing.md "Rounds" (elements); "Challenge" rules 3, 6; prompting.md "Iteration" | added (elements); the LTX guide link is excluded — third-party source; the method is stated in the package's own words |
| First round once for the whole video; style split into six axes asked one by one: art direction, palette, tone, era, rhythm, tier with a named reference (L47–58) | briefing.md table, Style; "Rounds" | added |
| Axes confirmed in preferences are not asked (L60) | briefing.md "Rounds"; assets/preferences.example.md style axes | added |
| Per beat only subject, action, camera; the rest inherited with an override note; type and seconds pre-filled from the rhythm axis (L62–64) | briefing.md "Rounds"; task-record-template.md "Storyboard" (Override column) | added |
| Ask in the user's language, echo in English; compiled sentence per beat shown beside its keyframe and confirmed before approval (L66–69) | briefing.md "Rounds" and "Read-back"; journey.md "Review and approve" | carried; per-beat sentence beside frame added |
| Round mechanics: ask all missing, wait, record, recount; record whatever the user answered; never re-ask sourced items (L71–72) | briefing.md "Rounds" | added |
| Challenge: run the twelve rules after each round before writing the request; one question per triggered rule; conclusions in the record (L76–77) | briefing.md "Challenge"; task-record-template.md "Challenge record" | added |
| Rules 1–12: multiple verbs, contradictory tone, contradictory camera, vague words, no motion, undirected light, constraint without image evidence, text over limit or unsupported claim, chaotic motion, beat under 1.5 s, cut inside a segment, inconsistent product name (L81–92) | briefing.md "Challenge" table | added (rules 3, 4, 6, 8, 9 and 12 were previously one sentence in the read-back paragraph, kept) |
| Positive phrasing: no negatives in requests; avoid-list entries translated into positive sentences, with the three examples (L96–103) | prompting.md "Positive phrasing"; preferences.example.md "Avoid list" | added |
| Iteration ladder: after a flagged result, one change per new generation in the order style → lighting → camera → action → subject (name/constraints, then reference image, then keyframe mode with authorized frames); each step recorded with what, why and the new ID (L107–115) | prompting.md "Iteration" | added (the package keeps its rule that user intent may skip steps and that no mandatory experiment sequence is paid for) |
| "You decide": fill, explain in one sentence, mark agent-chosen, continue; items 2 and 3 refuse delegation (L119–121) | briefing.md paragraph 3 | added |

## references/journey.md (163 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| All calls through the gateway's admin transport; fields per `describe_endpoint`; a conflict's message is relayed verbatim, never retried or worked around with another route (L3–4) | journey.md intro | carried; relay rule added |
| Draft request JSON with every field (L8–38) | journey.md "Create a draft" names the fields the agent supplies | excluded — deployment contract example; the field list and types come from `describe_endpoint` on `POST /admin/video-generations` at runtime |
| Reference-mode contract: truth images ≤5 in Picture N order, no keyframe budget, 4–15 s single segment, expert prompt per segment, reference images and keyframes mutually exclusive; the backend freezes the image URLs and returns `mode`; reservations and stores refused in this mode; approval needs no keyframes; dropping frames refused; missing prompt, missing sentence or more than five images rejected (L41–45) | prompting.md "Reference images"; journey.md "Create a draft" and "Review and approve" | carried |
| Aspect ratio enumeration with default; other values rejected; keyframes reviewed against it; in reference mode it is the ratio sent (L46) | prompting.md "Compiled keyframe mode" (use only enumerated values); keyframes.md step 2 | excluded (the list) — deployment enumeration, read from the draft route's schema; the rule to use only enumerated values is stated |
| Brief and beats compiled by the backend; segment count equals the backend split; beat seconds sum to the segment; optional setting, lighting, shot with enumerations; three rejections: empty preserve, beat under 1.5 s, last beat not a static hold (L47–50) | prompting.md "Two prompt paths" and "Compiled keyframe mode"; briefing.md "Read-back" | carried; split examples and preserve size added |
| Expert prompt sent verbatim; dialogue tags rejected (L51) | prompting.md "Reference images" | carried |
| No dubbing field; subtitle language recorded only (L52–53) | SKILL.md "Capabilities" | carried |
| Draft response: ID, status, segments with compiled prompts, plan hash, keyframe budget counters, cost estimate with source or null, spent; null means unknown, not zero; no approval and no submission until priced (L55–58) | journey.md "Create a draft" | carried |
| Reserve before every paid frame; budget refusal means unauthorized — ask, never bypass; a reviewed slot needs a newly raised authorized total; send the total only when the user just raised it (L64–72) | keyframes.md step 1 and the approval paragraph | carried; refusal handling added |
| Store body: URL or bytes, source assets, external style URLs, prompt, note; no unused reservation is refused; a refused download does not consume the reservation (L76–83) | keyframes.md step 3 | carried |
| Which frames: segment 0 first; every non-final last is the next first (shared); a different first for the next segment is refused at approval; final last optional (L84–86) | keyframes.md paragraph 2 | carried |
| Frame specification: plan ratio without letterboxing, short edge ≥720 px, provider pixel limits, first and last share a ratio within tolerance across boundaries, centred, complete, no motion blur, not mid-action, legible text; the first frame decides the video's ratio; a ratio error names both ratios and keeps the reservation (L87–93) | keyframes.md steps 2–3 | carried; letterboxing, shared ratio, blur, legibility, ratio-from-first-frame and error handling added. Provider pixel bounds excluded — third-party limit; a rejected image is reported by the store route's error |
| Stored keyframe returns an asset with version and pending review; a new version invalidates the plan hash even before review (L94–95) | keyframes.md approval paragraph | carried |
| Review display: keyframes with version and status (or the images with Picture N in reference mode), plan, duration, cost, the brief decisions with sources (empty source stops), each beat's compiled sentence beside its frame — the user confirms the English (L99–102) | journey.md "Review and approve" | carried; decisions and per-beat sentence added |
| Review body: per-frame decision with note (L104–110) | keyframes.md step 4 | carried |
| Approve body: plan hash and cost cap (L112–115) | journey.md "Review and approve" | carried |
| Reference mode: no per-frame review; confirm image order and full prompt, then approve (L117) | journey.md "Review and approve" | carried |
| Keyframe mode: latest first frame of every segment approved or accepted with issues; every non-final last frame reviewed (pending blocks); a rejected latest version needs another frame — an older accepted version does not substitute (L118–120) | keyframes.md approval paragraph | added |
| Dropping a rejected last frame is allowed only for the final segment and is part of what the user confirms (L121–122) | keyframes.md approval paragraph | carried |
| Approval freezes compiled prompts (L123) | journey.md "Review and approve" | carried |
| Reservations are bound to their slot (L124) | keyframes.md step 3 ("the same segment/position") | carried |
| Cap currency matches the estimate and the amount is at least the estimate; show estimate and source first (L125) | journey.md "Review and approve" | carried |
| Hash mismatch or concurrent review and approval conflict: re-read, re-show, re-confirm (L126) | journey.md "Review and approve" | carried |
| After approval: queued, approval record, later reservation/store/review refused (L127) | journey.md "Review and approve" ("Approval freezes the snapshot") | carried |
| Worker cadence and the status and segment-status state machines (L131–135) | journey.md "Observe" (the five outcomes) | excluded (the enumerations) — ERP-internal worker mechanics; the agent reports the `status` and segment fields exactly as the read route returns them |
| Progress as real segment counts; planned versus measured seconds, measured null until all stored; provider frame rounding (L136–138) | journey.md "Observe"; prompting.md "Two prompt paths" (rounded to whole frames, report measured beside requested) | carried; the rounding formula excluded — provider detail; the measured value is read from the generation |
| Realized ratio, size and duration per segment; report both when they differ from the request (L139–140) | journey.md "Observe" | carried |
| Probe metadata per stored asset; the final should keep the first segment's AI-content label, pending device acceptance (L141) | journey.md "Observe" (report probe results as returned) | added (reporting); the composition mapping note is excluded — ERP-internal composition detail |
| Usage counters, with unknown or failed attempts counted conservatively (L142) | recovery.md ("an error string alone is not proof of zero charges") | carried |
| Error stage and message; retry action resume, new attempt or null (L143–144) | recovery.md table | carried |
| Worker checks price and cap before each segment; pauses with a cost reason; raise the cap through resume after consent (L145–146) | recovery.md "paused for cost" | carried |
| Product video assets: kinds, version, URL, dimensions, quality status, selection, source; completed generation points at the final asset (L150–152) | journey.md "Deliver and version" | carried |
| Quality verdict with note; processed upload with source asset and processing description becomes a new version, original kept, then selected; cross-product source and non-MP4 rejected (L154–158) | journey.md "Deliver and version" | carried |
| Pause with a reason: unsubmitted segments stop, submitted ones are collected; resume after the user decides (L162–163) | journey.md "Pause" | carried |

## references/preferences.md (76 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| Read at every task start; only rules the user said apply going forward; change procedure (L3–4) | private-workspace.md; briefing.md intro | carried |
| Merchant scenario: named merchant, market, category, platform tags (L8–9) | preferences.example.md "Market / marketplace", "Placement and purpose" as empty fields | excluded — merchant-specific data; the fields exist, the values do not |
| Default mode: reference, keyframe mode only on drift (L15) | preferences.example.md "Default mode"; SKILL.md step 3 | carried |
| Default prompt path: Agent-written expert prompt (L16) | SKILL.md step 3 | carried |
| Duration by product count: opening, per product, closing; 4–15 single call; segmented above 15 (L17) | prompting.md "Two prompt paths" | added |
| Ratio and resolution defaults, portrait first (L18) | preferences.example.md "Duration and aspect ratio" | excluded (the values) — merchant defaults; recorded per merchant in the private file |
| Script language with regional variant (L19) | preferences.example.md "Script language (with regional variant)"; briefing.md Text row | added |
| Subtitles pending confirmation; subtitle language (L20–21) | preferences.example.md "Subtitle preference and language" and closing note | carried |
| Dubbing fixed at none; not asked, no dubbing language recorded (L22, L38) | preferences.example.md closing note; SKILL.md "Capabilities" | carried; not-asked rule added |
| Keyframe budget default 0; authorized only in keyframe mode (L23) | SKILL.md "Facts and costs"; keyframes.md intro | carried |
| Cost cap given by the user at each approval (L24) | preferences.example.md ("Each task still needs its own plan and spend authorization") | carried |
| Six style axes, setting and lighting each pending confirmation, with the allowed answers (L25–32) | preferences.example.md style lines; briefing.md Style row | added |
| Music: specific instrument, tempo, playing, dynamics, or none; mood words not recorded; soundscape as physical sounds; example values (L39–43) | preferences.example.md "Music", "Ambient sound"; briefing.md Sound row | carried; no-mood-words note added. The example values are excluded — merchant-specific defaults |
| Avoid list: recurring problems in the user's words, lasting only, translated to positive sentences (L47–52) | preferences.example.md "Avoid list"; prompting.md "Positive phrasing" | added |
| Most-often-missing questions (L58–63) | briefing.md table and "Rounds" | excluded — duplicates the briefing decisions already present |
| Verified local processing methods (L67) | preferences.example.md "Verified processing methods" | added |
| Change log and previous-version sections (L71–76) | preferences.example.md "Lasting rules and changes"; private-workspace.md (dated backup) | carried (adapted) |

## references/prompting.md (158 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| One prompt format: three fields in fixed order; first shot untimed, later shots timestamped; total equals this segment; camera movement as a sentence, not a tag (L3–6) | prompting.md "Reference images" (template and the paragraph after it) | carried |
| Reference mode: Agent writes the three fields; backend validates the sentence, tags and length; the brief decisions are the template slots; prompt shown beside images; frozen on approval (L8–10) | prompting.md "Reference images"; journey.md "Review and approve" | carried |
| Keyframe mode compiles brief and beats; the compiled prompt is read back, reviewed, frozen (L12–14) | prompting.md "Compiled keyframe mode" | carried |
| No dubbing: compiled path adds the sentence, expert prompts contain it; no lines, no dialogue tags anywhere; subtitles recorded, not executed (L18–21) | prompting.md "Reference images" and "Compiled keyframe mode"; SKILL.md "Capabilities" | carried; compiled-path sentence added |
| Field mapping: style from the six axes without vague words; setting one sentence within its limit; lighting key, required direction, optional fill and rim; product name as an article noun phrase used unchanged, prefixed to pronoun-led actions by the backend; preserve one to ten entries, never empty; soundscape physical; music or null; beats compile to shots; shot size and angle; camera static or move/amplitude/speed; on-screen text ≤32 characters, one or two per segment, multi-line renders poorly (L27–37) | prompting.md "Compiled keyframe mode" | carried; naming, preserve size, single-line text and placement limits added. The compiled sentence templates ("The scene is ...", "Lighting: ... from ...") are excluded — ERP-internal compile output; the agent reads the compiled prompt from the generation |
| English only in fields (L39) | prompting.md "Compiled keyframe mode"; briefing.md "Rounds" | added |
| Enumerations for camera move, amplitude, speed, light direction, shot size and angle (L41–49) | prompting.md "Compiled keyframe mode" ("use only values the deployed schema enumerates for that field"); briefing.md "Challenge" rule 6 names four light directions as examples | excluded (the lists) — deployment enumerations, read from `describe_endpoint` on the draft route; the rule is stated |
| Compile order following the seven elements (L51–53) | briefing.md "Rounds" (the seven elements as the questioning order) | excluded (the compile order) — ERP-internal compile mechanics; the compiled result is read back |
| Beat rules: sum equals the segment with the backend's split table; segment count from the backend; a segment may omit beats; 6–9 beats per 15 s with 2–3 peaks between still points; each beat says what the product's color or material does; last beat a static hold with a holding verb, rejected otherwise; ≥1.5 s so integer beats need 2 s; preserve nonempty; name the product in every beat; describe motion not the picture; one action per beat (L57–71) | prompting.md "Two prompt paths" and "Compiled keyframe mode"; briefing.md "Read-back" | carried; split examples, rhythm, color/material, holding-verb check and motion-only rule added. The exact rejection messages are excluded — deployment error text, returned by the route |
| Example 1: sketch-to-real recipe with two keyframes and a closing segment (L73–107) | keyframes.md paragraph 2 (the recipe in one sentence) | added (recipe); the JSON is excluded — deployment contract example built on the compile schema |
| Example 2: 15 s, seven beats with peak and still distribution; compiled sentence sample; backend-written alignment sentence (L109–142) | prompting.md "Compiled keyframe mode" (rhythm rule) | excluded — duplicates the beat rules above; the alignment sentence is ERP-internal compile output |
| Common mistakes: camera tag in action, mood-word soundscape, vague music, sum mismatch, dialogue, first beat describing the picture, big motion in the last beat, empty preserve, one-second beat, undirected light, inconsistent name (L146–158) | briefing.md "Challenge" rules 4, 5, 6, 10, 12; prompting.md "Compiled keyframe mode"; briefing.md "Read-back" | carried (each mistake is a stated rule) |

## references/recovery.md (24 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| Principle: continue known work, do not blindly resend unknown submissions, do not regenerate after a storing failure; new paid attempts are explicitly user-initiated (L3) | recovery.md intro and closing paragraphs | carried |
| running after the chat closed: read only (L7) | recovery.md "queued or running" | carried |
| running with a registered pause: wait; resume conflicts while the lease is held (L8) | recovery.md "running with a registered pause" | carried |
| paused for cost (price unconfigured or cap reached), nothing submitted: show reason and usage; raise the cap through resume after consent; report an unconfigured price to the operator (L9) | recovery.md "paused for cost", "price or provider configuration unavailable" | carried |
| paused because the provider refused the balance: nothing created or charged; report; resume the same work after top-up, not a new attempt (L10) | recovery.md "paused because the provider refused the account balance" | added |
| paused manually: show the reason; resume after the decision (L11) | journey.md "Pause" | carried |
| failed with resume after a rate limit: backend already backed off; nothing charged; wait, then resume; not a new attempt (L12) | recovery.md "failed with retry_action=resume after a provider rate limit" | added |
| failed with resume at a later stage: provider task known; resume without new charges (L13) | recovery.md "failed with retry_action=resume" | carried |
| failed, provider not configured: report; cannot generate (L14) | recovery.md "price or provider configuration unavailable" | carried; the environment variable name is excluded — ERP-internal configuration |
| failed with new attempt because the provider's record window expired, or a resume refused for that reason: explain the loss; a new paid attempt only on explicit request (L15) | recovery.md closing paragraph ("a provider record older than its retention window") | carried; the seven-day figure is excluded — provider retention detail, reported by the backend's message |
| failed with null at composition because segment specifications differ: stored segments stay as media; a new generation needs consistent keyframe ratios (L16) | recovery.md "failed with retry_action=null" | added |
| failed with new attempt, submission unknown: acceptance and charge unknown; resume refused; new attempt only on explicit request (L17) | recovery.md "failed with retry_action=new_attempt or submission_unknown" | carried |
| failed with new attempt and no provider task ID: provider rejected before creating work; show the message; the user decides after correction (L18) | recovery.md "failed with retry_action=new_attempt and no provider task ID" | added |
| failed with a provider failure status: show the reason; a new attempt needs confirmation (L19) | recovery.md "failed with retry_action=new_attempt or submission_unknown" | carried |
| completed but unacceptable: flag; regeneration is a new generation, original kept (L20) | recovery.md "completed but visually unsuitable"; journey.md "Deliver and version" | carried |
| attempts list records each paid attempt; cite it when reporting counts (L22) | recovery.md ("Cite the attempts list") | carried; citation rule added |
| Concurrent workers, restarts and lease expiry are the backend's; never re-trigger to speed up (L23) | recovery.md closing paragraph; journey.md "Observe" | added |
| Late provider results remain traceable by task ID; waiting is not a reason to recreate (L24) | recovery.md closing paragraph; journey.md "Observe" | carried |

## references/reference-mode.md (108 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| Backend status: reference mode detected from a nonempty reference list without a keyframe budget; `mode` returned; image URLs frozen; 4 s minimum; expert prompt per segment with the sentence; keyframe routes refused in this mode; approval on plan hash, estimate and cap; no keyframe step happens (L3–7) | prompting.md "Reference images"; journey.md "Create a draft" and "Review and approve" | carried (the contract points); the status paragraph itself is excluded — ERP-internal implementation status; the agent confirms the mode from the returned `mode` |
| Earlier direct-provider validation runs (L8) | — | excluded — ERP-internal history of a bypass the package forbids (SKILL.md "Capabilities") |
| Two modes: reference is the default when a clear product image exists; keyframe mode when the ladder's subject step still drifts or the starting composition must be exact; mutually exclusive in one call; switching is a new generation recorded as a subject change (L12–18) | SKILL.md step 3; prompting.md "Reference images" (exclusive) and "Iteration" (recorded as a subject change) | carried; recording rule added. The provider role names (`reference_image`, `first_frame`) are excluded — third-party API detail behind Intgral's endpoint |
| One clean truth image per product: on its own background, complete, front-facing, no hands, legible text (L22–23) | prompting.md "Reference images" | added |
| At most five images; the fourth and fifth may be texture, on-body or effect shots; order equals Picture N (L24–25) | prompting.md "Reference images" | carried; extra-slot use added. The provider's per-image pricing above five is excluded — third-party pricing; the baseline rejects more than five and any cost comes from the sourced estimate |
| Template videos and external style references are not attached; their role is recorded and translated into sentences (L26–27) | prompting.md "Reference images"; briefing.md References row | carried; role list added |
| Direct provider request shape (content array, duration, resolution, required ratio, inline base64) (L28–29) | journey.md "Create a draft" (aspect ratio required) | excluded — third-party request format; all submissions go through Intgral's catalogued route, whose schema is read at runtime |
| Record each image's file name, size and hash and the submission intent before calling (L30–31) | prompting.md "Reference images"; task-record-template.md "Plan and submitted prompts" | added |
| 4–15 s single call by default; above 15 (35 max) the backend segments with shared boundary frames (L35) | prompting.md "Two prompt paths" | added |
| Rhythm formula: about 2 s opening, 2.5–3 s per product or look, 2 s closing; three products ≈ 12 s, one ≈ 8 s (L36) | prompting.md "Two prompt paths" | added |
| Output rounding to whole frames, audio format, AI-content label (L37–38) | prompting.md "Two prompt paths" (rounded; report measured); journey.md "Observe" (probe results as returned) | carried (rounding rule); the frame formula and audio format are excluded — provider output details read from the stored asset's probe |
| Price per second; every submission approved individually (L39) | journey.md "Create a draft" and "Review and approve" (sourced estimate before approval) | carried; the rate is excluded — deployment pricing, obtained from the returned `cost.estimate` and its source |
| The Agent writes the three fields; backend validates sentence, tags, length; the brief decisions fill the slots (L43–44) | prompting.md "Reference images" | carried |
| Full expert-prompt template: style sentence with named reference, continuous take, scene, lighting, per-product keeps-clause, Picture N sentences, casting, no-speech sentence; shots with size and angle, one action, optional single text line, camera sentence; "Keeping the same framing"; final hold; event-based soundscape; music with entry and ending or N/A (L46–59) | prompting.md "Reference images" template | added (the previous template carried only the three field names and the first-shot structure) |
| Twelve writing rules (L63–76) | prompting.md "Writing rules" | added (rules 1, 9 and 12 were carried; 2–8, 10 and 11 added); the submission script's automatic check is excluded — ERP-internal tooling; the package requires the check before review |
| Verified samples table with merchant, dates and results (L80–84) | — | excluded — merchant-specific data and real brand identifiers |
| Sample prompt for a real merchant's products (L86–104) | prompting.md "Worked example" (fictional product, eight seconds, obeys the writing rules) | excluded (the text) — real brand and product identifiers; replaced by a fictional example |
| Differences between the rendered result and the prompt; to reproduce an accepted look, describe what was rendered (L106–108) | prompting.md "Iteration" | added |

## references/task-record-template.md (75 lines)

| ERP section / rule | intgral-video | State |
| --- | --- | --- |
| One file per task beside the preferences; write each answer as it arrives; no approval with an empty source; resume from the empty rows; English only for request fields and compiled sentences (L1–5) | assets/task-record-template.md intro | carried; write-as-you-go, resume and language rules added |
| Header: generation or provider task ID; task stage (L11–12) | task-record-template.md "Generation ID, current mode and plan hash", "Task stage" | carried; stage line added |
| Section 1: the twelve decisions with value and source; the source values; unverified counts; items 2 and 3 never agent-chosen (L16–32) | task-record-template.md "Brief decisions" (fourteen rows covering the twelve items); briefing.md | carried |
| Style axes, setting and lighting rows with sources (L34) | task-record-template.md "Brief decisions" (Style; Setting and lighting) | added |
| Section 2: storyboard table (segment, beat, seconds, type, subject, action, shot/angle, camera, override); rules; five types; enumerations from the schema (L38–49) | task-record-template.md "Storyboard" | added |
| Section 3: challenge record (rule, trigger, conclusion) (L53–57) | task-record-template.md "Challenge record" | added |
| Section 4: the exact request with idempotency key and the returned ID; image list with name, size, hash and order; the prompts read back (L61–67) | task-record-template.md "Draft idempotency key and exact submitted input", "Plan and submitted prompts" | carried; image identities and read-back prompts added |
| Section 5: one row per new generation: what changed, why, ID; one change at a time in ladder order (L71–75) | task-record-template.md "Iterations and recovery" ("What changed and why" column); prompting.md "Iteration" | carried; column added |

## Evaluation

`evals/scenarios/video-brief-missing-generation-route` is the only video scenario. After the change, `node scripts/evaluate.mjs` over its traces gives: `compliant.jsonl` — 8 hard checks passed, 0 failed, 4 tool calls, exit 0; `known-bad.jsonl` — rejected as expected (`forbidden: medusa.admin_post #3`), exit 1; the recorded run trace `evals/runs/2026-09-18-video-brief-missing-generation-route-recorded/trace.jsonl` — 8 passed, 0 failed, 7 tool calls, exit 0. These are trace replays, not a new agent run; the scenario ends before any of the added guidance (rounds, writing rules, recovery rows) is exercised, so a fresh run was not recorded for this change.

`npm run verify` on Windows, Node 24: 34 tests, 0 failures, plus validation of all three packages.
