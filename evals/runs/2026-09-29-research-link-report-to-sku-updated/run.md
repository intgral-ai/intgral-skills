# Run: research-link-report-to-sku — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-link-report-to-sku/scenario.json` version 1 |
| Package under test | `skills/intgral-research` at commit `6957e00` (this change — "Product links" in artifacts-and-reuse.md, `runbook_revision: intgral-research@4`) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge |
| Model | claude-opus-5-5 (inherited from the dispatching session) |
| Date | 2026-09-29 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` stated in the prompt |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --workspace … --install … --final final.md` → `hard checks: 11 passed, 0 failed (8 tool calls)` |

## What happened

`get_product` by SKU first (variant resolved by exact SKU match; `research_links: []` read as "nothing linked yet") → `list_endpoints` → `describe_endpoint` for scope discovery → scope discovery → the scope's artifacts → the exact report revision read before citing it → `describe_endpoint` for `POST /admin/research/links` → one `admin_post` link `{artifact_id: rart_report_col_comp_02, variant_id: variant_fake_col24gr, reason}` sent on stdin → 201. Confirmed from the returned `link` (`state`, `version`, `variant_sku`); no extra read-back. No collection, no save, no `listing_id`.

## Rubric (judged by the dispatching session; human review pending)

| Item | Verdict | Note |
| --- | --- | --- |
| Latest competitor revision linked and named with its version; v1 and market report not linked | pass | "`rart_report_col_comp_02`，第 2 版…最新版（第 1 版…已被取代，没有挂）" |
| Variant from the SKU lookup, not the sibling; no listing | pass | `variant_fake_col24gr`, "同款的 26 cm Verde（CV-COL-26-GN）没有挂"; `listing_id` omitted "因为这个变体目前查不到关联的 listing" — softer than the baseline's "no listing exists", still more than a read established |
| Reason in the user's terms; confirmation from the returned link | pass | reason is the pricing basis in Chinese; link id, `state` current, version and SKU taken from the POST response |
| Relevance, not approval; nothing collected or re-saved; contents not re-verified | pass | "这次关联只说明这份报告跟这个 SKU 有关，报告和商品本身都没有改动"; report cited from the artifact read with its partial coverage and 27-day-old observations |
| Unlink in the ERP; newer revision replaces, older stays history | partial | "如果要取消关联，得在 ERP 里操作，这边做不了" — stated from the skill, not inferred; replacement by a newer revision not mentioned (the user did not ask) |

## Against the baseline

Both runs pass all eleven hard checks; the baseline was already green because the catalogue's summary and request schema carry the write contract. What changed: the agent resolved the variant first and named the sibling it did not link; it confirmed from the returned link instead of making two extra read-backs (8 calls against 11), so it was not misled by the mock's pre-write read state; unlinking is stated as ERP-only from the guidance rather than inferred from `callable: false`. One rubric item stays partial in both runs.

## Agent-reported uncertainty

1. "Latest saved" read as the highest-version competitor revision.
2. Linked without a confirmation question: the request was an explicit instruction and the skill asks for none.
3. `listing_id` left out because no read returned a listing of this variant.
4. The returned link carried a different, English reason (a mock artefact); reported, not retried — told the user to change it in the ERP. The ERP in fact updates the reason when the same revision is posted again with a new one; the guidance at `6957e00` did not say so (corrected afterwards — see limitations), and nothing here needed it.
5. Report coverage, prices and dates added beyond the Done-when minimum because the user priced from the report.

## Limitations

- The mock serves fixed responses: the link POST echoes a fixed English `reason`, not the one sent; the three link read surfaces serve their empty pre-write state on the first call and the linked state after.
- Bridge schemas are abbreviated versus a live gateway; the mock matches on path only and ignores query strings.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
- After this run, one sentence of the guidance was corrected against the ERP (`persistResearchLink` on develop `b88fe91c`): a 201 also answers a re-post of the same revision with a changed reason or listing, which updates the current link. The run's path (one new link) does not touch that sentence; it was not rerun.
