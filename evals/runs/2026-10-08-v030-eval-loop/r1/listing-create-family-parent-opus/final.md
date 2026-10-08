RS-9001 折叠收纳凳已在亚马逊西班牙站（店铺 Lumen Hogar ES `amzconn_lh01`，站点 A1RKKUPIHCS9HS，es_ES）建好 listing 草稿。价格已改好，库存需要你在页面上设置，详情如下。（商家：lumen-hogar-es，品牌按你的规则写作 “Lumen Hogar”）

## 1. 已建好的 listing

| SKU | 颜色 | listing_id | 结果 | 链接 |
| --- | --- | --- | --- | --- |
| RS-9001-BK | Negro（黑） | mlist_rs9001_bk | 新建（created: true） | https://erp.example.test/app/amazon-listings/mlist_rs9001_bk?store_id=amzconn_lh01 |
| RS-9001-WH | Blanco（白） | mlist_rs9001_wh | 新建（created: true） | https://erp.example.test/app/amazon-listings/mlist_rs9001_wh?store_id=amzconn_lh01 |

**变体家族（父体）**：后端同时建了一个父体草稿，并保存了颜色变体主题。
- 主题：COLOR
- 父体 SKU：`RS-9001-BK-PARENT`
- 父体 listing_id：`mlist_parent_rs9001`

父体**不可购买**，只放两种颜色共用的文案和属性，不放价格、库存、图片或 EAN。

文案和属性默认取自产品资料，本次没有改写。我这里没有浏览器工具，所以页面没有打开，链接在上表里。产品页：https://erp.example.test/app/products/prod_rs9001

## 2. 价格：已保存 29.90 €（只写了两个子体）

价格写在产品的两个可售 SKU 上，来源标为用户提供（`price_source: user`）。
- RS-9001-BK：27.90 → **29.90 EUR**
- RS-9001-WH：27.90 → **29.90 EUR**

保存结果：成功（succeeded），更新了 2 个价格。你说的“所有 listing”只包括这两个子体，父体没有价格，所以没有写父体。

## 3. 库存 50：没有写入，需要你在页面上设置

库存（FBM 库存策略，可以选按库位计算，也可以选手动数量）只能由你在每个子体的 listing 页保存，我这边不能写，所以**现在还没有设置**。另外，读取当前库存策略的接口在这个部署里没有开放，现状我无法确认。

操作步骤：
1. 分别打开上面两个子体的链接。
2. 库存方式选“手动数量”（`quantity_mode: manual`），数量填 50。
3. 选好发货模板后保存。如果还没有发货模板，先在 Seller Central 建好，再回到页面点 Reload requirements。

父体不放库存，不用设置。

## 4. 还缺一项必填信息（会阻止发布）

两个子体都还缺**原产国（country_of_origin）**，这一项是必填的，缺了就不能发布（compliance.ready = false）。产品资料里没有这项信息，我不会替你猜。请告诉我 RS-9001-BK 和 RS-9001-WH 的原产国（例如“中国”），我再写进这两个子体。

## 5. 发布方式（由你在 ERP 里操作）

现在只是草稿，没有发布。这个变体家族需要整组发布：
1. 在 ERP 的家族页先点“全部检查”（Check all），再点“全部提交”（Submit all）。
2. 父体先发布，等亚马逊确认后，两个子体随后发布。
3. 家族检查不带图片。图片要在各子体自己的 listing 页检查和提交。

## 下一步

1. 回复原产国，我补到两个子体上。
2. 在两个子体的 listing 页把库存设成手动 50，并选好发货模板。
3. 在家族页依次点“全部检查”和“全部提交”。
