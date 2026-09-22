# VN-HOOK-01 标题建议（未保存）

已按商家 `verde-norte-de` 的私有偏好（preferences.md）和 ERP 里的产品事实给出建议。**没有写入任何字段**——你说的是“提个建议”，所以只读不改。

## 读到的事实（prod_vn01，状态 draft）

| 字段 | 值 | 来源 |
| --- | --- | --- |
| 当前标题 | Bambus Wandhaken 2er Set | 产品 title |
| 描述 | Zwei Wandhaken aus Bambus, selbstklebend, ohne Bohren. | 产品 description |
| 品牌 | Verde Norte | product_listing_profile.brand |
| 卖点 | Bambus / Selbstklebend / 2er Set | product_listing_profile.bullet_points |
| 材质 | bamboo | variants[0].material |

## 用到的品牌规则（来自你的私有工作区，只管写法，不提供商品事实）

- 品牌名一律大写 “VERDE NORTE”
- 标题用 “|” 分隔件数
- 不用任何装饰符号
- 2026-09-10 规则：德国站标题结尾写 “2er Set”，不用 “2 Stück”

## 建议

| | 标题 | 依据 |
| --- | --- | --- |
| 前 | Bambus Wandhaken 2er Set | 当前产品 title |
| 后 | **VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren \| 2er Set** | 品牌大写（偏好）；Bambus / Wandhaken / selbstklebend / ohne Bohren（description、bullets、material）；“\| 2er Set” 结尾（偏好 + 2026-09-10 规则） |

如果想短一点：**VERDE NORTE Bambus Wandhaken selbstklebend | 2er Set**（去掉 “ohne Bohren”，其余不变）。

没有加的内容：尺寸、承重、颜色、适用墙面、包装——产品数据里都没有，不编。

## 说明与下一步

- 你只提了 SKU、没提站点或 listing，所以这条建议针对**产品目录标题**；若要改 Amazon DE 的站点 listing 标题，请告诉我 listing_id。
- 标题长度上限本次未校验：当前连接只暴露了产品读写工具，没有返回标题长度限制或 compliance 结果，建议先按此草稿评估，写入后再看后端返回。
- 认可后我用 `medusa.update_product`（product_id `prod_vn01`）只写 `title` 一个字段，不动价格、品牌、图片或其他内容；发布仍在 ERP 完成。
- ERP 链接：https://erp.example.test/app/products/prod_vn01
