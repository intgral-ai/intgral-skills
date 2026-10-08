三个 SKU 的产品目录标题都已保存，只改了标题。

| SKU | 产品 | 原标题 | 新标题（已保存） | 结果 |
| --- | --- | --- | --- | --- |
| CV-HOOK-01 | prod_cv01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | succeeded，updated.product = true |
| CV-HOOK-02 | prod_cv02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | succeeded，updated.product = true |
| CV-HOOK-03 | prod_cv03 | Bamboo wall hook 6pk | Casa Verde 竹制壁挂挂钩 · 6 件装 | succeeded，updated.product = true |

- **其他内容没有改。** 三次写入都只传了 `title`。后端返回 profile 未更新，价格 0 项、图片 0 项。描述、价格、图片、handle 和状态都保持原样，三个产品仍是草稿（draft）。
- **改的是产品目录，不是 Amazon ES 的站点 listing。** 你只给了 SKU，没有提站点 listing，所以没有动任何 listing。如果站点 listing 的标题也要改，请告诉我是哪条 listing（或者说明要改 Amazon ES 上的），我再单独处理。
- **语言提醒。** 你的偏好设置（商家 casa-verde-es）里写着“商品文案按站点语言”，也就是 Amazon ES 用西班牙语。这次我按你给的中文原文保存了标题。如果这些标题以后要用在西语站点，需要另外准备西语版本。品牌写法 “Casa Verde” 和用 “·” 分隔件数都符合你的设置。
- **页面链接。** 这个会话没有浏览器工具，所以页面没有打开。请在 ERP 里查看并确认，发布也由你在页面上操作：
  - CV-HOOK-01：https://erp.example.test/app/products/prod_cv01
  - CV-HOOK-02：https://erp.example.test/app/products/prod_cv02
  - CV-HOOK-03：https://erp.example.test/app/products/prod_cv03
