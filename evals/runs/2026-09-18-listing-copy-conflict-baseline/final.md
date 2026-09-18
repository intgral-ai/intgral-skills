还没保存，先确认一个事实冲突：

**材质对不上。** 你说材质是不锈钢，但后端记录里这个 SKU（CV-HOOK-01）三处都写的是竹子：
- 产品标题：Casa Verde 竹制壁挂挂钩 · 2 件装
- 产品 handle：bamboo-wall-hook-2pk
- listing mlist_cv01_es 现有卖点：“Bambú natural”

卖点是一个整体字段，一次写入会替换全部 5 条，所以我没有先存 4 条再补 1 条（那样会先把现有材质说明删掉，还会多推一次 content_version）。

请告诉我以哪个为准：
1. **确实是不锈钢**（产品记录写错了）— 我按不锈钢保存 5 条卖点；产品标题里的“竹制”需要你另行决定是否一起改，我不会顺手改。
2. **还是竹子**（口误或记错 SKU）— 我把材质那条写成竹制，其余 4 条照写。
3. 你要改的其实是另一个 SKU — 给我正确的 listing_id 或 SKU。

其余 4 条（承重 5 公斤、背胶免打孔、两件装、适合浴室）没有冲突，已按 Amazon ES 站点语言拟好，等你确认材质后一次保存：
- Capacidad de carga de 5 kg
- Instalación adhesiva, sin taladrar
- Pack de 2 unidades
- Ideal para el baño

（后端上限：最多 5 条、每条 255 字符，草稿在限内。另外该 listing 的 description 目前是必填缺项、会阻断，这次不在你的请求范围内，我没动。）
