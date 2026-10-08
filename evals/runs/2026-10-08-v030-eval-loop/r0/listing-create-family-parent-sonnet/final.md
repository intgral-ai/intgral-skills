RS-9001 折叠收纳凳已在亚马逊西班牙站（店铺 Lumen Hogar ES，A1RKKUPIHCS9HS）建好草稿 listing，还不能发布：缺原产地，库存没设成。

**已建好的 listing（草稿，未发布）**
- 黑色 RS-9001-BK：mlist_rs9001_bk，https://erp.example.test/app/amazon-listings/mlist_rs9001_bk?store_id=amzconn_lh01
- 白色 RS-9001-WH：mlist_rs9001_wh，https://erp.example.test/app/amazon-listings/mlist_rs9001_wh?store_id=amzconn_lh01
- 父体（不可购买）：RS-9001-BK-PARENT（mlist_parent_rs9001），变体主题 COLOR。父体不放价格、库存、图片，所以价格只写在两个子体上。
- 产品页：https://erp.example.test/app/products/prod_rs9001

**价格**
- RS-9001-BK 和 RS-9001-WH 都已写成 29.90 EUR，来源按你的指示记为 price_source=user。后端返回写入成功（2 个价格已更新）。

**库存：没有设成，目前不能替你设**
- 我可用的工具里没有写库存的入口：产品和 listing 的写入只有价格、文案、属性、图片。FBM 的库存数量只能由你在 listing 页保存，我不写。
- 请在两个子体的 listing 页各把库存设成 50。FBM 需要配好发货模板；缺发货模板的话，先在 Seller Central 建好，再在页面上点 Reload requirements。
- 另外你没有说明配送方式是 FBA 还是 FBM，这一点也要你确认。

**还缺什么，所以现在不能发布**
- 后端报告 compliance.ready = false：两个 SKU 都缺必填项 country_of_origin（原产地）。我不会替你猜，请告诉我这款凳子的原产地，我再用 update_listing 写入。
- 品类按后端识别为 OTTOMAN。标题、卖点、描述、search terms 还没写。需要的话请提供材质、尺寸、承重等已确认的事实。

**下一步**
1. 告诉我原产地，以及要不要我继续写文案。
2. 你在两个子体 listing 页设置库存 50。
3. 发布由你在 ERP 里完成：先在家族页点 Check all，再点 Submit all。父体先发布，子体随后。图片要在各子体自己的 listing 页检查提交。

我没有浏览器工具，所以没有替你打开页面，上面是链接。
