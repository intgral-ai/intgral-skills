# Two prompt paths

Discover the deployment's schema before choosing a path. The reference-image baseline supports 4–15 seconds per segment, at most five reference images and expert prompts. Longer plans require the deployed segmentation contract; never infer that a single provider call accepts the whole duration.

## Reference images

Attach clean product truth images as `reference_asset_ids` in the order used by `Picture N` in the prompt. Keep a stable name per product, and record which image establishes each identity. Style references belong in the creative description unless the user explicitly intends them as product inputs.

Supply the expert prompt in each segment's `prompt`. Omit `keyframe_budget`; reference images and first/last keyframes are mutually exclusive in this mode. Confirm returned `mode: reference` and frozen input identities before approval.

Use these three fields, in this order:

```text
integrated_multimodal_description: [style, setting and directional lighting]. [product identity and Picture N mapping]. No one speaks; there is no dialogue or voice-over. Shot 1: [shot size and angle, one subject action, camera sentence]. At 4.00 seconds: Shot 2: [action and camera sentence]. [final static product hold].
overall_soundscape: [physical sounds, including when they occur]
non_diegetic_music: [specific instrumentation, tempo and progression, or N/A]
```

Replace every bracketed slot. The first shot is untimed; later shots use cumulative timestamps within this segment, not the whole multi-segment video. Describe the intended motion clearly; write camera movement as a sentence. Use one consistent product name and concrete materials/lighting. Express desired appearance positively while preserving the exact no-speech sentence required by the contract.

The baseline requires `No one speaks; there is no dialogue or voice-over.` exactly once in each expert prompt, rejects dialogue tags and limits expert prompts to 7,000 characters. Confirm these against the deployed schema and errors. Do not invent a translation of the required sentence.

## Compiled keyframe mode

When keyframes are selected, fill the live `brief` and `segments[].beats` schemas. Brief holds style, setting, directional lighting, the product name and nonempty preserve list, physical soundscape and music. Each beat specifies subject action, duration, camera and optional shot/overlay fields.

Read the returned compiled `segments[].prompt`: that is what the user approves and the worker submits. The final segment ends with a static product hold. Keep requested aspect ratio and actual keyframe aspect ratio aligned. Follow [keyframe handling](keyframes.md) before approval.

## Iteration

After inspecting a result, explain the concrete defect and propose a focused change to style, lighting, camera, action or product reference. User intent can justify a direct mode change; do not spend money on a mandatory sequence of experiments. Every new paid attempt needs authorization, and every revised plan needs review.

Format background: [MiniMax H3](https://github.com/MiniMax-AI/MiniMax-H3). The actual Intgral endpoint contract governs supported requests; an upstream feature is not automatically available in the connected deployment.
