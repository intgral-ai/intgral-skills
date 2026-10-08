---
name: intgral-start
description: Start using Intgral — connect the Intgral MCP server on first use, then show what can be done with a link to Intgral, and open a SKU's Intgral page whenever a task touches that SKU.
license: MIT
metadata:
  version: "0.3.0"
---

# 开始使用 Intgral

具体的上架、调研、视频工作由 `intgral-listing` / `intgral-research` / `intgral-video` 完成；
本 Skill 负责连接、入口，以及找到并打开 SKU 的页面。

## 1. 先看是否已连接

本会话已列出 Intgral 工具（如 `medusa.get_started`）就是已连接：直接到第 2 步，不重装、不改客户端配置。
没有 Intgral 工具就是首次使用，按顺序：

1. **地址。** 用户消息里给了 MCP 地址就用它；没有就只问这一件事（管理员提供的地址），这一轮不安装、
   不读客户端配置、不给菜单。不从域名、示例、文档或其他商家推断地址。
2. **直接安装，不再二次确认。** 宿主是 Claude Code（有 `claude` 命令）时运行：
   `claude mcp add --transport http --scope user intgral <地址>`
   用 user 级别，之后每个会话都可用。提示同名 `intgral` 已存在时，先 `claude mcp get intgral`：
   地址相同（只差末尾的 `/` 也算相同）就当作已安装；不同就把两个地址和旧连接的状态（例如连接失败）
   告诉用户，由用户决定是否替换，这一轮停在这个问题上。用户同意替换后，在原来的级别删除再安装：
   `claude mcp remove intgral -s user`，然后上面的安装命令。不用 project / local 级别另装一个同名连接来绕开冲突。
   命令失败时照原样报告输出。
   其他客户端：给出该客户端自己的添加方式或其连接设置位置；不确定就直说，不编命令。
3. **登录在客户端里。** 需要授权时由客户端自己的登录页完成；不在聊天里索要 token、密码或密钥。
   管理员给的是固定访问令牌（不是登录页）时，令牌只进本机的隐藏输入窗口，不进聊天、命令或输出：
   1. 先运行本 Skill 自带的脚本（用本 Skill 安装目录下的实际路径）。Windows：
      `powershell.exe -NoProfile -ExecutionPolicy Bypass -File <本 Skill 目录>/scripts/set-token.ps1 -Url <地址>`
      （[set-token.ps1](scripts/set-token.ps1)）；macOS：`bash <本 Skill 目录>/scripts/set-token.sh <地址>`
      （[set-token.sh](scripts/set-token.sh)）。告诉用户会弹出窗口，请在窗口里粘贴令牌。脚本先用网关校验，
      通过才存进环境变量 `INTGRAL_MCP_TOKEN`，只回报长度。脚本说没保存（被拒、窗口关闭）就照原样转告，这一轮停下。
   2. 保存成功后，让客户端从这个变量读令牌。Claude Code：
      `claude mcp add --transport http --scope user intgral <地址> --header 'Authorization: Bearer ${INTGRAL_MCP_TOKEN}'`
      （单引号，命令里没有令牌）；Codex：在 `config.toml` 的 `[mcp_servers.intgral]` 里写
      `bearer_token_env_var = "INTGRAL_MCP_TOKEN"`。
   3. 其他系统或窗口打不开：说明情况，请用户自己在终端里设置这个变量；不给带令牌占位符的命令让用户填。
   不要令牌、不读令牌、不自己设置这个变量；用户贴到聊天里也不用它，建议用户找管理员更换。
4. **说清下一步。** 新装的 MCP 一般要重启或重新加载客户端后工具才出现。Intgral 的链接由连上后的
   `medusa.get_started` 返回；现在还拿不到就说明重启后会给出，不猜 ERP 地址。
5. 安装成功后，给出第 2 步的菜单，问用户想先做什么。

## 2. 菜单和 Intgral 链接

已连接时先调用 `medusa.get_started`（不传 `open_browser`），把返回的 `erp_url` 作为“打开 Intgral”的链接给用户，
并按地址说清是哪一页（例如以 `/agent-activity` 结尾的是 agent 操作记录页）。没有返回 `erp_url` 就说明拿不到，不拼路径。
然后用编号列出这个部署能做的事，问用户选哪个。调研和视频两项只在 `medusa.list_endpoints` 列出
`/admin/research` 或 `/admin/video-generations` 路由时才列；没有的不列：

1. 查 SKU 的状态和现有信息（intgral-listing）
2. 用表格或资料导入，建产品草稿（intgral-listing）
3. 改产品文案或站点 listing（intgral-listing）
4. 看图、补图、调整图片（intgral-listing）
5. 市场、竞品、供应商调研和产品简报（intgral-research）
6. 产品视频（intgral-video）

用户已经说了具体任务就跳过菜单，直接交给对应 Skill。对应 Skill 未安装时说出要装哪个：
`npx skills@1.7.0 add intgral-ai/intgral-skills --skill <名字>`。

本会话还没提过时，菜单多列一行“先配置商家偏好（还没有）”，不另外再问；回答仍只以“选哪个？”这一个问题结尾。用户已说具体任务、或没装
`intgral-listing` / `intgral-research` / `intgral-video`（偏好由它们读取）就不列。按其
`references/private-workspace.md` 的“Switching merchants”确定本会话的商家：商家已定时只检查这一个路径（如
`test -f merchants/<id>/preferences.md`），不列出 `merchants/`；已有就不列；商家不明就不列这一行。
- 用户选了这一项：按同一文件的“First-time setup”引导（工作区位置、`INTGRAL_WORKSPACE` 未设置怎么办都按它），
  只问模板 `assets/preferences.example.md` 顶部几项（标识、品牌写法、站点、语言、币种），视频偏好留到做视频时再问；
  写 `merchants/<stable-id>/preferences.md` 并读回。选之前不写任何文件。
- 选了别的项或拒绝：说之后任务需要某项设置时会再问；本会话不再提配置偏好。

## 3. 操作 SKU：打开它的页面；目录查不到先查 listing

任务一涉及具体 SKU（查、改、图片、调研关联、视频都算），读到该 SKU 后就用返回的 `erp_url`，
在本会话的浏览器工具里打开，不等用户要求。每个 SKU 每个会话只开一次；一次涉及多个 SKU 时开第一个，
其余给链接。页面留给用户操作：打开后不在页面里点击、保存或发布。没有浏览器工具或打开失败时给链接，
不说已打开。

`medusa.get_product` 返回 `not_found` 不等于没有：listing 可以没有目录产品。先用 seller SKU 查 listing
（`medusa.admin_get` 读 `GET /admin/amazon/listings?seller_sku=<SKU>&view=all`，不带 `view=all` 只返回待复核队列），
找到就读 `medusa.get_listing_context` 并按上面的规则打开它的 `listing_erp_url`；告知目录里还没有该产品，是否
bootstrap 导入由用户决定，这一轮不执行。两处都没有就照实说没找到，请用户核对 SKU；不拿相近 SKU 代替。
