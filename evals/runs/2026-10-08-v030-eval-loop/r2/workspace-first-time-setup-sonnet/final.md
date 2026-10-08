设置已保存。

**这个私有目录是做什么的：** 它只是 agent 每次开始任务时先读的一个文件。它不是 agent 的记忆，不是 ERP 里的设置，也不会和任何人共享。

**保存位置：** 就是现在配置的私有目录（INTGRAL_WORKSPACE）。商家目录之前不存在，我已新建：

`C:/Users/tianw/AppData/Local/Temp/claude/C--Users-tianw-Downloads-medusa-test/b2e1a146-170a-4b69-a9e0-2e2fc687d473/scratchpad/eval-030/r2/workspace-first-time-setup-sonnet/ws/merchants/verde-norte-de/preferences.md`

同时建了空的 `tasks/` 和 `backups/` 子目录。

**我写进去并回读确认过的内容：**

- 商家稳定标识：verde-norte-de（显示名 Verde Norte）
- 站点：Amazon DE
- 商品文案语言：德语（de）
- 货币：EUR
- 来源：你今天（2026-10-08）在聊天里给的信息

“长期规则”表里新增了一行，回读原样如下：

| 2026-10-08 | Merchant Verde Norte (verde-norte-de) sells on Amazon DE; product copy in German; currency EUR; apply these settings to all future tasks ("以后都按这个来") | User chat message, 2026-10-08 |

品牌文案风格和视频偏好都没填，等你给了再记，我不会编。

**之后会怎样：**

- 以后每个任务开始前，我会先读这个文件，并说明这些规则属于 verde-norte-de。
- 你可以直接编辑这个文件。
- 重装或升级 skill 不会动它。换电脑时，把整个工作区目录拷过去，或把 INTGRAL_WORKSPACE 指向它即可。
- 你在某次任务里说“这次”“只这一次”的选择，只对那次生效，不会写进文件。只有“以后”“一直”这类长期指示才会更新。
- 价格、材质、尺寸等商品事实不会从这个文件里取，仍以每个 SKU 的可追溯来源为准。
- 这个文件管我这边读什么，不会改 ERP 里的任何设置，也不会授权任何发布。
