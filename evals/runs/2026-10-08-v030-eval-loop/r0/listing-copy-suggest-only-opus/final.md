按你说的，这次**只给建议，什么都没保存**：没有调用任何更新工具，listing mlist_cv01_es 还是 content_version 3 的草稿（draft）。

我读了这几份数据：listing 当前内容和 compliance、产品 prod_cv01 的描述、profile 和变体，还有西班牙站 WALL_HOOK 品类的要求，以及你们 Casa Verde 的品牌写法偏好。

## 现状有什么问题

| | 当前文案 | 问题 |
| --- | --- | --- |
| 标题 | Casa Verde gancho de pared bambú 2 unidades（43/200 字符） | 卖 2 只却用了单数 “gancho”；最有卖点的“背胶免打孔”和使用场景都没写；件数没按你们的规则用 “·” 隔开；后面还有很多字符没用 |
| 卖点 | Bambú natural / Instalación adhesiva / 2 unidades（3/5 条） | 每条只有两三个词，没说对买家有什么用；产品描述里写的使用场景（玄关、浴室，挂毛巾、钥匙、小包）一条都没用上 |

品牌放在标题开头、没有促销词，这两点现在已经符合品类要求。

## 建议标题

> **Casa Verde Ganchos de pared adhesivos de bambú natural, sin taladrar, para recibidor y baño · 2 unidades**

共 104 个字符，后端上限是 200。

| 内容 | 来源 |
| --- | --- |
| Casa Verde 放在开头，拉丁字母原样写，不写成 CasaVerde | profile.brand；品类要求 “brand first”；你们的偏好和 2026-09-01 的规则 |
| bambú natural（天然竹） | 变体 material = bamboo；profile 卖点“天然竹材” |
| adhesivos, sin taladrar（背胶、免打孔） | 产品描述“背胶免打孔安装” |
| para recibidor y baño（玄关、浴室） | 产品描述“适合玄关、浴室” |
| · 2 unidades | 产品描述“两只”、标题“2 件装”；“·” 隔开件数是你们的偏好 |

标题里没有 oferta、gratis、garantía 这类促销词，也没有最高级（compliance 对此有警告）。

## 建议卖点

后端最多允许 5 条，每条不超过 255 字符。有来源的事实只够写 4 条，所以先写 4 条，不为凑满 5 条去编。

| # | 建议文案 | 来源 |
| --- | --- | --- |
| 1 | Bambú natural: ganchos de pared fabricados en bambú. | 变体 material；profile“天然竹材” |
| 2 | Instalación adhesiva sin taladrar: se fijan con su base adhesiva, sin hacer agujeros en la pared. | 产品描述“背胶免打孔安装”；profile“背胶安装” |
| 3 | Para recibidor y baño: cuelga toallas, llaves y bolsos pequeños. | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |
| 4 | Contenido: 2 ganchos de pared. | 产品描述“两只”；profile“2 件装” |

## 以下内容故意没写，需要你提供依据

- **尺寸和重量**：ERP 变体里记的是 weight 60、长 6、宽 4、高 3，但没有单位，也看不出是单只的数据还是整包的。你确认单位和口径后，可以补成第 5 条卖点。
- **承重、适用墙面、防水防潮、能否无痕撕除**：产品数据里都没有，所以没写。虽然商品放在浴室用，也不能推出它防水。你确认后可以加进去。
- **环保、可持续之类的说法，还有质保承诺**：都没有来源，按规则不写。

## 这次没让我改、但值得知道的

- compliance 现在是 **ready: false**，因为必填的**描述（description）还空着**，而且这一项会阻断发布。标题和卖点改好了也解决不了它。需要的话，我可以用上面同样的事实写一版西语描述（上限 2000 字符）。
- listing 的属性只填了 brand、product_type 和 condition。品类里的 material（可选 Bambú）、mounting_type（可选 Adhesivo）、number_of_items（2）都有事实支撑，可以一起补上。

## 要保存的话

你回复“按建议改”后，我会调用 `medusa.update_listing`，只写 listing mlist_cv01_es 的 `copy.title` 和 `copy.bullet_points` 这两个字段，不动描述、属性、图片和价格。保存只是更新草稿，不会发布，发布要你在 ERP 里操作。

listing 页面（这个会话没有浏览器工具，所以我没帮你打开）：https://erp.example.test/app/amazon-listings/mlist_cv01_es
产品页：https://erp.example.test/app/products/prod_cv01
