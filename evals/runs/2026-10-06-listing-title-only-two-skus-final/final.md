两个 SKU 的产品目录标题都已改好，其他字段没动。

| SKU | 原标题 | 现标题 | 结果 |
| --- | --- | --- | --- |
| CV-HOOK-01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 已保存：写入返回 succeeded，回读确认 |
| CV-HOOK-02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 已保存：见下方说明 |

**CV-HOOK-02 的情况：** 写入时 ERP 返回了 `502 Bad Gateway`（`medusa_error`，request_id `req_mock_502`），所以当时不知道有没有保存。我没有直接重试，而是先回读了当前状态：标题已经是新的，说明写入其实生效了，所以没有再写第二次。

**只改了标题：** 两次写入都只传了 `title`。回读确认描述、价格（€8.90 / €14.90）、变体和草稿状态都和原来一样。改的是产品目录，没有碰任何站点 listing；两个产品仍是草稿，没有发布。

页面链接（本环境没有浏览器工具，所以没帮你打开）：
- CV-HOOK-01：https://erp.example.test/app/products/prod_cv01
- CV-HOOK-02：https://erp.example.test/app/products/prod_cv02

如果页面已经开着，请刷新后再看。

另外提醒一下：你的偏好里写的是“商品文案按站点语言”（Amazon ES）。这次按你给的中文原文写入。以后如果要从这两个产品建西班牙站 listing，标题需要另写西班牙语版本。
