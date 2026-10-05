三个产品的标题都已改好，ERP 对每一个都返回了保存成功（write_result.status = succeeded，没有待处理或状态不明的步骤）。

| SKU | 原标题 | 新标题 | 结果 | 产品页 |
| --- | --- | --- | --- | --- |
| CV-HOOK-01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 已保存 | https://erp.example.test/app/products/prod_cv01 |
| CV-HOOK-02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 已保存 | https://erp.example.test/app/products/prod_cv02 |
| CV-HOOK-03 | Bamboo wall hook 6pk | Casa Verde 竹制壁挂挂钩 · 6 件装 | 已保存 | https://erp.example.test/app/products/prod_cv03 |

- **只改了标题。** 三次写入都只带了 title 字段。每次返回的结果里，只有产品本身有更新，profile、价格、图片的变更数都是 0。描述、handle、价格、图片和 SKU 都没动。
- **改的是产品目录，不是 Amazon 站点 listing。** 你没提站点或 listing，所以没有改任何 listing。三个产品都还是草稿，没有发布。发布要你自己在 ERP 里操作。
- **检查过的事项：**
  - 新标题里的件数（2 / 4 / 6）和 ERP 里原标题的 2pk / 4pk / 6pk 一一对应。
  - 品牌写成 “Casa Verde”，件数用 “·” 分隔，都符合你在偏好里定的写法。
- **请注意：** 你的偏好里写着商品文案按站点语言写，你的站点是 Amazon ES。这次按你给的中文原文保存了。如果之后要在 Amazon ES 上架，站点 listing 的标题可能需要另写一个西班牙语版本。需要的话告诉我。

当前会话里没有浏览器工具，所以我没有替你打开页面。上面给了链接；页面如果已经开着，请刷新后查看。
