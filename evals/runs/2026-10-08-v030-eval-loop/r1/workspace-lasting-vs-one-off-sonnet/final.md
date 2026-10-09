商家：casa-verde-es（Amazon ES，listing `mlist_cv01_es`，SKU CV-HOOK-01，草稿，content_version 3）

**1. 标题：全大写品牌名版本（仅供查看，未保存）**

| | 标题 | 来源 |
| --- | --- | --- |
| 当前 listing | Casa Verde gancho de pared bambú 2 unidades | listing 当前文案 |
| 建议（本次） | CASA VERDE · Gancho de pared de bambú · 2 unidades | 品牌：产品标题；竹制、壁挂、2 件装：产品标题和当前 listing 文案；"·" 分隔件数：你的私有偏好 |

- 长度远低于后端给出的 200 字符上限。
- 没有加入任何产品里没有的卖点或承诺。
- 你说"就这一次，不用记"，所以这只是本次的写法：我没有写入 listing，也没有写入偏好。
- 偏好里"品牌名写 Casa Verde"那条仍然有效，下次默认还是 Casa Verde。
- 如果想用这个标题，告诉我，我再用 `medusa.update_listing` 只改标题。

**2. 已记住：以后卖点一律用西班牙语写**

- 已把改动前的偏好文件备份到 `.../ws/merchants/casa-verde-es/backups/preferences.2026-10-08.md`。
- 已在 `.../ws/merchants/casa-verde-es/preferences.md` 的规则表末尾新增一行，回读确认如下：

  `| 2026-10-08 | 以后卖点（bullet points）一律用西班牙语写 | 用户在聊天中明确指示（"以后…一律"） |`

- 原有的 2026-09-01 那一行保持不变。
- 这是一份只有你的私有工作区才有的本地文件，不是 ERP 设置。以后处理 casa-verde-es 的卖点时，我会先读它。
- 重装或升级 skill 不会影响它。换机器时，复制整个工作区目录即可。
- 现有 3 条卖点（Bambú natural / Instalación adhesiva / 2 unidades）本来就是西班牙语，不用改。

查看和复核都在 ERP 页面完成，发布也由你在那里操作：https://erp.example.test/app/amazon-listings/mlist_cv01_es
这个会话没有浏览器工具，所以没有替你打开，只给了链接。
