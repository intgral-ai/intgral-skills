# Live run: listing — after the INT-985 fixes

| Field | Value |
| --- | --- |
| Deployment | erp-dev.intgral.ai through the local `mcp-gateway` (stdio, seller profile, publish off); tool catalogue hash `3fccf500…`, the same as the deployed mcp-dev |
| Package under test | `4d4dbc0` (this PR, before 2eb7035), installed user-wide in `~/.claude/skills` |
| Kind | live read-only run — real ERP data, writes forbidden by the run prompt |
| Host | Claude Code desktop, fresh-context subagent; real Intgral MCP tools and the in-app browser |
| Model | claude-opus-5-5 |
| Date | 2026-10-04 |
| Request | XZ-23066 现在是什么状态？西班牙站的草稿图片复核了吗？ |
| Final answer | [final.md](final.md) |
| Trace | none — real tools, no mock bridge; calls as reported by the agent |

## Outcome

Read the SKU and opened its page. The listing lookup by seller_sku returned an empty page until `view=all` (the route defaults to the review queue) — fixed in 2eb7035. `marketplace.get_image_review` returned a malformed-response error (request 861db1cb-…), reported as unanswerable, not retried.

## Limitations

- One run, read-only; no write path exercised.
- The gateway was a local checkout pointed at dev, not the deployed mcp-dev endpoint (that needs a bearer token the user configures).
