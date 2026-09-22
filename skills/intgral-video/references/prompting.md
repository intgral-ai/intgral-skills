# Two prompt paths

Discover the deployment's schema before choosing a path. The reference-image baseline supports 4–15 seconds per segment, at most five reference images and expert prompts. Longer plans require the deployed segmentation contract; never infer that a single provider call accepts the whole duration. The inspected baseline caps a plan at 35 seconds and splits anything above 15 into 4–15 second segments joined by shared boundary frames (16 seconds becomes two segments, 35 becomes three); the segment count and durations come from the returned draft, not from the Agent.

A single 4–15 second call is the default. Size it from the content: about two seconds to open, two and a half to three seconds per product or look, and two seconds of closing hold — one product is about eight seconds, three products about twelve. The delivered duration is rounded by the provider to whole frames; report the measured value next to the requested one.

## Reference images

Attach clean product truth images as `reference_asset_ids` in the order used by `Picture N` in the prompt. Exactly one truth image per product: the product complete and front-facing on its own plain background, without hands, with any printed text legible. Remaining slots (the baseline allows five in total) may carry a texture, on-body or effect shot of the same product. Keep a stable name per product, and record which image establishes each identity. Style references and template videos are not attached: record their role (rhythm, palette, lighting, attitude, clothing, environment) in the task record and translate it into the style, scene, lighting or sound sentences, unless the user explicitly intends an image as a product input.

Before creating the draft, record each attached image's identity (file name, size and hash, or asset ID) and the exact request in the task record, so an uncertain submission can be reconciled later.

Supply the expert prompt in each segment's `prompt`. Omit `keyframe_budget`; reference images and first/last keyframes are mutually exclusive in this mode. Confirm returned `mode: reference` and frozen input identities before approval.

Use these three fields, in this order:

```text
integrated_multimodal_description: [type] commercial in the manner of [named brand or campaign]: [art direction], [palette], [tone]; [era]; one continuous unbroken take with a locked-off camera[, how each change of color or outfit happens]. The scene is [one sentence]. Lighting: [key light] from [direction], with [fill], with [rim]. The [product A full name] keeps its [identity constraints] exactly as in Picture 1; the [product B full name] keeps its [...] exactly as in Picture 2; only lighting, background and framing change. Picture 1 shows [product A full name]; Picture 2 shows [product B full name]. [Casting: who, age, hair, clothes, stance; "the only person in the frame"; how much of them is shown.] No one speaks; there is no dialogue or voice-over.

Shot 1: [Size], [angle]. [One action naming the product with its color or material.] [A single line of on-screen text reads "[short text]".] The camera stays static.

At 2.00 seconds: Shot 2: [Size], [angle]. Keeping the same framing, [one action]. The camera [moves how] with [small or large] amplitude at [slow or fast] speed toward [product full name].

At S.SS seconds: Shot N: [Size], [angle]. [The product or products] fully in frame, [logo or front facing the camera], and everything holds still. The camera stays static.

overall_soundscape: [room tone]; [one physical sound per event, in order].
non_diegetic_music: [Silence for the first X seconds, then] [instrument or genre] around [BPM] BPM, [how it is played], [one hit per event], [how it ends]. — or N/A
```

Replace every bracketed slot. The first shot is untimed; later shots use cumulative timestamps within this segment, not the whole multi-segment video. Describe the intended motion clearly; write camera movement as a sentence. Use one consistent product name and concrete materials/lighting. Express desired appearance positively while preserving the exact no-speech sentence required by the contract.

The baseline requires `No one speaks; there is no dialogue or voice-over.` exactly once in each expert prompt, rejects dialogue tags and limits expert prompts to 7,000 characters. Confirm these against the deployed schema and errors. Do not invent a translation of the required sentence.

### Writing rules

Check every expert prompt against these before it is shown for review; a failed rule is fixed, not submitted.

| # | Rule |
| --- | --- |
| 1 | Three fields in fixed order, each on its own line; the first shot untimed, later shots `At S.SS seconds: Shot N:` with two decimals (half seconds allowed); the shots add up to the segment's requested duration |
| 2 | The style sentence names a real brand, campaign or catalogue as the visual reference (`in the manner of ...`); "premium feel" and similar adjectives are replaced by that reference or by material and light |
| 3 | One `Picture N shows [full name]` sentence per attached image; one `keeps its ... exactly as in Picture N` clause per product; the constraint block ends with `only lighting, background and framing change` |
| 4 | Every shot opens with `[Size], [angle].` (wide shot, medium shot, close-up, extreme close-up; eye level, low angle, high angle, overhead) and closes with a camera sentence (`The camera stays static.` or a movement sentence) |
| 5 | A continuous take says `one continuous unbroken take` and each later shot begins `Keeping the same framing`; a change of color or outfit is one movement of the subject (a single turn that ends holding the next product), never a cut |
| 6 | Every shot names the product in full and contains one action; with several products, one look is one shot with its own single line of on-screen text |
| 7 | Only what is wanted: apart from the required no-speech sentence, the prompt contains no `no`, `not`, `never`, `without` or `avoid` |
| 8 | The final shot: the product fully in frame, logo or front facing the camera, `and everything holds still`, `The camera stays static.` |
| 9 | The no-speech sentence appears exactly once; no dialogue tags; no spoken lines |
| 10 | Soundscape lists physical sounds per event (a cap pop, a zip tick, a fabric whoosh); music names instrument or genre, tempo, when it enters, one hit per event and how it ends |
| 11 | Unverified claims enter no sentence; dimensions appear only as proportions inside the `keeps its` clause; effects, certifications and weights stay out |
| 12 | Within the deployed length limit (baseline 7,000 characters) |

