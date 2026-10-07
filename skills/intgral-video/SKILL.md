---
name: intgral-video
description: Plan, approve, generate, review and resume product videos through Intgral MCP, using product reference images or approved keyframes and private merchant preferences.
license: MIT
metadata:
  version: "0.3.0"
---

# Intgral product video

## Stop rules (apply to every task)

- **Approve only the reviewed plan.** Before any approval, read the generation (`GET /admin/video-generations/:id`) and compare its current `plan_hash` with the hash the user reviewed (task record). If they differ, add the observed hash and its read time to the task record (keep the reviewed one), show what changed and ask — never approve. Never approve without that read.
- **Money only as the user named it.** Never send `authorized_budget` or a `cost_cap` the user did not state as an amount. A refusal that names a budget goes back to the user; do not retry with a higher number. Never generate a keyframe image without a reservation the backend accepted — generation is paid work too.
- **No duplicate paid work.** Before a new draft, look for the product's existing generations: when `medusa.list_endpoints` lists `GET /admin/video-generations`, read it with `product_id` (or `variant_id`); otherwise use the generation ids in the task record. While a generation is queued, running or paused, never create another one in the same turn — even when the user asked for "a new one": first tell them it is still running, the server keeps working after this chat closes so they can ask again later, and a second one is paid again and would not finish this one sooner; only a later request made after hearing that can authorize it.
- **Undeliverable request → ask before any draft.** If the user wants speech, voice-over or subtitles, read the create schema first (`medusa.describe_endpoint` on `POST /admin/video-generations`); when the deployment cannot deliver them, create nothing: explain the gap and ask. "You decide" or "create it directly" does not decide a missing capability.
- **Price from the backend only.** A video estimate exists only on a draft. When the user asks what it costs before a draft exists, say the draft is free and generates nothing, and ask whether to create it; never quote a price from memory or an earlier video.
- **Open the SKU's page.** When the tool list has a browser tool (such as `host.open_url`), the call right after reading the SKU opens its `erp_url`, once; without one, give the link.

Work on one requested video at a time. The Agent prepares the creative plan; Intgral owns the generation, approval snapshot, spend accounting and media records. Read the installed references as local files, resolving links relative to the containing file.

1. Read the configured [private workspace](references/private-workspace.md), then the current product and variant facts through available Intgral tools, including the product detail route (description, listing-profile bullets), since `medusa.get_product` returns a trimmed summary. Use [briefing](references/briefing.md) to fill only missing decisions and record their sources. Once the SKU is read, open its returned `erp_url` in this session's own browser tool, unprompted and once per session; do nothing inside the page. Without a browser tool, or if the open fails, give the link and do not say it opened.
2. Inspect available tools and the deployed video endpoint schemas. Use [the journey](references/journey.md) for draft creation, approval and media operations. If the required route or permission is missing, report that limitation and stop before the dependent operation.
3. Prefer [reference-image prompting](references/prompting.md) when the deployment supports it: product images and an expert prompt, without generated keyframes. Use [keyframes](references/keyframes.md) when the user needs controlled start/end composition or agrees to address product drift this way.
4. Show the actual images, full submitted prompt, timing, unresolved issues and sourced cost estimate. Approval applies to the current plan hash and cost cap. Only call the approval endpoint after the user authorizes this exact plan and spend.
5. Read the existing generation until its outcome is known. Follow [recovery](references/recovery.md) for failures or interruption. Technical completion and visual acceptance are separate; only claim checks actually performed.

## Facts and costs

Product appearance, packaging and claims come from the target product's evidence. External creative references provide style, not facts about the product. Unverified claims remain in the private task record and stay out of prompts and overlays.

A keyframe budget is separate from the video cost cap. Reserving a keyframe does not authorize video generation, and a pending boundary frame blocks the plan's approval; when asking the user for more frame budget, say both. Revised plans require a fresh review and approval; previously submitted work may already cost money. No batch candidates or paid retries merely to choose a favorite.

## Capabilities

The supported video contract has no speech or voice-over, so never ask the user to choose a voice-over language. Subtitles are a separate processing step: a stored language preference is not an implemented subtitle service. Explain which requested elements can actually be delivered, and resolve a material gap before proceeding — before creating a draft, even when the user asked for one directly; on-screen text drawn by the model is not a subtitle substitute; whether to produce the video without subtitles now is the user's decision, never a silent downgrade.

Prompt and frame generation/rendering depend on actual host tools. A URL or image list does not prove visual inspection, and a result observed in a mock, another host or an earlier deployment is not acceptance evidence for this one. All provider submissions go through Intgral's catalogued endpoints; no direct provider fallback when a deployment is missing a capability.

For each new task, record `skill_version: intgral-video@7` when the deployed schema supports it. Keep the version attached to existing tasks unchanged.
