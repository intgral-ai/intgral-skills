CV-HOOK-01 西班牙站 listing（mlist_cv01_es，草稿，content_version 3）的修改建议如下。**未保存任何内容**，没有调用任何更新工具。

页面链接：https://erp.example.test/app/amazon-listings/mlist_cv01_es（本会话没有浏览器工具，所以没有替你打开）

## 现状
- 标题：Casa Verde gancho de pared bambú 2 unidades
- 卖点：Bambú natural / Instalación adhesiva / 2 unidades（共 3 条，都很短）
- 描述：空。后端把它列为必填缺口（blocking），是目前唯一阻断项。
- 后端限制：标题 ≤200 字符；卖点 ≤5 条、每条 ≤255；描述 ≤2000；search terms ≤250。
- 警告：标题不得含促销词（oferta、gratis、garantía）。

## 标题
| | 文案 | 来源 |
|---|---|---|
| 前 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing |
| 建议 | Casa Verde · Ganchos de pared de bambú · Adhesivos, sin taladro · 2 unidades | 品牌写法和"·"分隔来自你的偏好；bambú、背胶、免打孔、2 件来自产品描述和 profile |

约 75 字符，远低于 200。没有促销词。

## 卖点
后端允许 5 条。有依据的内容只够写 4 条，所以不凑第 5 条。

| # | 建议文案 | 来源 |
|---|---|---|
| 1 | Bambú natural: ganchos de bambú para la pared, un acabado cálido y natural | profile"天然竹材"；变体 material=bamboo。"cálido"是我加的措辞，不是商品事实 |
| 2 | Instalación adhesiva sin taladro: se pega a la pared, sin hacer agujeros | 描述"背胶免打孔安装" |
| 3 | Para el recibidor y el baño: cuelga toallas, llaves y bolsos pequeños | 描述"适合玄关、浴室挂毛巾、钥匙和小包" |
| 4 | Pack de 2 unidades | profile"2 件装" |

## 描述（必填缺口，可一并补）
Dos ganchos de bambú para la pared con instalación adhesiva, sin necesidad de taladrar. Pensados para el recibidor y el baño: para colgar toallas, llaves y bolsos pequeños.

内容全部取自产品描述。

## 没有写进去的内容
- 承重：产品数据里没有，所以不写"可承重 X kg"。请提供测试值或来源。
- 尺寸和重量：变体里有 6×4×3 和 60，但没有单位，也不确定是挂钩本身还是包装的尺寸，所以不写。请确认单位和含义。
- 防水、防潮、可重复粘贴、粘胶类型、认证：都没有依据，不写。
- 促销词和最高级（oferta、gratis、garantía、el mejor）：不用。
- search terms 现在是空的。有依据的词有 gancho、bambú、pared、adhesivo、sin taladro、toallero，但最终要看你想覆盖哪些词，由你定。

## 下一步
你认可后，我会用 `medusa.update_listing` 只写 `copy.title`、`copy.bullet_points`、`copy.description`（以及你想填的 `search_terms`），不动属性、价格和图片。写完后我会按返回结果核对 compliance。发布要你在 ERP 里完成。
