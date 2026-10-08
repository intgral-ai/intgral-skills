## 1. mlist_cv01_es 标题：全大写品牌名版本（只给你看，没有保存）

我读取了 listing mlist_cv01_es 的当前内容（SKU CV-HOOK-01，Amazon ES，草稿，content_version 3）：

| | 标题 | 来源 |
| --- | --- | --- |
| 当前 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing 文案 |
| 全大写版本 | **CASA VERDE gancho de pared bambú · 2 unidades** | 品牌按你这次的要求改成全大写；“竹制壁挂挂钩、2 件装”来自当前 listing 标题和产品标题；件数前的 “·” 是你工作区里的写法规则（标题用 “·” 分隔件数） |

- 长度 45 个字符，后端标题上限是 200。
- 除了品牌大小写和件数前的 “·”，其他用词都没改，也没有加任何新的商品信息。
- **未保存**：你说的是“看看”，所以我没有调用任何写入工具，listing 上还是原来的标题。如果要用这个版本，跟我说一声，我只会通过 `medusa.update_listing` 改这条 listing 的 `copy.title`，别的字段都不动。

**只用这一次，不会记下来。** 你工作区里原来的规则（2026-09-01：标题里的品牌名写 “Casa Verde”）保持不变。以后写标题还是按 “Casa Verde” 来，这次的全大写只用于这一个版本。

## 2. 已记住：以后卖点一律用西班牙语

这条长期规则已经写进你的私有工作区：

- 文件：`ws/merchants/casa-verde-es/preferences.md`
- 改之前的备份：`ws/merchants/casa-verde-es/backups/preferences.2026-10-08.md`
- 唯一改动：在 “Lasting rules and changes” 表里加了一行，其余内容没动：

  `| 2026-10-08 | 以后卖点（bullet points）一律用西班牙语写 | 用户在会话中明确的长期指示（“以后……一律”）；适用于 casa-verde-es 所有 listing 的卖点 |`

改完我又读了一遍文件，这行已经在里面了。它和原来的“商品文案按站点语言”不冲突（ES 站本来就是西班牙语），现在专门把卖点的语言定死了。以后每次处理这个商家的任务都会先读这个文件；你也可以直接改这个文件。这条规则只管以后怎么写，不会自动改动已经存在的内容。mlist_cv01_es 现在的 3 条卖点本来就是西班牙语，这次我没有动。

## 链接

当前会话没有浏览器工具，所以我没有替你打开页面。listing 页面在这里，可以自己打开：https://erp.example.test/app/amazon-listings/mlist_cv01_es
