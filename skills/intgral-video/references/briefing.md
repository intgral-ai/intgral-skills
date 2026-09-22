# Briefing and task record

Read existing product facts, this merchant's private preferences and any resumed task before asking questions. Record answers in a private copy of the [task template](../assets/task-record-template.md), never inside the installed skill. Without filesystem access, maintain an exportable in-chat record and state that it has not been persisted.

Each decision records a source: user, saved preference, product evidence, delegated creative choice, Agent proposal, or unverified. A creative choice is delegated only when the user authorized the Agent to decide it. The principal message and product identity constraints need product/user evidence, not an invented marketing claim.

| Decision | Record |
| --- | --- |
| Purpose | Audience, placement and intended use |
| Principal message | The one product fact the viewer should remember |
| Identity constraints | Visible shape, color, material, packaging and details that must stay consistent |
| Creative flexibility | Permitted setting, props, lighting and transformations |
| Opening and closing | Initial composition and final still product hold |
| Beats | Each beat's purpose, subject action, shot size/angle, camera movement and duration |
| References | Product truth image versus style, rhythm, lighting or environment reference; map every attached image to Picture N |
| Casting | Who or what appears, including hands-only if requested |
| Sound | Physical ambient sounds and specific music direction, or no music |
| Text | Exact supported text and script/subtitle languages separately |
| Mode and budget | Reference-image or keyframe mode; user-authorized frame total and intended duration/aspect ratio |
| Unknowns | Unsupported claims, missing capabilities and remaining decisions |

Group only missing material questions. Prefer one physical action per beat and one consistent product name. Resolve conflicting camera directions, vague visual adjectives, absent lighting direction, unsupported claims and overloaded motion. Derive creative constraints from the requested result rather than demanding an arbitrary brand reference.

For compiled beats, obey the live duration schema and the supported minimum beat length; the inspected baseline accepts integer beats, so use at least two seconds. Beat durations must sum to their segment duration. Expert prompts can use half-second timestamps while preserving the segment's total duration. End the final segment with the product fully visible and a static hold.

Read back the user's plan in their language and show the exact English prompt sent to the generation service alongside the mapped reference images. When the host reports no image rendering, the read-back's first sentence says the images were not seen and that every Picture N role comes from file names or metadata alone, and no picture's contents are described as observed. A setting, prop or action the Agent added itself is recorded with the source "Agent proposal, unconfirmed" unless the user delegated that choice. Missing product truth or an unresolved spend decision prevents approval. An explicitly recorded unknown may remain if it does not enter the generated claims and the user accepts its impact.
