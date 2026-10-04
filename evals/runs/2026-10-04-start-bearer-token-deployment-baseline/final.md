欢迎开始用 Intgral！我已经按你给的地址做了连接，但目前还不能确认装好了，访问令牌也需要你自己加上。

**我做了什么**
- 运行了 `claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp`。命令返回成功（退出码 0），但没有任何输出。
- 接着用 `claude mcp get intgral` 检查，结果是 `No MCP server named "intgral".`；`claude mcp list` 也是空的。所以这次安装没有被确认保存下来。

**令牌请你自己加，不要发到聊天里**
令牌相当于密码，留在你自己的终端里最安全。请在你电脑的终端里运行下面这条命令，把 `<你的令牌>` 换成管理员给你的令牌：

```
claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header "Authorization: Bearer <你的令牌>"
```

- 如果提示 `intgral` 已经存在，先运行 `claude mcp remove intgral -s user`，再运行上面这条。
- 我是按最常见的 `Authorization: Bearer` 方式写的。如果管理员说要用别的请求头名称，就换成他说的那个。
- 运行完可以用 `claude mcp get intgral` 看看，确认地址是 https://mcp.example.test/mcp。

**接下来**
加好之后，重启一下 Claude Code，Intgral 的工具才会出现。连上后我会给你打开 Intgral 的链接，到时候可以先做这些事：

1. 查 SKU 的状态和现有信息
2. 用表格或资料导入，建产品草稿
3. 改产品文案或站点 listing
4. 看图、补图、调整图片
5. 市场、竞品、供应商调研和产品简报
6. 产品视频

重启后告诉我你想先做哪一项。如果还是连不上，把 `claude mcp get intgral` 的输出发给我（先把令牌那部分删掉）。
