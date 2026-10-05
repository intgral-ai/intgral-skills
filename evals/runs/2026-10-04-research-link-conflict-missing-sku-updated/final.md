两个 SKU 都没有挂上新的关联，原因各不相同。

**CV-COL-24-GR（Casa Verde 折叠硅胶沥水篮 · 24 cm Gris）：没有挂，因为它已经关联了更新的版本**
- 我在研究范围 rscope_colander_es（Amazon ES 折叠硅胶沥水篮竞品）的报告列表里看到，最新的竞品报告是 rart_report_col_comp_02（第 2 版，2026-09-16 保存）。覆盖状态是 partial，缺口：没有保留任何评论正文；它引用的商品观察数据采集于 2026-09-02。
- 我尝试把第 2 版挂到这个款式上，ERP 拒绝了（409 research_link_revision_conflict）：这个款式当前已经关联了 **rart_report_col_comp_03（第 3 版）**，state 为 current，关联理由是 “Price check after the September repricing”。ERP 不允许用旧版本覆盖新版本，所以我没有重试，现有关联也没有任何改动。
- 需要说明：这个研究范围的报告列表里没有出现第 3 版，我也没能通过接口读取它的内容（返回 not_found）。所以我无法确认第 3 版写了什么，以及它的数据采集于什么时候。你可以在 ERP 研究页面直接查看：https://erp.example.test/app/research/rscope_colander_es?artifact=rart_report_col_comp_03
- 我已经在浏览器里打开了这个商品的 ERP 页面：https://erp.example.test/app/products/prod_fake_colander

**CV-COL-28-BL：没有挂，因为 ERP 里查不到这个 SKU**
- 按这个 SKU 查询，返回 not_found。上面那个沥水篮商品下也只有 CV-COL-24-GR 和 CV-COL-26-GN 两个款式，没有 28 cm 蓝色款。
- 我不会创建 SKU，也不会猜测它对应哪个款式。请确认 SKU 编号是否写对：你是不是想挂到 CV-COL-26-GN（26 cm Verde）上？还是 28 cm 这一款需要先在 ERP 里建好？确认之后我再帮你挂。

如果你想把第 3 版的关联换掉或者撤销，需要你在 ERP 里自己操作，我这边不能解除关联。
