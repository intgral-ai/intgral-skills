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

## Private merchant onboarding, switching and preference reuse (2026-09-18, INT-727)

`references/private-workspace.md` — identical in all three packages, pinned by a test — is now a journey: a fixed layout (`merchants/<stable-id>/preferences.md | rules.md | tasks/ | backups/`), first-time setup, every later task, lasting instructions versus one-off choices with the re-read → dated backup → minimum change → read-back procedure, switching merchants, reinstall, and hosts without a filesystem. The video task template points at the same `tasks/` directory.

- `npm run verify` on Windows, Node 24.14.0: 42 tests, zero failures (34 previous, 4 compliant traces, 2 package-consistency and reinstall tests, 2 evaluator fixture tests), plus validation of all three packages.
- Red evidence: the evaluator's `--workspace`, `--install` and `--final` checks did not exist, so the two fixture tests failed; the consistency test (three identical copies) and the reinstall test (a preference file outside the package survives a package replacement byte-for-byte) passed on the existing tree and pin those facts.
- Eight actual agent runs, claude-opus-5, baseline on the package at `ce0f5fc` then rerun on `211454c`:

| Scenario | Baseline | Updated |
| --- | --- | --- |
| first-time setup | **10/11** — file created at the workspace root, no `merchants/` layout was stated | 11/11, 0 tool calls |
| lasting vs one-off | 11/11 | 11/11 |
| switch merchant | 11/11 | 11/11 |
| no filesystem | 11/11 (export path also omitted `merchants/`) | 11/11, 0 tool calls |

The setup baseline was a genuine red caused by a guidance gap, not manufactured. The other three already passed; their reruns are unchanged in behavior. The no-filesystem answer now leads with the limitation instead of an acknowledgement that read like a save. Concurrent edits during a run were not simulated; the re-read/merge rule is documented, not exercised.

## Fact-grounded listing copy and localization (2026-09-18, INT-728)

The listing package gains [references/examples/copy.md](../skills/intgral-listing/references/examples/copy.md) — synthetic before/after title, bullets and localization for a fictional folding lamp, every claim with its source and the deployment limits read from the tools, plus suggestion-only, conflict and Spanish-localization variants — and `content.md` now says to read the full product before writing copy, to hold user-stated numbers without product evidence for confirmation, to use only evidenced usage scenes, and what localization does and does not carry over. Three scenarios in a different fictional product (the bamboo wall hook): [suggest-only](../evals/scenarios/listing-copy-suggest-only/scenario.json), [conflict](../evals/scenarios/listing-copy-conflict/scenario.json), [localize-es](../evals/scenarios/listing-copy-localize-es/scenario.json).

- `npm run verify` on Windows, Node 24.14.0: 34 tests, zero failures (28 previous, 3 compliant traces, 2 known-bad, 1 named finding), plus validation of all three packages.
- Red evidence: the conflict known-bad trace (stainless steel and a 5 kg load in saved bullets plus an unrequested title) passed 7/7 before the evaluator gained `forbidden_write_text` and the present-value wildcard.
- Six actual agent runs, claude-opus-5, baseline on the package at `31f920d` then rerun on `639be2d`:

| Scenario | Baseline | Updated |
| --- | --- | --- |
| suggest-only | 8/8, 2 calls, rubric 5/5 | 8/8, 5 calls, rubric 5/5 |
| conflict | 8/8, 2 calls (asked, no write), rubric 4/5 + 1 partial | 8/8, 4 calls, rubric 5/5 |
| localize-es | 8/8, 3 calls, rubric 4/5 + 1 partial | 8/8, 5 calls, rubric 5/5 |

All baselines passed the hard checks; the rubric found what the checks cannot: none of the baseline agents read the product description or variant facts (the trimmed reads omit them), so one asked the user for usage facts the ERP held, one drafted a user-asserted load figure as non-conflicting fact, and one filled a Spanish description with rooms the facts do not name. After the reference change all three read the full product and those defects disappeared. One observation remains untested by a rerun: replacing a bullet array while holding a conflicting claim dropped an existing supported bullet; a sentence was added to `content.md` afterwards.

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

## Port re-verification and repeated agent runs (2026-09-20, INT-776)

[docs/provenance.md](provenance.md) now records a file-by-file comparison against the ERP integration branch (`develop` at `e73d29eb`; `video-generation-v1` at `22ffadae`): nothing on `develop` is unported, and the four unmerged ERP pull requests that would touch a first-party manual are listed for later porting. No package content changed for this slice.

Twenty-five actual agent runs across six scenarios and all three packages — the same scenario repeated in independent fresh contexts, three or four on claude-opus-5 and one on claude-sonnet-5 each — to answer whether the installed packages are followed *reliably*, not just once. Package at `456178e` (top of the INT-723 stack). Full records with per-attempt traces and answers are under `evals/runs/2026-09-20-*-reliability/`.

