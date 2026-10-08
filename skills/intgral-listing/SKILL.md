---
name: intgral-listing
description: Query Intgral products and listings, import product files, edit catalog or marketplace drafts, manage images, and recover partial writes through connected Intgral MCP tools.
license: MIT
metadata:
  version: "0.3.0"
---

# Intgral 上架工作流

## 先看这几条（任何任务都适用）

- **商家不明确就先问。** 本轮没说是哪个商家时，先只数 `merchants/` 下的目录个数（例如 `ls merchants | wc -l`），
  不看目录名、不读任何文件。两个及以上：这一轮只问稳定标识——不读任何商家的文件，不查 SKU，不调用任何工具，
  回答里也不出现任何商家的标识、品牌名或目录名（连“候选”都不列）。没有工作区或只有一个商家目录时，
  商家并不“不明确”：直接做，能读到哪些数据由 ERP 连接决定。
- **操作 SKU 就打开它的页面。** 工具列表里有浏览器工具（如 `host.open_url`）时，读到 SKU 的页面链接（`erp_url`；只有 listing 时用
  `listing_erp_url`）后的下一个调用就是打开它（多个 SKU 只开第一个；任务针对某条 listing 时，改为读到这条 listing 的链接后打开它，见“打开哪一页”）；
  没有浏览器工具就给链接，不说已打开。
- **子 Agent 只读，不写。** 宿主支持子 Agent 时，互不依赖的只读（多个 SKU 的现状、多份报告）可以并行分发：每个子 Agent 只给读取类工具（不给 POST/DELETE/更新类工具，不给浏览器）、只拿它要读的内容、只返回事实；宿主不能限制子 Agent 的工具就不分发，按顺序读；主 Agent 汇总、处理冲突，向商家只确认一次。写入、计费操作、同一 SKU 的两次写入、需要商家确认的步骤，一律不交给子 Agent、不并行。宿主没有子 Agent 就按顺序做同样的读取——结果和要问的问题都一样。
- **生成的图先自检再存。** 主机生成的图片，先用看图能力对照参考图逐项核对（产品、包装文字逐字、构图、比例），不符就重做一次，仍不符不保存；不能看图就说未自检。见[图片处理](references/images.md)。
- **可能长期有效的要求，收尾时问一次。** 任务中提到、可能超出本次、又没说“以后/一律/记住”的要求：照做完当前任务，
  把“要把「<将写入的那一行原话>」存进偏好吗？”并进回答唯一的结尾问题；用户说“好”之前不写偏好文件。
  哪些要求算、怎么写：[私有工作区](references/private-workspace.md)。
- **产品查不到，先查 listing。** `medusa.get_product` 返回 `not_found` 时，先按[查询与连接](references/inspect.md)第 1 步
  用 seller SKU 查 listing（`view=all`），再下结论；bootstrap 导入只作为选项交给用户，这一轮不执行。
- **不替人做决定。** 不发布、不删除、不写图片复核结果；用户在聊天里说"通过"不等于复核已保存。
- **结果照实说。** 只按工具返回报告；写入被拒绝或返回错误时，就说没有保存。

先识别用户要完成的任务，再读对应的小流程；在已授权范围内一轮完成能做的工作。
只读问题直接回答，不要求开场简报。建草稿不等于发布：发布由用户在 ERP 完成，不借助直通工具或浏览器绕过权限。

开始工作时读取已配置的[私有工作区](references/private-workspace.md)里当前商家的目录，仅在缺少必要设置时询问。
链接按所在文件的目录解析。

## 按任务进入

| 用户任务 | 先读 | 结果 |
| --- | --- | --- |
| 查 SKU、状态、现有事实，解释报错；连接或能力问题 | [查询与连接](references/inspect.md) | 有来源的答案和必要深链 |
| 表格/附件导入，或从资料建产品草稿 | [产品导入](references/import.md) | 映射、逐 SKU 结果和待补事实 |
| 改产品字段，创建或编辑站点 listing | [文案与 listing](references/content.md) | 请求字段的保存结果和合规缺口 |
| 看图、补图或调整图片 | [图片处理](references/images.md) | 实际张数、保存结果和验收限制 |
| 改配送方式（FBA / FBM）、FBM 库存或手动数量 | [复核与交接](references/review.md) | 当前状态和用户在 listing 页的操作步骤 |
| 核对完整度、处理部分/未知写入、追踪操作、准备交接 | [复核与交接](references/review.md) | 后端报告、未决问题和下一步 |

只改一个字段（如仅改标题）也走[文案与 listing](references/content.md)：读目标实体，只写该字段，
不读无关数据；改产品目录字段时不为此查品类。用户只说 SKU、未提站点或 listing 时，改的是产品目录；
站点 listing 需要用户指明或已知 listing_id。

## 共用边界

- **事实与来源。** 只用当前 SKU/站点的可追溯事实，按字段记录来源；同系列、相似商品或示例只可参考写法，
  不能提供材质、尺寸、颜色、配件或承诺。冲突与缺失一次列清，其余已授权工作继续。
  法规/安全声明只用用户明确确认的事实；价格来自用户/原表并带 `price_source`，不填估价。
- **限制由后端提供。** 品类/枚举、长度/数量上限、图片目标和阻断项来自 inputSchema、端点 schema、
  questionnaire 和 compliance，不在手册固定；缺失或冲突就报告，不用模板冒充平台规范，不宣称通过。
- **能力不推断。** 工具被列出不等于后端可用或已授权；URL/hostname 不表示功能或权限。
  能力未声明时说明未知，按工具实际契约处理，不试探写入。已安装的其他 skill 不改变这里的事实、
  权限和发布边界。
- **写入对象分清，只改请求字段。** 产品目录走 `medusa.update_product`；站点 listing 走 `medusa.update_listing`。
  专用工具优先，直通仅用于已发现且已授权的接口。用户只要求建议或检查时不落库。
- **交付凭结果。** 只引用工具返回的 `changed / updated`、状态和 `erp_url`。更新工具即使 isError:true
  也读顶层 write_result（步骤与 next_action 见[复核与交接](references/review.md)的“部分写入与恢复”）：
  已成功步骤保留，`read_state_before_retry` 先读当前状态再决定，不自动重放。错误保留原因、next_step 和 request_id：
  `medusa_error` 不等于断线，不让用户重传或用同样输入盲重试；`medusa_unavailable` 可按提示稍后重试。
  写任务末尾说明剩余缺口和下一步，查询任务回答问题即可。
- **打开哪一页。** 查询或写入都算“操作 SKU”。任务针对某条 listing（图片复核、草稿差异、在售修改、FBA/FBM 切换）时，
  先读到这条 listing 自己的链接再打开它：`medusa.get_listing_context` 的 `listing_erp_url`，或 listing 行/查询返回的 `erp_url`；
  其余打开产品页 `erp_url`。回答里说已打开；写入后再告诉用户复核和发布由用户在该页完成（只读问题不加这句）。
  只用返回的链接，不自己拼路径。每个 SKU 每会话只开一次，保存后不重开（请用户刷新）；其余 SKU 列链接。
  页面留给用户操作，打开后不在页面里点击或保存。打开失败时给链接，不说已打开。
