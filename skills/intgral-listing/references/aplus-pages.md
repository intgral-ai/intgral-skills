# A+ 页面

A+ 页面把产品上已存的 A+ 图片排成 Amazon 的 Standard 模块，配上文字和 alt 文本，存成 ERP 里的页面草稿：
每个产品在每个店铺、每个站点只有一页，之后一直改这一页。Agent 只起草和保存草稿；向 Amazon 检查、确认和发布
都是人在 ERP 产品页 A+ 卡片里的操作。

保存走 `medusa.admin_post` 的 `POST /admin/products/:id/aplus-pages`，先用 `medusa.list_endpoints`（或
`medusa.describe_endpoint`）确认部署列出了它；没列出就说明当前部署不能在 ERP 存 A+ 页面，页面方案只留在回答里，
不改用其他写入工具。页面只用已存的 A+ 图片：缺哪个模块的图，先按 [A+ 图片](aplus-images.md) 提议、生成、存好，再组页。

## 模块与上限

1–5 个模块，顺序就是页面上从上到下的顺序，通常头图在最前。比较表 `STANDARD_COMPARISON_TABLE` 暂不能放进页面。

| `type` | 图片位 | 文字字段（字符上限） |
| --- | --- | --- |
| `STANDARD_HEADER_IMAGE_TEXT` | 1 | 模块 `headline`（标题）≤150；块 `headline`（副标题）≤150、`body` ≤6000 |
| `STANDARD_IMAGE_TEXT_OVERLAY` | 1 | 必填 `overlay_color`：`DARK` 或 `LIGHT`；块 `headline` ≤70、`body` ≤300；没有模块标题 |
| `STANDARD_THREE_IMAGE_TEXT` | 恰好 3 | 模块 `headline` ≤200；每块 `headline` ≤160、`body` ≤1000，都必填 |
| `STANDARD_FOUR_IMAGE_TEXT` | 恰好 4 | 模块 `headline` ≤200；每块 `headline` ≤160、`body` ≤1000 |

每个图片位（block）是 `{image_id, alt_text, headline?, body?}`：`image_id` 必须是本产品为同一 `type` 存的 A+ 图
（图的 `module` 等于模块的 `type`）；同类型的图不够填满一个模块，就不用这个模块。`alt_text` 每个位都要有，1–100 字符，写这张图里看得见的东西。

## 文字和图片的拒绝项

- **站点语言。** 标题、正文和 alt 文本全部用站点语言写，不用聊天语言：amazon.es 用西班牙语（es-ES）。
  `locale` 由 ERP 按站点推出，请求里不传。
- **页面文字由你起草。** 与 A+ 图上文字（只用用户原话）不同，页面的标题、正文和 alt 文本由 Agent 按事实起草，用户确认整页；用户给了原文的字段照原文用。
- **只写事实。** 只用当前 SKU 已确认的事实（[文案与 listing](content.md)）。每个文字字段（含 alt 文本）都不放：价格、
  促销或折扣、配送说法、保证或保修、竞品、没有依据的说法（"nº 1"、"más vendido"、"el mejor" 之类）——产品资料里写着也一样不用。
  用户给的原文里有这些，保存前就拒绝：逐处指出原话和原因，请用户换说法或删掉（可以附一条标明“建议”的改写），这一轮不存。
- **不用 AI 生成的真人。** 图里有照片级 AI 生成的人（模特、人脸、身体），这张图不放进页面：Amazon 不接受，发布前人还要在
  ERP 声明页面里没有这样的图。说明原因，提供可换的已存图或请用户给实拍图，这一轮不存；也不为页面生成这样的新图。

## 步骤

1. `medusa.get_product` 确定产品；`medusa.view_product_images` 读 `aplus_images`（已存的 A+ 图，`id` 就是 `image_id`）和
   `aplus_pages`（已有页面和状态），不为图片 id 另读一次。已有页面就用 `GET /admin/products/:id/aplus-pages` 读出全文，在它上面改。
