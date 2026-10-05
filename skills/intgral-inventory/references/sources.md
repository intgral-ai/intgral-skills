# Source rules

Every quantity in a proposal rests on one source, and the source is the merchant's, never yours. The gateway refuses a proposal with no source before anything is sent, and the ERP checks again; do not rely on either: ask first.

## The two sources

| `source.kind` | When | `source.reference` must carry |
| --- | --- | --- |
| `user` | The merchant said the number in this conversation, or pasted a message of their own that states it | The merchant's words **verbatim**, in the language they used, in quotation marks, plus **when** (the message's timestamp) or **on what occasion** (what they were doing: counting the shelf, unpacking a delivery) |
| `sheet` | The number is a cell in a file the merchant supplied | The **file name** and the **row** (or rows) the quantities came from, as numbered in the file |

There is no third kind. `agent` is refused by the gateway and by the ERP: your own inference is not a source.

Examples of a well-formed `reference` (synthetic):

- `Lena, 2 Oct 14:05, counting the shelf: "刚盘点完：CV-MIRROR-01 现在 150 个，CV-TRAY-02 是 80 个"`
- `Lena, 2 Oct, unpacking the delivery: "recibimos 30 del CV-HOOK-01"`
- `stock-2026-10.xlsx rows 2-5`

One batch has one source. Statements from several messages may share one `user` reference if you quote each; a chat statement and a sheet are two proposals, never one. If a merchant later restates or corrects a number, the new statement is the source for the new line; do not edit the old quote.

**Time.** Use the message's timestamp if the host gives one, else the date and time you actually know, else the occasion the merchant named. Never invent a time. If you have none of these, say "in this conversation" and name the occasion; a missing clock is not a reason to refuse a stated number.

**Quote, do not paraphrase.** Copy the merchant's characters. Do not translate, tidy up or add a unit they did not say. If the merchant wrote more than one sentence, quote the part that states the quantity.

## What is not a source

Ask instead of proposing. All of these are common, and none is a count of what is on the shelf:

| Looks like a quantity | Why it is not one |
| --- | --- |
| An estimate: "about 200", "大概 200 吧", "差不多 200", "约 200", "~200", "几百个", "200 or so", "at least 100", "between 150 and 200" | A guess is not a count. Approximate words, ranges and hedges all make it an estimate, even when the number looks round |
| "Same as last time", "the usual", "enough for a month" | No number was stated now. Do not look up last time's batch and reuse it |
| What Amazon, the listing or the product page shows | That is another system's number, possibly stale |
| A shipment notice, purchase order, supplier invoice or tracking figure | It says what was sent or ordered, not what arrived or is on the shelf |
| Sales velocity, safety stock, a reorder calculation | Your own inference |
| A number you computed from other numbers | Unless the merchant confirms the total in their own words |
| A blank cell, a dash, an empty column | Absence is not zero. Never propose `0` for a blank |

### When the merchant gives an estimate or nothing

1. Do not propose, not even provisionally, not even with a note. A proposal is a statement in the ERP.
2. Reading current stock is fine and often helpful: show the merchant what the ERP holds now.
3. Ask for the exact number and where it comes from: "Is that the exact count? Please tell me the number as you counted it and when or where you counted — or send the sheet." Do not offer your own figure to be agreed to. If they reply with an exact number, that reply is the quote.
4. Stop there. The turn is complete without a proposal.

Example. Merchant: "CV-HOOK-01 大概还有 200 吧". Read `medusa.get_stock`, then reply: "ERP 里 CV-HOOK-01 现在记录的是 118 个（已预留 6）。'大概 200' 是估计，我不能把估计提交成库存。请告诉我实际数过的确切数字，以及什么时候、怎么数的（或者把库存表发给我，我引用文件名和行号）。" No `propose_stock_changes` call.

## Sheets

- Only rows you actually read. Name each row as numbered in the file (a header usually makes the first data row 2) and say how you numbered it if it could be ambiguous.
- One quantity cell per SKU. If a quantity needs arithmetic or a unit conversion (cartons times pieces per carton, pairs, dozens), ask the merchant to confirm the resulting total and quote that reply as a `user` source, citing the sheet only as context.
- A SKU that appears twice, a SKU not in the ERP, or a row that mixes several SKUs: ask which is meant; do not pick.
- A column that is not a quantity (a note, a channel, a location) is context, not a number. A note such as "FBA" or "bundle" is a hint, not a ruling: `medusa.get_stock` says whether the SKU can hold stock; if it answers `invalid_arguments`, relay its reason and leave the row out.
- Do not copy a whole sheet into the reference. File name and rows are the source.
