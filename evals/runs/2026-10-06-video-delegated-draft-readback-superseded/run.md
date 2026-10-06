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

Run on fixture 4e721f4 (read-back added, but the read-back still carried a fixed 9:16 / 8 s). The agent chose 16:9, read back 9:16, reported the mismatch and paused before approval — a fixture artefact, fixed in 65fc11b. Superseded by [the clean run](../2026-10-06-video-delegated-draft-readback/run.md).

## Limitations

- Mocked boundary: tool results are scripted; the read-back cannot echo the submitted request, so it returns only what the skill compares (id, status, mode, plan_hash, reference ids, estimate).
- One run. Not a statistical claim.
