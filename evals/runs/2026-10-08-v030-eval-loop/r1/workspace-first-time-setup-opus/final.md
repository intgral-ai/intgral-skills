已为 Verde Norte 存好设置。

**这个文件是什么、不是什么**：它是放在你私有工作区里的偏好文件，以后每次处理 Verde Norte 的任务我都会先读它。它不是我的“记忆”，也不是 ERP 里的设置，不会和任何人共享。

**实际保存位置**（就是当前配置的 `INTGRAL_WORKSPACE`）：

`C:/Users/tianw/AppData/Local/Temp/claude/C--Users-tianw-Downloads-medusa-test/b2e1a146-170a-4b69-a9e0-2e2fc687d473/scratchpad/eval-030/r1/workspace-first-time-setup-opus/ws/merchants/verde-norte-de/preferences.md`

保存后读回的内容（基本设置部分）：

- Stable merchant identifier: verde-norte-de (display name: Verde Norte)
- Brand wording and approved style:（未设置）
- Market / marketplace: Amazon DE
- Language: German (product copy)
- Currency: EUR
- Evidence or source for each choice: identifier, marketplace, language and currency stated by the user in chat on 2026-10-08 (first-time setup)

“长期规则”表中新增的两行（按读回原样引用）：

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-10-08 | 商家 ID 用 verde-norte-de；站点 Amazon DE；商品文案用德语；货币 EUR；以后都按这个来 | All Verde Norte tasks / user chat, first-time setup |
| 2026-10-08 | 私有目录就用现在配置的那个（INTGRAL_WORKSPACE） | Workspace location / user chat, first-time setup |

**还没设置的项**（你没提供，我没有替你猜）：品牌用语/文风，以及视频相关偏好（时长比例、配乐、风格等）。以后你说“以后都……”时我再加进去；只说“这次……”的选择不会写进文件。

**以后会怎样**：
- 每次任务开始先读这个文件，按 Amazon DE / 德语文案 / EUR 来做；当次你明确的选择优先，ERP 返回的事实、权限和校验仍以后端为准。
- 你可以直接打开这个文件手动修改。
- 重装或升级 Intgral skills 不会动这个目录；换电脑时把整个工作区目录复制过去，或把 `INTGRAL_WORKSPACE` 指向它即可。

这次只做了本地设置，没有调用 ERP、没有创建或修改任何商品或 listing。
