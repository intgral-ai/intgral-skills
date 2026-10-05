# Reading stock, building lines, proposing

## Read first

For every SKU in the request call `medusa.get_stock { sku }` before building a line. It reads the ERP directly and never changes anything. The result lists each location the store can sell from:

| Field | Meaning |
| --- | --- |
| `stocked_quantity` | Units counted at that location |
| `reserved_quantity` | Held for open orders: never yours to change |
| `available_quantity` | Stocked minus reserved: what can still be sold |
| `has_level` | `false` means the SKU has no inventory level there yet. The zeros are **not** a counted zero |

A `not_found` error means the SKU is unknown: tell the merchant, do not guess a similar SKU. `invalid_arguments` means the SKU exists but cannot hold stock here (its message carries the ERP's code and reason, e.g. `invalid_data: fba_listing: …` or `kit_variant`): relay the reason and propose nothing for it.

## Two kinds of line

Pick the kind from what the merchant said, not from what is easier.

| The merchant said | Line | Why |
| --- | --- | --- |
| A **counted total**: "now 150", "we have 80", a sheet's quantity column | `set` | It states how many are there |
| A **movement**: "received 30", "3 broke", "found 2 fewer" | `adjust` | It states a change; the ERP applies it to whatever the level is when a human confirms |

### `set`

```json
{ "sku": "CV-MIRROR-01", "kind": "set", "quantity": 150, "expected_stocked_quantity": 120 }
```

- `quantity` is the total as the merchant stated it. Do not add, subtract or round.
- `expected_stocked_quantity` is the `stocked_quantity` you just read at that location, or `0` when `has_level` is `false`. The ERP refuses a set line without it. At confirmation the ERP compares it with the then-current stock: a difference makes the line `stale` and nothing is written. That is the safety net against overwriting a number someone else changed meanwhile; it only works if the value came from a fresh read.
- A `set` on a location with no level may create the first level. Say so in your report.
- If the quantity equals the stocked quantity you read, say it already matches and leave the line out.

### `adjust`

```json
{ "sku": "CV-HOOK-01", "kind": "adjust", "delta": -3, "reason": "damaged", "reason_note": "Lena, 2 Oct: \"摔坏了 3 个\"" }
```

- `delta` is a signed whole number from the merchant's words: received is positive, damaged or lost negative, a correction either way.
- `reason` is one of `received`, `damaged`, `count_correction`, `other`. Take it from what the merchant said. If they gave no reason, ask; do not pick `other` to avoid asking. `reason_note` is a short factual note in the merchant's words; always include it, and never leave it out for `other`.
- An `adjust` needs an existing level (`has_level: true`). With none, ask the merchant for the counted total and propose a `set` instead.
- No `expected_stocked_quantity`: an adjustment is applied to the stock as it is at confirmation.


## Locations

- One writable location in the `get_stock` result: omit `location_id`.
- Several: ask the merchant which one the count is for, then pass `location_id`. Never pick one. `location_required` is a refusal, see [refusal codes](refusals.md).
- You never create a location. A location absent from `get_stock` is not writable here.

## One call, one source

Send one `medusa.propose_stock_changes` per source: `{ source: { kind, reference }, lines: [...] }`, one line per SKU and location, at most 200 lines. Never send `kind: "agent"`. If every line is refused the ERP stores nothing and returns only the reasons.

After a network or 5xx error whose outcome is unknown, do not send the same call again. Look for a batch the call may have created (`medusa.admin_get` on `/admin/stock-changes` with `status=proposed`, when that route is catalogued) and compare its source reference before deciding. `medusa_error` is the backend's answer, not a lost connection: keep its code and message and request ID.

## After the proposal

Tell the merchant, in this order:

1. **"N lines awaiting confirmation"**, where N is `batch.counts.proposed`, and `batch.erp_url` (the ERP review page where a human confirms or rejects).
2. **Nothing is in effect yet.** Stock changes only when a person confirms the batch in the ERP. The batch expires if nobody decides in time (`expires_at`).
3. **Nothing is written to Amazon** by this proposal. Do not say when or whether Amazon's quantity will change.
4. **Refused lines**, each with its `sku`, `code` and `message` exactly as the ERP wrote them, and the follow-up the [refusal codes](refusals.md) call for.
5. **Warnings**, from each line's `warnings[]` in the returned batch, as `code` and `message` verbatim (for example a very large jump or an active FBM listing), and nothing added: no paraphrase, no promise about Amazon. A warning does not block the line and never changes the number you proposed; a human sees it on the review page.
6. Lines you left out yourself (already matching, out of scope, awaiting a missing fact) with the reason.

Never write "updated", "saved to stock", "synced", "now 150" or "stock is 150" for a proposed line. "Proposed 150 for CV-MIRROR-01 (now 120), waiting for confirmation" is accurate.

When every line was refused the call is an error: there is no batch and no `erp_url`, and the structured `refused[]` carries the reasons. Report them only, and say nothing was stored.

## Reading a batch back

`medusa.get_stock_change { batch_id }` returns the batch's source, per-status line counts, and every line's status (`proposed`, `confirmed`, `rejected`, `stale`, `expired`), warnings and the live stocked, reserved and available quantity at its location. Use it when the merchant asks "was it confirmed?", or before re-proposing. Report a line as confirmed only from this read; for a confirmed line `before_quantity` and `after_quantity` say what changed. A rejected line carries a human's decision and note: report it, do not argue with it.
