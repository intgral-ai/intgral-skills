VN-HOOK-01（产品 prod_vn01，状态 draft）的标题建议如下，按 verde-norte-de 的品牌规则写，**未保存**。

**标题前后对照**

| | 标题 |
| --- | --- |
| 现在 | Bambus Wandhaken 2er Set |
| 建议 | VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren \| 2er Set |

**每个词的来源**

- VERDE NORTE：品牌来自 product_listing_profile.brand（Verde Norte），按你们规则全大写。
- Bambus Wandhaken：现标题、描述；变体 material = bamboo。
- selbstklebend / ohne Bohren：产品描述（“selbstklebend, ohne Bohren”）和卖点 “Selbstklebend”。
- 2er Set：现标题、卖点；按 2026-09-10 的规则写 “2er Set”，不写 “2 Stück”，并用 “|” 隔开件数放在结尾。
- 没有任何装饰符号；没有加产品数据里没有的尺寸、承重、颜色或用途。

**说明**

- 后端这次没有提供标题长度上限或品类校验（update_product 的 schema 只有 title 字段，没有 compliance / questionnaire），所以这条是未校验草稿；如果 Amazon DE 有长度或用词限制，需要在 ERP 侧核对。
- 你只给了 SKU、没提站点 listing，所以这条建议针对的是产品目录标题。当前连接也没有 listing 工具，如需改站点 listing 请告诉我 listing_id。
- 确认后我用 `medusa.update_product { product_id: "prod_vn01", title: … }` 只改标题这一个字段，不动价格、图片、品牌或其他字段；发布仍在 ERP 完成（https://erp.example.test/app/products/prod_vn01）。
