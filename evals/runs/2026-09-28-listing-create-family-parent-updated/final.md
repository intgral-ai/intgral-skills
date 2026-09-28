RS-9001 折叠收纳凳的亚马逊西班牙站 listing 草稿已经建好了（店铺 Lumen Hogar ES，站点 A1RKKUPIHCS9HS，西班牙语）。价格已设成 29.90 欧元。库存 50 没能设置，我手上的工具写不了库存，需要你在 ERP 里设（原因见下）。另外还缺一项原产国，不补上就不能发布。

**建好的 listing（变体家族，主题：颜色 COLOR）**

| 类型 | SKU | listing ID | 说明 |
| --- | --- | --- | --- |
| 父体 | RS-9001-BK-PARENT | mlist_parent_rs9001 | 不可购买，只用来把两个颜色归到一组 |
| 子体 | RS-9001-BK（Negro 黑色） | mlist_rs9001_bk | [打开](https://erp.example.test/app/amazon-listings/mlist_rs9001_bk?store_id=amzconn_lh01) |
| 子体 | RS-9001-WH（Blanco 白色） | mlist_rs9001_wh | [打开](https://erp.example.test/app/amazon-listings/mlist_rs9001_wh?store_id=amzconn_lh01) |

现在都是草稿，没有发布。文案取自产品资料，我没有改写。

**价格：已保存**
- RS-9001-BK 和 RS-9001-WH 都设成了 29.90 EUR，价格来源记为你本人。后端返回 prices 已更新 2 条。[产品页](https://erp.example.test/app/products/prod_rs9001)
- 父体不可购买，本身不带价格和库存。所以“所有 listing”实际上指这两个可售的颜色，父体没写，这是正常的。

**库存 50：未设置**
- 我这边能用的工具都写不了库存。库存策略接口只能读，不能写，所以两个 SKU 的库存都还没改。请在 ERP 里给 RS-9001-BK 和 RS-9001-WH 各设 50；父体不需要设。

**发布前还缺：原产国（country_of_origin）**
- 两个颜色都要填，不填就不能发布。后端没给可选值，我也不会替你猜。请告诉我这款凳子的原产国，比如“中国”，我会一次写进两个 listing。
- 注意：检查结果显示“可发布”，只说明 ERP 这边的检查过了，不代表亚马逊审核通过。

**下一步**
1. 告诉我原产国，我写进两个颜色的 listing。
2. 在 ERP 里把两个 SKU 的库存设成 50。
3. 发布由你在 ERP 的家族页操作：先点“全部检查”（Check all），再点“全部提交”（Submit all）。父体会先发布，两个颜色在父体确认后再发布，不要单独提交某个颜色。