2. 店铺和站点：按[查询与连接](inspect.md)第 1 步找该 SKU 的 amazon.es listing（`view=all`）。`store_id` 是 listing 的店铺连接 id：
   列表行里是 `connection_scope`（列表行没有 `store` 对象），单条 `GET /admin/amazon/listings/:id` 里是 `store.id`；
   `marketplace_id` 用该 listing 的（amazon.es 为 `A1RKKUPIHCS9HS`，目前只支持这个站点，其他站点保存会返回 finding）。
   有多个店铺就问用户选哪个；没有 listing 就说明页面挂不上 ASIN，不猜店铺。
3. 起草整页：模块和顺序、每个位的图、全部文字和每张图的 alt 文本，逐项对照上面的上限和拒绝项。把整页一次给用户看，
   只问一个问题：按此保存吗？用户在请求里已逐字确认的内容，以及明确交给你写、说了不必再看的部分，不再问。
   确认之前不保存。
4. 保存（开头已用 `medusa.list_endpoints` 确认路由）：`medusa.admin_post`，`path` 为 `/admin/products/<product_id>/aplus-pages`，`body` 只有
   `{store_id, marketplace_id, modules, unselected_asins?}`；`modules` 每项 `{type, headline?, overlay_color?, blocks}`；
   `unselected_asins` 只放用户要去掉的 ASIN。
5. 读返回的 `page`（`status`、`asins.selected`、`asins.excluded` 及原因）和 `findings`。有 findings 页面也已存为草稿：
   每条写明第几个模块和怎么改，改好后对同一路由再存一次；改动会改变用户确认过的文字或图片时，先问用户。
   400 是形状错误（未知模块类型的 400 会列出允许的类型），按消息修正，不原样重发。finding 里的 "Unknown store …" 表示
   `store_id` 不是已连接的 Amazon 店铺：回到第 2 步重查 listing 的店铺，不猜。
   409 `aplus_page_in_flight` 表示这一页正在发布或在 Amazon 审核中（页面 `in_flight: true`，`status` 为 `publishing` 或
   `submitted`）：告诉用户页面在 Amazon 那边，等 `approved` 或 `rejected` 再改；不重试、不另存一页、不绕过。
6. 报告：已存为草稿、包含和被排除的 ASIN、剩余 findings、产品页 `erp_url`，以及下一步由人在 A+ 卡片里检查和发布。

## 检查和发布是人的事

保存只产生 ERP 草稿（`status: draft`）。冻结计划、向 Amazon 检查、确认（包括声明没有照片级 AI 人物）和发布，都由有店铺发布权限的人在
产品页 A+ 卡片里完成。Agent 不调用 `/admin/aplus-pages/:id/plans`、`/confirmations`、`/publish`、
`/status/refresh`：网关会拒绝，被拒是预期结果，照实报告，不经浏览器或其他工具绕过。

状态只从 `medusa.view_product_images` 的 `aplus_pages` 读，按原值报告（`draft`、`checked`、`publishing`、`submitted`、
`approved`、`rejected` 和 `rejection_reasons`）。没有读到这些状态，就不说页面已检查、已提交、已发布或已上线。
`rejected` 时报告 Amazon 的原因，按原因改草稿并重新保存，再请人重新检查和发布。`approved`、`rejected` 或发送已升级给人处理之后，
页面可以再保存；改一页已上线的页面，人发布后更新的是同一个 Amazon 文档，新版获批前旧版继续在线。

`live_since` 不为空，表示这一页有一个获批版本自该时间起在 Amazon 上线。此时 `status` 若是 `draft`、`checked`、
`rejected`、`publishing` 或 `submitted`，意思是有修改待生效，不是页面已下线：报告为「已上线，修改待生效」。`live_since`
为空就不说页面已上线。`rejection_reasons_from_previous_submission: true` 表示 `rejection_reasons` 来自上一次提交，
不是当前状态，报告时要说明是上一次的拒绝原因。
