已按你刚才重新数的数字重新提交了 CV-MIRROR-01，**1 行等待确认**：

- 审核页：https://erp.example.test/app/stock-changes/scb_01SYNNEW （新批次 scb_01SYNNEW）
- 提交内容：CV-MIRROR-01 在「Almacén principal」设为 **150**（ERP 当前记录 118，已预留 4，可售 114）。
- 来源引用你这次的原话：2026-10-02 14:20 重新盘点，“我刚又数了一遍，还是 150 个”。

**为什么上次变成 stale：** 批次 scb_01SYNOLD 里那一行是在 ERP 记录为 120 个时提交的；到有人确认时，库存已经变成 118 个（期间可能有出库或别人改过），两边对不上，所以 ERP 什么都没写入。这次的提交是按刚刚读到的 118 作为对照基准。

**还没有生效：** 库存只有在有人在 ERP 审核页确认这一批次后才会改；如果到 2026-10-09 还没人处理，这一行会过期。这次提交也不会向 Amazon 写入任何东西。没有被拒绝的行，也没有警告。

旧批次 scb_01SYNOLD 里的另外两行我没动：
- CV-TRAY-02（80 个）已经确认过了，不需要重提。
- CV-LAMP-03（30 个）被审核人驳回，备注是 “Recount first: the shelf had 35 yesterday”。如果你想重新提交这一项，请重新数一下，告诉我确切数字和数的时间。

我已经在浏览器里打开了 CV-MIRROR-01 的商品页：https://erp.example.test/app/products/prod_cv_mirror01
