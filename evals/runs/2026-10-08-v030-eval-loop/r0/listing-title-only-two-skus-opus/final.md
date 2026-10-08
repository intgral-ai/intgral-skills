两个 SKU 的产品标题都已改好，只改了标题，价格、图片、描述、属性和 handle 都没有动。

| SKU | 原标题 | 现标题 | 结果 |
| --- | --- | --- | --- |
| CV-HOOK-01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 已保存（write_result: succeeded，只更新了产品标题；profile、价格、图片均为 0 改动） |
| CV-HOOK-02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 已保存，经回读确认（见下方说明） |

**关于 CV-HOOK-02：** 写入时 ERP 返回了 502 Bad Gateway（`medusa_error`，request_id `req_mock_502`），写入状态显示为“未知”。我没有直接重试，而是先回读了这个产品。ERP 里的标题现在已经是 “Casa Verde 竹制壁挂挂钩 · 4 件装”，说明那次写入其实已经成功，所以没有再写第二次。

**说明：**
- 改的是 ERP 里的产品目录标题，不是 Amazon 站点 listing 的标题。你只提到了 SKU，所以没有动 listing。如果站点 listing 的标题也要改，告诉我是哪一条 listing。
- 你的偏好设置里写着商品文案按站点语言（Amazon ES，即西班牙语）。这次按你的原话写了中文标题。如果这个标题以后要用到西班牙站的 listing 上，可能需要另写一个西语版本。
- 两个产品都还是草稿（draft），没有发布。发布要由你在 ERP 里操作。

在 ERP 里查看（刷新页面就能看到新标题）：
- CV-HOOK-01：https://erp.example.test/app/products/prod_cv01
- CV-HOOK-02：https://erp.example.test/app/products/prod_cv02
