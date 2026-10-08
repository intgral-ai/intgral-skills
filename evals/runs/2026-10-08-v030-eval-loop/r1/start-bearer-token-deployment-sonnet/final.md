还没连上 Intgral：保存令牌的那一步被系统拦住了，我停在这里，等你决定。

**已确认**
- 这个会话里没有任何 Intgral 工具，所以是首次连接。
- 地址用你给的 `https://mcp.example.test/mcp`。
- 管理员给的是固定访问令牌，不是登录页。令牌只能进本机的隐藏输入窗口，不能贴在聊天或命令里。

**卡在哪**
我要运行 Intgral 自带的 `set-token.ps1`，它会弹出一个窗口让你粘贴令牌，先用网关校验，通过后才存进环境变量 `INTGRAL_MCP_TOKEN`。这条命令带了 `-ExecutionPolicy Bypass`，被权限检查拒绝了，理由是"绕过安全标志"。我没有换写法绕过这个拦截，令牌也没有保存。

**可以这样继续（二选一）**
1. 你在 Claude Code 的权限设置里允许运行这个脚本，然后让我重试。重试后会弹出窗口，请在窗口里粘贴令牌，不要发到聊天里。
2. 你自己在 PowerShell 里设置环境变量（令牌不要发给我）：
   `[Environment]::SetEnvironmentVariable('INTGRAL_MCP_TOKEN','<管理员给的令牌>','User')`
   设好后告诉我"已设置"，我再继续下一步。

**令牌保存成功后我会做的**
运行（命令里没有令牌）：
`claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header 'Authorization: Bearer ${INTGRAL_MCP_TOKEN}'`
然后需要重启或重新加载 Claude Code，Intgral 工具才会出现。Intgral 的页面链接要连上后才能拿到，现在我不猜地址，重启后会给你。

另外，如果令牌已经贴到过聊天或别处，建议找管理员更换。

你选哪个？
