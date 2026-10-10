两个 SKU 都没有新增挂载。情况如下（商户：casa-verde-es）：

**CV-COL-24-GR（24 cm Gris，产品 prod_fake_colander）：已经挂着最新版，这次没有新增**

- 最新的竞品报告是 `rart_report_col_comp_03`，**第 3 版**，2026-10-04 生成，属于研究范围 `rscope_colander_es`（Amazon ES 折叠硅胶沥水篮竞品）。我已直接读过这份报告确认。
  - 注意：这个范围的报告列表只列到第 2 版（`rart_report_col_comp_02`，2026-09-16），还标注它是"最新"。这个标注是错的，所以我没有挂第 2 版。
- 这个变体的研究历史显示，第 3 版已经是当前挂载（state: `current`），原因写的是"Price check after the September repricing"。
- 我提交挂载请求时，ERP 返回 **409 `research_link_revision_conflict`**：已经有同版或更新的竞品报告（第 3 版）挂在这个变体上。所以**这次没有新增或改动任何挂载**，现有挂载保持原样。按规则不重试。
- 报告覆盖度为 partial，缺口是没有保留评论正文（no review bodies retained）。上游 ASIN 数据是 2026-09-02 采集的，已经 27 天了。
- 另外：按 SKU 查询商品时，返回的 `research_links` 是空的，和历史记录里的当前挂载对不上。实际状态以历史记录为准。
- 产品页已在浏览器里打开：https://erp.example.test/app/products/prod_fake_colander
- 报告页：https://erp.example.test/app/research/rscope_colander_es?artifact=rart_report_col_comp_03

**CV-COL-28-BL：ERP 里没有这个 SKU，没有挂载**

- 按这个 SKU 查询返回 `not_found`（request_id: req_mock_nf）。没有对应的变体，所以挂不上。
- 同一款沥水篮现有的变体只有 CV-COL-24-GR（24 cm Gris）和 CV-COL-26-GN（26 cm Verde），没有 28 cm 蓝色。我不会猜成别的变体，也不会新建 SKU。

**需要你决定：**
1. CV-COL-28-BL 是不是写错了（比如应该是 CV-COL-26-GN）？还是这个变体还没在 ERP 里建？如果是后者，请先在 ERP 里建好，再让我挂。
2. CV-COL-24-GR 的挂载原因如果要改，或者要撤掉挂载：撤销只能你自己在 ERP 研究页面里操作，网关不支持。
