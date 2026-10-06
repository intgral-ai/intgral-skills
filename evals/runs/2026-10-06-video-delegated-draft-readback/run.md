# Run: video-delegated-draft — read-back (INT-1104)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/video-delegated-draft/scenario.json` version 2 |
| Package under test | `a0ec9ba` skills (INT-1094 fix; INT-1104 changes fixtures only); all four packages installed |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`) |
| Model | claude-opus-5-5 |
| Date | 2026-10-06 |
| Trace | [trace.jsonl](trace.jsonl) — 8 tool calls |
| Final answer | [final.md](final.md) |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json trace.jsonl --final final.md --workspace <ws> --install <install>/intgral-video` → `hard checks: 13 passed, 0 failed (8 tool calls)` |

## Notes

Run on fixture 65fc11b. The draft was read back by id (`GET /admin/video-generations/vgen_31`: mode reference, approval null, plan_hash ph_31a) with no false mismatch; the answer ends with one question asking for an approval and a cost cap the user names.

## Limitations

- Mocked boundary: tool results are scripted; the read-back cannot echo the submitted request, so it returns only what the skill compares (id, status, mode, plan_hash, reference ids, estimate).
- One run. Not a statistical claim.
