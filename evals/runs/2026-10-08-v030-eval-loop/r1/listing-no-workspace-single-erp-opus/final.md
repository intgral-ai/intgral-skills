**LH-TBL-02 现状（ERP 读取结果）**

- 产品目录：「LIN HOME Juego de 2 mesas nido」（prod_lh02），状态 `published`，变体 var_lh02。
  产品页：https://erp.example.test/app/products/prod_lh02
- 西班牙站 listing：`mlist_lh02_es`（amazon.es），ASIN B0FAKE0T02，listing_status `active`（在售），配送方式 FBM，content_version 4。
  该 SKU 在 ERP 中只有这一条站点 listing。

**西班牙站草稿图片复核：还没有复核。**

- `marketplace.get_image_review` 返回 status = `unreviewed`，latest_review = 无（从未记录过复核决定），对应 content_version 4。
- 快照包含 3 个槽位：main、pt01、pt02，provenance 都是 `unknown`，也就是图片字节未经 ERP 校验（这不说明是原图还是生成图）。
- 这次返回里没有给出 scope、哈希和 limitations 字段，以上就是全部可见信息；我也没有逐张查看图片内容。

我已在浏览器里打开这条 listing 的页面：https://erp.example.test/app/amazon-listings/mlist_lh02_es
复核决定需要由你（已登录的 ERP 用户）在该页面保存；在聊天里说“通过”不会被记录为复核结果，我也不能替你保存。

补充：复核结果只针对这份草稿图片快照，不等于 Amazon 审核通过。这条 listing 已经在售，之后如果要改图，改动会和其他修改一起放进 listing 页的“Check with Amazon”计划，由你在最终确认时一并授权。新计划不需要另外先做这份草稿图片复核。
