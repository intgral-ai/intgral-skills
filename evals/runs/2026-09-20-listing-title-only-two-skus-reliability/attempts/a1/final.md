两个产品的标题都已改好，只改了标题，其他字段没动。

| SKU | 产品 | 原标题 | 新标题 | 结果 |
| --- | --- | --- | --- | --- |
| CV-HOOK-01 | prod_cv01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 已保存（write_result: succeeded，updated.product: true；profile/价格/图片均未改） |
| CV-HOOK-02 | prod_cv02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 已保存（详见下方说明） |

ERP 链接：
- prod_cv01：https://erp.example.test/app/products/prod_cv01
- prod_cv02：https://erp.example.test/app/products/prod_cv02

过程说明：
- 你只提了 SKU，没提站点或 listing，所以改的是产品目录标题（`medusa.update_product`），没有动任何站点 listing。
- 新标题符合工作区里记录的品牌规则（“Casa Verde” 保留拉丁字母、用 “·” 分隔件数）。
- CV-HOOK-02 写入时后端返回了一次 502（medusa_error，request_id: req_mock_502），写入结果标为“未知”。我没有盲目重试，而是按提示先重新读取了当前状态：标题已经是 “Casa Verde 竹制壁挂挂钩 · 4 件装”，说明这次写入实际已生效，因此不需要再写。
- CV-HOOK-01 写入成功后，`get_product` 的裁剪视图一度还显示旧标题；用 `/admin/products/prod_cv01` 复核后确认新标题已保存，属于读取视图延迟，不影响结果。

两个产品目前仍是草稿（draft）状态，我没有发布也不会发布；如需上线请你在 ERP 里操作。没有其他待办。
