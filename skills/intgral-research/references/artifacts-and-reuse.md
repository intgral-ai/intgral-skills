# Artifacts and cross-session reuse

Save exactly these report kinds: `market_research`, `competitor_research`, `product_supplier_research`, and `product_brief`. Evidence is an independently readable input, not a fifth report.

Save through the catalogued POST artifact route with a caller-stable save key. An identical retry returns the same immutable revision; changed content uses a new key. Pin exact evidence IDs and upstream report IDs, plus the runbook, skill, template, and schema revisions used. Evidence contracts, save semantics, and rejections: [evidence schemas](evidence-schemas.md); each function reference links its own report payload.

Store Markdown together with the structured comparisons/statistics required by the live schema, coverage and gaps. A partial valid artifact may be latest but must remain visibly partial; a blocked stage does not erase an older complete revision. New upstream evidence never rewrites an existing brief.

For a new session, read the scope, then list its artifacts and read exact artifact IDs through catalogued GET routes. Reuse the latest suitable revision or a named historical revision. Report each supporting observation date; stale or missing dates stay visible.

## Done when

- The save returned 201, or 200 for an identical retry; any other status is reported as-is, never retried under a new key with the same content.
- The user has the artifact ID, its revision, its coverage status, and every gap.
