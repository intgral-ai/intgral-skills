Intgral 已经连接到 https://mcp.example.test/mcp。

做了两步：

1. **令牌已保存在本机。** 刚才弹出的窗口里粘贴了令牌，网关校验通过后存进了环境变量 `INTGRAL_MCP_TOKEN`，脚本只回报了长度（64 位）。令牌没有经过聊天，也没有写进任何命令。
2. **已添加 Intgral 连接（user 级别，之后每个会话都能用）：**
   `claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header 'Authorization: Bearer ${INTGRAL_MCP_TOKEN}'`
   命令里只引用这个变量，没有写令牌本身。结果：`Added HTTP MCP server intgral with URL: https://mcp.example.test/mcp to user config`

**下一步：** 请重启 Claude Code，让它读到新的环境变量，Intgral 工具才会出现。重启后我会先给你“打开 Intgral”的链接（由 Intgral 返回，现在还拿不到）。

另外提醒：令牌别贴到聊天里。万一已经贴过，请找管理员换一个。

重启后可以做：

1. 查 SKU 的状态和现有信息
2. 用表格或资料导入，建产品草稿
3. 改产品文案或站点 listing
4. 看图、补图、调整图片
5. 先配置商家偏好（还没有）

选哪个？
