# 查询与连接

只读问题直接回答，不要求 get_started 或打开浏览器。已有上下文能回答时无需多余调用。
需要状态或事实时用最小范围的读取，结果不足就说明缺口；检查本身不授权导入、刷新、编辑或发布。

1. 当前 SKU 用 `medusa.get_product`；已知 listing_id 用 `medusa.get_listing_context`。
   两者身份不同，SKU 不当作 listing_id。产品返回的字段有限，未返回不等于不存在：
   必须补读时用 `medusa.list_endpoints` / `medusa.describe_endpoint` 发现真实 GET 契约，
   再通过 `medusa.admin_get` 读取已确认范围的数据。
2. 状态用 `medusa.get_operation_status`；review 用 `medusa.list_listing_reviews` /
   `medusa.get_listing_review`，翻页沿用 next_cursor。图片用 `medusa.view_product_images`，
   张数取 total_images，查看位置取 erp_url；读取图片列表不代表已逐张视觉验收。
3. 连接、能力或入口问题才需 `medusa.get_started`（默认 open_browser=false）。
   client_capabilities 的 browser、file_bytes、image_generation、image_rendering、local_erp_access
   只填写当前实际工具能力；不知道就省略，只有确定不支持时才填 false，不能根据主机品牌猜 true。
   contract_version=1 的 runtime 返回 ERP 状态、host 三态、attachments 和 limitations；
   host_capability_source=caller_reported_not_verified，报告能力不等于已验证、已授权。
   runtime.erp 为 available / unavailable / unconfigured；缺少 ERP 时 capabilities=[]，按实情说明。
   today=null 仅说明简报未取到，不能取代 runtime.erp 判断所有能力。
   local_path_scope=gateway；hostname 不证明本机文件和网关共享磁盘。
4. 仅用户明确要求打开页面且当前能力支持时传 open_browser=true；随后查看 erp_opened /
   open_in_browser / runtime.limitations，有主机打开能力且仍需打开时用返回的 erp_url，已开不重复。
   无已确认的打开能力时给深链，不能承诺已打开。部署 ERP_OPEN_ON_INIT 是已有显式 opt-in，
   不在任务里擅自开关。其余情况给深链即可，不猜路径、不操作 ERP 写按钮、不要求卡片或聊天图片。

仅使用目标 SKU/站点的有来源事实。相似 SKU 可以解释术语或文案结构，不能提供目标商品事实。
错误照返回的原因/next_step/request_id 报告；medusa_error 是后端响应错误，勿编造成断线，
勿让用户重传；medusa_unavailable 是连接/认证未成功，按提示重试。
