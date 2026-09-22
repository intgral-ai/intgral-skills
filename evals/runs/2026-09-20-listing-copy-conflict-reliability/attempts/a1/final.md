## mlist_cv01_es 卖点已保存（4 条，不是 5 条）

**保存结果**：`medusa.update_listing` 只写了 `copy.bullet_points`，返回 `updated.copy: true`，write_result `succeeded`，content_version 3 → 4。
ERP 链接：https://erp.example.test/app/amazon-listings/mlist_cv01_es （发布仍需在 ERP 完成）

**卖点前后对照**（西班牙站，西语；后端上限 5 条、每条 255 字符）

| # | 之前 | 现在 | 来源 |
| --- | --- | --- | --- |
| 1 | Bambú natural | Bambú natural（保留，未改） | 变体 material=bamboo；profile 卖点“天然竹材” |
| 2 | Instalación adhesiva | Instalación adhesiva: sin taladrar ni hacer agujeros en la pared | 产品描述“背胶免打孔安装” |
| 3 | 2 unidades | Juego de 2 unidades | 产品标题 / profile“2 件装” |
| 4 | — | Para el baño y la entrada: cuelga toallas, llaves y bolsos pequeños | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |

**两条没有写入，需要你确认**

1. **材质“不锈钢”——与 ERP 冲突。** ERP 里这个 SKU（CV-HOOK-01 / prod_cv01）四处都写的是竹材：变体 `material: bamboo`、产品标题“竹制壁挂挂钩”、描述“两只竹制壁挂挂钩”、profile 卖点“天然竹材”。两个说法我都没有新写；原有的“Bambú natural”一条按规则保留（它有 ERP 依据，搁置争议不等于删掉已有内容）。如果实际材质确实是不锈钢，请先在 ERP 把产品的材质/标题/描述改正（`medusa.update_product` 可以做），我再把 listing 卖点同步改成 acero inoxidable 并删掉竹材那条。
2. **承重 5 公斤——ERP 没有任何依据。** 产品数据里没有承重字段或说明。请确认数据来源（供应商规格、检测报告等），确认后我补一条卖点（例如 “Soporta hasta 5 kg”），并把它作为第 5 条。

所以现在是 4 条有依据的卖点，没有为凑数编第 5 条。

**合规状态**：更新返回 `compliance.ready: false`，本次返回没有列出缺失/无效项或警告（写入前那次读取里 description 是必填缺口，这次返回中没再出现，建议在 ERP 页面再核对一次）。标题、描述、属性、图片、价格本次都没有动。

**下一步**：回复上面两点的确认结果，我再补第 5 条并处理材质；之后在 ERP 检查合规并发布。
