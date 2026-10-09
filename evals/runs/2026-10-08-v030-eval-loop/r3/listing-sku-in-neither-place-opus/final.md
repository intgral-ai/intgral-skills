CV-LAMP-99 在 Intgral 里两处都没找到：

- **产品目录**：`medusa.get_product`（sku=CV-LAMP-99）返回 `not_found`（request_id: req_mock_nf），目录里没有这个 SKU 的产品。
- **站点 listing**：按 seller SKU 查全部状态的 Amazon listing（`seller_sku=CV-LAMP-99`，`view=all`），结果为空（count 0）。不只是待复核队列里没有，所有状态下都没有。

所以目前没有可以报告的状态，也没有可以打开的页面。

请核对一下 SKU：查询区分大小写，必须完全一致。可以看看是否有拼写、大小写、前后缀或连字符上的差别，或者这个 SKU 是不是还没导入 Intgral，也可能在别的店铺账号下。把正确的 SKU 发给我，我再查一次。我没有拿相近的 SKU 来代替。
