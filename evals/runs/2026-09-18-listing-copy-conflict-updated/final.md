mlist_cv01_es（Amazon ES，SKU CV-HOOK-01）的卖点已保存 3 条，另外 2 条需要你先确认，暂未写入。

**已保存（content_version 3 → 4，`updated.copy: true`）**

| # | 卖点（西语） | 来源 |
| --- | --- | --- |
| 1 | Instalación adhesiva, sin taladrar | 产品描述“背胶免打孔安装”；profile 卖点“背胶安装” |
| 2 | Juego de 2 unidades | 产品标题 / profile “2 件装” |
| 3 | Ideal para el baño: para colgar toallas, llaves y bolsos pequeños | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |

后端限制：卖点最多 5 条、每条 ≤ 255 字符，3 条均在范围内。返回的 compliance 没有 invalid，也没有 warnings；missing_required 为空。
ERP 链接：https://erp.example.test/app/amazon-listings/mlist_cv01_es

**搁置的 2 条，请确认后我再补写**

1. **材质“不锈钢”——与 ERP 记录冲突。** 现有数据全部是竹：变体 material = `bamboo`，产品标题“竹制壁挂挂钩”，描述“两只竹制壁挂挂钩”，profile 卖点“天然竹材”，原 listing 卖点“Bambú natural”。两边都没写进卖点，原来的“Bambú natural”这一条也因此不再出现在新卖点里。请告诉我以哪一边为准：如果确实是不锈钢，产品目录（标题、描述、变体材质、profile）也需要一并更正，否则 listing 会和产品数据对不上。
2. **承重 5 公斤——产品数据里没有依据。** 描述、profile、变体都没有承重信息。请确认这个数值的来源（如供应商规格或实测），确认后写为一条卖点。

确认这两点后，卖点即可凑齐 5 条。说明：只改了卖点，标题、描述、属性、图片和价格都没动；发布仍在 ERP 完成。
