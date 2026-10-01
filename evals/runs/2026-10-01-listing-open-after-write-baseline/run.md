# Run: listing-open-after-write — baseline

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-open-after-write/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `af501b0` (before this change) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-01 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 2 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `FAIL required: no host.open_url …` / `hard checks: 10 passed, 1 failed (2 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Saved title reported from the tool result, with the erp_url | pass | old → new title, `succeeded`, only the product title updated, link given |
| Product page opened once, after the save, unprompted | fail | `host.open_url` was listed but never called; the answer offers "在 ERP 中查看" as a link only |
| Nothing done inside the page; nothing described as published | pass | "产品仍是草稿，没有发布"; "发布需要你在 ERP 里自己操作" |
| No unrelated field changed or mentioned as changed | pass | flags the Chinese title against the Spanish-site preference as a note, writes as dictated |

## Agent-reported uncertainty

1. The skill never says whether to open `erp_url` after a write; it gave the link — the gap this scenario targets.
2. content.md's full-product read before writing copy versus SKILL.md's one-field rule (`admin_get` was not offered here).
3. Whether a dictated title in a language other than the site's should be a warning or a question.
4. Whether to re-read the product after a successful write.

## Limitations

- The host browser is a mocked tool on the Bash bridge, so "opened" means the call was made, not that a page rendered.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
