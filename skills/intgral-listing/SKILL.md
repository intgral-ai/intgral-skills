---
name: intgral-listing
description: Query Intgral products and listings, import product files, edit catalog or marketplace drafts, manage images, and recover partial writes through connected Intgral MCP tools.
license: MIT
metadata:
  version: "0.1.0"
---

# Intgral 上架工作流

先识别用户要完成的任务，再读对应的小流程；在已授权范围内一轮完成能做的工作。
只读问题直接回答，不要求开场简报或浏览器。建草稿不等于发布：不发布、不删除业务实体，
也不借助直通工具或浏览器绕过权限。发布由用户在 ERP 完成。

此 Skill 由客户端安装并读取。以下链接指向随包安装的本地文件；按链接所在文件的目录解析。
开始工作时读取已配置的[私有工作区](references/private-workspace.md)，仅在缺少必要设置时询问。

## 按任务进入

| 用户任务 | 先读 | 结果 |
| --- | --- | --- |
| 查 SKU、状态、现有事实，解释报错 | [查询与连接](references/inspect.md) | 有来源的答案和必要深链 |
| 表格/附件导入，或从资料建产品草稿 | [产品导入](references/import.md) | 映射、逐 SKU 结果和待补事实 |
| 改产品字段，创建或编辑站点 listing | [文案与 listing](references/content.md) | 请求字段的保存结果和合规缺口 |
| 看图、补图或调整图片 | [图片处理](references/images.md) | 实际张数、保存结果和验收限制 |
| 核对完整度、追踪操作、准备交接 | [复核与交接](references/review.md) | 后端报告、未决问题和下一步 |

## 共用边界

- **事实与来源。** 仅使用当前 SKU 的可追溯事实。先查当前 SKU 的产品/站点数据，再结合用户资料，
  按字段记录来源；同系列、相似商品或示例只可参考写法，不能提供材质、尺寸、颜色、配件或承诺。
  冲突与缺失一次列清，其余已授权工作继续。法规/安全声明只能使用用户明确确认的事实，
  不推断原产地、危险品、电池、认证、保修或 EAN。价格来自用户/原表，写价须 `price_source: user | sheet`，
  不填估价；`source: agent` 只描述 AI 撰写的文案，不能把推测变成商品事实。
- **限制由后端提供。** 工具 inputSchema、端点请求 schema、questionnaire 和 compliance 共同说明当前约束。
  品类/枚举、数量/长度上限、图片目标及阻断项不在手册固定；先按已确认站点/品类读取，
  冲突或缺失就报告，不能以模板代替。schema 未知、图片标准未决时交给后端/人决策，不宣称通过。
- **能力先确认。** 需要连接、入口或能力信息时用 `medusa.get_started`，结合 tools/list 和返回结果。
  仅把当前实际可调用的主机工具填入 client_capabilities，未知项省略；按 runtime.erp 区分
  available / unavailable / unconfigured。runtime.host 的三态是调用方报告，未经网关验证。
  open_browser 默认 false，仅用户明确要求打开页面才传 true；不自动修改部署的 ERP_OPEN_ON_INIT 设置。
  工具被列出不等于后端可用或已授权；URL/hostname 不表示功能、读写权限或文件可达性。
  能力未声明时说明未知，按工具实际契约处理，不试探写入。现有安装 skills 保留；
  仅当用户请求涉及其专长时按需选择外部 skill，它不改变 Intgral 的事实、权限和发布边界。
- **写入对象分清。** 产品目录走 `medusa.update_product`；站点 listing 文案/属性走 `medusa.update_listing`。
  只修改用户请求的字段，专用工具优先，直通仅用于已发现且已授权的接口。
  用户只要求建议或检查时不落库；不为了只改标题而重写价格、图片和合规声明。
- **默认值有范围。** 品牌、市场、语言与货币来自当前 SKU 事实、用户选择及已确认的私有商家配置。
  显式传受支持的参数；本手册未实现通用品牌/站点设置接口，
  也不声称可以保存这些设置。已有部署配置只采用后端明确返回的值。
- **交付凭结果。** 报告只引用工具返回的 `changed / updated`、状态和 `erp_url`，不用浏览器操作 Medusa。
  更新工具即使 isError:true 也读 write_result：此前成功步骤保留，没有原子回滚；只按 next_action
  处理 pending/unknown。未知结果先读当前状态再决定，不能自动重放。错误中的报告是最后确认快照。
  不要求主机渲染 MCP 卡片或聊天图片；普通文本/表格和深链足够。写任务末尾说明剩余缺口和下一步，
  查询任务回答问题即可。错误保留原因、next_step 和 request_id：`medusa_error` 不等于断线，
  不要让用户重传或拿同样输入盲重试；`medusa_unavailable` 表示未能连接/认证，可按提示稍后重试。
