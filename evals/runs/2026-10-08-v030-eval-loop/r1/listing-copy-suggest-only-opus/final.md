# CV-HOOK-01 西班牙站 listing（mlist_cv01_es）标题与卖点修改建议

**这些只是建议，我没有保存。** 我没有调用任何写入工具，listing 还是原来的 content_version 3。

Listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es
（这个会话里没有浏览器工具，所以我没有替你打开，请点链接自己看。）

## 我看了哪些资料

- listing 现状（`medusa.get_listing_context`）：草稿，Amazon ES（A1RKKUPIHCS9HS），类目 WALL_HOOK，品牌 Casa Verde。
- 产品详情（`/admin/products/prod_cv01`）：
  - 描述：“两只竹制壁挂挂钩，背胶免打孔安装。适合玄关、浴室挂毛巾、钥匙和小包。”
  - profile 卖点：天然竹材 / 背胶安装 / 2 件装
  - 变体 material：bamboo
- 类目要求（WALL_HOOK @ ES）和 compliance：
  - 标题最多 200 字符，要求品牌放最前，不能有促销词。compliance 特别提醒不要用 oferta、gratis、garantía。
  - 卖点最多 5 条，每条最多 255 字符。
- 商家 casa-verde-es 的写法规则：品牌写成 “Casa Verde”，不翻译、不连写；标题用 “·” 分隔件数。这些规则只管写法，不提供商品事实。

## 标题

| | 文案 | 来源 |
| --- | --- | --- |
| 现在 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing |
| 建议 | **Casa Verde Ganchos de pared de bambú adhesivos, sin taladrar, para entrada y baño · 2 unidades** | 见下 |

建议标题里每部分的来源：

- 品牌放最前：profile.brand 加类目要求。
- 竹制：变体 material=bamboo。
- 背胶、免打孔：产品描述。
- 玄关和浴室：产品描述。
- “· 2 unidades”：产品标题和 profile。用 “·” 是商家的写法规则。

为什么这样改：

1. 现在的标题只是几个词堆在一起，“de” 缺了，单复数也不对（2 件却写 gancho）。
2. 最大的卖点“免打孔”没出现在标题里。
3. 件数没按商家规则用 “·” 隔开。

建议标题大约 95 个字符，在 200 的上限内，也没有促销词。

## 卖点

后端上限是 5 条，我只建议 4 条。有依据的事实就这么多，我不为凑满 5 条去编。

| # | 建议文案 | 来源 |
| --- | --- | --- |
| 1 | Bambú natural: ganchos de pared fabricados en bambú. | variants[0].material=bamboo；profile 卖点“天然竹材” |
| 2 | Instalación adhesiva sin taladrar: se fijan a la pared sin hacer agujeros. | 产品描述“背胶免打孔安装”；profile 卖点“背胶安装” |
| 3 | Ideales para la entrada y el baño: cuelga toallas, llaves y bolsos pequeños. | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |
| 4 | Pack de 2 unidades. | 产品标题和 profile 卖点“2 件装” |

现在的 3 条卖点（Bambú natural / Instalación adhesiva / 2 unidades）意思都对，问题是只有关键词，没写怎么用、用在哪。上面的建议把产品描述里已有的事实补了进去，句子由我来写。

## 刻意没写的内容

下面这些是这类挂钩常见的卖点，但产品数据里没有，所以我没写，也不建议写：

- 承重（kg）
- 防水 / 防潮。能挂浴室毛巾不等于防水。
- 可移除无残胶
- 适用墙面类型
- 环保 / 可持续
- 保修，以及任何“最好”“最强”之类的说法

如果你能确认其中某条并给出依据，比如供应商规格，我可以加成第 5 条卖点。

变体上还有 weight=60 和尺寸 6×4×3，但数据里没写单位，也看不出是单只还是整包，所以这次没写进文案。你确认单位后可以补一条尺寸或重量卖点。

## 不在这次范围、但会挡住发布的问题

- compliance.ready=false：**描述（description）是必填项，现在是空的，会阻断发布。** 你要的话，我可以按产品描述起草一段西班牙语描述，同样先给你看。
- 这次 listing 属性里没有 material、mounting_type、number_of_items。类目给的候选值里有 “Bambú” 和 “Adhesivo”。要不要补由你决定，我没动。

## 你确认后我怎么改

我会调用 `medusa.update_listing`，参数是 `listing_id: "mlist_cv01_es"`，只写 `copy.title` 和 `copy.bullet_points` 这两个字段。描述、属性、价格、图片都不碰。

保存只会更新 ERP 里的草稿，不会发布。发布要你在上面的 listing 页面自己完成。
