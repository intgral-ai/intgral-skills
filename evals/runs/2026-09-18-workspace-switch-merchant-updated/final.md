按 verde-norte-de 的品牌规则，给 VN-HOOK-01（产品 prod_vn01，状态 draft）的标题建议如下，**未保存**：

**建议标题（德语）**

`VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren | 2er Set`

**前后对照**

| | 标题 | 来源 |
| --- | --- | --- |
| 前 | Bambus Wandhaken 2er Set | 当前产品 title |
| 后 | VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren \| 2er Set | 品牌 Verde Norte（profile.brand）；Bambus / Wandhaken / selbstklebend / ohne Bohren（description、bullet_points、variant material）；2er Set（bullet_points） |

**套用的品牌规则（私有工作区 preferences.md）**

- 品牌名一律大写 “VERDE NORTE”
- 用 “|” 分隔件数
- 不用任何装饰符号
- 结尾写 “2er Set”，不用 “2 Stück”（2026-09-10 规则）

**说明**

- 标题里每个主张都有当前 SKU 的产品数据支持，没有加尺寸、承重、材质等级或认证等未核实信息。
- 后端这次没有返回标题长度上限或品类校验结果，这条建议属于未校验草稿，请以 ERP 保存时的校验为准。
- 如需落库，请回复确认，我会用 `medusa.update_product` 只写 `title` 一个字段（product_id: prod_vn01），不动价格、图片、品牌或其他字段；发布仍在 ERP 完成。
