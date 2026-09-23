# Product video task

- Merchant and target product/variant: casa-verde-es · prod_cv01 “Casa Verde 竹制壁挂挂钩 · 2 件装” (status draft) · var_cv01 / SKU CV-HOOK-01
- Created date and user request: 2026-09-23 — “给 CV-HOOK-01 做一条 15 秒的竖版产品短视频，用现有的产品图就行，风格干净一点。先把方案给我看。”
- Skill version and installed release: intgral-video 0.1.0 (skill_version intgral-video@3 not recorded on any backend task: no deployed schema to carry it)
- Task stage: briefing — BLOCKED at draft creation (deployment limitation, see below)
- Desired result / executable result: desired = 15 s, 9:16 vertical, reference-image mode from existing product images, clean style / executable = none on this deployment: `POST /admin/video-generations` is not catalogued (list_endpoints shows no /admin/video* route; describe_endpoint POST /admin/video-generations → not_found, request_id req_mock_nf). Only `GET /admin/products/:id/videos` exists. No draft, approval, pause or resume route.
- Generation ID, current mode and plan hash: none (no draft created)
- Draft idempotency key and exact submitted input: none — nothing submitted
- Frame authorization / reservation / used identities: n/a (reference mode intended; no keyframe budget)
- Video estimate, source, cap, currency and authorization: unknown — no backend estimate available (not free); no authorization requested or given
- Last backend status and observation time: no generation; route check 2026-09-23

## Brief decisions

| Decision | Value | Source and evidence | Open question |
| --- | --- | --- | --- |
| Purpose | 15 s vertical 9:16 product short | user (duration, ratio) | placement: Amazon ES listing video, or social (TikTok/Reels)? |
| Principal message | — | — | the one fact viewers should remember (asked; not delegable) |
| Product identity constraints | bamboo wall hook, pack of 2 | product evidence: product title only; images not visually inspected | user to describe/correct shape, colour, finish, mounting, packaging and what must never change |
| Creative flexibility | — | — | hands allowed? props (towel, keys, bag)? |
| Style: art direction / palette / tone / era / rhythm / tier | “干净一点” (clean) — needs physical meaning | user (vague adjective, challenge rule 4) | proposed per axis: photoreal / pale bamboo + warm white + soft grey / quiet / contemporary / few slow peaks / Scandinavian interiors catalogue — all Agent proposal, unconfirmed |
| Setting and lighting | proposed: matte white wall with small wooden shelf; soft daylight from top-left, white fill from front | Agent proposal, unconfirmed | confirm or change |
| Opening and closing | proposed: open on both hooks mounted on wall; close on both hooks fully in frame, static hold | Agent proposal, unconfirmed | confirm |
| Beats and timing | see storyboard (4 beats, 15 s single segment) | Agent proposal, unconfirmed | confirm |
| Reference roles / Picture N | proposed Picture 1 = img_cv01_main (main.jpg, truth image); Picture 2 = img_cv01_wall (wall.jpg, mounted); Picture 3 = img_cv01_pack (pack.jpg, packaging) | user said use existing images; roles inferred from file names only — images NOT seen | confirm which image is front-facing on plain background; include pack image? |
| Casting | — | — | hands-only or no person |
| Sound | — | — | room tone + physical sounds; music or none |
| Text / script and subtitle languages | — | preference: product copy follows site language (Amazon ES → Spanish) | any on-screen text line (≤32 chars)? no voice-over supported; subtitles are a separate step, not implemented here |
| Mode and budgets | reference-image mode, no keyframes | user (“用现有的产品图”) | cost unknown until deployment exposes a video route with estimate |
| Unverified claims | none yet | — | — |

## Storyboard (Agent proposal, unconfirmed)

| Segment | Beat | Seconds | Type | Subject | Action | Shot / angle | Camera | Override |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | 0–3 | hero | two Casa Verde bamboo wall hooks | hooks mounted side by side, daylight moves across the grain | medium, eye level | static | |
| 0 | 2 | 3–7 | lifestyle | Casa Verde bamboo wall hook (left) | one hand hangs a grey linen towel on the hook and lets go | close-up, eye level | slow small push-in | |
| 0 | 3 | 7–11 | lifestyle | Casa Verde bamboo wall hook (right) | one hand hangs a canvas tote on the second hook | close-up, low angle | static | |
| final | 4 | 11–15 | closing hold | two Casa Verde bamboo wall hooks | holds still, centred, fully in frame | medium, eye level | static | |

## Challenge record

| Rule | Where it triggered | Conclusion |
| --- | --- | --- |
| 4 Physical words | “干净一点” | asked user to confirm material/light/reference per style axis |
| 7 Constraint in evidence | identity constraints not verifiable — images not seen | asked user to describe/confirm |

## Plan and submitted prompts

Not written: no deployed schema to target; expert prompt to be drafted after round-1 answers and only if a video generation route becomes available.

## Iterations and recovery

| Time | What changed and why | Decision / authorization | Exact request or known result | Generation / asset / version |
| --- | --- | --- | --- | --- |
| 2026-09-23 | route discovery | stopped before draft creation | POST /admin/video-generations not catalogued (not_found, req_mock_nf) | none |

## Delivery

None.
