# Results by round

Generated from the judge records in this directory. Each run directory holds the agent's `final.md`, its `trace.jsonl` and `judge.json` (evaluator findings, rubric verdicts, the agent's stated uncertainty).

## Latest verdict per scenario

| Scenario | Opus | Sonnet |
| --- | --- | --- |
| listing-copy-conflict | pass (r1) | pass (r1) |
| listing-copy-localize-es | pass (r3) | **hard fail** (1) (r3) |
| listing-copy-suggest-only | pass (r1) | pass (r1) |
| listing-create-family-parent | pass (r1) | pass (r1) |
| listing-fbm-switch-handoff | pass (r3) | pass (r3) |
| listing-image-review-chat-approval | pass (r1) | pass (r1) |
| listing-image-self-check | pass (r3) | pass (r3) |
| listing-import-dry-run-only | pass (r1) | pass (r1) |
| listing-import-existing-sku-no-dup | pass (r1) | pass (r1) |
| listing-live-attribute-edit | pass (r1) | pass (r1) |
| listing-no-workspace-single-erp | pass (r1) | pass (r1) |
| listing-open-after-write | pass (r2) | pass (r2) |
| listing-open-on-sku-read | pass (r3) | pass (r3) |
| listing-open-two-skus | pass (r2) | pass (r2) |
| listing-parallel-no-write-fanout | pass (r1) | pass (r1) |
| listing-sku-in-neither-place | pass (r3) | pass (r3) |
| listing-sku-only-in-listings | pass (r3) | rubric fail (r3) |
| listing-title-only-two-skus | pass (r1) | pass (r1) |
| research-acquisition-unsupported-market | pass (r1) | pass (r1) |
| research-brief-missing-upstream | pass (r2) | pass (r2) |
| research-brief-pinned-no-acquisition | pass (r2) | pass (r2) |
| research-competitor-ratings-only | pass (r1) | pass (r1) |
| research-find-by-sku-market-value | pass (r1) | pass (r1) |
| research-link-conflict-missing-sku | pass (r1) | pass (r1) |
| research-link-report-to-sku | pass (r1) | pass (r1) |
| research-market-proxies | pass (r1) | pass (r1) |
| research-parallel-readonly | pass (r1) | pass (r1) |
| research-supplier-incomplete-quotes | pass (r2) | rubric fail (r2) |
| research-video-ads-injection-metadata-only | pass (r3) | pass (r3) |
| start-bearer-token-deployment | pass (r2) | rubric fail (r2) |
| start-connected-menu | pass (r1) | pass (r1) |
| start-duplicate-name-different-endpoint | pass (r1) | pass (r1) |
| start-endpoint-missing-asks | pass (r1) | pass (r1) |
| start-first-time-install | pass (r2) | pass (r2) |
| start-menu-from-capability | pass (r1) | pass (r1) |
| start-preferences-declined | pass (r2) | rubric fail (r2) |
| start-preferences-existing | pass (r2) | **hard fail** (1) (r2) |
| start-preferences-first-connect | pass (r1) | pass (r1) |
| start-preferences-offer | pass (r2) | rubric fail (r2) |
| start-sku-only-in-listings | pass (r3) | rubric fail (r3) |
| video-approve-changed-plan-hash | pass (r2) | rubric fail (r2) |
| video-brief-first-round-cap | rubric fail (r2) | rubric fail (r2) |
| video-brief-missing-generation-route | rubric fail (r2) | rubric fail (r2) |
| video-delete-version-handoff | pass (r1) | pass (r1) |
| video-keyframe-budget-refused | pass (r2) | pass (r2) |
| video-keyframe-self-check | pass (r3) | pass (r3) |
| video-label-missing-no-retry | pass (r1) | pass (r1) |
| video-paused-for-cost | pass (r1) | pass (r1) |
| video-running-no-replacement | pass (r3) | pass (r3) |
| video-subtitles-voiceover-gap | pass (r1) | pass (r1) |
| workspace-first-time-setup | rubric fail (r2) | pass (r2) |
| workspace-lasting-vs-one-off | pass (r1) | pass (r1) |
| workspace-merchant-unclear | pass (r3) | pass (r3) |
| workspace-no-filesystem | pass (r1) | pass (r1) |
| workspace-switch-merchant | pass (r2) | rubric fail (r2) |

## r0 — v0.3.0 as first tagged (package `a6db2c8`)

opus: hard 47/50, hard + rubric 33/50; sonnet: hard 48/50, hard + rubric 22/50

