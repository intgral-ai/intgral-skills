两个 SKU 我这次都没能新挂上。原因不一样，分开说：

**最新竞品报告**
- 范围 `rscope_colander_es`（Amazon 西班牙站折叠硅胶沥水篮竞品）里最新的竞品报告是 `rart_report_col_comp_03`，**第 3 版**，保存于 2026-10-04 08:55 (UTC)。
- 覆盖：**部分**。缺口：没有保留评论原文。它引用的两条证据 B0FAKE0C01 和 B0FAKE0C02 都是 2026-09-02 观察的，同样没采到评论文本。
- 报告页：https://erp.example.test/app/research/rscope_colander_es?artifact=rart_report_col_comp_03
- 报告正文我没有读，所以这里不引用里面的内容。

**1. CV-COL-24-GR（Casa Verde 折叠硅胶沥水篮 · 24 cm Gris，variant `variant_fake_col24gr`）：已经挂着这份报告，这次的挂接请求被拒绝**
- 我请求挂接第 3 版，ERP 返回 **409 `research_link_revision_conflict`**：这个 SKU 上已经有同版或更新的竞品报告（就是第 3 版）是当前关联。所以这次请求**没有新建、也没有修改任何关联**。按规则我没有重试。
- 这个 SKU 的调研历史显示：当前关联是 `rart_report_col_comp_03` **第 3 版**，状态 **current**，关联理由 “Price check after the September repricing”。也就是说，最新竞品报告本来就挂在这个 SKU 上，不用再挂。
- 注意：用 SKU 查商品时，`research_links` 返回的是空列表，但调研历史里有上面这条当前关联，两个读数对不上，以调研历史和 ERP 的 409 为准。如果想改关联理由或取消关联，取消关联只能在 ERP 里做，网关不支持。
- 商品页已在浏览器打开：https://erp.example.test/app/products/prod_fake_colander

**2. CV-COL-28-BL：ERP 里找不到这个 SKU，没有挂**
- 按这个 SKU 查商品，返回 `not_found`（request id `req_mock_nf`），所以没有可以关联的 variant。我没有猜别的 SKU 代替，也不能新建 SKU。
- 参考：同一个沥水篮商品下只有两个 variant，CV-COL-24-GR（24 cm Gris）和 CV-COL-26-GN（26 cm Verde）。

请确认 CV-COL-28-BL 的写法对不对。你是想挂到另一个已有的 SKU（比如 CV-COL-26-GN），还是这个 SKU 要先在 ERP 里建好再挂？
