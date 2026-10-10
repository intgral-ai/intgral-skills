按商家 **casa-verde-es** 的工作区规则处理，两件事分开说：

## 1. 标题：全大写品牌名版本（仅本次看看，未保存，也不记）

listing `mlist_cv01_es`（CV-HOOK-01，Amazon ES，草稿，content_version 3）

| | 标题 | 来源 |
| --- | --- | --- |
| 当前 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing 文案 |
| 建议 | **CASA VERDE gancho de pared bambú · 2 unidades** | 品牌（当前 listing / 产品标题），按你本次要求改成全大写；竹制、壁挂挂钩、2 件装（当前 listing 标题与卖点、产品标题）；“·” 分隔件数（你的偏好设置） |

- 只改了品牌写法和件数分隔符，没有加任何新卖点或产品事实；长度 45 字符，在本次读到的上限 200 以内。
- 这是**建议，没有写入**：我没有调用 `medusa.update_listing`，listing 里的标题保持不变。要用这个版本，告诉我“保存”，我只改 `copy.title` 这一个字段。
- **这次的全大写不会记住**：你原有的规则“标题里的品牌名写 Casa Verde”保持不变，以后的标题仍按 “Casa Verde” 写。
- 提醒：Amazon 一般希望标题里的品牌名与品牌注册的写法一致；本会话没有读品类标题规则的工具，这一点没法替你核验，保存前建议你自己确认全大写是否可以接受。

## 2. 已记住：以后卖点一律用西班牙语写

已先备份原文件，再在你的偏好表里加了一行。读回后保存的内容如下：

> | 2026-10-08 | 卖点（bullet points）以后一律用西班牙语写 | 用户聊天指示（本会话，“以后卖点一律用西班牙语写”） |

- 偏好文件：`C:/Users/tianw/AppData/Local/Temp/claude/C--Users-tianw-Downloads-medusa-test/b2e1a146-170a-4b69-a9e0-2e2fc687d473/scratchpad/eval-030/r1/workspace-lasting-vs-one-off-opus/ws/merchants/casa-verde-es/preferences.md`
- 备份：同目录下 `backups/preferences.2026-10-08.md`
- 以后每次任务都会先读这个文件；你也可以直接编辑它。这条规则只影响以后写的卖点，不会回头改已有的内容。这条 listing 现在的 3 条卖点本来就是西班牙语（Bambú natural / Instalación adhesiva / 2 unidades）。

listing 页面（本会话没有浏览器工具，所以没有替你打开）：https://erp.example.test/app/amazon-listings/mlist_cv01_es ——查看、复核和发布都由你在这个页面完成。