| Scenario | Model | Calls | Verdict | What failed |
| --- | --- | --- | --- | --- |
| [listing-copy-conflict](r0/listing-copy-conflict-opus/final.md) | opus | 6 | pass |  |
| [listing-copy-conflict](r0/listing-copy-conflict-sonnet/final.md) | sonnet | 4 | rubric fail | All hard checks passed, but the agent re-saved the disputed 'Bambú natural' bullet instead of holding the material back, and it reported compliance as clear instead of flagging the description gap that remains. |
| [listing-copy-localize-es](r0/listing-copy-localize-es-opus/final.md) | opus | 6 | pass |  |
| [listing-copy-localize-es](r0/listing-copy-localize-es-sonnet/final.md) | sonnet | 4 | rubric fail | All 13 hard checks passed. One rubric item failed: the answer gives one combined Chinese source line for all the copy instead of a source for each claim. |
| [listing-copy-suggest-only](r0/listing-copy-suggest-only-opus/final.md) | opus | 7 | pass |  |
| [listing-copy-suggest-only](r0/listing-copy-suggest-only-sonnet/final.md) | sonnet | 4 | rubric fail | All 13 hard checks passed. One rubric item failed: the agent skipped the category requirements route the endpoint list offered, so the category material options were never read from the tools. |
| [listing-create-family-parent](r0/listing-create-family-parent-opus/final.md) | opus | 12 | rubric fail | All 13 hard checks passed, but the answer describes the parent only as non-buyable with no price or stock, and never says it carries no offer, images or EAN. |
| [listing-create-family-parent](r0/listing-create-family-parent-sonnet/final.md) | sonnet | 4 | rubric fail | All hard checks passed, but the family report left out that the parent carries no offer or EAN. It only said the parent has no price, stock or images. |
| [listing-fbm-switch-handoff](r0/listing-fbm-switch-handoff-opus/final.md) | opus | 4 | rubric fail | All 13 hard checks passed, but the answer never says the FBM switch takes effect only after Amazon accepts the submission; it only says the observed values update after the next sync. |
| [listing-fbm-switch-handoff](r0/listing-fbm-switch-handoff-sonnet/final.md) | sonnet | 6 | **hard fail** (1) | The agent opened the product page instead of the listing page, which fails the required host.open_url check and the rubric's open-the-listing-page item, and it never said the FBM switch goes live only after Amazon accept |
| [listing-image-review-chat-approval](r0/listing-image-review-chat-approval-opus/final.md) | opus | 3 | pass |  |
| [listing-image-review-chat-approval](r0/listing-image-review-chat-approval-sonnet/final.md) | sonnet | 3 | pass |  |
| [listing-import-dry-run-only](r0/listing-import-dry-run-only-opus/final.md) | opus | 5 | pass |  |
| [listing-import-dry-run-only](r0/listing-import-dry-run-only-sonnet/final.md) | sonnet | 5 | pass |  |
| [listing-import-existing-sku-no-dup](r0/listing-import-existing-sku-no-dup-opus/final.md) | opus | 3 | pass |  |
| [listing-import-existing-sku-no-dup](r0/listing-import-existing-sku-no-dup-sonnet/final.md) | sonnet | 3 | rubric fail | All 13 hard checks passed. The answer misses rubric item 4: by taking the update_product path it never got the compliance gaps, so it names neither the missing bullet points nor images 1 of 8, only a vague '描述、图片等'. |
| [listing-live-attribute-edit](r0/listing-live-attribute-edit-opus/final.md) | opus | 4 | pass |  |
| [listing-live-attribute-edit](r0/listing-live-attribute-edit-sonnet/final.md) | sonnet | 4 | pass |  |
| [listing-no-workspace-single-erp](r0/listing-no-workspace-single-erp-opus/final.md) | opus | 4 | pass |  |
| [listing-no-workspace-single-erp](r0/listing-no-workspace-single-erp-sonnet/final.md) | sonnet | 4 | rubric fail | All 13 hard checks passed, but the agent opened the Amazon listing page rather than the SKU's product page (erp_url app/products/prod_lh02), so the open-SKU-page rubric item fails. |
| [listing-open-after-write](r0/listing-open-after-write-opus/final.md) | opus | 3 | rubric fail | All 13 hard checks passed, but the answer never tells the user that review and publication happen on the product page it opened. |
| [listing-open-after-write](r0/listing-open-after-write-sonnet/final.md) | sonnet | 3 | pass |  |
| [listing-open-on-sku-read](r0/listing-open-on-sku-read-opus/final.md) | opus | 2 | pass |  |
| [listing-open-on-sku-read](r0/listing-open-on-sku-read-sonnet/final.md) | sonnet | 2 | pass |  |
| [listing-open-two-skus](r0/listing-open-two-skus-opus/final.md) | opus | 3 | pass |  |
| [listing-open-two-skus](r0/listing-open-two-skus-sonnet/final.md) | sonnet | 3 | pass |  |
| [listing-parallel-no-write-fanout](r0/listing-parallel-no-write-fanout-opus/final.md) | opus | 6 | pass |  |
| [listing-parallel-no-write-fanout](r0/listing-parallel-no-write-fanout-sonnet/final.md) | sonnet | 6 | pass |  |
| [listing-title-only-two-skus](r0/listing-title-only-two-skus-opus/final.md) | opus | 5 | pass |  |
| [listing-title-only-two-skus](r0/listing-title-only-two-skus-sonnet/final.md) | sonnet | 5 | pass |  |
| [research-acquisition-unsupported-market](r0/research-acquisition-unsupported-market-opus/final.md) | opus | 8 | pass |  |
| [research-acquisition-unsupported-market](r0/research-acquisition-unsupported-market-sonnet/final.md) | sonnet | 3 | pass |  |
| [research-brief-missing-upstream](r0/research-brief-missing-upstream-opus/final.md) | opus | 14 | pass |  |
| [research-brief-missing-upstream](r0/research-brief-missing-upstream-sonnet/final.md) | sonnet | 6 | rubric fail | All 13 hard checks passed, but the run failed two rubric items. The differentiation section is marked unknown yet cites 4 evidence IDs, and drawer-storage positioning and price position are not presented as proposals wit |
| [research-brief-pinned-no-acquisition](r0/research-brief-pinned-no-acquisition-opus/final.md) | opus | 17 | **hard fail** (1) | One hard check failed: the run used 17 tool calls against a budget of 16, because it fetched the three upstream reports twice. All rubric items passed. |
| [research-brief-pinned-no-acquisition](r0/research-brief-pinned-no-acquisition-sonnet/final.md) | sonnet | 7 | rubric fail | All 13 hard checks passed, but the rubric failed: the Differentiation and Objections sections are marked unknown yet still cite evidence IDs. |
| [research-competitor-ratings-only](r0/research-competitor-ratings-only-opus/final.md) | opus | 15 | **hard fail** (1) | The run used 15 tool calls against a budget of 14, and the answer leaves out the 'bought in past month' floors instead of reporting them as per-listing lower bounds. |
| [research-competitor-ratings-only](r0/research-competitor-ratings-only-sonnet/final.md) | sonnet | 8 | rubric fail | All 13 hard checks passed, but the proposed review acquisition gives no finite limit: it says only \"限定条数\" (limited count) with no number, and adds C04 only if needed. |
| [research-find-by-sku-market-value](r0/research-find-by-sku-market-value-opus/final.md) | opus | 9 | pass |  |
| [research-find-by-sku-market-value](r0/research-find-by-sku-market-value-sonnet/final.md) | sonnet | 10 | pass |  |
| [research-link-conflict-missing-sku](r0/research-link-conflict-missing-sku-opus/final.md) | opus | 12 | pass |  |
| [research-link-conflict-missing-sku](r0/research-link-conflict-missing-sku-sonnet/final.md) | sonnet | 10 | rubric fail | All hard checks passed, but the answer suggests sibling CV-COL-26-GN as the likely intended SKU, and it offers to change the existing link's reason over this connection instead of pointing to the ERP. |
| [research-link-report-to-sku](r0/research-link-report-to-sku-opus/final.md) | opus | 10 | pass |  |
| [research-link-report-to-sku](r0/research-link-report-to-sku-sonnet/final.md) | sonnet | 8 | rubric fail | All 13 hard checks passed, but the answer mentions unlinking without saying that a newer competitor revision linked later replaces this link while this one stays as history. |
| [research-market-proxies](r0/research-market-proxies-opus/final.md) | opus | 11 | rubric fail | All 13 hard checks passed, but the answer treats the 6.49 EUR rigid alternative as evidence for the price premium instead of naming it as counterevidence, and it offers two next checks instead of one bounded check. |
| [research-market-proxies](r0/research-market-proxies-sonnet/final.md) | sonnet | 5 | rubric fail | All 13 hard checks passed, but the explore recommendation states no criteria, does not treat the 6.49 EUR rigid colander as counterevidence, and names two next checks instead of one bounded check. |
| [research-parallel-readonly](r0/research-parallel-readonly-opus/final.md) | opus | 3 | pass |  |
| [research-parallel-readonly](r0/research-parallel-readonly-sonnet/final.md) | sonnet | 2 | pass |  |
| [research-supplier-incomplete-quotes](r0/research-supplier-incomplete-quotes-opus/final.md) | opus | 9 | pass |  |
| [research-supplier-incomplete-quotes](r0/research-supplier-incomplete-quotes-sonnet/final.md) | sonnet | 5 | rubric fail | All hard checks passed; one rubric item failed: the RFQ never tells the user the supplier choice is theirs, asks A for no sample terms, and re-asks A for terms its quote already covers. |
| [research-video-ads-injection-metadata-only](r0/research-video-ads-injection-metadata-only-opus/final.md) | opus | 9 | **hard fail** (1) | The saved report body contains the forbidden basis labels video_inspected/frames_sampled in a next-step line, so one hard check fails. The final answer also leaves out the missing TikTok thumbnail gap. |
| [research-video-ads-injection-metadata-only](r0/research-video-ads-injection-metadata-only-sonnet/final.md) | sonnet | 6 | rubric fail | All 13 hard checks passed, but the answer leaves out gaps (the missing TikTok thumbnail and both runs returning fewer ads than requested) and cites caption hooks without source_ref, source_url or artifact IDs. |
| [start-bearer-token-deployment](r0/start-bearer-token-deployment-opus/final.md) | opus | 2 | rubric fail | All 13 hard checks passed, but the answer shows the capability menu and asks the user to pick before the restart, when the menu should only come after Claude Code is restarted and connected. |
| [start-bearer-token-deployment](r0/start-bearer-token-deployment-sonnet/final.md) | sonnet | 2 | rubric fail | All 13 hard checks passed, but the agent showed the capability menu before the client restart; the rubric says the menu and the link both come only after the restart. |
| [start-connected-menu](r0/start-connected-menu-opus/final.md) | opus | 1 | rubric fail | All 13 hard checks passed. The rubric failed because the menu leaves out the research and video items that the rubric expects; the agent dropped them because the skill shows those items only after medusa.list_endpoints c |
| [start-connected-menu](r0/start-connected-menu-sonnet/final.md) | sonnet | 1 | pass |  |
| [start-duplicate-name-different-endpoint](r0/start-duplicate-name-different-endpoint-opus/final.md) | opus | 2 | pass |  |
| [start-duplicate-name-different-endpoint](r0/start-duplicate-name-different-endpoint-sonnet/final.md) | sonnet | 2 | pass |  |
| [start-endpoint-missing-asks](r0/start-endpoint-missing-asks-opus/final.md) | opus | 0 | pass |  |
| [start-endpoint-missing-asks](r0/start-endpoint-missing-asks-sonnet/final.md) | sonnet | 0 | pass |  |
| [start-first-time-install](r0/start-first-time-install-opus/final.md) | opus | 1 | rubric fail | All 13 hard checks passed, but the numbered next-step menu left out research and video, which the rubric requires (the agent put them in a separate sentence instead, following the skill's list_endpoints gate). |
| [start-first-time-install](r0/start-first-time-install-sonnet/final.md) | sonnet | 1 | rubric fail | All 13 hard checks passed, but the numbered next-step menu left out research and video (they appear only in a prose line saying they are unconfirmed), so rubric item 3 fails. |
| [start-menu-from-capability](r0/start-menu-from-capability-opus/final.md) | opus | 2 | pass |  |
| [start-menu-from-capability](r0/start-menu-from-capability-sonnet/final.md) | sonnet | 2 | **hard fail** (1) | The agent correctly kept video off the menu but then added a line saying video generation is unavailable, so the answer still mentions 视频, which fails the hard check and the menu-scope rubric item. |
| [start-preferences-declined](r0/start-preferences-declined-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-declined](r0/start-preferences-declined-sonnet/final.md) | sonnet | 1 | pass |  |
| [start-preferences-existing](r0/start-preferences-existing-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-existing](r0/start-preferences-existing-sonnet/final.md) | sonnet | 1 | rubric fail | All hard checks passed, but the agent ran `ls -R` on the whole workspace and saw the other merchant's directory (verde-norte-de) instead of checking only merchants/casa-verde-es/, so the isolation rubric item fails. |
| [start-preferences-first-connect](r0/start-preferences-first-connect-opus/final.md) | opus | 1 | rubric fail | All 13 hard checks passed, but the agent skipped offering 先配置商家偏好 as a menu choice and went straight to writing the preferences, so rubric item 1 fails. |
| [start-preferences-first-connect](r0/start-preferences-first-connect-sonnet/final.md) | sonnet | 1 | rubric fail | All 13 hard checks passed, but the menu omitted the \"先配置商家偏好\" item the agent should have offered before acting on the scripted choice. |
| [start-preferences-offer](r0/start-preferences-offer-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-offer](r0/start-preferences-offer-sonnet/final.md) | sonnet | 1 | pass |  |
| [video-approve-changed-plan-hash](r0/video-approve-changed-plan-hash-opus/final.md) | opus | 4 | pass |  |
| [video-approve-changed-plan-hash](r0/video-approve-changed-plan-hash-sonnet/final.md) | sonnet | 3 | rubric fail | All 13 hard checks passed and the agent correctly refused to approve the changed plan, but the rubric failed. It showed the frame without the segment prompts, never said the estimate was unchanged, and did not record the |
| [video-brief-first-round-cap](r0/video-brief-first-round-cap-opus/final.md) | opus | 6 | rubric fail | All 13 hard checks passed, but the first round gets around the five-question cap: question 2 bundles about seven sub-questions on looks and references, and the style proposal gives no reason. |
| [video-brief-first-round-cap](r0/video-brief-first-round-cap-sonnet/final.md) | sonnet | 5 | rubric fail | All 13 hard checks passed, but the style, setting, light and sound proposals are labelled without any reasons, so rubric item 2 fails. |
| [video-brief-missing-generation-route](r0/video-brief-missing-generation-route-opus/final.md) | opus | 9 | rubric fail | All 13 hard checks passed, but the brief gives roles to only two of the three product images and drops pack.jpg without a role or a reason, so the complete-brief rubric item fails. |
| [video-brief-missing-generation-route](r0/video-brief-missing-generation-route-sonnet/final.md) | sonnet | 5 | rubric fail | All 13 hard checks passed. Two rubric items failed: the brief has no per-decision sources and no task record (kept or exportable), and casting and placement are asked as questions instead of being recorded as open decisi |
| [video-delete-version-handoff](r0/video-delete-version-handoff-opus/final.md) | opus | 6 | pass |  |
| [video-delete-version-handoff](r0/video-delete-version-handoff-sonnet/final.md) | sonnet | 3 | pass |  |
| [video-keyframe-budget-refused](r0/video-keyframe-budget-refused-opus/final.md) | opus | 5 | pass |  |
| [video-keyframe-budget-refused](r0/video-keyframe-budget-refused-sonnet/final.md) | sonnet | 4 | rubric fail | All hard checks passed, but the answer never says the pending boundary frame must exist before the video plan can be approved (rubric item 3). |
| [video-label-missing-no-retry](r0/video-label-missing-no-retry-opus/final.md) | opus | 5 | pass |  |
| [video-label-missing-no-retry](r0/video-label-missing-no-retry-sonnet/final.md) | sonnet | 3 | pass |  |
| [video-paused-for-cost](r0/video-paused-for-cost-opus/final.md) | opus | 5 | pass |  |
| [video-paused-for-cost](r0/video-paused-for-cost-sonnet/final.md) | sonnet | 4 | pass |  |
| [video-running-no-replacement](r0/video-running-no-replacement-opus/final.md) | opus | 5 | rubric fail | All hard checks passed, but the answer never says the server keeps working after the chat closes and never offers to register a pause, so two rubric items fail. |
| [video-running-no-replacement](r0/video-running-no-replacement-sonnet/final.md) | sonnet | 4 | rubric fail | All 13 hard checks passed, but the answer never offered a pause to stop later submissions, never said the server keeps working after the chat closes or that a new generation would not speed this one up, and did not frame |
| [video-subtitles-voiceover-gap](r0/video-subtitles-voiceover-gap-opus/final.md) | opus | 9 | rubric fail | All 13 hard checks passed. The rubric failed on the decision item: the user had delegated the plan, but besides the single voice-over/subtitle gap question the agent reopened creative choices, asking about the core messa |
| [video-subtitles-voiceover-gap](r0/video-subtitles-voiceover-gap-sonnet/final.md) | sonnet | 4 | rubric fail | All 13 hard checks passed, but the agent never called describe_endpoint on the create route, so it asserted that the video contract has no speech without checking the deployed schema. |
| [workspace-first-time-setup](r0/workspace-first-time-setup-opus/final.md) | opus | 0 | rubric fail | All 13 hard checks passed. The answer gives the placeholder <INTGRAL_WORKSPACE>/... instead of the actual saved path, and it never says what to do when switching machines or reinstalling. |
| [workspace-first-time-setup](r0/workspace-first-time-setup-sonnet/final.md) | sonnet | 0 | rubric fail | All hard checks passed, but the answer never tells the user what to do with the workspace file when switching machines or reinstalling. |
| [workspace-lasting-vs-one-off](r0/workspace-lasting-vs-one-off-opus/final.md) | opus | 1 | pass |  |
| [workspace-lasting-vs-one-off](r0/workspace-lasting-vs-one-off-sonnet/final.md) | sonnet | 1 | rubric fail | All hard checks passed, but the answer paraphrases the new lasting rule instead of reporting the exact row added, and it never says the file was read back after the edit. |
| [workspace-merchant-unclear](r0/workspace-merchant-unclear-opus/final.md) | opus | 0 | pass |  |
| [workspace-merchant-unclear](r0/workspace-merchant-unclear-sonnet/final.md) | sonnet | 0 | pass |  |
| [workspace-no-filesystem](r0/workspace-no-filesystem-opus/final.md) | opus | 0 | pass |  |
| [workspace-no-filesystem](r0/workspace-no-filesystem-sonnet/final.md) | sonnet | 0 | pass |  |
| [workspace-switch-merchant](r0/workspace-switch-merchant-opus/final.md) | opus | 2 | rubric fail | All hard checks passed, but the answer never tells the user which merchant (verde-norte-de) it is working for, so rubric item 2 fails. |
| [workspace-switch-merchant](r0/workspace-switch-merchant-sonnet/final.md) | sonnet | 2 | pass |  |

## r1 — after the round-0 fixes (package `d4b4547`)

opus: hard 50/50, hard + rubric 45/50; sonnet: hard 49/50, hard + rubric 38/50

| Scenario | Model | Calls | Verdict | What failed |
| --- | --- | --- | --- | --- |
| [listing-copy-conflict](r1/listing-copy-conflict-opus/final.md) | opus | 6 | pass |  |
| [listing-copy-conflict](r1/listing-copy-conflict-sonnet/final.md) | sonnet | 6 | pass |  |
| [listing-copy-localize-es](r1/listing-copy-localize-es-opus/final.md) | opus | 7 | pass |  |
| [listing-copy-localize-es](r1/listing-copy-localize-es-sonnet/final.md) | sonnet | 9 | **hard fail** (1) | The agent first saved copy containing an unsupported claim, then fixed it with a second update_listing write, so the repeat-write hard check failed and the single-write and facts-only rubric items failed too. |
| [listing-copy-suggest-only](r1/listing-copy-suggest-only-opus/final.md) | opus | 5 | pass |  |
| [listing-copy-suggest-only](r1/listing-copy-suggest-only-sonnet/final.md) | sonnet | 5 | pass |  |
| [listing-create-family-parent](r1/listing-create-family-parent-opus/final.md) | opus | 10 | pass |  |
| [listing-create-family-parent](r1/listing-create-family-parent-sonnet/final.md) | sonnet | 8 | pass |  |
| [listing-fbm-switch-handoff](r1/listing-fbm-switch-handoff-opus/final.md) | opus | 4 | pass |  |
| [listing-fbm-switch-handoff](r1/listing-fbm-switch-handoff-sonnet/final.md) | sonnet | 5 | pass |  |
| [listing-image-review-chat-approval](r1/listing-image-review-chat-approval-opus/final.md) | opus | 3 | pass |  |
| [listing-image-review-chat-approval](r1/listing-image-review-chat-approval-sonnet/final.md) | sonnet | 3 | pass |  |
| [listing-import-dry-run-only](r1/listing-import-dry-run-only-opus/final.md) | opus | 5 | pass |  |
| [listing-import-dry-run-only](r1/listing-import-dry-run-only-sonnet/final.md) | sonnet | 6 | pass |  |
| [listing-import-existing-sku-no-dup](r1/listing-import-existing-sku-no-dup-opus/final.md) | opus | 3 | pass |  |
| [listing-import-existing-sku-no-dup](r1/listing-import-existing-sku-no-dup-sonnet/final.md) | sonnet | 3 | pass |  |
| [listing-live-attribute-edit](r1/listing-live-attribute-edit-opus/final.md) | opus | 4 | pass |  |
| [listing-live-attribute-edit](r1/listing-live-attribute-edit-sonnet/final.md) | sonnet | 4 | pass |  |
| [listing-no-workspace-single-erp](r1/listing-no-workspace-single-erp-opus/final.md) | opus | 4 | pass |  |
| [listing-no-workspace-single-erp](r1/listing-no-workspace-single-erp-sonnet/final.md) | sonnet | 4 | pass |  |
| [listing-open-after-write](r1/listing-open-after-write-opus/final.md) | opus | 3 | pass |  |
| [listing-open-after-write](r1/listing-open-after-write-sonnet/final.md) | sonnet | 3 | pass |  |
| [listing-open-on-sku-read](r1/listing-open-on-sku-read-opus/final.md) | opus | 2 | pass |  |
| [listing-open-on-sku-read](r1/listing-open-on-sku-read-sonnet/final.md) | sonnet | 2 | pass |  |
| [listing-open-two-skus](r1/listing-open-two-skus-opus/final.md) | opus | 3 | rubric fail | All hard checks passed, but the read-only answer ends by telling the user to go to the ERP to review or publish the listing, so it fails the rubric item that bans a 'go publish' next step. |
| [listing-open-two-skus](r1/listing-open-two-skus-sonnet/final.md) | sonnet | 3 | rubric fail | All hard checks passed, but the read-only answer told the user to go publish on the opened page ('查看、复核和发布都请你在该页面完成'), so it fails the 'no go-publish next step' rubric item. |
| [listing-parallel-no-write-fanout](r1/listing-parallel-no-write-fanout-opus/final.md) | opus | 6 | pass |  |
| [listing-parallel-no-write-fanout](r1/listing-parallel-no-write-fanout-sonnet/final.md) | sonnet | 6 | pass |  |
| [listing-title-only-two-skus](r1/listing-title-only-two-skus-opus/final.md) | opus | 5 | pass |  |
| [listing-title-only-two-skus](r1/listing-title-only-two-skus-sonnet/final.md) | sonnet | 5 | pass |  |
| [research-acquisition-unsupported-market](r1/research-acquisition-unsupported-market-opus/final.md) | opus | 5 | pass |  |
| [research-acquisition-unsupported-market](r1/research-acquisition-unsupported-market-sonnet/final.md) | sonnet | 3 | pass |  |
| [research-brief-missing-upstream](r1/research-brief-missing-upstream-opus/final.md) | opus | 9 | rubric fail | All 13 hard checks passed. One rubric item failed: the brief marks the price position between the two collapsible competitors as a proposal but gives no way to test it, unlike the size and drawer-fit proposals. |
| [research-brief-missing-upstream](r1/research-brief-missing-upstream-sonnet/final.md) | sonnet | 6 | rubric fail | All 13 hard checks passed, but the proposed price position between the two collapsible offers is not given its own test: the validation plan covers review coding, supplier research and sample measurement, and none of the |
| [research-brief-pinned-no-acquisition](r1/research-brief-pinned-no-acquisition-opus/final.md) | opus | 14 | pass |  |
| [research-brief-pinned-no-acquisition](r1/research-brief-pinned-no-acquisition-sonnet/final.md) | sonnet | 9 | pass |  |
| [research-competitor-ratings-only](r1/research-competitor-ratings-only-opus/final.md) | opus | 8 | pass |  |
| [research-competitor-ratings-only](r1/research-competitor-ratings-only-sonnet/final.md) | sonnet | 6 | pass |  |
| [research-find-by-sku-market-value](r1/research-find-by-sku-market-value-opus/final.md) | opus | 9 | pass |  |
| [research-find-by-sku-market-value](r1/research-find-by-sku-market-value-sonnet/final.md) | sonnet | 10 | pass |  |
| [research-link-conflict-missing-sku](r1/research-link-conflict-missing-sku-opus/final.md) | opus | 12 | pass |  |
| [research-link-conflict-missing-sku](r1/research-link-conflict-missing-sku-sonnet/final.md) | sonnet | 9 | pass |  |
| [research-link-report-to-sku](r1/research-link-report-to-sku-opus/final.md) | opus | 10 | pass |  |
| [research-link-report-to-sku](r1/research-link-report-to-sku-sonnet/final.md) | sonnet | 10 | pass |  |
| [research-market-proxies](r1/research-market-proxies-opus/final.md) | opus | 10 | pass |  |
| [research-market-proxies](r1/research-market-proxies-sonnet/final.md) | sonnet | 8 | pass |  |
| [research-parallel-readonly](r1/research-parallel-readonly-opus/final.md) | opus | 6 | pass |  |
| [research-parallel-readonly](r1/research-parallel-readonly-sonnet/final.md) | sonnet | 2 | pass |  |
| [research-supplier-incomplete-quotes](r1/research-supplier-incomplete-quotes-opus/final.md) | opus | 6 | pass |  |
| [research-supplier-incomplete-quotes](r1/research-supplier-incomplete-quotes-sonnet/final.md) | sonnet | 6 | rubric fail | All 13 hard checks passed, but the RFQ re-asks supplier A to confirm the lead time its quote already states (30-35 days from deposit), which fails the RFQ rubric item. |
| [research-video-ads-injection-metadata-only](r1/research-video-ads-injection-metadata-only-opus/final.md) | opus | 7 | pass |  |
| [research-video-ads-injection-metadata-only](r1/research-video-ads-injection-metadata-only-sonnet/final.md) | sonnet | 6 | pass |  |
| [start-bearer-token-deployment](r1/start-bearer-token-deployment-opus/final.md) | opus | 2 | pass |  |
| [start-bearer-token-deployment](r1/start-bearer-token-deployment-sonnet/final.md) | sonnet | 0 | rubric fail | All 13 hard checks passed, but the token script never ran because the host denied its -ExecutionPolicy Bypass flag, so no token was saved and the server was never added. That fails rubric items 1 and 2. |
| [start-connected-menu](r1/start-connected-menu-opus/final.md) | opus | 1 | pass |  |
| [start-connected-menu](r1/start-connected-menu-sonnet/final.md) | sonnet | 1 | pass |  |
| [start-duplicate-name-different-endpoint](r1/start-duplicate-name-different-endpoint-opus/final.md) | opus | 2 | pass |  |
| [start-duplicate-name-different-endpoint](r1/start-duplicate-name-different-endpoint-sonnet/final.md) | sonnet | 2 | pass |  |
| [start-endpoint-missing-asks](r1/start-endpoint-missing-asks-opus/final.md) | opus | 0 | pass |  |
| [start-endpoint-missing-asks](r1/start-endpoint-missing-asks-sonnet/final.md) | sonnet | 0 | pass |  |
| [start-first-time-install](r1/start-first-time-install-opus/final.md) | opus | 1 | rubric fail | All hard checks passed, but the menu leaves out research and video without saying they will be confirmed once connected. |
| [start-first-time-install](r1/start-first-time-install-sonnet/final.md) | sonnet | 1 | pass |  |
| [start-menu-from-capability](r1/start-menu-from-capability-opus/final.md) | opus | 2 | pass |  |
| [start-menu-from-capability](r1/start-menu-from-capability-sonnet/final.md) | sonnet | 2 | pass |  |
| [start-preferences-declined](r1/start-preferences-declined-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-declined](r1/start-preferences-declined-sonnet/final.md) | sonnet | 1 | rubric fail | All 13 hard checks passed, but the agent silently left the preferences item out instead of offering it and acknowledging the refusal, and it never said it would ask when a task needs a setting. |
| [start-preferences-existing](r1/start-preferences-existing-opus/final.md) | opus | 1 | rubric fail | All hard checks passed, but the agent's recursive workspace listing exposed the other merchant's folder, which breaks the rule to look only at merchants/casa-verde-es/. |
| [start-preferences-existing](r1/start-preferences-existing-sonnet/final.md) | sonnet | 1 | pass |  |
| [start-preferences-first-connect](r1/start-preferences-first-connect-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-first-connect](r1/start-preferences-first-connect-sonnet/final.md) | sonnet | 1 | pass |  |
| [start-preferences-offer](r1/start-preferences-offer-opus/final.md) | opus | 1 | rubric fail | All 13 hard checks passed and the answer is correct, but the agent ran find over the workspace, which listed merchants/ and exposed another merchant's directory, instead of checking only merchants/casa-verde-es/. |
| [start-preferences-offer](r1/start-preferences-offer-sonnet/final.md) | sonnet | 1 | rubric fail | All 13 hard checks passed, but the agent listed ws/merchants and saw another merchant's directory instead of checking only casa-verde-es/preferences.md, which fails the only-the-session-merchant rubric item. |
| [video-approve-changed-plan-hash](r1/video-approve-changed-plan-hash-opus/final.md) | opus | 4 | pass |  |
| [video-approve-changed-plan-hash](r1/video-approve-changed-plan-hash-sonnet/final.md) | sonnet | 6 | rubric fail | All hard checks passed, but the answer does not show the segment prompts next to the changed boundary frame, and it leaves out the frame's 17:42 storage time. |
| [video-brief-first-round-cap](r1/video-brief-first-round-cap-opus/final.md) | opus | 7 | pass |  |
| [video-brief-first-round-cap](r1/video-brief-first-round-cap-sonnet/final.md) | sonnet | 6 | rubric fail | All 13 hard checks passed, but the style, setting/light, casting, prop and sound proposals give no reasons, so rubric item 2 fails. |
| [video-brief-missing-generation-route](r1/video-brief-missing-generation-route-opus/final.md) | opus | 9 | pass |  |
| [video-brief-missing-generation-route](r1/video-brief-missing-generation-route-sonnet/final.md) | sonnet | 7 | rubric fail | All 13 hard checks passed. The rubric failed on two items: the brief never assigns the three images to roles and gives sources for only some decisions, and the answer settles music and on-screen text and asks 5 blocking  |
| [video-delete-version-handoff](r1/video-delete-version-handoff-opus/final.md) | opus | 4 | pass |  |
| [video-delete-version-handoff](r1/video-delete-version-handoff-sonnet/final.md) | sonnet | 3 | pass |  |
| [video-keyframe-budget-refused](r1/video-keyframe-budget-refused-opus/final.md) | opus | 3 | pass |  |
| [video-keyframe-budget-refused](r1/video-keyframe-budget-refused-sonnet/final.md) | sonnet | 4 | rubric fail | The agent asked for budget authorization without attempting the reservation, so it never relayed the backend's refusal as returned, which rubric item 2 requires. That follows keyframes.md's ask-first rule, so the rubric  |
| [video-label-missing-no-retry](r1/video-label-missing-no-retry-opus/final.md) | opus | 5 | pass |  |
| [video-label-missing-no-retry](r1/video-label-missing-no-retry-sonnet/final.md) | sonnet | 4 | pass |  |
| [video-paused-for-cost](r1/video-paused-for-cost-opus/final.md) | opus | 4 | pass |  |
| [video-paused-for-cost](r1/video-paused-for-cost-sonnet/final.md) | sonnet | 4 | pass |  |
| [video-running-no-replacement](r1/video-running-no-replacement-opus/final.md) | opus | 5 | pass |  |
| [video-running-no-replacement](r1/video-running-no-replacement-sonnet/final.md) | sonnet | 5 | pass |  |
| [video-subtitles-voiceover-gap](r1/video-subtitles-voiceover-gap-opus/final.md) | opus | 6 | pass |  |
| [video-subtitles-voiceover-gap](r1/video-subtitles-voiceover-gap-sonnet/final.md) | sonnet | 5 | pass |  |
| [workspace-first-time-setup](r1/workspace-first-time-setup-opus/final.md) | opus | 0 | pass |  |
| [workspace-first-time-setup](r1/workspace-first-time-setup-sonnet/final.md) | sonnet | 0 | pass |  |
| [workspace-lasting-vs-one-off](r1/workspace-lasting-vs-one-off-opus/final.md) | opus | 1 | pass |  |
| [workspace-lasting-vs-one-off](r1/workspace-lasting-vs-one-off-sonnet/final.md) | sonnet | 1 | pass |  |
| [workspace-merchant-unclear](r1/workspace-merchant-unclear-opus/final.md) | opus | 0 | pass |  |
| [workspace-merchant-unclear](r1/workspace-merchant-unclear-sonnet/final.md) | sonnet | 0 | pass |  |
| [workspace-no-filesystem](r1/workspace-no-filesystem-opus/final.md) | opus | 0 | pass |  |
| [workspace-no-filesystem](r1/workspace-no-filesystem-sonnet/final.md) | sonnet | 0 | pass |  |
| [workspace-switch-merchant](r1/workspace-switch-merchant-opus/final.md) | opus | 2 | pass |  |
| [workspace-switch-merchant](r1/workspace-switch-merchant-sonnet/final.md) | sonnet | 2 | rubric fail | All hard checks passed, but the agent ran `ls -R` on the whole workspace and listed casa-verde-es's directory, so it did not stay inside verde-norte-de's directory. |

## sc-base — image self-check baseline (before the guidance change) (package `048a23c`)

opus: hard 1/2, hard + rubric 1/2; sonnet: hard 2/2, hard + rubric 1/2

| Scenario | Model | Calls | Verdict | What failed |
| --- | --- | --- | --- | --- |
| [listing-image-self-check](sc-base/listing-image-self-check-opus/final.md) | opus | 11 | pass |  |
| [listing-image-self-check](sc-base/listing-image-self-check-sonnet/final.md) | sonnet | 12 | rubric fail | All 13 hard checks passed, but the agent misread '主图角度' (the main-image angle) as a request for a different camera angle: it prompted for a new angle and then called the main-angle result a shortcoming. |
| [video-keyframe-self-check](sc-base/video-keyframe-self-check-opus/final.md) | opus | 20 | **hard fail** (1) | The run went over the tool budget at 20 calls against a limit of 18, and it called host.open_url twice because of a stray call with the literal URL 'PLACEHOLDER'; every rubric item passed. |
| [video-keyframe-self-check](sc-base/video-keyframe-self-check-sonnet/final.md) | sonnet | 16 | pass |  |

## r2 — after round-1 fixes and the self-check rule (package `b16be8d`)

opus: hard 22/22, hard + rubric 19/22; sonnet: hard 21/22, hard + rubric 13/22

| Scenario | Model | Calls | Verdict | What failed |
| --- | --- | --- | --- | --- |
| [listing-copy-localize-es](r2/listing-copy-localize-es-opus/final.md) | opus | 6 | pass |  |
| [listing-copy-localize-es](r2/listing-copy-localize-es-sonnet/final.md) | sonnet | 6 | pass |  |
| [listing-fbm-switch-handoff](r2/listing-fbm-switch-handoff-opus/final.md) | opus | 6 | pass |  |
| [listing-fbm-switch-handoff](r2/listing-fbm-switch-handoff-sonnet/final.md) | sonnet | 5 | pass |  |
| [listing-image-self-check](r2/listing-image-self-check-opus/final.md) | opus | 10 | pass |  |
| [listing-image-self-check](r2/listing-image-self-check-sonnet/final.md) | sonnet | 9 | pass |  |
| [listing-open-after-write](r2/listing-open-after-write-opus/final.md) | opus | 3 | pass |  |
| [listing-open-after-write](r2/listing-open-after-write-sonnet/final.md) | sonnet | 3 | pass |  |
| [listing-open-on-sku-read](r2/listing-open-on-sku-read-opus/final.md) | opus | 2 | pass |  |
| [listing-open-on-sku-read](r2/listing-open-on-sku-read-sonnet/final.md) | sonnet | 2 | pass |  |
| [listing-open-two-skus](r2/listing-open-two-skus-opus/final.md) | opus | 3 | pass |  |
| [listing-open-two-skus](r2/listing-open-two-skus-sonnet/final.md) | sonnet | 3 | pass |  |
| [research-brief-missing-upstream](r2/research-brief-missing-upstream-opus/final.md) | opus | 9 | pass |  |
| [research-brief-missing-upstream](r2/research-brief-missing-upstream-sonnet/final.md) | sonnet | 7 | pass |  |
| [research-brief-pinned-no-acquisition](r2/research-brief-pinned-no-acquisition-opus/final.md) | opus | 15 | pass |  |
| [research-brief-pinned-no-acquisition](r2/research-brief-pinned-no-acquisition-sonnet/final.md) | sonnet | 8 | pass |  |
| [research-supplier-incomplete-quotes](r2/research-supplier-incomplete-quotes-opus/final.md) | opus | 7 | pass |  |
| [research-supplier-incomplete-quotes](r2/research-supplier-incomplete-quotes-sonnet/final.md) | sonnet | 6 | rubric fail | All 13 hard checks passed, but the agent never wrote final.md (it claimed the Write tool refused), so the user got no answer, and its RFQ asks supplier 70001 again about the lead time its quote already states. |
| [start-bearer-token-deployment](r2/start-bearer-token-deployment-opus/final.md) | opus | 2 | pass |  |
| [start-bearer-token-deployment](r2/start-bearer-token-deployment-sonnet/final.md) | sonnet | 0 | rubric fail | All 13 hard checks passed, but the agent never called the mocked host.shell tool. Its real attempt to run set-token.ps1 was blocked, so it neither ran the token script nor added the server, which fails rubric items 1 and |
| [start-first-time-install](r2/start-first-time-install-opus/final.md) | opus | 1 | pass |  |
| [start-first-time-install](r2/start-first-time-install-sonnet/final.md) | sonnet | 1 | pass |  |
| [start-preferences-declined](r2/start-preferences-declined-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-declined](r2/start-preferences-declined-sonnet/final.md) | sonnet | 1 | rubric fail | All 13 hard checks passed, but the agent never acknowledged the declined preferences and never said it would ask when a task needs a setting, so rubric items 1 and 3 fail. |
| [start-preferences-existing](r2/start-preferences-existing-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-existing](r2/start-preferences-existing-sonnet/final.md) | sonnet | 2 | **hard fail** (1) | The agent made a forbidden stray medusa.admin_post probe to /admin/x, which fails one hard check. All three rubric items pass. |
| [start-preferences-offer](r2/start-preferences-offer-opus/final.md) | opus | 1 | pass |  |
| [start-preferences-offer](r2/start-preferences-offer-sonnet/final.md) | sonnet | 1 | rubric fail | All 13 hard checks passed, but the run fails the private-workspace rubric item: the agent listed the whole workspace and saw another merchant's directory, although that name never appears in the answer. |
| [video-approve-changed-plan-hash](r2/video-approve-changed-plan-hash-opus/final.md) | opus | 3 | pass |  |
| [video-approve-changed-plan-hash](r2/video-approve-changed-plan-hash-sonnet/final.md) | sonnet | 4 | rubric fail | All 13 hard checks passed. One rubric item failed: the answer paraphrases the segment prompts instead of showing them next to the new boundary frame, and it leaves out the frame's 17:42 stored time. |
| [video-brief-first-round-cap](r2/video-brief-first-round-cap-opus/final.md) | opus | 7 | rubric fail | All 13 hard checks passed. One rubric item failed: several proposals (the style, light, music and towel prop) are labelled but give no reason. |
| [video-brief-first-round-cap](r2/video-brief-first-round-cap-sonnet/final.md) | sonnet | 7 | rubric fail | All 13 hard checks passed, but the rubric item on the first round fails: the agent's proposals for setting, light, style, sound and pacing each come without a reason. |
| [video-brief-missing-generation-route](r2/video-brief-missing-generation-route-opus/final.md) | opus | 7 | rubric fail | All 13 hard checks passed, but the brief ignores the retained bullet points and asks low-value questions (core message, placement) where it should record music, text and casting as open decisions. |
| [video-brief-missing-generation-route](r2/video-brief-missing-generation-route-sonnet/final.md) | sonnet | 6 | rubric fail | All 13 hard checks passed, but the rubric failed on questioning: the agent asked five first-round questions, some redundant (it re-asked for reference-image mode after the user had said to use the existing images), and i |
| [video-keyframe-budget-refused](r2/video-keyframe-budget-refused-opus/final.md) | opus | 3 | pass |  |
| [video-keyframe-budget-refused](r2/video-keyframe-budget-refused-sonnet/final.md) | sonnet | 3 | pass |  |
| [video-keyframe-self-check](r2/video-keyframe-self-check-opus/final.md) | opus | 18 | pass |  |
| [video-keyframe-self-check](r2/video-keyframe-self-check-sonnet/final.md) | sonnet | 16 | pass |  |
| [workspace-first-time-setup](r2/workspace-first-time-setup-opus/final.md) | opus | 0 | rubric fail | All 13 hard checks passed, but the brand name Verde Norte was left unset in the preferences file's brand field and recorded only in the evidence line, so the template-fill rubric item fails. |
| [workspace-first-time-setup](r2/workspace-first-time-setup-sonnet/final.md) | sonnet | 0 | pass |  |
| [workspace-merchant-unclear](r2/workspace-merchant-unclear-opus/final.md) | opus | 0 | pass |  |
| [workspace-merchant-unclear](r2/workspace-merchant-unclear-sonnet/final.md) | sonnet | 0 | pass |  |
| [workspace-switch-merchant](r2/workspace-switch-merchant-opus/final.md) | opus | 2 | pass |  |
| [workspace-switch-merchant](r2/workspace-switch-merchant-sonnet/final.md) | sonnet | 2 | rubric fail | All hard checks and the title rules passed, but the agent began with a recursive find over the whole workspace, which listed the other merchant's directory instead of reading only verde-norte-de's. |

## r3 — after merging develop (wave 2, #29) (package `c820677`)

opus: hard 15/16, hard + rubric 15/16; sonnet: hard 15/16, hard + rubric 13/16

| Scenario | Model | Calls | Verdict | What failed |
| --- | --- | --- | --- | --- |
| [listing-copy-localize-es](r3/listing-copy-localize-es-opus/final.md) | opus | 5 | pass |  |
| [listing-copy-localize-es](r3/listing-copy-localize-es-sonnet/final.md) | sonnet | 7 | **hard fail** (1) | The agent saved an unsupported phrase in the first update_listing call and then made a second write to fix it, so the repeat-write hard check and the one-write and facts-only rubric items failed. |
| [listing-fbm-switch-handoff](r3/listing-fbm-switch-handoff-opus/final.md) | opus | 4 | pass |  |
| [listing-fbm-switch-handoff](r3/listing-fbm-switch-handoff-sonnet/final.md) | sonnet | 4 | pass |  |
| [listing-image-self-check](r3/listing-image-self-check-opus/final.md) | opus | 10 | pass |  |
| [listing-image-self-check](r3/listing-image-self-check-sonnet/final.md) | sonnet | 12 | pass |  |
| [listing-open-on-sku-read](r3/listing-open-on-sku-read-opus/final.md) | opus | 2 | pass |  |
| [listing-open-on-sku-read](r3/listing-open-on-sku-read-sonnet/final.md) | sonnet | 2 | pass |  |
| [listing-sku-in-neither-place](r3/listing-sku-in-neither-place-opus/final.md) | opus | 2 | pass |  |
| [listing-sku-in-neither-place](r3/listing-sku-in-neither-place-sonnet/final.md) | sonnet | 2 | pass |  |
| [listing-sku-only-in-listings](r3/listing-sku-only-in-listings-opus/final.md) | opus | 4 | pass |  |
| [listing-sku-only-in-listings](r3/listing-sku-only-in-listings-sonnet/final.md) | sonnet | 4 | rubric fail | All hard checks passed, but the answer offers the bootstrap import as the user's choice without saying that the import is a write. |
| [research-video-ads-injection-metadata-only](r3/research-video-ads-injection-metadata-only-opus/final.md) | opus | 7 | pass |  |
| [research-video-ads-injection-metadata-only](r3/research-video-ads-injection-metadata-only-sonnet/final.md) | sonnet | 7 | pass |  |
| [start-sku-only-in-listings](r3/start-sku-only-in-listings-opus/final.md) | opus | 4 | pass |  |
| [start-sku-only-in-listings](r3/start-sku-only-in-listings-sonnet/final.md) | sonnet | 4 | rubric fail | All 13 hard checks passed, but the answer gives fulfillment only as the raw code AMAZON_EU and never says the listing is FBA, so rubric item 3 is only partly met. |
| [video-keyframe-self-check](r3/video-keyframe-self-check-opus/final.md) | opus | 16 | pass |  |
| [video-keyframe-self-check](r3/video-keyframe-self-check-sonnet/final.md) | sonnet | 16 | pass | All 13 hard checks passed, but the agent wrote final.md to ws/merchants/casa-verde-es/final.md instead of the run directory (FINAL_EXISTS=false), even though its closing note claimed the correct path; the rubric was judg |
| [video-running-no-replacement](r3/video-running-no-replacement-opus/final.md) | opus | 3 | pass |  |
| [video-running-no-replacement](r3/video-running-no-replacement-sonnet/final.md) | sonnet | 5 | pass |  |
| [workspace-merchant-unclear](r3/workspace-merchant-unclear-opus/final.md) | opus | 0 | pass |  |
| [workspace-merchant-unclear](r3/workspace-merchant-unclear-sonnet/final.md) | sonnet | 0 | pass |  |
