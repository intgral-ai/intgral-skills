# Run: listing-open-after-write — updated

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/listing-open-after-write/scenario.json` version 1 |
| Package under test | `skills/intgral-listing` at commit `696421d` (this change) |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge; the host browser mocked as `host.open_url` on the same bridge |
| Model | claude-opus-5-5 |
| Date | 2026-10-01 |
| Private state | copy of the scenario workspace, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Trace | [trace.jsonl](trace.jsonl) — 3 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md` → `hard checks: 11 passed, 0 failed (3 tool calls)` |

## Rubric (human review of final.md)

| Item | Verdict | Note |
| --- | --- | --- |
| Saved title reported from the tool result, with the erp_url | pass | old → new title, `updated` counts quoted, link given |
| Product page opened once, after the save, unprompted | pass | `host.open_url` on the returned `erp_url` as the last call; "我已经在浏览器里打开了这个产品的 ERP 复核页…请在那里核对，确认后由你自己发布" — the baseline's failing item |
| Nothing done inside the page; nothing described as published | pass | agent reports doing nothing on the page; "产品也没有发布" |
| No unrelated field changed or mentioned as changed | pass | title only; the Chinese-title vs Spanish-site preference flagged as a note, as in the baseline |

## Against the baseline

The open item moved from fail to pass with one extra call; everything else held.

## Agent-reported uncertainty

1. A preference conflict (site language vs a dictated Chinese title): raise before or after the write — same as the baseline, unrelated to this change.
2. content.md's full-product read versus the one-field rule — same as the baseline.
3. Whether to say "length not validated" when the abbreviated schema shows no limit.
4. Whether opening needs consent; it read "不等用户要求" as the authorization, which is the intent.

## Limitations

- The host browser is a mocked tool on the Bash bridge, so "opened" means the call was made, not that a page rendered.
- Single-entity journey only: the "one page per task, the rest as links" branch for multi-entity writes is not exercised.
- The agent was instructed not to inspect `scenario.json`; this is an instruction, not a sandbox.
- One run, one model. Not a statistical claim.
