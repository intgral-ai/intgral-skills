---
name: intgral-inventory
description: Record merchant-stated stock counts, receipts, damage and stock sheets as sourced proposals that a human confirms in the Intgral ERP, reading current stock first, through connected Intgral MCP tools.
license: MIT
metadata:
  version: "0.2.0"
---

# Intgral inventory

A stock quantity is a fact only the merchant knows. The Agent reads current stock, turns what the merchant said (or wrote in a sheet) into sourced lines and **proposes** them; a human confirms in the ERP. Until then nothing has changed. Read the references as local files, resolving links relative to the containing file. Reply in the merchant's language; quote their words in the language they used them.

## When to use

- The merchant states a quantity ("RS-100 现在有 150 个", "we have 150 now"), reports goods received, damaged or lost, a count correction, or hands over a stock sheet.
- A pure question ("how many CV-HOOK-01 do I have?") needs only `medusa.get_stock`: answer with stocked, reserved and available per location. No proposal, no source needed.
- Not this package: Amazon quantity, price, copy or publishing (the listing skill and the ERP's publication path), and anything in [out of scope](references/refusals-and-scope.md).

## The journey

1. **Source.** Every quantity needs one: the merchant's own words with when or on what occasion, or a sheet file and row. No source, or only an estimate, means ask — never infer. [Source rules](references/sources.md).
2. **Read first.** `medusa.get_stock` for every SKU: the stocked quantity per location is what a `set` line must expect (`expected_stocked_quantity`). A counted total is a `set`; a movement (received, damaged) is an `adjust` with a reason. [Reading and building lines](references/propose.md).
3. **Propose.** One `medusa.propose_stock_changes` call per source. Lines the package already knows are out of scope are not sent: say why instead.
4. **Report.** "N lines awaiting confirmation" (`awaiting_confirmation`) and the `erp_url`; every refused line and every warning exactly as the ERP wrote it; nothing is in effect until a human confirms. [After the proposal](references/propose.md#after-the-proposal), [refusal codes](references/refusals-and-scope.md#refusal-codes), [a worked report](references/examples.md).
5. **Stale or expired.** Re-read current stock, then re-propose only what the merchant still wants. [Stale and expired lines](references/recovery.md).

## Boundaries

- **Propose only.** The Agent never confirms or rejects, never calls a generic admin write for `/admin/stock-changes/…/confirm` or `…/reject`, and never says stock was updated, saved or synced while a line is proposed. A line is confirmed only when `medusa.get_stock_change` reads it back as `confirmed`.
- **ERP stock only.** Amazon quantity changes only through a human-confirmed publication plan; this package never touches it. A warning about an active FBM listing says the next publication plan will carry the new quantity — it is not an Amazon update.
- **Out of scope**, each told to the user with its reason: FBA stock (Amazon manages it), kit variants, creating stock locations, reservations, inventory-management or backorder settings.
- **Refusals are final for the turn.** Report each refused line with its code and message; do not resend, reshape or "fix" it on your own. [Exception and rules](references/refusals-and-scope.md#refusals-are-final).
- **No tool, no claim.** A tool being listed is not proof the deployment supports a line shape or your permission profile allows the write; the `inputSchema` and the result are the contract. In a read-only profile the proposal is refused: hand the user the prepared lines, unsent.
