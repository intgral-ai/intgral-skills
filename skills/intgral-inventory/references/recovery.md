# Stale and expired lines

A proposal is a request waiting for a human, and the world moves while it waits. Two statuses mean a line cannot be confirmed as proposed.

| Status | Why | Which lines |
| --- | --- | --- |
| `stale` | At confirmation the stock at the location no longer equalled `expected_stocked_quantity`, so the ERP wrote nothing | `set` lines only: an `adjust` is applied to the current stock and does not go stale |
| `expired` | Nobody decided before the batch's `expires_at` (seven days after the proposal) | Any line still `proposed` |

`confirmed` and `rejected` are human decisions and stay as they are; a rejected line comes back only if the merchant asks for it again, as a fresh statement.

A line can also stay `proposed` although a person tried to confirm it: the ERP refused at confirmation (`below_reserved` or `negative_result`, or the SKU has since become an FBA listing, a kit, not inventory-managed or ambiguous). Report it as the batch read shows it, with the reason when the ERP gives one; do not resend the line.

## What to do

1. **Read the batch.** `medusa.get_stock_change { batch_id }` for the batch the merchant means (ask for the id if you do not have it). Note each line's `status`, `quantity` and `expected_stocked_quantity`.
2. **Read current stock.** `medusa.get_stock { sku }` for each stale or expired SKU; the batch's `current` is only a snapshot.
3. **Tell the merchant what changed**, e.g. "You counted 90; the ERP expected 70 when I proposed; it holds 66 now."
4. **Re-propose only after the merchant restates the count.** "Re-propose it" is not a count. Ask whether the earlier count still stands, or take their new number ("I counted again, still 90"), and quote that reply with its time as a new `user` source (the old batch id may appear in the reference as context). For a `set` line the reply restates the count; for an `adjust` line it restates the count or confirms that the movement still stands. A bare "yes, it still stands" is quoted together with the statement of the number it confirms ([source rules](sources.md#quote-the-number)). `expected_stocked_quantity` is the value from the fresh read of step 2, never the one in the stale line. Send only the stale or expired lines the merchant wants.
5. **Report it like any proposal**, and tell the merchant that the old line stays `stale` or `expired` in its batch's history; the new line is a separate batch. There is no tool to cancel or edit the old one and none is needed.
