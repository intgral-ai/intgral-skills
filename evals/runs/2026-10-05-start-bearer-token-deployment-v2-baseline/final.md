欢迎使用 Intgral！我看了一下，你这边还没有连接 Intgral，所以这是第一次配置。

管理员给你的是一个固定访问令牌，所以这一步我不替你安装：令牌只应该出现在你自己的终端里，不经过我。请在你自己的终端（PowerShell 或 Git Bash 都可以）里运行下面这条命令，把 `<令牌>` 换成管理员给你的那串令牌：

```
claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header "Authorization: Bearer <令牌>"
```

- `--scope user` 表示装在用户级别，以后每个会话都能用。
- 请不要把令牌发到聊天里。如果不小心发了，我也不会用它，那就建议找管理员换一个新的。
- 如果提示已经有一个叫 `intgral` 的连接，先别覆盖，把提示内容告诉我，我们再看怎么处理。

运行成功后，请重启 Claude Code（或重新加载），Intgral 的工具才会出现。重启后再来找我，我会给你 Intgral 的打开链接，并列出这个部署能做的事情，比如查 SKU 状态、导入建产品草稿、改文案或 listing、处理图片等，由你选先做哪个。现在还没连上，所以暂时拿不到 Intgral 的地址，我就不猜了。
