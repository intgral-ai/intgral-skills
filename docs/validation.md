# Validation evidence

Validated on 2026-09-17 with Windows, Node 24.14.0, Python 3.14.3 and Skills CLI 1.7.0.

## Automated gate

`npm run verify` passed: 13 tests, zero failures, plus validation of all three packages.

- 10 command-line publication-gate cases: standalone acceptance, package license presence, broken reference rejection, missing/mismatched name, empty description, remote Skill dependency, private workstation path, sibling-package dependency, and transitive local references.
- 3 isolated package installs: listing, research and video each copied alone and validated with all their local references.
- The skill-creator validator accepted all three entry points (Python UTF-8 mode required on this Windows host).

Red evidence was observed before implementation: the initial checker was absent; the broken-reference case then failed against the minimal checker; six portability rejection cases failed before validation was added; all three package installation cases failed while the packages were absent; missing package license failed before the license-presence check was added. Those failures were followed by green runs. A sandbox subprocess restriction prevented one early test-runner start and was resolved before collecting test evidence.

## Installer and replacement smoke test

The pinned Skills CLI installed all three packages into an isolated Codex-target project with copy mode. The installed output passed the same local-reference gate.

A distribution-only marker was then appended to the installed video entry. Reinstalling that package removed the marker while preserving a separate private merchant preference sentinel byte-for-byte in meaning (the original file remained unchanged). This demonstrates package replacement and private-data separation; it does not simulate every possible installer or client upgrade.

The public GitHub tree-URL install initially failed because Skills CLI 1.7.0 treated the slash-containing feature branch as branch `feat`. The installation guide was corrected to clone the full branch explicitly and install from the checkout. A fresh public clone then installed all three packages successfully, and the installed references passed validation.

