# Run: research-link-report-to-sku — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-link-report-to-sku/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `9a17797` (`runbook_revision: intgral-research@3`, before this change — no guidance on product links) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5-5 (inherited from the dispatching session) |
| Date | 2026-09-29 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 11 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace … --install … --final final.md` → `hard checks: 11 passed, 0 failed (11 tool calls)` |

## Why

ERP PR #385 (merged at `f6f57a42`) lets a seller-profile agent attach an exact report revision to a product variant through `POST /admin/research/links`, and adds `research_links` to SKU lookups plus `medusa.list_product_research_history`. The package said nothing about either. This run records what an agent does with the package as it was.

## What happened

`list_endpoints` → `get_product` by SKU (variant resolved: `variant_fake_col24gr`) → `describe_endpoint` for `POST /admin/research/links` and for scope discovery → scope discovery → the scope's artifacts → `list_product_research_history` (empty) → the report detail → one `admin_post` link `{artifact_id: rart_report_col_comp_02, variant_id: variant_fake_col24gr, reason}` → 201 → `admin_get /admin/research/links` read-back (empty, see limitations) → `get_product` by SKU again (link present). No collection, no save, no `listing_id`.

The baseline already passes every hard check. The agent found the route from the catalogue alone: its summary and request schema carry the whole contract for the write. It reported that nothing in the skill covers report-to-SKU linking.

## Rubric (judged by the dispatching session; human review pending)

| Item | Verdict | Note |
| --- | --- | --- |
| Latest competitor revision linked and named with its version; v1 and market report not linked | pass | "`rart_report_col_comp_02`，competitor_research 第 2 版（最新）"; v1 named as superseded and not linked |
| Variant from the SKU lookup, not the sibling; no listing | pass | `variant_fake_col24gr`; no `listing_id` — but the answer claims "这个 SKU 在 ERP 里还没有对应的 listing", which no read established (`get_product` does not return listings) |
| Reason in the user's terms; confirmation from the returned link | pass | reason is the pricing basis; link id, state `current` and `reused: false` from the POST response, then a second `get_product` read |
| Relevance, not approval; nothing collected or re-saved; contents not re-verified | pass | "只是加了一条关联，没有改价格，也没有改报告或产品"; freshness and partial coverage reported as limits of the report as a pricing basis |
| Unlink in the ERP; newer revision replaces, older stays history | partial | points to an audited unlink in the ERP (inferred from `callable: false` on the DELETE route); says nothing of replacement by a newer revision |

## Agent-reported uncertainty

1. No linking procedure in the skill; applied the general catalogued-route boundary and treated the request as authorization for one write.
2. "Latest" chosen from `version`/`created_at` and the list's note.
3. `listing_id` left out because no listing was returned for the SKU.
4. The stored reason in the response differed from the reason sent (a mock artefact — see limitations); reported to the user, not retried.
5. The `GET /admin/research/links` read-back returned empty while `get_product` showed the link; trusted the 201 and `get_product`.

## Limitations

- The mock serves fixed responses: the link POST echoes a fixed English `reason`, not the one sent; `GET /admin/research/links`, `list_product_research_history` and `get_product` by SKU serve their empty pre-write state the first time they are called and the linked state after, so a first call made after the write sees the pre-write state.
- Bridge schemas are abbreviated versus a live gateway; the mock matches on path only and ignores query strings.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
