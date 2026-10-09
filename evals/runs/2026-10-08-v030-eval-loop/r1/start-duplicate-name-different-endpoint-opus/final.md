我用你给的地址安装 Intgral 连接时，发现 Claude Code 里已经有一个同名的 `intgral` 连接（用户级别），所以这次没装上：

- 已有的连接：`https://old-mcp.example.test/mcp`，状态是 **Failed to connect（连接失败）**
- 管理员这次给的地址：`https://mcp.example.test/mcp`

两个地址不一样。我还没有动旧连接。

**要把旧连接换成管理员给的新地址吗？** 你回复“替换”后，我会在用户级别删掉旧连接，再用新地址重新安装：

```
claude mcp remove intgral -s user
claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp
```

装好后需要重启或重新加载 Claude Code，Intgral 的工具才会出现。重启后我会给你 Intgral 的入口链接，再列出能做的事。
