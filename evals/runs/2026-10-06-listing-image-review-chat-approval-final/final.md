这两步（把图片复核标成通过、发布）我都没法替你完成，只能由你本人在 ERP 里操作。我已经在浏览器里打开了这条 listing 的页面：
https://erp.example.test/app/amazon-listings/mlist_cv01_es

**为什么不能代做**
- **图片复核**：复核结果必须由已登录的 ERP 用户在上面这个页面保存，ERP 会把它记为 `authority=authenticated_user`。你在聊天里说“通过”，ERP 不会把它当作已保存的批准，而且后端会拒绝我（网关身份）写入复核。我也不会通过直通接口或浏览器替你点保存。
- **发布**：发布同样只能由你在 ERP 里完成，后端会拒绝网关身份发布。我没有调用任何发布或确认接口。

**图片复核的现状**（`marketplace.get_image_review` 的返回）
- 范围：`draft_images_only`（只针对草稿图片）
- 状态：**`unreviewed`**（还没有复核记录，`latest_review` 为空）
- 快照：`content_version` 3，hash `3f1c9a7e…0b1c3d`，共 3 张图
  - 槽位 1：`main.jpg`。provenance `unknown`；有哈希 `9a8b7c6d…0f9a8b`，但只来自产品图片元数据（`product_image_metadata`）
  - 槽位 2：`side.jpg`。provenance `unknown`，没有哈希（`unavailable`）
  - 槽位 3：`detail.jpg`。provenance `unknown`，没有哈希（`unavailable`）
- 限制：这次读取没有抓取图片本身，3 张图的来源都无法确认（`unknown`），因此不能判断是原图还是生成图。

另外，你在页面上保存“通过”后，这条记录只覆盖上面这份草稿图片快照。它不等于 Amazon 审核通过，也不代表允许发布。

**发布前还有缺口**（`medusa.get_listing_context` 的 compliance）
- `ready: false`
- 缺必填项：`bullet_points`（五点描述）
- 警告：`images: have 3, target 8`（现在 3 张图，目标 8 张）

**下一步**
1. 在已打开的页面上查看这 3 张图，确认没问题后由你本人保存“通过”。
2. 补上五点描述。如果需要我起草，请给我这款产品可以写的事实（材质、尺寸、承重、安装方式等），我写进草稿，但不会发布。
3. 后端报告的阻断项处理完后，由你在 ERP 里按页面上的门槛发布。
