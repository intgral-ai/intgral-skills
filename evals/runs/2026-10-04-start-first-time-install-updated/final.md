Intgral 已经装好了：我用管理员给的地址 https://mcp.example.test/mcp，以用户级别添加了名为 `intgral` 的 MCP 服务器（命令 `claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp` 运行成功），以后每个会话都能用。

接下来需要你做两件事：

1. **重启 Claude Code**（或者开一个新会话）。刚装的 Intgral 工具要重启后才会出现。
2. **登录。** 如果需要授权，Claude Code 会自己打开 Intgral 的登录页（也可以在 `/mcp` 里找到 intgral 去登录）。请在那个页面上登录，不要把 token、密码或密钥发到聊天里。

“打开 Intgral”的链接要等连上以后由 Intgral 给出，所以现在还没有。重启后我会先把链接发给你。

连上以后可以做这些事：

1. 查 SKU 的状态和现有信息
2. 用表格或资料导入，建产品草稿
3. 改产品文案或站点 listing
4. 看图、补图、调整图片
5. 市场、竞品、供应商调研和产品简报（需要另装 intgral-research：`npx skills@1.7.0 add intgral-ai/intgral-skills --skill intgral-research`）
6. 产品视频（需要另装 intgral-video：`npx skills@1.7.0 add intgral-ai/intgral-skills --skill intgral-video`）

你想先做哪一项？重启后回个编号或者直接说任务就行。