The initial content commit passed [GitHub CI on both Linux and Windows](https://github.com/intgral-ai/intgral-skills/actions/runs/35275229504). Current PR checks are authoritative for subsequent commits.

## Capability discovery guide (2026-09-18, INT-730)

[docs/compatibility.md](compatibility.md) now takes each of the three workflows from installation to a capability check with a per-stage table (required capability, discovery step, preparation-only fallback, stop condition), a tested-environments table with dates, and release guidance separating content/method revisions from deployment requirements. One synthetic walkthrough — the video brief on a deployment without a video-generation route — is recorded as an actual agent run: [video-brief-missing-generation-route](../evals/runs/2026-09-18-video-brief-missing-generation-route-recorded/run.md), claude-opus-5, 7/7 hard checks, 7 tool calls, rubric 5/5, no write attempted, the limitation named and no provider fallback. The complete-capability walkthrough is described, not run: exercising it past approval needs paid generation, which the spec excludes.

`npm run verify` on Windows, Node 24.14.0: 28 tests, zero failures (26 previous plus the video scenario's compliant and known-bad traces), plus validation of all three packages. No package content changed for this slice; no baseline/rerun pair applies.

## Research methods demonstrated from evidence to decision (2026-09-18, INT-725)

The research package now carries a worked example per function under [references/examples/](../skills/intgral-research/references/examples/) — synthetic bamboo drawer organizers, each with positive, incomplete and conflicting variants — and four scenarios in a different fictional domain (collapsible silicone colanders) so the runs test transfer rather than recall: [market proxies](../evals/scenarios/research-market-proxies/scenario.json), [competitor ratings-only](../evals/scenarios/research-competitor-ratings-only/scenario.json), [supplier incomplete quotes](../evals/scenarios/research-supplier-incomplete-quotes/scenario.json), [brief pinned, no acquisition](../evals/scenarios/research-brief-pinned-no-acquisition/scenario.json). Method revisions moved to `intgral-research/<function>@2`.

- `npm run verify` on Windows, Node 24.14.0: 26 tests, zero failures (18 previous, 4 compliant-trace scenarios, 1 research known-bad, 1 research finding names, 1 mock argument validation, 1 evaluator generalisation), plus validation of all three packages.
- Red evidence: the evaluator's deep-partial matching and `forbidden_writes` did not exist — the generic scenario test failed on the seventh check and the competitor known-bad trace (an unauthorized plan POST plus `review_analysis.status: analyzed` with no bodies) was not rejected; the mock's required-argument refusal failed before it was added.
- Eight actual agent runs, claude-opus-5 in fresh-context subagents, baseline on the unchanged package (`a93319a`) then rerun after the examples and clarifications (`1efd23f`):

| Scenario | Baseline | Updated |
| --- | --- | --- |
| market proxies | 7/7, 10 calls, rubric 5/5 | 7/7, 8 calls, rubric 5/5 |
| competitor ratings-only | 7/7, 6 calls, rubric 5/5 | 7/7, 5 calls, rubric 5/5 |
| supplier incomplete quotes | 7/7, 7 calls, rubric 5/5 | **6/7**, 6 calls, rubric 5/5 — one malformed bridge call (bare body without `path`), self-corrected on the next call |
| brief pinned, no acquisition | 7/7, 12 calls, rubric 5/5 | 7/7, 8 calls, rubric 5/5 |

All baselines already passed; no red was manufactured. What the reruns changed: the agents' reported uncertainties (which `schema_revision` a report carries, whether badge floors may be summed, whether to save a partial report without asking, how to answer "cheapest" on incomparable bases, which revision a brief pins) disappeared, and tool counts fell. Two defects surfaced in the fixtures and package rather than in the agents, both fixed after the runs and recorded in the run files: the brief scenario had pinned evidence from another scope (scenario v2), and the brief example marked a merchant brand rule `supported` with no evidence (example corrected).

## Behavioral evaluation (2026-09-18, INT-724)

The listing package now carries a repeatable scenario, [listing-title-only-two-skus](../evals/scenarios/listing-title-only-two-skus/scenario.json): a title-only edit on two SKUs where the second write returns `unknown`. The convention — scenario file, mocked MCP boundary, JSONL trace, deterministic evaluator, human rubric — is described in [evals/README.md](../evals/README.md).

- `npm run verify` on Windows, Node 24.14.0: 18 tests, zero failures (13 previous, 2 evaluator, 3 mock boundary), plus validation of all three packages.
- Red evidence: `tests/evaluate.test.mjs` failed with `Cannot find module scripts/evaluate.mjs` before the evaluator existed; `tests/mock-mcp.test.mjs` failed the same way before the mock existed. The known-bad trace is rejected for scope (an unrequested `description`), a blind retry after `read_state_before_retry`, and a repeated completed write.
- Two actual agent runs, claude-opus-5 in a fresh-context Claude Code subagent with the mock as its MCP client: [baseline](../evals/runs/2026-09-18-listing-title-only-two-skus-baseline/run.md) on the unchanged package (6/6 hard checks, 5 tool calls, rubric 5/5) and [updated](../evals/runs/2026-09-18-listing-title-only-two-skus-updated/run.md) after the entry was tightened (6/6, 5 tool calls, rubric 5/5). The baseline already passed; the guidance change removed the agent-reported uncertainty about product versus listing titles without changing the tool sequence.

Fixture validation and trace replay are structural results. Only the recorded runs are behavioral evidence, and two runs on one model are not a statistical claim.

## Earlier behavioral forward-test (2026-09-17)

An independent agent read the packages and followed three synthetic scenarios without external calls:

1. A title-only edit with partial success: read state before retrying, retain the successful patch and do not expand scope into inventory or unrelated batches.
2. Twelve listing ratings and no review bodies: keep complaint analysis unavailable rather than inventing review themes.
3. A reference video request without approval capability or filesystem access: prepare only the supported brief, keep an exportable unsaved record, and do not generate or claim saved preferences.

The pass identified unnecessary category reads for a title-only edit, overbroad wording about ratings and ambiguous no-filesystem task handling. These were corrected in the packages.

## Limits and deferred acceptance

No live ERP writes, supplier contact, paid image/video generation, real report saves or deployment changes were performed. Client-target installation was tested, but a fresh Codex desktop session with a real authenticated ERP was not exercised. Cross-session use, actual media playback, live API compatibility and paid generation acceptance remain separate integration work after the relevant backend PRs land.

ERP root/core/module/HTTP suites were not run: this repository does not change the ERP or gateway. CI is configured to run the standalone gate on Linux and Windows.
