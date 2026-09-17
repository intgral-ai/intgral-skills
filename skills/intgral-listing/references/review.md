# 复核与交接

1. 创建/编辑 listing 后读取工具返回的 compliance；已有 listing 用
   `medusa.get_listing_context` 检查。逐项区分 missing_required、invalid 与 warnings，
   按 SKU/字段把缺口一次列清，返回枚举选项时原样提供，不发明选项。
2. 有依据且在已授权字段范围内的文案错误可用 `medusa.update_listing` 修正；
   价格等业务事实、法规/安全声明或相互冲突的来源交给用户。schema.source 为 unknown/none、
   规则不可用或图片政策未定时，说明尚未验证，不能用推测值把缺口消掉。
3. compliance.ready 只表示当前后端报告的状态，不等于 Amazon 审核/图片批准/发布许可。
   未知 schema 是否阻断发布、生成图能否使用由后端政策与人决定，手册不改门槛。
   后端可能在读写时触发 schema 刷新，不把它保证成离线操作；用户限制禁止外部调用时，
   只有后端明确提供满足该限制的能力才继续相关路径，否则报告限制。
   不主动调用 Amazon 验证/刷新；真正需要时先确认用户已明确授权外部请求。
4. 已经启动的异步操作用 `medusa.get_operation_status` 或 `medusa.wait_for_operation`，
   读状态与 timed_out；超时不等于成功，不再提交一份重复操作。
5. 按 SKU 报告实际保存/未保存、changed/updated、错误与 erp_url，给一条可执行的下一步。
   工具失败保留原因和 request_id；medusa_error 不让用户重传，不用同样输入盲重试，
   medusa_unavailable 按提示稍后重试。只答查询时不附强制“去发布”的下一步。

不发布、不删除业务实体；不经由 admin 直通、token/确认接口或浏览器绕过。
发布始终由用户在 ERP 按后端有效门槛完成，不能以“用户已说可以”代替 ERP 发布路径。

## 草稿图片人工复核

需要图片复核状态时，显式调用只读 `marketplace.get_image_review`，传 listing_id；
get_listing_context 的关联复核不包含图片复核，也不隐式增加 HTTP 请求。
原样报告 scope=draft_images_only、status、snapshot（hash、content_version、槽位/URL）与
latest_review、limitations。unreviewed 表示未复核；approved / rejected 是已记录的决定；
stale 表示已记录的复核不再对应当前快照，即使 latest_review.decision 仍为 approved。
provenance=unknown 或 content_sha256=null 不代表原图/生成图或图片字节已验证；
同一外部 URL 的图片字节也可能变化，不自行补造来源或哈希。
hash_evidence=product_image_metadata 仅表示哈希来自产品图片元数据，unavailable 表示无证据；
非空哈希也不代表本次读取验证了图片字节或拥有不可变副本，原图/生成图来源仍为 unknown。

决定必须由已认证的人类 ERP 用户在返回的 erp_url 页面保存，记录 authority=authenticated_user；
聊天确认不等于已持久化的 ERP 人工批准，网关身份不能代写复核。
approved 只涉及该草稿图片快照，不是 Amazon 审核通过或发布许可；
不提供复核写工具，不调用 publish/confirmations，也不经直通或浏览器替用户保存决定。

## 部分写入与恢复

update_product / update_listing 的顶层 write_result 即使在 isError:true 时也必须读取，
同时保留原 code/message/request IDs 与 next_step。status 可为 succeeded、partial_success、
failed、unknown、noop；按 completed_steps / pending_steps / unknown_steps 和 next_action 决定后续。
listing 步骤是 copy / attributes；产品步骤是 patch 或 batch_1、batch_2 等。

| next_action | 操作 |
| --- | --- |
| `none` | 报告已确认结果或 noop，无需重试 |
| `retry_pending` | 已确定未写入的拒绝可修正输入；只重试 pending_steps，保留 completed_steps |
| `read_state_before_retry` | 先读当前状态，核对后才决定剩余写入；不自动重放原请求 |

5xx、缺失/无效响应归为 unknown；这不是“没有写入”。通过当前产品/listing 读取核对状态，
仍无法判断时把不确定项交给用户/后端，不凭重试赌幂等。之前成功的步骤保留，不能宣称原子回滚。
错误响应中的 updated、image_reports、variant IDs、content/attributes 是已知结果，
inventory/compliance 是最后确认快照，不保证当前状态。返回 content_version 时保留用于核对，
未返回不自造版本。本契约无持久恢复存储，不能承诺断会话后自动续传。
