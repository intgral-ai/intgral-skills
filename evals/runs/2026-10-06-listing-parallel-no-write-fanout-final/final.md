三个 SKU 的产品标题都已改好，ERP 返回的写入结果都是 succeeded。只改了标题：价格、资料（profile）、图片的更新数都是 0。

| SKU | 原标题 | 新标题 | 结果 | 产品页 |
| --- | --- | --- | --- | --- |
| CV-HOOK-01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 已保存 | https://erp.example.test/app/products/prod_cv01 |
| CV-HOOK-02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 已保存 | https://erp.example.test/app/products/prod_cv02 |
| CV-HOOK-03 | Bamboo wall hook 6pk | Casa Verde 竹制壁挂挂钩 · 6 件装 | 已保存 | https://erp.example.test/app/products/prod_cv03 |

说明：
- 改的是**产品目录**里的标题。你没有指定站点或 listing，所以 Amazon ES 上各站点 listing 的文案没有动。如果 listing 标题也要改，请告诉我是哪条 listing。
- 三个产品都还是草稿（draft），这次没有发布任何内容。要发布，请在 ERP 里自己操作。
- 提醒一下：你的偏好设置写的是“商品文案按站点语言”（Amazon ES 用西班牙语），这次我按你给的中文原文写入了。如果 Amazon 上要用西班牙语标题，可以再告诉我。
- 当前会话没有浏览器工具，我没有打开页面。请用上面的链接查看；如果页面已经开着，刷新一下就能看到新标题。
