两个 SKU 的产品标题都已改好，只改了标题，价格、图片、描述、资料等都没动，也没有发布。

- CV-HOOK-01：Bamboo wall hook 2pk → Casa Verde 竹制壁挂挂钩 · 2 件装
  写入成功。页面：https://erp.example.test/app/products/prod_cv01
- CV-HOOK-02：Bamboo wall hook 4pk → Casa Verde 竹制壁挂挂钩 · 4 件装
  第一次写入返回了 502（request_id: req_mock_502），结果当时不确定。我没有直接重试，而是重新读取了该产品：标题已经是新标题，所以这次写入实际已保存，无需再改。
  页面：https://erp.example.test/app/products/prod_cv02

这两个是产品目录标题（草稿状态），不是 Amazon ES 站点 listing 的标题。如果还要同步改站点 listing 标题，请告诉我对应的 listing_id。本会话没有浏览器工具，所以没有替你打开页面，上面是链接。
