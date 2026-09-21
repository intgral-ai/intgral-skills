# 文案示例：有来源的标题、卖点与本地化

合成示例。商品、SKU、listing、站点限制和文案全部虚构，只用来演示方法；不是任何商家的事实，
也不是模板——真实约束永远来自当前部署的 inputSchema、品类要求和 compliance。

## 输入

用户：“帮我把 DL-LAMP-03 在德国站的 listing 标题和卖点改好，写德语，改完保存。”

读到的事实（`medusa.get_product` → `medusa.admin_get /admin/products/prod_dl03`
补读 description / profile / variants；`medusa.get_listing_context` 读 listing）：

| 字段 | 值 | 来源 |
| --- | --- | --- |
| 标题（产品） | Lumo 折叠阅读台灯 · 3 档亮度 | 产品 title |
| 卖点（profile） | 三档亮度；USB-C 充电；可折叠收纳 | product_listing_profile.bullet_points |
| 描述 | 折叠式 LED 阅读灯，三档亮度，USB-C 充电，折叠后可放入抽屉。 | 产品 description |
| 变体 | DL-LAMP-03，白色，重量 320 g | variants[0] |
| 品牌 | Lumo | profile.brand |
| 当前 listing 文案 | 标题 “Lumo Leselampe faltbar”；卖点 2 条 | current_variant.content |
| 部署限制 | 标题 ≤ 200 字符；卖点 ≤ 5 条、每条 ≤ 255；compliance 警告：标题不得含促销词 | compliance.limits / warnings |
| 品类要求 | material 枚举：Kunststoff / Metall / Holz；无“光通量”字段 | admin_get 品类要求 |
| 私有偏好 | 品牌名保留 “Lumo”，不翻译；标题用 “·” 分隔 | 私有工作区 preferences.md（写法规则，不是商品事实） |

用户资料里还写着“亮度 400 流明、通过 CE 认证、两年质保”。这三条产品数据里没有。

## 方法

1. **先分建议还是写入。** 用户说“改完保存”，且指明了 listing 与字段（标题、卖点）——授权写入
   `medusa.update_listing` 的 `copy.title` 和 `copy.bullet_points`；描述、属性、图片不在范围内。
2. **逐字段定来源。** 每条主张只能来自当前 SKU 的产品/listing 数据，或用户明确确认的事实。
   流明、CE、质保来自用户资料但没有产品数据支持——不进文案，列为待确认；
   “可放入抽屉”来自描述，可以用；“320 g” 来自变体，可以用。
3. **限制照后端读。** 5 条以内、每条 255 以内、标题 200 以内、不含促销词——都是这次读到的值，
   不是手册记的数字。品类没有光通量字段，所以就算用户确认了 400 流明，也只能写进卖点文字，
   不能填成属性。
4. **本地化检查（德语）。** 品牌名保持拉丁字母；单位公制；不把中文习惯的“承诺”翻译过去
   （“终身保修”“绝对不伤眼”一类没有来源就不写）；不用促销词（Angebot、gratis、Garantie）；
   不用最高级；数字与单位之间留空格（320 g）。翻译只翻有来源的事实，不顺手扩写。
5. **写前后对照，标来源。**

## 输出：前后对照

**标题**

| | 文案 | 来源 |
| --- | --- | --- |
| 前 | Lumo Leselampe faltbar | 当前 listing |
| 后 | Lumo · Faltbare LED-Leselampe · 3 Helligkeitsstufen · USB-C | 品牌（profile）；折叠、LED、三档、USB-C（description / bullets）；“·” 分隔（私有偏好） |

**卖点**（后端上限 5 条，这里 4 条：有来源的只有 4 条，不为凑数编第 5 条）

| # | 文案 | 来源 |
| --- | --- | --- |
| 1 | 3 Helligkeitsstufen für Lesen, Arbeiten und Entspannen | profile.bullet_points；用途措辞为 `source: agent` |
| 2 | Aufladen per USB-C | profile.bullet_points |
| 3 | Zusammenklappbar – passt in die Schublade | description |
| 4 | Nur 320 g leicht | variants[0].weight |

不写：400 Lumen（无产品数据）、CE-zertifiziert（认证只用用户明确确认且有依据的事实）、
2 Jahre Garantie（承诺；且 “Garantie” 是 compliance 点名的促销词）。

**写入**：`medusa.update_listing { listing_id: "mlist_dl03_de", copy: { title, bullet_points } }`
——只有这两个字段。返回 `updated.copy: true`、`content_version: 8`、compliance 仍缺 `description`。

**汇报**：按返回值说“标题和 4 条卖点已保存（content_version 8，erp_url …）；描述仍是必填缺口；
流明 / CE / 质保三条没有产品依据，确认后可补一条卖点；发布在 ERP 完成”。

## 只建议不写入的变体

用户说“先别改，给我建议”：同样的读取、同样的前后对照，但不调用任何 update 工具，
回答里明确写“未保存”，并说明授权后会用哪个工具改哪些字段。建议里的每条主张同样带来源。

## 冲突变体

用户说“材质写金属的”，但变体 material 是 Kunststoff，当前 listing 属性也是 Kunststoff。
这是用户陈述与 ERP 事实的冲突：一次列清（来源、两个值），不写任何一方的材质；
其余有来源的卖点照常保存或建议，并说明哪一条被搁置、需要用户确认什么证据。

## 本地化变体（西班牙站）

同一商品去西班牙站：品牌仍是 “Lumo”；“Garantía”“oferta”“gratis” 不出现；
“折叠后可放入抽屉” → “Plegable: cabe en un cajón”；重量 “320 g”；
不把德语标题机械翻过去，而是按西班牙站读到的限制和品类字段重写——限制可能不同，必须重新读。
