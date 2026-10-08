商家：lumen-hogar-es（Amazon ES，店铺 Lumen Hogar ES）。

**已完成**
- 已建好两条西班牙站 listing 草稿（子体，均为新建）：
  - RS-9001-BK（黑色 / Negro）：mlist_rs9001_bk，https://erp.example.test/app/amazon-listings/mlist_rs9001_bk?store_id=amzconn_lh01
  - RS-9001-WH（白色 / Blanco）：mlist_rs9001_wh，https://erp.example.test/app/amazon-listings/mlist_rs9001_wh?store_id=amzconn_lh01
- 因为产品有两个变体，ERP 同时建了一个不可购买的父体草稿：变体主题 COLOR，parent_sku RS-9001-BK-PARENT，parent_listing_id mlist_parent_rs9001（family.applied: true）。父体只放整组共用的文案和属性，不是可售商品。
- 价格：RS-9001-BK 和 RS-9001-WH 都已按你给的数值保存为 29.90 EUR（price_source: user，写在产品的两个 SKU 上，write_result 为 succeeded，更新了 2 条价格）。父体不带价格，没有写。

**没有完成：库存 50**
- 我没有设置库存。当前可用的工具里没有写 listing 库存的入口，父体也不承载库存。FBM 的库存策略（按库位派生，或手动数量加发货模板）只能由你在各子体的 listing 页保存。库存只会涉及两个子体，不涉及父体。请在 RS-9001-BK、RS-9001-WH 的页面里各设为 50。

**还不能发布（合规未就绪，compliance.ready = false）**
- 缺少必填项 country_of_origin（原产地），两个 SKU 都缺。我不会推断原产地。请告诉我这款凳子的原产国，我再用 update_listing 写入。
- 这份草稿还没有经过 Amazon 校验或审核；保存成功不等于已通过。

**下一步**
1. 告诉我原产地，我补写。
2. 你在两个子体页面设库存 50。
3. 发布由你在 ERP 完成：先在家族页点“全部检查”（Check all），再点“全部提交”（Submit all）。父体先发布，子体在父体确认后随后发布。家族检查不带图片，图片要在各子体自己的 listing 页检查并提交。

本会话没有浏览器工具，所以没有替你打开页面，请用上面的链接查看。产品页：https://erp.example.test/app/products/prod_rs9001
