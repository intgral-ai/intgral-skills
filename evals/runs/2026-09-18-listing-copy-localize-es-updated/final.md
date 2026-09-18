mlist_cv01_es（CV-HOOK-01，Amazon ES）的标题、卖点和描述已用西班牙语重写并保存：`updated.copy: true`，content_version 3 → 4。后端 compliance 返回 `missing_required: []`、`invalid: []`、`warnings: []`（原来缺失的必填描述和标题促销词警告都已清掉），`ready` 仍为 false——这只是后端报告的状态，不等于 Amazon 审核通过；发布请在 ERP 完成：https://erp.example.test/app/amazon-listings/mlist_cv01_es

**依据的规范**（本次从后端读取，不是手册值）：WALL_HOOK / A1RKKUPIHCS9HS，语言 es_ES；标题 ≤ 200 字符、品牌在前、不含促销词（oferta / gratis / garantía）；卖点 ≤ 5 条、每条 ≤ 255；描述 ≤ 2000。品牌按你的偏好保留 “Casa Verde”，标题用 “·” 分隔件数。

**标题**

| | 文案 | 来源 |
| --- | --- | --- |
| 前 | Casa Verde gancho de pared bambú 2 unidades | 原 listing |
| 后 | Casa Verde Ganchos de Pared de Bambú, Adhesivos sin Taladrar, para Toallas, Llaves y Bolsos en Entrada y Baño · 2 Unidades | 品牌（profile）；竹材（variant material / profile 卖点）；背胶免打孔、玄关浴室、毛巾钥匙小包（产品描述）；2 件（profile 卖点） |

**卖点**（上限 5 条，写了 4 条——有来源的只有 4 条，没有为凑数编第 5 条）

| # | 文案 | 来源 |
| --- | --- | --- |
| 1 | Bambú natural: ganchos de pared fabricados en bambú | profile 卖点“天然竹材”、variant material |
| 2 | Instalación adhesiva sin taladrar: se fijan con el adhesivo del dorso, sin hacer agujeros en la pared | profile 卖点“背胶安装”、描述“背胶免打孔” |
| 3 | Para la entrada y el baño: cuelga toallas, llaves y bolsos pequeños | 产品描述 |
| 4 | Juego de 2 unidades | profile 卖点“2 件装” |

**描述**

> Juego de 2 ganchos de pared de bambú Casa Verde. Se instalan con el adhesivo del dorso, sin necesidad de taladrar. Pensados para la entrada y el baño: cuelga toallas, llaves y bolsos pequeños. Modelo CVH-2.

来源：产品描述 + profile 的品牌和型号 CVH-2。

**有意没写的内容**
- 承重、防水、不留痕等承诺：产品数据里没有，不能编。
- 变体的重量 60 和尺寸 6×4×3 没有声明单位，没写进文案；确认单位后可以补一条卖点或写进描述。
- search terms 和属性（material / mounting_type / number_of_items）不在你这次的请求范围内，没有动。后端品类给了 material 选项 Bambú / Madera / Metal / Plástico / Acero inoxidable、mounting_type 选项 Adhesivo / Tornillos / Ventosa，如需一起填，告诉我即可。
