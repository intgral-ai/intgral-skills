我尝试用你给的地址安装 Intgral，但你的电脑上已经有一个同名（`intgral`）的连接，而且它的地址不一样：

- 现有连接（用户级别）：`https://old-mcp.example.test/mcp`，当前状态是 **连接失败**
- 管理员给你的新地址：`https://mcp.example.test/mcp`

所以我先停了下来，没有改动现有配置。要不要把旧连接替换成新地址？

- **替换**：我会先删掉旧连接（`claude mcp remove intgral -s user`），再用新地址按用户级别重新安装。装好后需要重启或重新加载 Claude Code，Intgral 的工具才会出现；之后我会给你 Intgral 的打开链接和可以做的事情菜单。
- **不替换**：保持现状。旧连接目前连不上，Intgral 暂时还用不了，可以先跟管理员确认哪个地址是对的。

回复“替换”或“不替换”就行。
