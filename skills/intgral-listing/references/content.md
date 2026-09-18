# 文案与 listing

先确定“给建议”还是“写入”，再确认对象与字段。只修改用户请求的字段；
只改标题不顺便重写价格、品牌、图片或法规声明。
有来源的前后对照示例（标题、卖点、本地化、冲突）见[文案示例](examples/copy.md)。

| 对象 | 写入入口 |
| --- | --- |
| 产品目录字段、价格、变体、产品图片 | `medusa.update_product` |
| 从产品建立站点 listing | `medusa.create_listing` |
| 站点 listing 文案、期望图片或属性 | `medusa.update_listing` |

1. 从 `medusa.get_product` / `medusa.get_listing_context` 读取目标实体。两者都是裁剪视图：
   写文案前按已发现的 GET 契约用 `medusa.admin_get` 补读产品的 description、profile 和 variants
   （材质、尺寸、重量、使用场景通常只在这里），否则文案会缺事实或用泛泛之词填空。
   仅采用该 SKU/站点的可追溯事实；兄弟 SKU、同品类、历史范例只可参考语言和结构。
   即使产品共享，尺寸/颜色仍需按当前变体核实。事实冲突一次列清，不借其他 SKU 填空。
2. 写之前读 tools/list 的 inputSchema；只查本次对象和字段所需的约束，产品标题单字段编辑不要求站点品类查验。
   需要扩展契约时用 `medusa.list_endpoints` /
   `medusa.describe_endpoint` 发现当前请求 schema。品类要求从已确认 marketplace/product_type
   的后端定义取得，按已发现的 GET 契约用 `medusa.admin_get` 读取；结合 questionnaire /
   compliance 的 options、长度/数量限制、blocking 与缺口。
   卖点数量与每条长度服从当前后端上限，不使用固定条数公式；标题、描述与 search terms 同理。
   限值不可用时保留缺口，只交付有依据的未校验草稿，不用模板冒充平台规范。
3. 品牌、站点、语言/货币取当前 SKU 来源和用户选择。已有后端试点默认值只在已确认范围内使用，
   尽可能显式传当前工具支持的站点/品牌参数，避免遗漏参数触发不适用的默认值。
   已配置品牌写法时，从[私有工作区](private-workspace.md)读取当前商家的规则；写法不提供商品事实。
   未实现通用品牌/站点设置接口；这里是任务参数指导，不是保存配置的功能。
4. 内容包只覆盖请求范围：标题、事实支持的卖点、描述、search terms。
   不编材质、尺寸、承重、包装、兼容性、认证或保修；文案不足可少写并标缺口。
   使用场景、适用房间、效果形容只用描述或用户确认过的事实，不加通用填充。
   用户在请求里顺带写的数值或材质不等于已确认事实：与 ERP 冲突时一次列清；
   无产品依据时在写入前指出并请用户确认来源，确认后才进文案，不当作“无冲突”直接写。
   本地化不是翻译：品牌名保持原写法，单位公制，不把承诺、认证、最高级和站点 compliance
   点名的促销词带进目标语言；每个站点的限制和品类字段重新读取。
   法规/安全声明与原产地只采用用户明确确认的事实，不推断原产地、危险品、电池、认证、保修或 EAN；
   枚举候选来自当前后端 options。`source: agent` 只描述 AI 撰写的文案，不能把推测变成商品事实。
   schema 属性没有专用字段时，按 schema 放入 update_listing 的 attributes.extra。
5. 有产品、站点和当前必填输入时，才能 create_listing；不把产品页上的保存误报成 listing 已建立。
   更新后读返回的 compliance，并按[复核与交接](review.md)处理。
   汇报依据 changed / updated 与实际保存结果；即使 isError:true，也检查顶层 write_result：
   copy / attributes 或产品 patch / batch 步骤可能只完成一部分，不能重放已完成步骤。
   next_action=read_state_before_retry 时先读当前状态，确认后才决定剩余写入；不假定回滚。
   产品图片变更可能按后端同步规则影响关联的
   ERP-origin listings；写前说明该影响，不能承诺产品改图永远只改产品。
