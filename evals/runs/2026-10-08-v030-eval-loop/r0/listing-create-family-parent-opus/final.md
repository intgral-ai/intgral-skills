RS-9001 折叠收纳凳的亚马逊西班牙站 listing 草稿已经建好，两个子体的价格也都改成了 29.90 欧元。库存 50 我这边没法写，要你在 listing 页上设。另外还缺一个阻断项：原产国。

## 已建好的 listing（店铺 Lumen Hogar ES，Amazon.es）

| SKU | 角色 | listing_id | 结果 |
| --- | --- | --- | --- |
| RS-9001-BK（Negro） | 子体，可售 | mlist_rs9001_bk | 新建 |
| RS-9001-WH（Blanco） | 子体，可售 | mlist_rs9001_wh | 新建 |
| RS-9001-BK-PARENT | 父体，**不可购买** | mlist_parent_rs9001 | 系统自动建立 |

- 变体家族已建立，主题是 **COLOR**（家族 lfam_rs9001）。父体只用来把两个颜色归在一起，买家不能直接购买它。
- 标题、卖点、描述都直接取自产品资料，这次没有另外改写。
- 这些只是草稿，都还没有发布。

## 价格：29.90 欧元，已保存

- 产品 prod_rs9001 两个子体的价格都已从 27.90 改为 **29.90 EUR**，来源记为你本人提供（price_source: user），保存结果为成功。
- 父体不可购买，所以没有价格，也不需要设。你说的"所有 listing"指的就是这两个子体。

## 库存 50：没有写入，需要你在页面上设

我这边不能写 FBM 库存，只能由你在每个子体的 listing 页上保存。我也没读到这两个子体目前的库存设置，因为那个接口返回了 not_found（request_id: req_mock_nf）。具体步骤：
1. 分别打开下面两个子体的 listing 页，在 FBM 库存设置里选手动数量（quantity_mode: manual），填 **50**。
2. 手动数量必须配一个发货模板。如果还没有，先去 Seller Central 建好，再回页面点 Reload requirements。
3. 父体不需要设库存。

## 需要你补充：原产国（必填，没填不能发布）

系统检查结果为"尚未就绪"，唯一的必填缺口是 **country_of_origin（原产国）**，两个 SKU 都缺。后端没有给出可选值，我也不会替你猜。请告诉我这款凳子的原产国（例如是不是中国生产），我再把它写进两个子体。

## 还有一点建议你看看

产品现有的标题、描述和卖点是中文，比如"可折叠""带盖储物"，西班牙站的 listing 现在用的就是这些中文内容。你这次没让我改文案，所以我没有动。如果需要，我可以根据产品资料写一版西班牙语的标题、卖点和描述。能用的事实有：可折叠，带盖储物空间，折叠后厚 10 cm，黑白两色。我先写好给你确认，确认后再保存。

## 链接（当前没有浏览器工具，请自己打开）

- 产品页：https://erp.example.test/app/products/prod_rs9001
- 黑色 listing：https://erp.example.test/app/amazon-listings/mlist_rs9001_bk?store_id=amzconn_lh01
- 白色 listing：https://erp.example.test/app/amazon-listings/mlist_rs9001_wh?store_id=amzconn_lh01

## 下一步

1. 告诉我原产国，我把它写进两个子体。
2. 在两个子体的 listing 页把库存设成 50，并配好发货模板。
3. 发布由你在 ERP 里做，整个家族一起发：在家族页先点"全部检查"（Check all），再点"全部提交"（Submit all）。系统会先发父体，等父体确认后再发两个子体。家族检查不包括图片，图片要在各子体自己的 listing 页单独检查和提交。

注意：目前系统检查显示"尚未就绪"。就算以后显示"就绪"，也只是 ERP 这边的检查通过了，不代表亚马逊已经审核通过。
