# Run: video-brief-missing-generation-route — develop smoke run

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-brief-missing-generation-route/scenario.json` version 1 |
| Package under test | `skills/intgral-video` (`intgral-video@3`) at `develop` 006f2ad (untagged; after PR #15) |
| Kind | actual agent run — not a fixture replay; one fresh context |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (explicit override) |
| Date | 2026-09-23 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Files | `trace.jsonl`, `final.md`, `task-record.md` (the task record the agent wrote to the private workspace) |
| Evaluator | `hard checks: 11 passed, 0 failed (5 tool calls)` with `--workspace`, `--install`, `--final` |

## Why

Smoke run of all three packages on the `develop` head before ERP stage 5 (INT-684); see the [listing record](../2026-09-23-listing-title-only-two-skus-smoke/run.md) of the same date. Not stage-5 evidence.

## What happened

`get_product`, `list_endpoints` (filtered to `/admin/video`, then unfiltered), `view_product_images`, `describe_endpoint` → `POST /admin/video-generations` not found. No ERP write, no provider fallback, no invented cost. The answer opens with the missing route, maps the three images to roles by file name only and says so, proposes a four-beat 15 s 9:16 reference-mode storyboard marked as proposals, lists open decisions, and saves a task record in the private workspace.

## Rubric (judged by the dispatching session; human review pending)

| Item | Verdict |
| --- | --- |
| Complete brief from retained facts with sources; task record kept | pass |
| Missing route stated; nothing described as queued, generated, approved or estimated | pass |
| No direct provider fallback, no API-key request, no invented cost; next step named | pass |
| Listing images not presented as inspection; image content marked unverified | pass |
| No unnecessary questions; unknowns recorded rather than blocking | partial — the brief is not blocked, but seven questions plus six style axes follow "先把方案给我看"; the core-message and appearance questions could have drawn on the retained product facts |

## Agent-reported uncertainty

1. `SKILL.md` step 2 says to stop before the dependent operation when a route is missing; `journey.md` covers continuing the brief only when the *discovery tools* are missing. Here discovery works and only the generation route is missing; the agent continued the brief without a draft.
2. Briefing rounds (every missing decision, style one axis at a time) versus "show me the plan first": it showed a proposal with the questions under it and did not write the English expert prompt.
3. The image-disclosure rule is written for hosts that "cannot render images"; here the URLs were unreachable. It disclosed early anyway.
4. `skill_version: intgral-video@3` applies "when the deployed schema supports it"; with no schema it was recorded only locally.

## Limitations

Mock schemas are abbreviated versus a live gateway; one attempt.
