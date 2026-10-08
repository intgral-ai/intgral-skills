## 1. mlist_cv01_es 标题：全大写品牌名版本（仅建议，未保存）

listing：mlist_cv01_es（CV-HOOK-01，Amazon ES，草稿，content_version 3）

| | 标题 | 来源 |
| --- | --- | --- |
| 当前 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing 文案 |
| 建议 | **CASA VERDE Gancho de pared de bambú · 2 unidades** | 品牌名大写按你这次的要求；竹制、壁挂挂钩、2 件装取自 listing 现有标题/卖点和产品标题；“·” 分隔件数按你的偏好规则 |

- 长度 50 字符，在后端上限 200 以内。没有加任何新的商品主张。
- **这个版本没有写进 ERP**，listing 标题仍是原来的。如果要用，告诉我“保存”，我会用 `medusa.update_listing` 只改 `copy.title` 这一个字段。
- 按你说的，全大写只用这一次，**不记录**。偏好里原有的规则「标题里的品牌名写 “Casa Verde”」保持不变，以后的标题默认还是 “Casa Verde”。
- listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es （当前会话没有浏览器工具，所以没有替你打开）

## 2. 已记住：以后卖点一律用西班牙语写

已写入你的私有偏好文件 `merchants/casa-verde-es/preferences.md`，修改前已备份到 `merchants/casa-verde-es/backups/preferences.2026-10-06.md`。改动只有规则表里新增的一行：

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-10-06 | 以后卖点一律用西班牙语写 | 用户在聊天中明确要求“记住”（2026-10-06 会话） |

其余内容一行没动。之后每次任务开始都会先读这个文件，你也可以直接编辑它。这条规则只管以后写的卖点，不会回头改已经存好的内容（这条 listing 现有的 3 条卖点本来就是西班牙语）。
