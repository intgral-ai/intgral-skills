# 图片处理

看图、制作候选图、保存图片是不同任务。只问张数或查看时，用 `medusa.view_product_images`
的 total_images 和 erp_url 回答；页面列出的图片不代表主机已查看原图，也不代表图片已获批准。

需要已有 listing 的人工图片复核状态时，显式调用只读 `marketplace.get_image_review`。
scope=draft_images_only；保留 unreviewed / approved / rejected / stale 原状态及 snapshot、
latest_review 和 limitations。stale 不能沿用旧 approved；unknown 来源或 null 字节哈希仍是未知，
不能根据 URL 或看过图片就补填 provenance/content_sha256。此读取不抓取图片字节。
hash_evidence=product_image_metadata 是元数据提供的哈希，unavailable 表示无证据；
即使哈希非空，也不证明当前外部图片字节已经验证或不可变，原图/生成图来源仍为 unknown。
复核决定由已认证的人类 ERP 用户在 erp_url 页面保存，authority=authenticated_user；
聊天确认不等于已持久化的 ERP 人工批准，网关身份不能代写决定。
approved 仅涉及指定草稿图片快照，不构成 Amazon 发布许可；不调用 publish/confirmations。

1. 数量、槽位、像素/格式等要求从当前 inputSchema、questionnaire 的 have / target、
   compliance 与后端产品类型要求读取。不要把显示数量当总数，也不在本手册固定图片数量。
   如果这些约束未返回或相互冲突，列出未知项交给后端/人确认，不能凭经验宣布合规。
2. 用户已要求补图/改图、主机具备生成能力、且适用图片政策明确时，才制作对应候选。
   使用当前 SKU 的已确认事实与原图：共用产品身份卡，每次传同一产品参考图，
   每张只处理一个视图并输出独立文件，不拼贴、不靠重复字节凑张数。
   没有可信参考图时，不用纯文字捏造商品外观或包装；先请求依据或保留缺口。
   client_capabilities.image_generation / image_rendering 只报告实际工具；runtime.host 中未知
   不当作可用。主机没有生成/看图能力就报告对应限制，不假定某个品牌主机或指定模型一定可用。
3. 未批准的生成图、未知主图规则、缺少人工验收条件都按后端/人的政策处理。
   不擅自决定生成图可用作正式主图，不因缺图自动替换已有图片。
   模型、分辨率、白底/构图要求应来自已确认任务与后端政策；不把候选生成说成已通过校验。
4. 已授权保存产品图片用 `medusa.update_product`；修改站点图片用
   `medusa.update_listing`，注意产品改图可能影响关联 ERP-origin listings。
   本地路径仅在网关确认可读且位于允许目录时传入；不根据 localhost/域名推断共享文件系统。
   支持时可传 data_base64 或可下载 URL；被拒绝就按错误提示处理，不绕过目录边界。
   移除旧图片只在用户明确要求且后端允许时执行，不为满足数量自行删图。
5. 回看保存结果与实际图片。能视觉检查才报告颜色、形状、比例与已确认要求是否一致；
   只能取列表时明确尚未视觉验收。批量逐 SKU 报成功/失败与剩余缺口，不声称全部已合规。
   write_result 的 completed_image_indexes / pending_image_indexes / unknown_image_indexes
   按去重归账后仍指向原始输入的零基索引，不能用去重后的位置重新编号。
   completed_image_indexes 仅表示批次已确认，是否存储/拒绝以 image_reports 为准。
   失败也可能留下前面批次：next_action=retry_pending 时只补确定未写入的部分；
   read_state_before_retry 时先读当前状态，不自动重试未知批次。错误中的库存/合规报告
   只是最后确认快照。详细动作按[复核与交接](review.md)。
