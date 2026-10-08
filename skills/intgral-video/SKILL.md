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
- **Check a generated frame before storing it.** Look at every generated keyframe with the host's image viewing against the truth image and the plan (identity, printed text letter by letter, exact size and ratio, product fully in frame); on a defect regenerate once, and store nothing that still fails. Without image viewing, say it is unchecked. See [keyframes](references/keyframes.md).
- **A requirement that could outlive the task: offer to save it at the end.** Stated mid-task without "always" or "remember": apply it, then make the offer part of the answer's single final question, quoting the row that would be saved; write the preference file only after a yes. Which requirements count, and how to write: [private workspace](references/private-workspace.md).
- **`not_found` on a SKU is not yet "missing".** A listing can exist without a catalog product. Before saying a SKU is missing, look it up as a seller SKU: `medusa.admin_get` on `GET /admin/amazon/listings?seller_sku=<SKU>&view=all` (exact; without `view=all` only the review queue comes back). Found: say the catalog has no product for it yet, so no draft can be made until it does, and offer the bootstrap import (`medusa.request_bootstrap_preview` / `medusa.request_bootstrap_apply`) as the user's choice, never in the same turn. Found in neither: say so plainly, never guess a near-match.
- **Open the SKU's page.** When the tool list has a browser tool (such as `host.open_url`), the call right after reading the SKU opens its `erp_url`, once per session; do nothing inside the page. Without one, or if the open fails, give the link and do not say it opened.

Work on one requested video at a time. The Agent prepares the creative plan; Intgral owns the generation, approval snapshot, spend accounting and media records. Read the installed references as local files, resolving links relative to the containing file.

1. Read the configured [private workspace](references/private-workspace.md), then the current product and variant facts through available Intgral tools, including the product detail route (description, listing-profile bullets), since `medusa.get_product` returns a trimmed summary. Use [briefing](references/briefing.md) to fill only missing decisions and record their sources.
2. Inspect available tools and the deployed video endpoint schemas. Use [the journey](references/journey.md) for draft creation, approval and media operations. If the required route or permission is missing, report that limitation and stop before the dependent operation.
3. Prefer [reference-image prompting](references/prompting.md) when the deployment supports it: product images and an expert prompt, without generated keyframes. Use [keyframes](references/keyframes.md) when the user needs controlled start/end composition or agrees to address product drift this way.
4. Show the actual images, full submitted prompt, timing, unresolved issues and sourced cost estimate. Approval applies to the current plan hash and cost cap. Only call the approval endpoint after the user authorizes this exact plan and spend.
5. Read the existing generation until its outcome is known. Follow [recovery](references/recovery.md) for failures or interruption. Technical completion and visual acceptance are separate; only claim checks actually performed.

## Facts and costs

Product appearance, packaging and claims come from the target product's evidence. External creative references provide style, not facts about the product. Unverified claims remain in the private task record and stay out of prompts and overlays.

A keyframe budget is separate from the video cost cap. Reserving a keyframe does not authorize video generation, and a pending boundary frame blocks the plan's approval; when asking the user for more frame budget, say both. Revised plans require a fresh review and approval; previously submitted work may already cost money. No batch candidates or paid retries merely to choose a favorite.

## Capabilities

The supported video contract has no speech or voice-over, so never ask the user to choose a voice-over language. Subtitles are a separate processing step: a stored language preference is not an implemented subtitle service, and on-screen text drawn by the model is not a subtitle substitute.

Prompt and frame generation/rendering depend on actual host tools. A URL or image list does not prove visual inspection, and a result observed in a mock, another host or an earlier deployment is not acceptance evidence for this one. All provider submissions go through Intgral's catalogued endpoints; no direct provider fallback when a deployment is missing a capability.

For each new task, record `skill_version: intgral-video@7` when the deployed schema supports it. Keep the version attached to existing tasks unchanged.
