两个产品的标题都已改好，只改了标题字段，其他内容没有动。

- **CV-HOOK-01**（prod_cv01）：`Bamboo wall hook 2pk` → `Casa Verde 竹制壁挂挂钩 · 2 件装`
  写入成功（updated.product = true，价格/图片/资料均未改动）。
  https://erp.example.test/app/products/prod_cv01
- **CV-HOOK-02**（prod_cv02）：`Bamboo wall hook 4pk` → `Casa Verde 竹制壁挂挂钩 · 4 件装`
  这条写入时服务端返回了一次 502（request_id: req_mock_502），结果一度未知。我没有盲目重试，而是重新读取了该产品的当前状态，确认标题已经保存为新标题，所以无需再写。
  https://erp.example.test/app/products/prod_cv02

两个产品仍是草稿状态（draft），没有发布；如需上架，请在 ERP 里操作。
