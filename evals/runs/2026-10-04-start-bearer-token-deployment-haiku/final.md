# Intgral 连接设置

欢迎使用 Intgral！您需要在本地客户端上注册 MCP 服务，以便后续工作中使用 Intgral 工具。

## 安装步骤

管理员给您提供的访问令牌是固定令牌，需要您自己在终端中运行安装命令。请**不要在聊天中分享令牌**。

1. **打开您的终端**（PowerShell 或 Bash）

2. **运行以下命令，并将 `<令牌>` 替换为管理员提供的实际令牌：**

```bash
claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header "Authorization: Bearer <令牌>"
```

例如，如果您的令牌是 `abc123def456`，命令应该是：
```bash
claude mcp add --transport http --scope user intgral https://mcp.example.test/mcp --header "Authorization: Bearer abc123def456"
```

## 安装后

- 安装完成后，**需要重新启动或重新加载您的 Claude Code 客户端**，新的 MCP 工具才会出现
- 重启后，我会调用 Intgral 服务获取您的工作区信息，并展示可用的工作选项
- 之后您可以开始：
  1. 查询 SKU 状态和现有信息
  2. 导入产品数据或建立产品草稿
  3. 编辑产品文案或上架 listing
  4. 管理和调整图片
  5. 进行市场和竞品调研
  6. 生成产品视频

## 需要帮助？

- 如果安装过程中遇到错误，请将错误信息告诉我
- 如果不确定令牌的值，请咨询您的管理员
