# Live run: video — after the INT-985 fixes

| Field | Value |
| --- | --- |
| Deployment | erp-dev.intgral.ai through the local `mcp-gateway` (stdio, seller profile, publish off); tool catalogue hash `3fccf500…`, the same as the deployed mcp-dev |
| Package under test | `4d4dbc0` (this PR, before 2eb7035), installed user-wide in `~/.claude/skills` |
| Kind | live read-only run — real ERP data, writes forbidden by the run prompt |
| Host | Claude Code desktop, fresh-context subagent; real Intgral MCP tools and the in-app browser |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Request | 给 XZ-23066 做一条 10 秒的竖版商品视频，先给我方案和估价，别直接生成。 |
| Final answer | [final.md](final.md) |
| Trace | none — real tools, no mock bridge; calls as reported by the agent |

## Outcome

Plan and prompt as labelled proposals, **5 questions**, price explained as coming from a free draft — which could not be offered this session because route discovery was down (`catalog_unavailable`).

## Limitations

- One run, read-only; no write path exercised.
- The gateway was a local checkout pointed at dev, not the deployed mcp-dev endpoint (that needs a bearer token the user configures).
