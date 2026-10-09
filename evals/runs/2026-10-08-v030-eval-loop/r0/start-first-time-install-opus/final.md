已经帮你把 Intgral 装好了，装在用户级别，以后每个会话都能用：

```
claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp
```

结果：`Added HTTP MCP server intgral with URL: https://mcp.example.test/mcp to user config`（已写入 `~/.claude.json`）。

接下来：

1. **重启 Claude Code**（或重新加载）。新装的连接要重启后工具才会出现。
2. **在客户端里登录。** 重启后如果弹出 Intgral 登录页，或者 `/mcp` 里显示需要授权，就在那里登录。请不要把密码或 token 发到聊天里。如果管理员给你的是一个固定访问令牌，而不是登录页，告诉我一声就行：我会在你电脑上弹出一个隐藏输入窗口，你在窗口里粘贴，令牌不会经过聊天。
3. **Intgral 的链接要连上后才能拿到。** 重启连上后，我会先把“打开 Intgral”的链接给你。

连上后可以做的事：

1. 查 SKU 的状态和现有信息
2. 用表格或资料导入，建产品草稿
3. 改产品文案或站点 listing
4. 看图、补图、调整图片
5. 先配置商家偏好（还没有）

调研和产品视频要看你们的部署有没有开通，连上后我确认了再告诉你。

选哪个？
