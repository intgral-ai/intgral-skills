CV-LAMP-99 在 Intgral 里两处都没找到：

- **产品目录**：`medusa.get_product`（sku = CV-LAMP-99）返回 `not_found`（request_id: req_mock_nf），目录里没有这个 SKU 的产品。
- **站点 listing**：按 seller SKU 精确查询全部 listing（`seller_sku=CV-LAMP-99`、`view=all`，不只看待复核队列），结果是 0 条。

所以目前它既不是目录产品，也没有对应的 Amazon listing，没有可报告的状态，也没有可打开的页面。

请核对一下 SKU：查询区分大小写，必须完全一致（比如是否多了/少了字符、大小写不同，或者用的是别的店铺/站点的 SKU）。确认正确的 SKU 后告诉我，我再查；如果这是一个还没建的新品，也可以把资料发我，帮你建产品草稿。
