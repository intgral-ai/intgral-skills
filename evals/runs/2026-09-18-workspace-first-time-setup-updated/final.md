已为 Verde Norte 建好私有工作区并保存设置。

**先说明这个工作区是什么、不是什么**
- 它是一份本地文件，我每次开始任务前都会先读；它只存放你的长期偏好和规则。
- 它不是我的"记忆"，不是 ERP 里的设置，也不会同步给任何人。凭证不会写进去，仍由客户端连接配置保管。
- 它在你配置的 `INTGRAL_WORKSPACE` 目录下，与已安装的 Skill 分开存放，升级或重装 Skill 不会动它。

**已创建的文件（实际路径）**

`C:/Users/tianw/AppData/Local/Temp/claude/C--Users-tianw-Downloads-medusa-test--claude-worktrees-mcp-server-dev-setup-42bdc8/3e343a95-4e24-41c6-9760-bc3c1783b27b/scratchpad/upd-workspace-first-time-setup/workspace/merchants/verde-norte-de/preferences.md`

同目录下还建了空的 `tasks/`（任务记录）和 `backups/`（改偏好前的备份）。

**文件里已写入的内容（已回读确认）**
- 商家稳定 ID：`verde-norte-de`
- 站点：Amazon DE
- 语言：德语（商品文案）
- 货币：EUR
- 来源：2026-09-18 你在对话中给出的指示

长期规则表新增 5 行（均标注日期 2026-09-18、来源为你的本次指示）：商家 ID、站点 Amazon DE、文案用德语、货币 EUR、以及"私有目录用当前配置的 `INTGRAL_WORKSPACE`，每次任务先读 `merchants/verde-norte-de/`"。

**尚未设置、保持空白的项**
- 品牌用语与文案风格
- 视频相关偏好（投放位置、时长/比例、风格、字幕、音乐等）

这些没有填任何猜测值，等你提供后再补。

**以后怎么用**
- 之后每个任务我都先读这份 `preferences.md`（如有 `rules.md` 也一起读），按里面的设置执行；后端返回的事实、权限和校验结果仍以后端为准。
- 你可以直接编辑这个文件；也可以在对话里说"以后都……"，我会先备份再追加一行带日期的规则。只说"这次"的临时选择不会被记录。
- 本次没有调用 ERP，没有创建或修改任何后端数据。