| Scenario | Skill | Hard checks (attempts passed) | Rubric findings |
| --- | --- | --- | --- |
| listing-title-only-two-skus | listing | 3/4 — opus 3/3, sonnet 0/1 | all pass; the sonnet failure is the evaluator not recognising a re-read by SKU (fixture answers it with stale state) |
| listing-copy-conflict | listing | 4/4 | all pass; identical decisions in every attempt |
| research-competitor-ratings-only | research | 4/4 | 1 fail, 2 partial on price-group shape (a cross-material group; one-member groups) |
| research-brief-pinned-no-acquisition | research | 2/4 — opus 1/3, sonnet 1/1 | all pass; both failures are the Bash bridge's ~32 KB command-line limit (probe calls over budget; a bare body refused, then corrected) |
| workspace-switch-merchant | listing | 3/3 with the session merchant stated; 0/2 with it unstated | the two unstated-merchant attempts named the other merchant in the answer, one also read its file |
| video-brief-missing-generation-route | video | 4/4 | 1 fail: the sonnet attempt described image contents without saying it cannot see images |

Across the 23 convention-faithful attempts, 20 pass every hard check; none of the three failures is a wrong write, an unauthorized action, an invented fact in a saved artifact, or a provider fallback. Where the packages are followed, they are followed the same way by different contexts and models. What repetition surfaced that single runs had not:

- **Harness before package.** Two of the three failures and much of the tool-count variance come from the Bash bridge (JSON on a Windows command line) and from fixture gaps (`artifact/:id` always `not_found`; a SKU read scripted with pre-write state; a refused call counted as a write). These are filed as a follow-up on the evaluation convention, not as package changes.
- **Merchant isolation depends on the merchant being named.** With the session merchant unstated, both Opus attempts leaked the other merchant's identifier into the answer. The reference's "ask rather than guess" has no safe form when the host cannot ask; the answer should stop at the question without listing candidates.
- **The weaker model drops the visibility disclaimer** the stronger one writes unprompted. A required sentence in `briefing.md` when the host reports no image rendering would make that deterministic.
- **Price-group discipline** in the competitor method is the one place three of four attempts drifted from strict like-for-like.

The rubric verdicts were judged by the dispatching session, not yet by a human; the human review is the acceptance step. `npm run verify` on Windows, Node 24.14.0: 42 tests, zero failures, plus validation of all three packages — unchanged from INT-727, because this slice adds records, not code.

## Harness corrections and three guidance rules from the repeated runs (2026-09-21, INT-777)

What the repeated runs surfaced, fixed in two slices and rerun on claude-opus-5 throughout.

**Guidance** (`be4b4eb`, corrected in `HEAD` after review): `private-workspace.md` — an unclear merchant is resolved by asking, never by reading a second directory or naming candidates, and a host that cannot ask stops at the question; `briefing.md` — without image rendering the read-back opens by saying the images were not seen, and Agent-added props are recorded as Agent proposals; `competitor-research.md` — a price group agrees on every comparison condition, a single observation is a row, method revision `intgral-research/competitor@3`; `intgral-video@2`. All wording original; no third-party skill was read.

**Harness** (`552eb5c`, narrowed after review): the evaluator recognises a state read by its response, judges a call the mock refused on what it tried to send but not as a completed write, and reads `required_writes` from calls that reached the tool; fixtures answer post-write reads by either key and serve every listed artifact on its detail route; the stdin form for large bodies is documented and pinned.

- `npm run verify` on Windows, Node 24.14.0: **51 tests, zero failures** (50 previous, 1 for the narrowed refusal rule), plus validation of all three packages.
- Red evidence, verbatim in the commit messages and the implementers' reports: 6 of the 8 evaluator/mock tests added in `552eb5c` fail on `cc74d9d` (`retry: … without a read of current state`; `scope: medusa.admin_post #5 sends …`; the SKU and product_id post-write reads returning the pre-write title; two `not_found` artifact detail routes); the narrowed-refusal test fails on `552eb5c` with `0 !== 1` (the refused write's forbidden text went unjudged). Two tests were green from the start by design (the forbidden-tool guard and the stdin characterisation) and are said to be.
- Reruns, baseline → change → rerun, package at `be4b4eb`, harness at `552eb5c`:

| Scenario | Before (2026-09-20) | After (2026-09-21, opus) |
| --- | --- | --- |
| workspace-switch-merchant, merchant unstated | **0/2** — the other merchant named; one file read | **3/3** — question first, no directory read, nothing named |
| workspace-switch-merchant, merchant stated | 3/3 | 1/1 |
| research-competitor-ratings-only | 4/4 hard checks, but like-for-like grouping in 1/4 | 4/4 → **3/3 with a single like-for-like group** in every saved body; `@3` picked up |
| video-brief-missing-generation-route | 4/4; disclosure absent in the sonnet attempt | 2/2, disclosure as the opening sentence |
| research-brief-pinned-no-acquisition | 2/4 (argv probes; a refused bare body) | 2/2 through stdin, 17 KB bodies, no refused call |
| listing-title-only-two-skus | 3/4 (sonnet's SKU re-read unrecognised) | 1/1; the rule itself is pinned by `retry-after-sku-read.jsonl` |

Every rerun's pins, price groups and opening sentences were checked in the traces and answers, not taken from the agents' reports. The weaker-model cases that motivated two of the rules (the SKU re-read, the missing disclosure) were not rerun on that model in this pass; the rules are pinned by tests or by the opening-sentence check on Opus only. Rubric verdicts are the dispatching session's; human review is the acceptance step.
