欢迎第一次使用 Intgral。这个会话里还没有连上 Intgral 的工具，所以需要先连接。你给的地址是 https://mcp.example.test/mcp。

访问令牌我不会要，也不会让你贴到聊天里。令牌只会进你本机的一个隐藏输入窗口。

我准备运行 Intgral 自带的 `set-token.ps1` 脚本，但这一步被系统的权限检查拦下了，原因是它会修改本机的环境变量（`INTGRAL_MCP_TOKEN`）。我没有换别的办法绕过，所以现在还没有保存令牌，也没有安装连接。

你可以这样继续，二选一：

1. 允许我运行这个脚本。它会弹出一个窗口让你粘贴令牌，先用网关校验，通过后才把令牌存进 `INTGRAL_MCP_TOKEN`，只回报长度。之后我再执行不含令牌的安装命令：
   `claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header 'Authorization: Bearer ${INTGRAL_MCP_TOKEN}'`
2. 你自己在终端里把令牌设置成环境变量 `INTGRAL_MCP_TOKEN`，然后告诉我，我再执行上面的安装命令。

装好后需要重启或重新加载 Claude Code，Intgral 的工具才会出现。重启后我会给出 Intgral 的链接和能做的事情清单。


如果令牌曾经贴到过聊天里，建议找管理员更换。

你选哪个？
