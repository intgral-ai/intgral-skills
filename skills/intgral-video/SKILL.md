---
name: intgral-video
description: Plan, approve, generate, review and resume product videos through Intgral MCP, using product reference images or approved keyframes and private merchant preferences.
license: MIT
metadata:
  version: "0.1.0"
---

# Intgral product video

Work on one requested video at a time. The Agent prepares the creative plan; Intgral owns the generation, approval snapshot, spend accounting and media records. Read the installed references as local files, resolving links relative to the containing file.

1. Read the configured [private workspace](references/private-workspace.md), then the current product and variant facts through available Intgral tools. Use [briefing](references/briefing.md) to fill only missing decisions and record their sources.
2. Inspect available tools and the deployed video endpoint schemas. Use [the journey](references/journey.md) for draft creation, approval and media operations. If the required route or permission is missing, report that limitation and stop before the dependent operation.
3. Prefer [reference-image prompting](references/prompting.md) when the deployment supports it: product images and an expert prompt, without generated keyframes. Use [keyframes](references/keyframes.md) when the user needs controlled start/end composition or agrees to address product drift this way.
4. Show the actual images, full submitted prompt, timing, unresolved issues and sourced cost estimate. Approval applies to the current plan hash and cost cap. Only call the approval endpoint after the user authorizes this exact plan and spend.
5. Read the existing generation until its outcome is known. Follow [recovery](references/recovery.md) for failures or interruption. Technical completion and visual acceptance are separate; only claim checks actually performed.

## Facts and costs

Product appearance, packaging and claims come from the target product's evidence. External creative references provide style, not facts about the product. Unverified claims remain in the private task record and stay out of prompts and overlays.

A keyframe budget is separate from the video cost cap. Reserving a keyframe does not authorize video generation. Revised plans require a fresh review and approval; previously submitted work may already cost money. No batch candidates or paid retries merely to choose a favorite.

## Capabilities

The supported video contract has no speech or voice-over. Subtitles are a separate processing step: a stored language preference is not an implemented subtitle service. Explain which requested elements can actually be delivered, and resolve a material gap before proceeding.

Prompt and frame generation/rendering depend on actual host tools. A URL or image list does not prove visual inspection. All provider submissions go through Intgral's catalogued endpoints; no direct provider fallback when a deployment is missing a capability.

For each new task, record `skill_version: intgral-video@1` when the deployed schema supports it. Keep the version attached to existing tasks unchanged.
