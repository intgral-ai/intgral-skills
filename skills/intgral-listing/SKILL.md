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
| 查 SKU、状态、现有事实，解释报错；连接或能力问题 | [查询与连接](references/inspect.md) | 有来源的答案和必要深链 |
| 表格/附件导入，或从资料建产品草稿 | [产品导入](references/import.md) | 映射、逐 SKU 结果和待补事实 |
| 改产品字段，创建或编辑站点 listing | [文案与 listing](references/content.md) | 请求字段的保存结果和合规缺口 |
| 看图、补图或调整图片 | [图片处理](references/images.md) | 实际张数、保存结果和验收限制 |
| 核对完整度、处理部分/未知写入、追踪操作、准备交接 | [复核与交接](references/review.md) | 后端报告、未决问题和下一步 |

只改一个字段（如仅改标题）也走[文案与 listing](references/content.md)：读目标实体，只写该字段，
不为此查品类或读无关数据。用户只说 SKU、未提站点或 listing 时，改的是产品目录；
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
  专用工具优先，直通仅用于已发现且已授权的接口。用户只要求建议或检查时不落库；只改标题就不重写价格、图片、品牌或合规声明。
- **交付凭结果。** 只引用工具返回的 `changed / updated`、状态和 `erp_url`。更新工具即使 isError:true
  也读顶层 write_result：已成功步骤保留，没有原子回滚；`retry_pending` 只重试 pending 步骤，
  `read_state_before_retry` 先读当前状态再决定，不自动重放。错误保留原因、next_step 和 request_id：
  `medusa_error` 不等于断线，不让用户重传或用同样输入盲重试；`medusa_unavailable` 可按提示稍后重试。
  写任务末尾说明剩余缺口和下一步，查询任务回答问题即可。
