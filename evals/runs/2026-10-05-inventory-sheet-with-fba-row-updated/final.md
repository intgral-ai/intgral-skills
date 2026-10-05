我已按 stock-2026-10.xlsx 提交了库存变更提案：**4 行等待确认**。

确认页面：https://erp.example.test/app/stock-changes/scb_01SYNTHREE

**目前库存还没有任何变化。** 需要有人在 ERP 的这个页面上确认这批提案，库存才会改。如果到 2026-10-09 14:00（UTC）还没人处理，这批提案会过期。这次提案也不会往亚马逊写入任何数据。

来源：stock-2026-10.xlsx 第 2、3、5、6 行（第 1 行是表头，按文件行号计）。都是对「Almacén principal」仓位的盘点总数（set）：

| 行 | SKU | ERP 当前库存（已预留） | 提案数量 |
| --- | --- | --- | --- |
| 2 | CV-MIRROR-01 | 120（预留 4） | 150 |
| 3 | CV-TRAY-02 | 60（预留 0） | 80 |
| 5 | CV-LAMP-03 | 35（预留 2） | 30 |
| 6 | CV-BASKET-04 | 10（预留 0） | 120 |

**ERP 给出的警告**（不影响提案，审核页面上会显示）：
- CV-BASKET-04：`large_jump` — "Quantity 120 is more than 10 times the current stock 10"
  从 10 变成 120 的差距比较大，确认前建议再核对一下这一行。

**没有提交的行：**
- 第 4 行 CV-FBA-05（40，备注「FBA 仓，亚马逊管」）：ERP 返回 `invalid_arguments`，原文是："fba_listing: Variant is linked to an FBA listing, so Amazon holds its stock; no stock change can be proposed for it." 这个 SKU 的库存由亚马逊管理，不能在这里提交，所以这一行我没有提交。

没有被拒绝的行。

商品页面：我已经在浏览器里打开了 CV-MIRROR-01 的页面：https://erp.example.test/app/products/prod_cv_mirror01 。CV-TRAY-02、CV-LAMP-03、CV-BASKET-04 这三个 SKU 用 SKU 查商品时，系统返回 not_found，所以拿不到它们的页面链接。不过这三个 SKU 的库存都能正常读到，提案也已提交。
