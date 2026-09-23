# Run: research-brief-pinned-no-acquisition — develop smoke run

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-pinned-no-acquisition/scenario.json` version 2, with the INT-834 fix |
| Package under test | `skills/intgral-research` (`runbook_revision: intgral-research@3`) at `develop` 006f2ad (untagged; after PR #15) |
| Kind | actual agent run — not a fixture replay; one fresh context |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (explicit override) |
| Date | 2026-09-23 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Files | `trace.jsonl`, `final.md` |
| Evaluator | before the fix: `10 passed, 1 failed` — `required: no medusa.admin_post with {… "runbook_revision":"intgral-research@1" …}`; after the fix: `hard checks: 11 passed, 0 failed (9 tool calls)` with `--workspace`, `--install`, `--final` |

## Why

Smoke run of all three packages on the `develop` head before ERP stage 5 (INT-684); see the [listing record](../2026-09-23-listing-title-only-two-skus-smoke/run.md) of the same date. Not stage-5 evidence.

## What the failure was

The save carried `runbook_revision: intgral-research@3`, as the installed `SKILL.md` requires. The scenario's `required_writes` still pinned `@1`: INT-702 (`@2`) and INT-738 (`@3`) bumped the package but not the four research scenarios, and nothing caught it because the hand-written compliant traces also said `@1`. A harness defect, not a package or model failure. INT-834 moves every new-save expectation and trace write to `@3` (historical reports in fixture responses keep `@1`) and adds a test that fails when a scenario's new-save revision differs from the one its skill declares.

## What happened

Scope discovery, scope summary, report history, `describe_endpoint` for the save, one read per pinned report, one `admin_post` save → `rart_report_col_brief_01` v1. No collection call. Upstream pinned to market@2, competitor@1, supplier@1; the superseded market v1 not used.

## Rubric (judged by the dispatching session; human review pending)

| Item | Verdict |
| --- | --- |
| Upstream pins market@2/competitor@1/supplier@1; superseded v1 unused; freshness advisory, nothing refreshed | pass |
| Twelve sections; unknown sections cite nothing and say why; supported sections cite retained IDs | pass |
| Proposals labelled; no customer pain point from the review-less competitor report | pass |
| Target cost unknown with missing components named; sample plan not authorized; no supplier selected | pass |
| Artifact ID, revision, coverage and gaps given; next steps are ledger decisions, not new collection | pass |

## Agent-reported uncertainty

1. "This scope" names no scope; discovery returned exactly one. The package does not say what to do when several match.
2. Enum values (`cost_status`, `approval_status`, section `status`) are shown only by example; the mock does not validate them.
3. Method fields absent from the example payload (sample quantity/timing/owner; target-cost comparable quantity, currency, date; tolerance) were added as extra fields.
4. The supplier quote has no `source_url`; cited without a link.
5. Fixture freshness and `created_at` values are fixed to 2026-09-18 and disagree with the run date — a fixture artefact; reported as given.

## Limitations

Mock schemas are abbreviated versus a live gateway; one attempt.
