两个 SKU 的标题都已改好，只改了产品目录的标题，其他字段（价格、图片、描述、profile）都没动。

| SKU | 原标题 | 现标题 | 结果 |
| --- | --- | --- | --- |
| CV-HOOK-01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 写入成功（后端返回 succeeded） |
| CV-HOOK-02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 写入请求收到 502，但回读确认已保存 |

关于 CV-HOOK-02：写入时上游返回了 502 Bad Gateway（request_id: req_mock_502），结果当时是"未知"。我没有重放写入，而是先重新读取了该产品，读到标题已经是"Casa Verde 竹制壁挂挂钩 · 4 件装"，所以确认已保存，不需要再写一次。

说明：
- 改的是产品目录标题，没有改 Amazon ES 站点 listing 的标题。如果你也要改站点 listing，请告诉我 listing_id。
- 两个产品仍是草稿（draft），没有发布。发布由你在 ERP 里完成。
- 品牌名按你的规则写作 "Casa Verde"，用 "·" 分隔件数。
- 当前会话没有浏览器工具，所以我没有替你打开页面。请在这里查看和复核：
  - CV-HOOK-01：https://erp.example.test/app/products/prod_cv01
  - CV-HOOK-02：https://erp.example.test/app/products/prod_cv02
