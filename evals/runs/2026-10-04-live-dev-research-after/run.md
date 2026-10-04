# Live run: research — after the INT-985 fixes

| Field | Value |
| --- | --- |
| Deployment | erp-dev.intgral.ai through the local `mcp-gateway` (stdio, seller profile, publish off); tool catalogue hash `3fccf500…`, the same as the deployed mcp-dev |
| Package under test | `4d4dbc0` (this PR, before 2eb7035), installed user-wide in `~/.claude/skills` |
| Kind | live read-only run — real ERP data, writes forbidden by the run prompt |
| Host | Claude Code desktop, fresh-context subagent; real Intgral MCP tools and the in-app browser |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Request | before: LIN HOME 的嵌套边桌 XZ-23066 在西班牙站有没有做过竞品或市场研究？ / after: XZ-23174 在西班牙站做过市场研究吗？结论是什么？ |
| Final answer | [final.md](final.md) |
| Trace | none — real tools, no mock bridge; calls as reported by the agent |

## Outcome

XZ-23174 has no linked research; the scopes read matched `context.sku`, found the scope, its closed plan and failed acquisition, and reported "started, not completed, no conclusion" instead of "no research".

## Limitations

- One run, read-only; no write path exercised.
- The gateway was a local checkout pointed at dev, not the deployed mcp-dev endpoint (that needs a bearer token the user configures).
