商家：casa-verde-es（已按私有偏好：品牌名写 "Casa Verde"、不翻译，标题用 "·" 分隔）

**以下只是建议，未保存，没有调用任何更新工具。** listing mlist_cv01_es 目前是草稿（content_version 3）。

我读了：listing 当前文案、产品详情（描述 / profile / 变体）、WALL_HOOK 在西班牙站的品类要求和 compliance。限制来自后端：标题 ≤ 200 字符，卖点 ≤ 5 条、每条 ≤ 255 字符，品类备注“品牌放最前，不含促销词”；西班牙站不得出现 oferta / gratis / garantía。

## 标题

| | 文案 | 来源 |
| --- | --- | --- |
| 现在 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing |
| 建议 | Casa Verde · Ganchos adhesivos de pared de bambú · 2 unidades · Sin taladro | 品牌：profile.brand；竹：变体 material=bamboo；背胶、免打孔：产品描述；2 件装：产品标题；"·" 分隔：私有偏好 |

改动理由：
- 现标题没有分隔、复数不对（"gancho" 应为 "ganchos"）。
- 现标题没写出背胶免打孔，这是描述里有依据的核心卖点。
- 品牌仍在最前，不含促销词。

## 卖点（后端上限 5 条，这里 4 条）

有依据的内容只够 4 条，我不凑第 5 条。

| # | 建议文案 | 来源 |
| --- | --- | --- |
| 1 | BAMBÚ NATURAL: ganchos de pared fabricados en bambú | profile 卖点“天然竹材”；变体 material=bamboo |
| 2 | INSTALACIÓN ADHESIVA SIN TALADRO: se pegan a la pared, sin necesidad de hacer agujeros | 产品描述“背胶免打孔安装”；profile 卖点“背胶安装” |
| 3 | PACK DE 2 UNIDADES: dos ganchos por paquete | 产品标题和 profile 卖点“2 件装” |
| 4 | PARA ENTRADA Y BAÑO: ideales para colgar toallas, llaves y bolsos pequeños | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包”；用途措辞为 AI 撰写 |

不写这些，因为没有产品依据：
- 承重 / 最大载重。
- 防水 / 耐潮。
- 可重复粘贴 / 可移除。
- 墙面适用类型。
- 认证、保修。

另外，变体里有重量 60、尺寸 6×4×3，但没有单位，也看不出是单只还是整包，所以没写进卖点。你确认后可以再加一条尺寸卖点。

## 其他发现（不在你问的范围内，只提醒）

- **描述是必填缺口**：compliance.ready=false，唯一阻断项是 description 为空（上限 2000 字符）。可用产品描述的事实起草，等你说要写时再出。
- 品类属性选项可对应：材质 Bambú、安装方式 Adhesivo、件数 2。这些现在没问你，所以没动。

## 下一步

你确认后，我会用 `medusa.update_listing`（listing_id=mlist_cv01_es）只写 `copy.title` 和 `copy.bullet_points`，不碰描述、属性、价格和图片。发布由你在 ERP 里完成。

listing 页：https://erp.example.test/app/amazon-listings/mlist_cv01_es
产品页：https://erp.example.test/app/products/prod_cv01
（当前没有浏览器工具，所以我没有打开页面，只给链接。）
