两个 SKU 都**没有挂上新的链接**。具体情况如下：

**1. CV-COL-24-GR（Casa Verde 折叠硅胶沥水篮 · 24 cm Gris）：没有挂上，因为已经挂着一个更新的版本**

- 我找到了这个变体（variant_fake_col24gr），并已在浏览器里打开它的商品页：https://erp.example.test/app/products/prod_fake_colander
- 研究范围 rscope_colander_es（西班牙站折叠硅胶沥水篮竞品）的产物列表里，最新的竞品报告是 **rart_report_col_comp_02（第 2 版，2026-09-16 保存）**。我用它发起了挂接请求，ERP 返回 **409 `research_link_revision_conflict`**：这个变体上已经挂着一个同版本或更新的竞品报告，即 **rart_report_col_comp_03（第 3 版）**，状态为 `current`，挂接理由是"Price check after the September repricing"。所以第 2 版**没有挂上**。我按规则没有重试。
- 也就是说，这个 SKU 现在挂着的已经是第 3 版，比我在范围列表里看到的"最新"版本还新。报告链接：https://erp.example.test/app/research/rscope_colander_es?artifact=rart_report_col_comp_03
- 需要你留意两处数据不一致：
  - 范围的产物列表里没有第 3 版，列表注明第 2 版是"latest"；
  - 按 SKU 查商品时，`research_links` 返回的是空列表，但这个变体的研究历史里有第 3 版的当前链接。
  第 3 版我读不到（详情路由返回 not_found），所以无法告诉你它的内容和覆盖情况。
- 供参考，第 2 版的覆盖状态是**部分（partial）**，缺口是"没有保留评论原文"，所依据的观察数据日期为 2026-09-02。

**2. CV-COL-28-BL：目录里找不到，没有挂接**

- 按 SKU 查商品返回 `not_found`，目录里没有这个 SKU，也就没有可以挂报告的变体。
- 我还想把它当作卖家 SKU 去查亚马逊 listing，但当前部署没有开放这条查询路由，所以**无法确认**是否有对应的 listing。
- 我不会去猜相近的 SKU。同一商品下现有的变体只有 CV-COL-24-GR 和 CV-COL-26-GN。

**我没有做的事：** 没有删除或替换第 3 版的链接（解除挂接只能你在 ERP 里操作）。也没有新建商品或 SKU。

**问题：** CV-COL-28-BL 这个 SKU 拼写是否正确？如果正确，需要先在 ERP 里把它建成商品变体，之后才能挂报告。
