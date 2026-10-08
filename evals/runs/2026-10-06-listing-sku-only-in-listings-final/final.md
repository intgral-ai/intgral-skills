CV-LAMP-07 的现状如下：

**产品目录里没有这个 SKU**（`medusa.get_product` 返回 not_found），但它在 Amazon 上有一条站点 listing：

| 项目 | 现状 |
| --- | --- |
| Listing | `mlist_cvlamp07_es`（店铺 Casa Verde ES，marketplace_id A1RKKUPIHCS9HS，即 Amazon ES） |
| 状态 | `live`（在售） |
| 配送方式 | `AMAZON_EU`（FBA） |
| 商品类型 | LAMP |
| 标题 | Lámpara de mesa de bambú |
| 对应目录产品 | 无（`product: null`） |
| 合规检查 | 未就绪（`ready: false`），缺必填项：`bullet_point`（五点描述）；没有无效项，也没有警告 |

我已在浏览器里打开这条 listing 的页面：https://erp.example.test/app/amazon-listings/mlist_cvlamp07_es

说明：
- 这条 listing 是从 Amazon 导入的，ERP 目录里还没有对应的产品。如果你想在目录里管理它，可以用 bootstrap 导入，从这条 listing 生成目录产品（先预览，再确认才会创建）。这一轮我没有执行导入。
- 缺 `bullet_point` 是 ERP 合规检查的结果，不代表 Amazon 上这条 listing 有问题。它现在仍是在售状态。

要我先帮你预览一下，把 CV-LAMP-07 导入到产品目录会是什么样吗？
