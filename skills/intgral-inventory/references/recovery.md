# Stale and expired lines

A proposal is a request waiting for a human, and the world moves while it waits. Two read-time statuses mean the line cannot be confirmed as proposed.

| Status | Why | Which lines |
| --- | --- | --- |
| `stale` | At confirmation the stock at the location no longer equalled `expected_stocked_quantity`, so the ERP wrote nothing | `set` lines only: an `adjust` is applied to the current stock and does not go stale |
| `expired` | Nobody decided before the batch's `expires_at` (seven days after the proposal); the line reads as expired from that moment, and a daily duty stores it | Any line still `proposed` |

`confirmed` and `rejected` are human decisions. They stay as they are.

## What to do

1. **Read the batch.** `medusa.get_stock_change { batch_id }` for the batch the merchant means. If you do not have the ID, ask, or read `medusa.admin_get` on `/admin/stock-changes` when that route is catalogued. Note each line's `status`, `quantity`, `expected_stocked_quantity` and the live `current` quantities.
2. **Read current stock.** `medusa.get_stock { sku }` for each stale or expired SKU. The batch's `current` is a snapshot from the batch read; a re-proposal needs a fresh `get_stock`.
3. **Tell the merchant what changed.** For a stale `set`: "You counted 200; the ERP expected 120 when I proposed; it holds 118 now." For an expired batch: what is still proposed-then-expired and the current stock.
4. **Re-propose only what the merchant still wants.**
   - If the merchant asked you to re-propose, or just restated the number ("I counted again, still 200"), that is a fresh statement: quote it with its time as a new `user` source. Otherwise ask whether the earlier count still stands before proposing, because a `set` overwrites whatever the stock is now.
   - If they confirm an earlier count, the source is their confirmation (quoted, with its time), not your reading of the old batch. You may cite the old batch ID in the reference as context.
   - `expected_stocked_quantity` is the value from the fresh read of step 2, never the one in the stale line.
   - Only the stale or expired lines the merchant wants. Lines the batch shows as `confirmed` or `rejected` are decided; a rejected line comes back only if the merchant asks for it again, and then as a fresh statement.
5. **Report it like any proposal**: "N lines awaiting confirmation", the new `erp_url`, nothing in effect yet, refusals and warnings verbatim. Say that the old line remains `stale` or `expired` in its batch's history; there is no tool to cancel or edit it and none is needed.

## What not to do

- Re-propose from memory or from the old batch's numbers without a fresh read.
- Reuse the old `expected_stocked_quantity` to make a stale line pass.
- Re-propose lines a human rejected, or add lines the merchant did not ask for.
- Call anything a confirmed update because a human clicked "confirm" earlier in the conversation: read the batch.
