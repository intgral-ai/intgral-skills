已把 mlist_cv01_es（CV-HOOK-01，Amazon ES 草稿）的标题、卖点和描述用西班牙语重写并保存。

**保存结果**：`medusa.update_listing` 返回 `write_result.status: succeeded`，`updated.copy: true`（属性未改），content_version 3 → 4。
Listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es （当前环境没有浏览器工具，未替你打开，请点开复核）

**依据的规范**（本次从后端读取，不是手册固定值）：WALL_HOOK 品类 es_ES 要求标题 ≤ 200 字符、品牌在前、不含促销词（oferta / gratis / garantía）；卖点 ≤ 5 条、每条 ≤ 255；描述 ≤ 2000。品牌写法按 casa-verde-es 的偏好：“Casa Verde” 保留拉丁字母、不连写，标题用 “·” 分隔件数。

## 标题

| | 文案 | 来源 |
| --- | --- | --- |
| 前 | Casa Verde gancho de pared bambú 2 unidades | 原 listing |
| 后 | Casa Verde · Ganchos de pared de bambú · Instalación adhesiva sin taladrar · Pack de 2 | 品牌：profile.brand；竹制：variant.material = bamboo；背胶免打孔：产品描述；2 件装：产品标题 / profile 卖点；“·” 分隔：casa-verde-es 偏好 |

## 卖点（上限 5 条，有依据的只有 4 条，没有凑数）

| # | 文案 | 来源 |
| --- | --- | --- |
| 1 | Bambú natural: ganchos de pared fabricados en bambú. | profile 卖点“天然竹材”；variant.material |
| 2 | Instalación adhesiva: se fijan a la pared con adhesivo, sin necesidad de taladrar. | profile 卖点“背胶安装”；产品描述“背胶免打孔安装” |
| 3 | Pack de 2 ganchos. | profile 卖点“2 件装” |
| 4 | Para el recibidor o el baño: útiles para colgar toallas, llaves y bolsos pequeños. | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |

## 描述（原为空，是阻断项）

> Pack de dos ganchos de pared Casa Verde fabricados en bambú. Se fijan a la pared con adhesivo, sin necesidad de taladrar. Útiles en el recibidor o en el baño para colgar toallas, llaves y bolsos pequeños.

来源：产品描述（两只、竹制、背胶免打孔、玄关/浴室/毛巾/钥匙/小包）+ profile.brand。

**刻意没写的**：承重、适用墙面、防水/耐潮、尺寸和重量——ERP 里没有承重和墙面数据；变体虽有 weight 60、长宽高 6×4×3，但单位以及是单只还是整包都没有说明，所以没放进文案。也没用任何最高级、保修或促销用语。

## 保存后的合规状态

- missing_required、invalid、warnings 均为空（原来缺的 description 已补上，标题促销词警告已消失）。
- 但后端仍返回 `ready: false`，没给出具体原因；这只是 ERP 当前报告，不等于亚马逊审核通过。

**下一步**：请在上面的 listing 页复核文案并查看 ready 为何仍为 false；发布由你在 ERP 完成。如需在文案里写尺寸、重量或承重，请提供带单位的确认数据，我再补一条卖点。另外 material（Bambú）、mounting_type（Adhesivo）、number_of_items（2）这几个品类属性这次没动，需要的话告诉我一并填写。