### Worked example

Fictional product; eight seconds, one segment, one reference image. It obeys the writing rules above and is a shape to imitate, not text to reuse.

```text
integrated_multimodal_description: A quiet home-goods commercial in the manner of a Scandinavian interiors catalogue: photoreal product photography, a palette of pale bamboo, warm white and soft grey; quiet tone; contemporary; one continuous unbroken take with a locked-off camera. The scene is a matte white bathroom wall beside a folded grey linen towel. Lighting: soft daylight from the top-left, with a gentle white fill from the front. The Casa Verde bamboo wall hook keeps its rounded rectangular bamboo plate, its single curved bamboo peg and its smooth natural grain exactly as in Picture 1; only lighting, background and framing change. Picture 1 shows the Casa Verde bamboo wall hook. One hand with a rolled grey sleeve, shown from the wrist, is the only person in the frame. No one speaks; there is no dialogue or voice-over.

Shot 1: Medium shot, eye level. The Casa Verde bamboo wall hook sits mounted on the white wall, its pale grain catching the daylight, and the hand lifts the grey linen towel toward it. The camera stays static.

At 3.00 seconds: Shot 2: Close-up, low angle. Keeping the same framing, the hand hangs the grey linen towel on the curved peg of the Casa Verde bamboo wall hook and lets go. The camera pushes in with small amplitude at slow speed toward the Casa Verde bamboo wall hook.

At 6.00 seconds: Shot 3: Medium shot, eye level. The Casa Verde bamboo wall hook holds the towel on the white wall, fully in frame, its grain facing the camera, and everything holds still. The camera stays static.

overall_soundscape: A quiet bathroom room tone; a soft brush of linen as the towel lifts; a faint tap of fabric settling on the bamboo peg.
non_diegetic_music: N/A
```

## Compiled keyframe mode

When keyframes are selected, fill the live `brief` and `segments[].beats` schemas. Brief holds style, setting, directional lighting, the product name and nonempty preserve list, physical soundscape and music. Each beat specifies subject action, duration, camera and optional shot/overlay fields. For every enumerated field (camera movement, amplitude, speed, light direction, shot size and angle) use only values the deployed schema enumerates for that field; the described endpoint is the list, and a value outside it is rejected.

Write the brief and beats in English only. The product name is a noun phrase with its article, used unchanged in every beat; a beat whose action starts with a pronoun is prefixed with that name by the backend, any other subject is not, so name the product yourself. The preserve list holds one to ten visible constraints and is never empty. The setting is one sentence; the key light always has a direction. Music is a specific direction or `null`, which compiles to `N/A`; the compiled path adds the no-speech sentence itself.

Beats describe motion, not the picture: the picture is already in the keyframe. Each beat has one action that says what the product's color or material is doing, not only what a hand does. A 15-second segment carries six to nine beats, two or three peaks (a zip opening, pencils fanning out, a turn) between still points. On-screen text is one short line within the deployed limit (baseline 32 characters), at most one or two placements per segment; multi-line text renders poorly. The final beat of the plan is a still hold of the product with a static camera; the baseline checks for a holding verb and rejects anything else.

Read the returned compiled `segments[].prompt`: that is what the user approves and the worker submits. The final segment ends with a static product hold. Keep requested aspect ratio and actual keyframe aspect ratio aligned. Follow [keyframe handling](keyframes.md) before approval.

## Positive phrasing

Every sentence in a request says what is wanted. A negative ("no hands", "without a fancy transition") is remembered by the model as the noun it names. A recurring problem the user states as lasting goes into the private preference file's avoid list in the user's own words, and is written into requests as a positive sentence:

| Avoid-list entry | Sentence in the request |
| --- | --- |
| The label text always warps | Preserve `the printed label text, sharp and legible`; action `the label of the lilac pencil case faces the camera, text crisp` |
| Do not show hands | `the lilac pencil case turns on its own on the table` |
| No flashy transitions | one small camera movement per beat; segments join on a shared boundary frame |

## Iteration

After inspecting a result, explain the concrete defect and propose a focused change to style, lighting, camera, action or product reference. Change one thing per paid attempt, in this order unless the defect points elsewhere: a style axis, the lighting direction or fill, one beat's shot or camera, one beat's action, then the subject — the product name or constraints, then a different reference image, and only then keyframe mode for the drifting shot with a user-authorized frame count. User intent can justify a direct mode change; do not spend money on a mandatory sequence of experiments. Every new paid attempt needs authorization, and every revised plan needs review.

Each attempt is a new generation recorded in the task record's iteration table with what changed, why, and the new generation ID; a mode switch is recorded as a subject change. When the user accepts a result that differs from its prompt, record the difference; to reproduce that look later, describe what was rendered rather than repeating the wording that was misread.

Format background: [MiniMax H3](https://github.com/MiniMax-AI/MiniMax-H3). The actual Intgral endpoint contract governs supported requests; an upstream feature is not automatically available in the connected deployment.
