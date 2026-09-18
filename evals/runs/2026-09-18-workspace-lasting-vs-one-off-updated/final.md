## 一次性版本：全大写品牌名（仅供查看，未写入）

从 `mlist_cv01_es`（Amazon ES，SKU CV-HOOK-01，状态 draft，content_version 3）读到的当前标题：

> Casa Verde gancho de pared bambú 2 unidades

只把品牌名改成全大写、其余不动的版本：

> **CASA VERDE gancho de pared bambú 2 unidades**

- 44 字符，在后端给的标题上限 200 内。
- 按你说的“就这一次，不用记”：没有调用 `update_listing`，listing 内容不变；这次的大写写法也没有记入偏好，你现有的“品牌名写 Casa Verde”规则保持原样。要真正保存到 listing 的话再告诉我。
- 顺带一提：偏好里写着“标题用 · 分隔件数”，而当前标题是 “… bambú 2 unidades”，没有用 “·”。这次没动它；要不要改成 “… bambú · 2 unidades” 由你定。

## 已记住：卖点一律用西班牙语

已写入私有工作区的商家偏好文件（商家标识 casa-verde-es）：

`INTGRAL_WORKSPACE/merchants/casa-verde-es/preferences.md`

新增一行（其余内容未改）：

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-09-18 | 卖点（bullet_points）一律用西班牙语写 | 用户指示（本次会话） |

改动前的副本已备份到 `merchants/casa-verde-es/backups/preferences.2026-09-18.md`。这条规则和已有的“商品文案按站点语言”（Amazon ES）不冲突；以后每次任务开始都会先读这个文件，你也可以直接编辑它。这条规则只管今后写卖点的语言，不会回头改动已经保存的 listing。

该 listing 的 ERP 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es
