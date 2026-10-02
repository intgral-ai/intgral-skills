# Worked reports

Synthetic: fictional SKUs, merchant and ERP address. Wording follows the merchant's language; the facts and their order are the contract.

## A proposal with a warning and a refused line

Merchant (2 Oct 14:05): "刚盘点完：CV-MIRROR-01 现在 150 个，CV-TRAY-02 是 80 个，CV-FBA-05 是 40 个"

The Agent read stock for the three SKUs. Nothing in the message said CV-FBA-05 is an FBA listing, so it sent all three lines in one proposal with source `user`, reference `Lena, 2 Oct 14:05, counting the shelf: "刚盘点完：CV-MIRROR-01 现在 150 个，CV-TRAY-02 是 80 个，CV-FBA-05 是 40 个"`. The report:

> 已提交 **2 行待确认**：https://erp.example.test/app/stock-changes/scb_01SYNTHETIC
> - CV-MIRROR-01：120 → 150（待确认）
> - CV-TRAY-02：60 → 80（待确认）。ERP 警示 `active_fbm_listing`：“This SKU has an active FBM listing; the next publication plan will change the Amazon quantity.”
>
> **库存目前没有任何改变。** 要由人在 ERP 里确认这一批后才生效；亚马逊上的数量也不会因此改变，只有人工确认的发布计划才会更新它。
>
> 被拒 1 行：CV-FBA-05 — `fba_listing`：“Variant is linked to an FBA listing.” FBA 库存由亚马逊管理，不在 ERP 里记录，所以这一行没有被提议。我没有重试它。

What it does not say: "库存已更新为 150", "亚马逊数量已同步".

## An estimate

Merchant: "CV-HOOK-01 大概还有 200 吧"

The Agent may call `medusa.get_stock` and show what the ERP holds. It does not call `medusa.propose_stock_changes`. Reply:

> ERP 里 CV-HOOK-01 现在记录的是 118 个（已预留 6）。"大概 200" 是估计，我不能把估计提交成库存。请告诉我实际数过的确切数字，以及什么时候、怎么数的（或者把库存表发给我，我引用文件名和行号）。

## A reasoned adjustment (when the deployment accepts `adjust` lines)

Merchant: "收到 30 个 CV-HOOK-01，另外摔坏了 3 个"

Two lines, one source: `{ kind: "adjust", delta: 30, reason: "received" }` and `{ kind: "adjust", delta: -3, reason: "damaged", reason_note: "…摔坏了 3 个" }`. No `expected_stocked_quantity` — adjustments apply to the stock when a human confirms. Report them as proposals, with the same "N lines awaiting confirmation", the `erp_url` and the nothing-is-in-effect-yet sentence.
