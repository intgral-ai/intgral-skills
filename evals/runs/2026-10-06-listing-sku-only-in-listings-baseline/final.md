CV-LAMP-07 现在的情况如下：

**产品目录里没有它。** 按 SKU 查产品目录返回 `not_found`（request_id: req_mock_nf），也就是 Intgral 产品目录里还没有对应的产品。

**但它有一条 Amazon 站点 listing，而且正在售：**

| 项目 | 当前值 |
| --- | --- |
| Listing ID | mlist_cvlamp07_es |
| 店铺 | Casa Verde ES（amzconn_cv01） |
| 站点 | Amazon ES（A1RKKUPIHCS9HS） |
| Listing 状态 | live（在售） |
| 配送方式 | AMAZON_EU（FBA） |
| 商品类型 | LAMP |
| 标题 | Lámpara de mesa de bambú |
| 关联的目录产品 | 无（product 为 null） |

**合规检查未通过（compliance.ready = false）：** 缺少必填字段 `bullet_point`（五点描述）；没有无效字段，也没有警告。

我已在浏览器里打开了这条 listing 的页面，查看和后续操作都在这里：
https://erp.example.test/app/amazon-listings/mlist_cvlamp07_es

如果你需要，接下来可以做的两件事（都要你先点头，我这次没有做任何改动）：
1. 把这条 listing 导入为目录产品（先预览，你确认后再执行），这样产品目录里就有 CV-LAMP-07 了；
2. 为这条 listing 补写五点描述——需要你提供或确认这款台灯的具体事实（材质、尺寸、灯头/功率、配件等），我不会凭空填写。
