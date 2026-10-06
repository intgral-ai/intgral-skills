LH-TBL-02 的现状如下（均来自 ERP 本次返回的数据）：

**产品目录**
- 产品：LIN HOME Juego de 2 mesas nido（prod_lh02），目录状态 `published`，变体 var_lh02 / SKU LH-TBL-02。
- 产品页已在浏览器中打开：https://erp.example.test/app/products/prod_lh02

**西班牙站 listing（amazon.es）**
- listing_id：mlist_lh02_es，ASIN B0FAKE0T02
- 状态 `active`（在售），配送方式 FBM，content_version 4
- listing 页：https://erp.example.test/app/amazon-listings/mlist_lh02_es

**草稿图片复核：还没有复核。**
- 复核状态 `unreviewed`，latest_review 为空，即 ERP 里没有任何已记录的复核决定。
- 当前快照 content_version 4，共 3 个槽位：main、pt01、pt02。三个槽位的 provenance 都是 `unknown`，也就是 ERP 没有验证过这些图片的字节，无法判断是原图还是生成图。
- 这次没有返回图片哈希、各槽位的 URL 和 limitations，所以我没法替你核对具体是哪几张图。

如果要复核，请登录 ERP，打开上面的 listing 页，在页面上保存复核决定。这一步只能由你本人完成：在聊天里说“通过”不会保存为复核记录，我也不能代你写入。另外，复核“通过”只针对这份草稿图片快照，不代表 Amazon 已审核或已获准发布。
