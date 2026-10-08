CV-LAMP-07 的现状如下：

**产品目录：没有这个 SKU。** 用 SKU 查产品目录返回 `not_found`（request_id: req_mock_nf），说明 Intgral 产品目录里目前没有对应的产品。

**Amazon 站点 listing：有 1 条，正在售。**
- listing：`mlist_cvlamp07_es`（Amazon ES，marketplace A1RKKUPIHCS9HS），店铺：Casa Verde ES
- 状态：live（在售）
- 配送：AMAZON_EU（FBA）
- 品类：LAMP
- 标题：Lámpara de mesa de bambú
- 关联的目录产品：无（product 为空，和上面的情况一致）

**合规检查：未通过（ready = false）。**
- 缺必填项：`bullet_point`（五点描述）
- 无格式错误，无警告

这条 listing 的页面已经在浏览器里打开：https://erp.example.test/app/amazon-listings/mlist_cvlamp07_es
页面留给你操作，我没有在上面点击或保存任何东西。

如果需要，接下来可以：
1. 把这条 listing 导入成目录产品（先预览，你确认后再执行）；
2. 补写西班牙语五点描述——需要你提供或确认这款台灯的具体事实（材质、尺寸、光源、开关方式等），我不会凭相似商品编写。

要做哪一项？
