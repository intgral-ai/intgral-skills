# VN-HOOK-01 标题建议

**对象**：产品目录（未指明站点 listing，按目录字段处理）
产品：prod_vn01 · SKU VN-HOOK-01 · 状态 draft
ERP：https://erp.example.test/app/products/prod_vn01

**当前标题**：`Bambus Wandhaken 2er Set`

**套用的品牌规则**（读自你的私有工作区 `preferences.md` 及规则表）：
- 品牌名一律大写 "VERDE NORTE"
- 标题用 "|" 分隔件数
- 不用任何装饰符号
- 站点 Amazon DE，2026-09-10 追加规则：德国站标题结尾写件数 "2er Set"，不用 "2 Stück"

**建议标题**：

```
VERDE NORTE Bambus Wandhaken | 2er Set
```

说明：在现有标题前加大写品牌名 "VERDE NORTE"，用 "|" 分隔件数，件数沿用 ERP 中已有的
"2er Set" 写法（符合你 2026-09-10 的指示），未加任何装饰符号。"Bambus"（材质）和
"Wandhaken"（品类词）沿用当前 ERP 标题里已有的写法，未引入新事实。

**这只是建议，尚未写入。** 如果确认使用，请告诉我，我会用 `medusa.update_product`
只更新 title 字段，不动价格、图片、品牌或其他字段。

## 未核实/待确认

- 未查 Amazon DE 标题字符/字数上限（单字段标题建议按流程不查品类或该类限制），
  实际写入前建议确认长度是否超限。
- "Bambus" 材质仅沿用当前 ERP 标题中的写法，未额外读取产品 description/profile 核实。
