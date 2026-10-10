---
name: intgral-inventory
description: Record merchant-stated stock counts, receipts, damage and stock sheets as sourced proposals that a human confirms in the Intgral ERP, reading current stock first, through connected Intgral MCP tools.
license: MIT
metadata:
  version: "0.3.0"
---

# Intgral inventory

A stock quantity is a fact only the merchant knows. The Agent reads current stock, turns what the merchant said (or wrote in a sheet) into sourced lines and **proposes** them; a human confirms in the ERP. Until then nothing has changed. Read the references as local files, resolving links relative to the containing file. Reply in the merchant's language; quote their words in the language they used them.

## Stop rules (apply to every task)

- **No quantity without the merchant's count.** Propose only a number the merchant stated (quote it, with when or on what occasion) or a sheet row you cite. An estimate ("about 200", "same as last time", a range) or a number you worked out is not a count: never send a proposal in the same turn — explain what you need and ask first.
- **Read before every proposal.** `medusa.get_stock` for each SKU first; a `set` line carries the stocked quantity you just read.
- **Nothing is in effect while a line is proposed.** Never say updated, saved or synced, and never confirm or reject: a human does that in the ERP.
- **A refused line is not resent.** Report it as the ERP wrote it; only the merchant's answer to what the code asks makes a new line. The one exception is `missing_expected`: read `medusa.get_stock` again and resend that one line with the fresh value and the same source (the same quote is reused); if it is refused again, report it.
- **A stale line is re-proposed only after the merchant restates the count.** Quote that restatement as the new source and read `medusa.get_stock` again; "re-propose it" is not a count.
- **Open the SKU's page.** With a browser tool in the tool list (such as `host.open_url`), the `erp_url` from `medusa.get_product` (`medusa.get_stock` returns none) is opened right after you read it, once per SKU per session, and the answer says it was opened. Several SKUs: call `medusa.get_product` for the first only and open it; list the rest by SKU without links (a link on request, one `get_product` each). No browser tool, or the open fails: give the link, never say it opened. Nothing is done inside the page.
- **`not_found` on a SKU is not yet “missing”.** A listing can exist without a catalog product. When `medusa.get_stock` or `medusa.get_product` answers `not_found`, look the SKU up as a seller SKU before saying it is unknown: `medusa.admin_get` on `GET /admin/amazon/listings?seller_sku=<SKU>&view=all` (exact; without `view=all` only the review queue comes back). Found only as a listing: say the catalog has no product for it yet, so there is no stock to read or propose, and offer the bootstrap import (`intgral-listing`) as the merchant's choice, never in the same turn. Found in neither: say so plainly and guess no near-match. `get_product` `not_found` after a successful `get_stock` costs only the page link: give no link.
- **Subagents read, never write.** With a host that has subagents, the per-SKU `medusa.get_stock` reads of a long list may run in parallel: each subagent gets read tools only (no propose, no POST, no browser) and only its SKUs, and returns the location rows; the main agent merges, asks the merchant once and makes the single `medusa.propose_stock_changes` call itself. Never given to a subagent or run in parallel: the proposal, anything the merchant must answer, opening a page. If the host cannot restrict a subagent's tools, or has none, read in order — same result, same questions.
- **No private records.** This package keeps no merchant preferences, notes or counts: no private workspace and nothing written to disk; the ERP's batch is the only record. A requirement the merchant states that could outlive the task (“always count in cartons”) applies to this task alone: say in the answer that it is not remembered here, and write no file.

## When to use

- The merchant states a quantity ("RS-100 现在有 64 个", "we have 64 now"), reports goods received, damaged or lost, a count correction, or hands over a stock sheet: units on a shelf at a location.
- A pure question ("how many CV-CLOCK-07 do I have?") needs only `medusa.get_stock`: stocked, reserved and available per location. No proposal, no source.
- Not this skill, but `intgral-listing`: an FBM listing's fulfilment policy, FBA/FBM switch and `manual_quantity` — settings the user saves on the listing page — plus Amazon price, copy and publishing. Do not predict what Amazon will show after a stock change; relay the ERP's own warning.

## The journey

1. **Source.** Every quantity needs one: the merchant's own words with when or on what occasion, or a sheet file and row. [Source rules](references/sources.md).
2. **Read first.** `medusa.get_stock` for every SKU. A counted total is a `set`; a movement (received, damaged) is an `adjust` with a reason. [Reading and building lines](references/propose.md).
3. **Propose.** One `medusa.propose_stock_changes` call per source.
4. **Report.** "N lines awaiting confirmation" and the batch's `erp_url`, then refused lines and warnings verbatim. [After the proposal](references/propose.md#after-the-proposal), [refusal codes](references/refusals.md).
5. **Stale or expired.** [Stale and expired lines](references/recovery.md).

## Boundaries

- **Out of scope**, told to the user with the reason and never worked around: FBA stock (Amazon manages it), kit variants (stock comes from the parts), creating locations, reservations, inventory-management or backorder settings. `medusa.get_stock` answers `invalid_arguments` for an FBA or kit SKU: relay its reason, propose nothing for that SKU.
- **No tool, no claim.** The tool's `inputSchema` and result are the contract, not this page. In a read-only profile the proposal is refused: hand the user the prepared lines, unsent.
