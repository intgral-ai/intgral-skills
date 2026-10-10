已把 mlist_cv01_es（Amazon ES，SKU CV-HOOK-01，品类 WALL_HOOK）的标题、卖点和描述用西班牙语重写并保存。

**保存结果**：`medusa.update_listing` 返回 `write_result.status: succeeded`，`updated.copy: true`（只改了文案，属性没动：`attributes: false`），`content_version` 从 3 升到 4。
Listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es （本会话没有浏览器工具，我没有打开它，请你自己点开查看）

## 依据的规范

- 站点规则来自后端，不是我凭经验写的：西班牙站品类要求（`es_ES`，WALL_HOOK）规定标题以品牌开头、不能有促销词，标题最多 200 字符，卖点最多 5 条、每条最多 255 字符，描述最多 2000 字符。compliance 原来有一条警告：标题不能含 oferta / gratis / garantía。
- 商家 casa-verde-es 的写法偏好：品牌名保留拉丁字母，写成 “Casa Verde”（不写 “CasaVerde”）；标题用 “·” 隔开件数。
- 我按“本地化”而不是逐字翻译来写：没有用促销词、最高级，也没有加任何承诺。

## 保存的文案和来源

**标题**

| | 文案 |
| --- | --- |
| 前 | Casa Verde gancho de pared bambú 2 unidades |
| 后 | Casa Verde Ganchos de pared de bambú adhesivos, sin taladrar, para recibidor y baño · 2 unidades |

来源：品牌来自 profile.brand；竹材来自 variants[0].material 和卖点“天然竹材”；背胶、免打孔、玄关和浴室来自产品描述；2 件装来自产品标题和 profile 卖点；“·” 的用法来自商家偏好。

**卖点**（后端允许最多 5 条，这里写了 4 条。有依据的只有这 4 条，我没有为了凑满 5 条再编一条）

| # | 文案 | 来源 |
| --- | --- | --- |
| 1 | BAMBÚ NATURAL: ganchos de pared fabricados en bambú natural. | profile 卖点“天然竹材”；variants[0].material = bamboo |
| 2 | INSTALACIÓN ADHESIVA: se fijan a la pared con adhesivo, sin necesidad de taladrar. | profile 卖点“背胶安装”；产品描述“背胶免打孔安装” |
| 3 | PARA RECIBIDOR Y BAÑO: permiten colgar toallas, llaves y bolsos pequeños. | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |
| 4 | PACK DE 2 UNIDADES: el paquete incluye dos ganchos de pared. | profile 卖点“2 件装”；产品描述“两只” |

原来的 3 条卖点（Bambú natural / Instalación adhesiva / 2 unidades）的内容都保留在第 1、2、4 条里。

**描述**（原来是空的，这是 compliance 里阻断发布的必填项）

> Juego de dos ganchos de pared de bambú de Casa Verde. Se instalan con adhesivo, sin necesidad de taladrar la pared. Son adecuados para el recibidor y el baño, donde permiten colgar toallas, llaves y bolsos pequeños.

来源：逐句对应产品描述“两只竹制壁挂挂钩，背胶免打孔安装。适合玄关、浴室挂毛巾、钥匙和小包。”，品牌来自 profile.brand。

## 保存后的 compliance

- `missing_required`、`invalid`、`warnings` 都清空了：描述这个必填缺口补上了，标题的促销词警告也消失了。
- 但返回值里 `ready` 仍是 `false`，后端没有说明原因。请在 listing 页确认还差什么。即使 `ready` 变成 true，也只是 ERP 的检查结果，不代表 Amazon 已审核通过。

## 有意没写的内容（需要你补事实）

- **承重、尺寸、重量**：ERP 里没有承重数据。变体上有 60 / 6×4×3 这几个数值，但没有单位，也看不出是单只还是整包，所以我没写进文案。你确认单位后，可以加一条尺寸卖点。
- **“可移除、不留痕迹”“防水”“适合瓷砖”之类的说法**：没有产品依据，没写。
- **search terms、属性（material、mounting_type、number_of_items）**：你这次没要求，我没改。品类给了可选值：material 有 Bambú，mounting_type 有 Adhesivo，number_of_items 是整数。需要的话我可以按这些选项填。

## 下一步

请在上面的 listing 页刷新，查看 `content_version 4` 的文案。复核和发布都由你在 ERP 里完成，我没有发布。
