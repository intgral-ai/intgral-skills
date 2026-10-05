我刚才尝试把 Intgral 装成 Claude Code 的用户级 MCP 连接，但没有装上，因为你电脑上已经有一个同名的 `intgral` 连接，地址不一样：

- **已有的连接**（用户级别）：`https://old-mcp.example.test/mcp`，目前状态是**连接失败**
- **管理员给你的地址**：`https://mcp.example.test/mcp`

我没有改动已有的这个连接。要不要把它换成管理员给的新地址？

- **换**：我会先在用户级别删除旧连接（`claude mcp remove intgral -s user`），再用新地址装上。装好后要重启或重新加载 Claude Code，Intgral 的工具才会出现。如果需要登录，会在客户端自己的登录页里完成，你不用在聊天里发任何 token 或密码。
- **不换**：旧连接保持原样。它现在连不上，所以 Intgral 暂时还用不了。

回复“换”或“不换”就行。连上以后，我会把 Intgral 的入口链接发给你，再列出能做的事（查 SKU、导入产品、改文案和 listing、处理图片、调研、做视频）。
