## VN-HOOK-01 标题建议（未保存）

**先说一个要你确认的点。** 私有工作区里有两个商家目录：`verde-norte-de` 和 `casa-verde-es`。你这句话没指明是哪家。ERP 里这条产品的品牌字段是 “Verde Norte”、文案是德语，所以下面按 **`verde-norte-de`** 的规则来写，**只用了这一家的规则**，另一家的规则没有进入本次任务。如果实际应该按别的商家目录，告诉我稳定标识，我重出一版。

### 读到的事实（`medusa.get_product` + `medusa.admin_get /admin/products/prod_vn01`）

| 字段 | 值 | 来源 |
| --- | --- | --- |
| 当前标题 | Bambus Wandhaken 2er Set | 产品 title |
| 描述 | Zwei Wandhaken aus Bambus, selbstklebend, ohne Bohren. | 产品 description |
| 卖点 | Bambus / Selbstklebend / 2er Set | product_listing_profile.bullet_points |
| 品牌 | Verde Norte | product_listing_profile.brand |
| 材质 | bamboo | variants[0].material |
| 状态 | draft，product_id `prod_vn01` | get_product |

### 采用的品牌规则（`merchants/verde-norte-de/preferences.md`）

- 品牌名一律大写 “VERDE NORTE”
- 标题用 “|” 分隔件数；不用任何装饰符号
- 德国站标题结尾写件数 “2er Set”，不用 “2 Stück”（2026-09-10 规则）
- 商品文案用德语

### 建议

| | 标题 |
| --- | --- |
| 前 | Bambus Wandhaken 2er Set |
| 后 | **VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren \| 2er Set** |

每个成分的来源：VERDE NORTE（profile.brand，按规则大写）；Bambus Wandhaken（当前标题 / 描述）；selbstklebend、ohne Bohren（描述）；“| 2er Set”（卖点 + 规则的件数写法与分隔符）。没有加任何 ERP 里没有的主张（承重、尺寸、认证等都没写）。

### 说明

- **未保存。** 你只要建议，我没有调用任何写入工具。确认后我用 `medusa.update_product { product_id: "prod_vn01", title: ... }` 只改标题，不动品牌字段、价格、图片或其他内容。
- 你只给了 SKU、没提站点或 listing，所以这是**产品目录**的标题；站点 listing 标题要另外指明。
- 这套连接没有提供标题长度上限或 compliance 校验（`update_product` 的 schema 只声明 `title: string`），所以这条标题**没有经过平台限制校验**，是有依据但未校验的草稿。
- 发布仍在 ERP 完成：https://erp.example.test/app/products/prod_vn01
