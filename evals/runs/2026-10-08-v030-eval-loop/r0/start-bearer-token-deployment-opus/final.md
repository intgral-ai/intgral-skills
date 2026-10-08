Intgral 的连接已经装好了（地址 https://mcp.example.test/mcp）。

**1. 访问令牌已保存，没有经过聊天**
我在你电脑上运行了 Intgral 自带的令牌设置脚本。你在弹出的本机窗口里粘贴的令牌已经通过网关校验，存进了你电脑上的用户环境变量 `INTGRAL_MCP_TOKEN`。脚本只报告了令牌长度（64），令牌本身没有出现在聊天、命令或任何输出里。以后也请不要把令牌发到聊天里。

**2. 连接已加到 Claude Code（用户级别，以后每个会话都能用）**
```
claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header 'Authorization: Bearer ${INTGRAL_MCP_TOKEN}'
```
结果：`Added HTTP MCP server intgral with URL: https://mcp.example.test/mcp to user config`
命令里只引用了变量名，不包含令牌。连接时 Claude Code 会从这个变量读取令牌。

**下一步：** 请完全退出 Claude Code，连同运行它的终端窗口一起关掉，然后重新打开。新保存的环境变量和新加的连接都要重启后才会生效。重启后我会先调用 `medusa.get_started`，把“打开 Intgral”的链接发给你。现在还拿不到这个链接，我不会猜它的地址。

连上之后可以做这些：

1. 查 SKU 的状态和现有信息
2. 用表格或资料导入，建产品草稿
3. 改产品文案或站点 listing
4. 看图、补图、调整图片
5. 先配置商家偏好（还没有）

调研和产品视频两项，要等连上后确认这个部署开通了，我才会加进来。

选哪个？
