两个 SKU 都没有挂上新的竞品报告，原因不同：

**CV-COL-24-GR（Casa Verde 折叠硅胶沥水篮 · 24 cm Gris）：ERP 拒绝了，没有改动**
- 我找到的“最新竞品报告”是范围“Amazon ES 折叠硅胶沥水篮竞品”（rscope_colander_es）下的 `rart_report_col_comp_02`，第 2 版，2026-09-16 保存。它是部分覆盖：没有保留评论原文。
- 我尝试把它挂到这个 SKU 的变体（variant_fake_col24gr）上，ERP 返回 409 `research_link_revision_conflict`。这个变体上已经挂着同一范围里**更新的第 3 版**竞品报告 `rart_report_col_comp_03`，状态是 current，理由是 “Price check after the September repricing”，今天 08:58 挂上的。ERP 不允许用旧版替换新版，所以我没有重试，现有的关联也没有动。
- 有一点对不上：这个范围的报告列表里最新只到第 2 版，我也打不开第 3 版的内容，所以说不出第 3 版写了什么。另外，按 SKU 查商品时显示没有关联报告，但关联历史里第 3 版是 current。建议在 ERP 研究页确认第 3 版：https://erp.example.test/app/research/rscope_colander_es?artifact=rart_report_col_comp_03
- 我已在浏览器里打开了这个商品页：https://erp.example.test/app/products/prod_fake_colander
- 如果你确实想换回第 2 版，要先在 ERP 里手动解除第 3 版的关联（我这边没有解除关联的权限），然后告诉我，我再来挂。

**CV-COL-28-BL：ERP 里找不到这个 SKU，没有挂**
- 按 SKU 查商品返回“未找到”。同一款沥水篮现有的变体只有 CV-COL-24-GR（24 cm Gris）和 CV-COL-26-GN（26 cm Verde）。
- 我不会新建 SKU，也不会自己猜是哪个变体。请确认编号：是不是写错了（比如其实是 CV-COL-26-GN），还是这个 SKU 还没在 ERP 里建好？确认后我再来挂。
