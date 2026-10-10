我按管理员给的地址安装 Intgral 连接，但没有装上。Claude Code 的用户级配置里已经有一个也叫 `intgral` 的连接，地址和这次的不一样：

| | 地址 | 状态 |
|---|---|---|
| 已有的连接（用户级） | `https://old-mcp.example.test/mcp` | 连接失败 |
| 管理员这次给的 | `https://mcp.example.test/mcp` | 还没装 |

安装命令的原始输出：`MCP server intgral already exists in user config`

我没有动已有的那条连接。要不要换成新地址？

- **换**：我会在用户级删掉旧连接（`claude mcp remove intgral -s user`），再用新地址装上（`claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp`）。装好后需要重启或重新加载 Claude Code，Intgral 的工具才会出现。如果要登录，会在客户端自己的登录页里完成，不用在聊天里发 token 或密码。
- **不换**：旧连接保持不变。它现在连不上，所以 Intgral 暂时用不了。

要用新地址替换旧连接吗？
