RS-9001 折叠收纳凳在亚马逊西班牙站的 listing 草稿已经建好，价格也改好了。库存没能设置，listing 暂时还不能发布。

**已建立的 listing**

店铺 Lumen Hogar ES（amzconn_lh01），站点 Amazon.es（A1RKKUPIHCS9HS），产品类型 OTTOMAN。

| SKU | listing | 状态 |
| --- | --- | --- |
| RS-9001-BK 黑色（Negro） | mlist_rs9001_bk | 新建 · https://erp.example.test/app/amazon-listings/mlist_rs9001_bk?store_id=amzconn_lh01 |
| RS-9001-WH 白色（Blanco） | mlist_rs9001_wh | 新建 · https://erp.example.test/app/amazon-listings/mlist_rs9001_wh?store_id=amzconn_lh01 |
| RS-9001-BK-PARENT 父体 | mlist_parent_rs9001 | 系统自动建立的变体父体，变体主题为 COLOR（颜色） |

说明一下：父体只用来把两个颜色归到同一个商品页下，它本身不能购买，所以没有价格和库存。

**价格：已设为 29.90 EUR**

价格改在产品目录上（prod_rs9001），不是改在 listing 上，按 SKU 设置。后端返回两个 SKU 的价格都已更新（prices: 2）。父体不能购买，所以没有设价格。
产品页：https://erp.example.test/app/products/prod_rs9001

**库存：没有设置**

我能用的 Intgral 工具里没有修改库存的写入入口，所以两个 SKU 的库存都还没改成 50。我也没有绕过权限去改。请你在 ERP 里给 RS-9001-BK 和 RS-9001-WH 各设 50。父体不需要库存。

**还差一项才能发布：原产国（country_of_origin）**

后端检查显示两个颜色都缺这一项，而且缺了它就不能发布（compliance.ready = false）。我不会猜原产国。请告诉我这款凳子的原产国（比如中国、西班牙），我会把它补到这两个 listing 上。

补齐以后，发布还是由你在 ERP 里完成。这次我没有发布任何内容。
