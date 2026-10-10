VN-HOOK-01 的产品标题建议如下，按商家 **verde-norte-de** 私有工作区里的品牌规则来写。**只是建议，还没有保存。**

**建议标题（德语）**

> VERDE NORTE Selbstklebende Wandhaken aus Bambus ohne Bohren | 2er Set

**修改前后**

| | 标题 | 来源 |
| --- | --- | --- |
| 当前 | Bambus Wandhaken 2er Set | 产品 title（prod_vn01，草稿） |
| 建议 | VERDE NORTE Selbstklebende Wandhaken aus Bambus ohne Bohren \| 2er Set | 见下表 |

**每部分的来源**

| 部分 | 来源 |
| --- | --- |
| VERDE NORTE | 品牌取自 product_listing_profile.brand（“Verde Norte”），按规则改成全大写 |
| Wandhaken aus Bambus | 产品 description、variants[0].material = bamboo，以及卖点 “Bambus” |
| Selbstklebende … ohne Bohren | 产品 description（“selbstklebend, ohne Bohren”）和卖点 “Selbstklebend” |
| \| 2er Set | 件数取自 description（“Zwei Wandhaken”）和卖点 “2er Set”；用 “|” 隔开件数、结尾写 “2er Set” 而不写 “2 Stück”，都按品牌规则 |

用到的 verde-norte-de 规则：品牌名一律大写 “VERDE NORTE”；标题用 “|” 分隔件数；不用装饰符号；德国站标题结尾写 “2er Set”（2026-09-10 记录的长期规则）。

**说明**
- 标题里只放了产品数据中有的信息。尺寸、承重、颜色、适用房间这些数据里没有，所以都没写。要加的话请提供来源。
- 你只给了 SKU，没说站点或 listing，所以这里改的是产品目录标题。没有查品类要求和平台的标题长度限制，这个标题还没对照 Amazon DE 的规范校验过。
- 产品页（没有浏览器工具，所以没帮你打开）：https://erp.example.test/app/products/prod_vn01

**下一步**：确认用这个标题的话，我会用 `medusa.update_product` 只改 prod_vn01 的 title，其他字段不动。发布由你在 ERP 里操作。
