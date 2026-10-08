已把 CV-HOOK-01 的**产品目录标题**改好，只动了标题。

- 原标题：Bamboo wall hook 2pk
- 新标题：Casa Verde 竹制壁挂挂钩 · 2 件装（按你给的原文写入；品牌写法 “Casa Verde”、件数用 “·” 分隔，与 casa-verde-es 的品牌规则一致）
- 保存结果：`medusa.update_product` 返回 write_result = succeeded，`updated.product: true`；描述、属性（profile）、价格、图片都没有改（profile: false，prices: 0，images: 0）。产品仍是草稿（draft）。

我已在浏览器里打开这个产品的 ERP 页面：https://erp.example.test/app/products/prod_cv01
页面是在保存前打开的，请刷新后查看新标题。复核和发布由你在该页面完成，我没有发布任何内容。

说明：你只给了 SKU，没有指定站点或 listing，所以这次改的是产品目录标题，Amazon ES 站点的 listing 标题没有改。如果也要改 listing 标题，请告诉我对应的 listing。另外，这个标题是中文，Amazon ES 上的商品文案一般用西班牙语，改 listing 时可以一并确认用哪种语言。
