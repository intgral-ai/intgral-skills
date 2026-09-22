## VN-HOOK-01 标题建议（未保存）

已按 verde-norte-de 的私有工作区规则（品牌名大写 “VERDE NORTE”、用 “|” 分隔件数、不用装饰符号、德国站结尾写 “2er Set” 不写 “2 Stück”）和 ERP 里的现有事实拟定。只是建议，没有写入任何字段。

**前后对照**

| | 标题 | 来源 |
| --- | --- | --- |
| 现在 | Bambus Wandhaken 2er Set | 产品 title（prod_vn01，状态 draft） |
| 建议 | VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren \| 2er Set | 品牌：profile.brand “Verde Norte” → 按规则大写；Bambus：变体 material = bamboo、卖点；Wandhaken / selbstklebend / ohne Bohren：产品 description；2er Set：现标题、卖点、2026-09-10 规则 |

每个词都有当前 SKU 的依据，没有加尺寸、承重、颜色或任何承诺，也没有促销词或最高级。

**说明**

- 你只提了 SKU，没提站点或 listing，所以这条是产品目录标题（写入口是 `medusa.update_product`）。这次连接里只有产品工具，没有站点 listing 工具，读不到亚马逊 DE 的标题长度上限和 compliance，因此长度和平台规范未经后端校验，只是有依据的草稿。
- 德语正字法上 “Bambus-Wandhaken” 带连字符更规范；连字符是语法不是装饰符号，但你的规则写的是“不用任何装饰符号”，我没擅自加，由你决定。
- 如果要保存，说一声即可：我只改 `title` 这一个字段，不动价格、图片、品牌或卖点。发布仍在 ERP 完成：https://erp.example.test/app/products/prod_vn01
