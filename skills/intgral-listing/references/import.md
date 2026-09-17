# 产品导入

本流程用于用户要求导入或建立产品草稿。只检查表格时停在 dry_run；只问问题时不建草稿。
产品目录与站点 listing 分两段，产品导入完成不表示已有站点 listing。

1. 按 SKU 用 `medusa.get_product` 核对既有产品；同 SKU 不建重。表格优先交原文件给
   `medusa.import_products`，保留原始价格、空值和列映射：
   - 结合 runtime.attachments / limitations；主机确有 file_bytes 能力时优先用 file_base64 传原始 xlsx/xls 字节（解码后最多 20 MB），不能假装读到了附件字节；或用 ERP 能访问并下载的 http(s) file_url。
   - runtime.local_path_scope=gateway：file_path 指网关文件系统，不是客户端主机。仅在共享本地部署、已确认网关能读取该文件且路径位于 LOCAL_IMAGE_ROOTS 允许目录时使用；仍须通过真实路径、文件类型和 20 MB 限制。
   - 远程 file_path 被拒绝后，改用实际附件字节或 ERP 可下载链接；不能把客户端文件移入 /tmp 就当成远程网关可读，也不要要求逐行手抄表格。若当前主机既不能读字节也没有可下载链接，说明缺少的传输能力，请提供可读取附件或链接。
   - rows 仅作已有结构化输入兜底；不得从 URL/hostname 推测文件能力。预览、错误和日志不得回显附件 base64。
   PDF/图片/句子由主机提取，按字段记来源；无法证实的材料、尺寸和价格不补猜值。
2. 先 dry_run=true，读 mapping、questionnaire、逐 SKU 结果和后端限值。
   用返回的 blocking 判断本次建草稿条件；不把每个内容/图片缺口都当成阻断。
   未识别必填列或缺业务事实，一次合并询问；若必需数据已齐，执行已授权的 dry_run=false，
   不重复要求确认已识别的映射。只有检查授权时，预览后就停。
3. answers 按 field/sku 填真实来源。price_source 为 user/sheet；价格不能 source: agent。
   法规、安全、原产地、危险品、电池、认证、EAN、保修不代答。可基于当前 SKU 事实撰写文案，
   source: agent 表示文案作者，不能替代商品事实来源。
4. 单个产品用 `medusa.create_product`，其输入仍须满足当前 schema；后端拒绝就保留缺口。
   既有 SKU 返回 product_id/created:false/status 时使用它，不以重试建立副本。
   同款色/尺寸用 `medusa.update_product` 的 add_variants；确认实际同款关系，
   不只因标题相同就推断商品事实相同。
5. 批量结果按 SKU 列 created/updated/unchanged/refused 与实际 product_id、erp_url、缺口。
   部分完成只报告实际成功项；不要把一次工具成功包装成全批成功。
   用户还要求站点 listing 时，继续[文案与 listing](content.md)；
   图片缺口需要处理时读[图片处理](images.md)。
