# Live run: start — before the INT-985 fixes

| Field | Value |
| --- | --- |
| Deployment | erp-dev.intgral.ai through the local `mcp-gateway` (stdio, seller profile, publish off); tool catalogue hash `3fccf500…`, the same as the deployed mcp-dev |
| Package under test | `e95e3da` (PR #24 head), installed user-wide in `~/.claude/skills` |
| Kind | live read-only run — real ERP data, writes forbidden by the run prompt |
| Host | Claude Code desktop, fresh-context subagent; real Intgral MCP tools and the in-app browser |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Request | 我想开始用 Intgral。 |
| Final answer | [final.md](final.md) |
| Trace | none — real tools, no mock bridge; calls as reported by the agent |

## Outcome

Connected: get_started once, link and the fixed six-item menu (video listed although nothing confirmed it).

## Limitations

- One run, read-only; no write path exercised.
- The gateway was a local checkout pointed at dev, not the deployed mcp-dev endpoint (that needs a bearer token the user configures).
