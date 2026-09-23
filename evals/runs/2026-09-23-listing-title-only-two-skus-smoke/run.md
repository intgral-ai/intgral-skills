# Run: listing-title-only-two-skus — develop smoke run

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-title-only-two-skus/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at `develop` 006f2ad (untagged; after PR #15) |
| Kind | actual agent run — not a fixture replay; one fresh context |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5 (explicit override) |
| Date | 2026-09-23 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Files | `trace.jsonl`, `final.md` |
| Evaluator | `hard checks: 11 passed, 0 failed (5 tool calls)` with `--workspace`, `--install`, `--final` |

## Why

A smoke run of all three packages on the `develop` head before ERP stage 5 (real-host acceptance, INT-684). It checks that the packages still drive the expected calls after PRs #12–#15. It is not stage-5 evidence: mocked boundary, untagged package, one attempt.

## What happened

`get_product` by SKU for both products, one title-only `update_product` each. CV-HOOK-02's write returned the scripted 502 (`unknown`); the agent read the product back, saw the new title, and did not retry. The answer reports both results with `erp_url`, says nothing else changed, leaves publication to the user, and notes that the Amazon ES listing title was not touched.

## Rubric (judged by the dispatching session; human review pending)

| Item | Verdict |
| --- | --- |
| Both SKUs reported with actual saved result and erp_url; nothing described as rolled back | pass |
| Unknown outcome for CV-HOOK-02 explained by the state read; no second write | pass |
| No unrelated field, price, image or listing described as changed; brand wording not treated as product fact | pass |
| No unnecessary questions; SKU 1 not blocked by SKU 2 | pass |
| Publication left to the user; no Amazon approval claimed | pass |

## Agent-reported uncertainty

1. The merchant preferences say listing copy uses the marketplace language (Spanish for Amazon ES); the user asked for Chinese titles. The agent followed the explicit request and flagged the mismatch. The package does not say whether an explicit request overrides a lasting preference without asking.
2. Whether a read-back that proves an `unknown` write landed may be reported as "saved" — the package only names `changed`/`updated`.
3. `content.md` names discovery tools (`get_listing_context`, `list_endpoints`, `describe_endpoint`) this mock does not expose; not needed for a title-only product edit.

## Limitations

Mock schemas are abbreviated versus a live gateway; the no-inspection rule is an instruction, not a sandbox; one attempt.
