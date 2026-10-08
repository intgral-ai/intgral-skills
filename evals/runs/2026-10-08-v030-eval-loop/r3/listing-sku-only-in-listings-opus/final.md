CV-LAMP-07 在产品目录里**没有对应产品**（`medusa.get_product` 返回 not_found），但在 Amazon listing 里找到了一条：

**Amazon ES listing `mlist_cvlamp07_es`**
- 店铺：Casa Verde ES（marketplace A1RKKUPIHCS9HS）
- listing 状态：**live（在售）**
- 配送渠道：AMAZON_EU（亚马逊配送）
- 商品类型：LAMP
- 标题：Lámpara de mesa de bambú
- 合规检查：**未就绪**，缺少必填项 `bullet_point`（五点描述）；无无效项、无警告

我已在浏览器里打开这条 listing 的页面：https://erp.example.test/app/amazon-listings/mlist_cvlamp07_es

说明：这条 listing 是从 Amazon 导入的，目录里暂时没有对应的产品（`product: null`）。如果需要，可以用 bootstrap 导入把这条 listing 建成目录产品（先预览，再确认执行）——这一轮我没有执行，也没有修改任何内容。

要我先为 CV-LAMP-07 做一次 bootstrap 导入预览吗？
