# Keyframes: reserve, generate, store, review

Use only in keyframe mode and with the user's authorized frame budget. Discover each route and schema before writing.

1. Reserve the specific segment and position through the catalogued keyframe reservation endpoint. Send `authorized_budget` only when the user has explicitly raised the authorized total.
2. Generate that frame with an available host image tool using the correct product references. Preserve product identity, the plan's aspect ratio, a complete subject and a clear stable pose. The baseline requires a short edge of at least 720 pixels; use an exact ratio such as 1080×1920 for 9:16, not a nearby ratio.
3. Store the image using the keyframe endpoint with the same segment/position, image URL or actual bytes, and source asset identities, external style sources and generation prompt. A failed image validation does not imply the reservation was consumed; inspect the returned state before reserving again.
4. Show and record the review of the latest version: approved, rejected, or accepted_with_issues with an explanation. An unseen frame is not reviewed.

Segment zero has a first frame. Every non-final segment needs a last frame that also becomes the next segment's first frame; use the returned shared-frame relationship instead of generating another first frame. The final segment's last frame is optional according to the live contract.

Regenerating an already reviewed slot is a paid redo requiring new user authorization even if other budget remains. A new asset version changes the plan hash immediately. Only the final segment's last frame may be dropped when the user decides to omit it and the backend permits it; a shared boundary cannot be silently removed.

Frame generation and visual review are host capabilities. If either is absent, explain the gap and stop at that step. Do not substitute a text storyboard for an actual image or claim approval on the user's behalf.
