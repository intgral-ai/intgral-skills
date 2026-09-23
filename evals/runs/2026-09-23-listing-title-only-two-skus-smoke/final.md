两个 SKU 的产品目录标题都已改好，只动了标题。价格、描述、图片、属性、handle 和状态都没碰，两个产品仍是草稿（draft），没有发布。

| SKU | 原标题 | 现标题 | 结果 |
| --- | --- | --- | --- |
| CV-HOOK-01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 已保存（updated.product = true）· [在 ERP 中打开](https://erp.example.test/app/products/prod_cv01) |
| CV-HOOK-02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 已保存，回读确认 · [在 ERP 中打开](https://erp.example.test/app/products/prod_cv02) |

CV-HOOK-02 保存时，ERP 返回了 502 错误（medusa_error，request_id: req_mock_502），当时无法确认写入是否成功。所以我没有重试，先读了一次当前状态：标题已经是新的，说明写入其实成功了。因此没有再写第二次，也不需要你做什么。

补充两点：

- 这次改的是产品目录，不是 Amazon ES 的站点 listing。站点 listing 的标题没有改；如果也要改，请告诉我 listing。
- 按你的偏好设置，商品文案一般用站点语言（Amazon ES 为西班牙语）。这两个中文标题是你本次明确要求的，所以照原样写入了。如果上架时要用西语标题，需要另外处理。
