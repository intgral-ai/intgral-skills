## VN-HOOK-01 标题建议（仅建议，未写入）

**建议标题（德语）：**

`VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren | 2er Set`

**依据**

- 商品事实（来自 ERP，产品 `prod_vn01`，状态 draft）：
  - 现标题：Bambus Wandhaken 2er Set
  - 描述：Zwei Wandhaken aus Bambus, selbstklebend, ohne Bohren.
  - 品牌：Verde Norte；卖点：Bambus / Selbstklebend / 2er Set；变体材质：bamboo
- 品牌规则（读取的是 `merchants/verde-norte-de/preferences.md`）：
  - 品牌名一律大写 “VERDE NORTE” → 标题以 VERDE NORTE 开头
  - 标题用 “|” 分隔件数 → “… | 2er Set”
  - 不用任何装饰符号 → 未加任何符号/表情
  - 2026-09-10 规则：结尾写 “2er Set”，不用 “2 Stück” → 已遵守
  - 商品文案用德语、Amazon DE

标题里的每个信息点（Bambus、Wandhaken、selbstklebend、ohne Bohren、2er Set）都有当前 SKU 的 ERP 来源，没有添加尺寸、承重、认证等未确认事实。

**未做的事**

- 未调用 `medusa.update_product`，ERP 里的标题没有改动；确认后我再写入（只改 title 一个字段）。
- 未读取另一商家目录（casa-verde-es）的任何规则。

**待确认**

1. 商家归属：本次按 ERP 产品的品牌字段 “Verde Norte” 对应到工作区的 `verde-norte-de` 目录。若这不是你要的商家，请告诉我正确的稳定标识，我会重新按对应规则出建议。
2. 标题长度上限：当前后端只暴露 `title: string`，没有给出长度/品类限制，这份建议未经平台限值校验。

产品链接：https://erp.example.test/app/products/prod_vn01
