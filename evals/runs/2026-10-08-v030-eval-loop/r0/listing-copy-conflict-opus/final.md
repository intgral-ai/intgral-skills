mlist_cv01_es（Amazon ES，CV-HOOK-01，草稿）的卖点**已保存，但只存了 3 条，不是 5 条**。有依据的 3 条已经写进去。材质和承重这两条和 ERP 数据对不上，或者 ERP 里没有，我先没写，需要你确认。

## 已保存（content_version 3 → 4，write_result: succeeded，只改了 copy.bullet_points）

| # | 写入的卖点（西班牙语） | 依据 |
| --- | --- | --- |
| 1 | Instalación adhesiva sin taladrar: se fija a la pared sin agujeros ni tornillos | 产品描述“背胶免打孔安装”；profile 卖点“背胶安装” |
| 2 | Pack de 2 ganchos de pared | 产品标题“2 件装”；描述“两只”；profile 卖点“2 件装” |
| 3 | Apto para el baño: para colgar toallas; también útil en la entrada para llaves y bolsos pequeños | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |

后端上限是最多 5 条，每条不超过 255 字符，这 3 条都在范围内。标题、描述、属性、图片都没有动。

## 没写的两条，需要你确认

1. **材质：你说不锈钢，ERP 里是竹子。** ERP 里有 4 处都写着竹子：
   - 变体 material 是 `bamboo`
   - 产品标题是“竹制壁挂挂钩”
   - 产品描述是“两只竹制壁挂挂钩”
   - profile 卖点是“天然竹材”

   原来 listing 的卖点也是“Bambú natural”。两边的说法冲突，所以不锈钢和竹子我都没写。原来那条“Bambú natural”这次也没有保留，现在保存的卖点里没有任何材质说法。
   请确认到底是哪种材质。如果是不锈钢，产品数据（变体 material、标题、描述）也得一起改，不然 listing 和产品会互相矛盾。确认后我再补一条材质卖点。品类可选值里有“Acero inoxidable”和“Bambú”。
2. **承重 5 公斤：产品数据里找不到。** 描述、profile、变体里都没有承重信息。请告诉我这个数是从哪来的，比如供应商规格书或你们自己的测试结果。确认后我加一条“carga máx. 5 kg”。

这两条确认后就能补到 5 条。

## 其他情况

- 保存后后端返回 compliance.ready: false，本次没有列出缺失项、无效项或警告。保存前读到的必填缺口是 description（描述）。请在 listing 页刷新看最新状态。ready 不等于 Amazon 审核通过。
- 这次没有改材质（material）、安装方式（mounting_type）、件数（number_of_items）这几个属性，你只让改卖点。
- 发布要你自己在 ERP 里操作，我没有发布。
- 这个会话里没有浏览器工具，我没打开页面。listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es
