还没有更新。我已经把这两个数提交了，现在是 **2 行待确认**。要等有人在 ERP 里确认这一批，库存才会改：

https://erp.example.test/app/stock-changes/scb_01SYNFOUR

- **CV-MIRROR-01**（Almacén principal）：ERP 里现在是 120，提交改成 150，等确认。目前已预留 4 个。
- **CV-TRAY-02**（Almacén principal）：ERP 里现在是 60，提交改成 80，等确认。ERP 给了一条警示，原文是：`active_fbm_listing`：“The SKU has an active FBM listing: the next publication plan will change the quantity Amazon shows.”

**ERP 库存还是 120 和 60。** 两个数是按 2026-10-02 14:05 你说的原话提交的：“刚盘点完：CV-MIRROR-01 现在 150 个，CV-TRAY-02 是 80 个”。确认的时候，如果 ERP 的库存已经不是 120 或 60（比如中间又被改过），那一行就不会写入，需要重新提交。这一批要在 2026-10-09 前确认，过期就作废。

**亚马逊上的数量这次没动。** CV-TRAY-02 有在售的 FBM listing，所以等这批确认以后，下一次由人确认的发布计划会把新数量带到亚马逊。

没有被拒绝的行。要确认是否生效，你在上面的页面确认后告诉我，我从 ERP 读一遍这一批的状态再回复你。
