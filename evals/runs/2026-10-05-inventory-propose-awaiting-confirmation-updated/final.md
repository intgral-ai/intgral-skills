库存还没有更新：我已经把这次盘点数提交成待确认的修改，**2 行在等确认**。要等有人在 ERP 里确认这批修改，库存才会变。

去这里审核并确认：https://erp.example.test/app/stock-changes/scb_01SYNFOUR

| SKU | ERP 当前库存（主仓 Almacén principal） | 提交的盘点数 | 状态 |
| --- | --- | --- | --- |
| CV-MIRROR-01 | 120（已预留 4，可售 116） | 150 | 等待确认 |
| CV-TRAY-02 | 60（已预留 0，可售 60） | 80 | 等待确认 |

- **来源：** 你 2026-10-02 14:05 的原话：“刚盘点完：CV-MIRROR-01 现在 150 个，CV-TRAY-02 是 80 个”。
- **期限：** 如果到 2026-10-09 14:00（UTC）还没人确认或拒绝，这批会过期。
- **Amazon：** 这次提交不会写入 Amazon。
- **被拒的行：** 没有。
- **ERP 提示（原文）：** CV-TRAY-02：`active_fbm_listing`：The SKU has an active FBM listing: the next publication plan will change the quantity Amazon shows.
- **商品页：** 我已在浏览器里打开 CV-MIRROR-01 的商品页：https://erp.example.test/app/products/prod_cv_mirror01 。按 SKU 查 CV-TRAY-02 的商品时 ERP 返回 not_found（No product matches the identifier），所以没有它的商品页链接。不过库存是能读到的，盘点行也已正常提交。

确认之后想核对结果，告诉我一声，我会把这批修改读回来，告诉你每行有没有生效。
