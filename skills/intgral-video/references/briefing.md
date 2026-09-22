# Briefing and task record

Read existing product facts, this merchant's private preferences and any resumed task before asking questions. Record answers in a private copy of the [task template](../assets/task-record-template.md), never inside the installed skill. Without filesystem access, maintain an exportable in-chat record and state that it has not been persisted.

Each decision records a source: user, saved preference, product evidence, delegated creative choice, Agent proposal, or unverified. A creative choice is delegated only when the user authorized the Agent to decide it. The principal message and product identity constraints need product/user evidence, not an invented marketing claim.

When the user delegates a choice ("you decide"), fill it, state the choice in one sentence and continue. When the user delegates the principal message or the identity constraints, decline in one sentence, ask the question and wait. An unverified claim counts as a recorded decision, but it never enters an action, an on-screen text or a prompt sentence.

| Decision | Record |
| --- | --- |
| Purpose | Audience, placement and intended use; suggests the default duration and aspect ratio |
| Principal message | The one product fact the viewer should remember |
| Identity constraints | Visible shape, color, material, packaging and details that must stay consistent. Draft the appearance description from the product images first (form, material, surface, details); the user corrects it line by line and names what must never change |
| Creative flexibility | Permitted setting, props, lighting and transformations, including whether hands may appear |
| Style | Six axes, one answer each: art direction (photoreal product photography, illustrated, CG), palette (two or three named colors or a reference image), tone (quiet, playful or dramatic, one only), era (contemporary, a named decade, or timeless), rhythm (few slow peaks or many fast ones), tier (a named brand or campaign as the visual reference, never "premium feel") |
| Setting and lighting | One sentence for where the scene is; the key light and its direction, with optional fill and rim |
| Opening and closing | Initial composition and final still product hold |
| Beats | Each beat's type (hero, feature demonstration, abstract visualization, lifestyle, closing hold), subject action, shot size/angle, camera movement and duration; any feature claim the user makes earns a proposed demonstration beat |
| References | Product truth image versus a style reference whose role is rhythm, palette, lighting, attitude, clothing, environment or product detail; exactly one truth image per product; map every attached image to Picture N |
| Casting | Who or what appears, including hands-only if requested |
| Sound | Physical ambient sounds and specific music direction (instrument, tempo, progression), or no music |
| Text | Exact supported on-screen text, one short line per placement within the deployed length limit (baseline 32 characters), with the warning that spelling and frame-to-frame consistency are not guaranteed; script and subtitle languages recorded separately, with the regional variant (Brazilian versus European Portuguese) |
| Mode and budget | Reference-image or keyframe mode; user-authorized frame total and intended duration/aspect ratio |
| Unknowns | Unsupported claims, missing capabilities and remaining decisions |

## Rounds

Ask in the user's language; request fields and prompts are English. The briefing is not a questionnaire: each round asks every still-missing decision, one question per decision, then waits, records the answers as they arrive, recounts what still lacks a source and asks the next round. Never re-ask a decision that already has a source, including a style axis confirmed in the private preferences. After an interruption, resume from the task record's empty rows rather than from the start.

The first round covers the whole video once, using the seven elements of a video prompt: subject, action, scene, camera, lighting, style and sound. Style is asked axis by axis, one axis per question. Later rounds confirm only three things per beat — subject, action and camera; scene, lighting, style and sound carry over from the first round unless the user changes them for that beat, in which case the change is noted as an override. The Agent pre-fills each beat's type and duration from the rhythm axis so the user corrects a table instead of composing one.

When product images are insufficient, external style references may be gathered with their sources recorded; they never become product truth. The draft is created only when every decision row has a source.

## Challenge

After each round's answers and before writing any request, check the storyboard against these rules. A triggered rule asks one question; record the trigger and the conclusion in the task record's challenge section.

| # | Rule | Trigger | Question |
| --- | --- | --- | --- |
| 1 | One verb | A beat's action contains two or more actions | Split into two beats, or keep one? |
| 2 | Consistent tone | Style axes contradict (vintage and futuristic; quiet and dramatic) | Which one stays? |
| 3 | One camera | The camera movement contradicts the action or shot (an action says "push in" while the camera pulls out; a static camera "follows the hand") | Static or following — which? |
| 4 | Physical words | Adjectives without physical content ("premium", "nice", "textured") | Which brand's image, or which material and light, is meant? |
| 5 | Something moves | A beat only describes a picture, with nothing moving (closing hold excepted) | What moves in this beat? |
| 6 | Lit from somewhere | The key light has no direction | From the top, top-left, front or behind? |
| 7 | Constraint in evidence | An identity constraint is not visible in any product image | Which image shows it? Unseen details cannot be constraints |
| 8 | Text within limits | On-screen text exceeds the limit, or text or action carries a claim the product evidence cannot support | Replace with an evidenced claim, or record as unverified and keep it off screen? |
| 9 | Simple motion | Spinning, splashing, several hands moving at once, particle bursts | One hand, one action — acceptable? |
| 10 | Minimum beat length | Any beat shorter than the supported minimum (expert prompts allow half-second timestamps; compiled beats are integer seconds, so one second is rejected) | Merge into the neighbour or extend to two seconds? |
| 11 | No cuts inside a segment | An action says "cut to" or "switch shot" | Write the change as one movement of the subject (a single turn that ends in the new color), or move the cut to a segment boundary? |
| 12 | One product name | The product is called different things across beats | Use one full name throughout? With several products, one look is one shot with its own text line |

## Read-back

Group only missing material questions. Prefer one physical action per beat and one consistent product name. Resolve conflicting camera directions, vague visual adjectives, absent lighting direction, unsupported claims and overloaded motion. Derive creative constraints from the requested result rather than demanding an arbitrary brand reference.

For compiled beats, obey the live duration schema and the supported minimum beat length; the inspected baseline accepts integer beats, so use at least two seconds. Beat durations must sum to their segment duration. Expert prompts can use half-second timestamps while preserving the segment's total duration. End the final segment with the product fully visible and a static hold.

Read back the user's plan in their language and show the exact English prompt sent to the generation service alongside the mapped reference images. When the host reports no image rendering, the read-back's first sentence says the images were not seen and that every Picture N role comes from file names or metadata alone, and no picture's contents are described as observed. A setting, prop or action the Agent added itself is recorded with the source "Agent proposal, unconfirmed" unless the user delegated that choice. Missing product truth or an unresolved spend decision prevents approval. An explicitly recorded unknown may remain if it does not enter the generated claims and the user accepts its impact.
