VN-HOOK-01 的产品目录标题建议如下，**只是建议，还没有保存**。按商家 **verde-norte-de** 私有偏好里的品牌规则写的。

**建议标题（德语）**

> VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren | 2er Set

| | 标题 |
| --- | --- |
| 现在 | Bambus Wandhaken 2er Set |
| 建议 | VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren \| 2er Set |

**每部分的来源**

- **VERDE NORTE**：品牌取自产品资料（product_listing_profile.brand = “Verde Norte”）。按你们的规则，品牌名一律大写。
- **Bambus**：材质是 bamboo（变体 material 字段），产品描述也写了 “aus Bambus”。
- **Wandhaken / selbstklebend / ohne Bohren**：都来自产品描述 “Zwei Wandhaken aus Bambus, selbstklebend, ohne Bohren.”
- **| 2er Set**：件数来自描述里的 “Zwei” 和卖点里的 “2er Set”。用 “|” 隔开件数，放在标题结尾，写 “2er Set” 而不是 “2 Stück”，这些都是你们的规则（2026-09-10 那条长期规则）。
- 没加任何装饰符号（·、★、emoji 等），符合品牌规则。

**没写进去的内容**：尺寸、承重、颜色、适用表面和适用房间。产品数据里都没有这些，所以我没加。要补的话，请给出有依据的数据。

**说明**

- 你只提了 SKU，没说站点 listing，所以这是**产品目录**标题。如果你要改的是 Amazon DE 站点 listing 的标题，请告诉我，我会另外读那条 listing 和品类的标题要求，再给建议。
- 这次没查到后端对产品标题的长度限制，所以还没按平台限值校验长度。建议标题大约 64 个字符。
- 确认用这个标题的话，回复一句就行。我会用 `medusa.update_product` 只改 title 这一个字段，价格、图片、卖点、品牌和其他字段都不动。
- 产品页（这个会话没有浏览器工具，我没有打开它）：https://erp.example.test/app/products/prod_vn01
