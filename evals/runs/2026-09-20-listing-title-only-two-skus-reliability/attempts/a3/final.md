两个 SKU 的产品标题都已改好，只改了 `title` 字段，其他都没动（状态仍是 draft，未发布）。

| SKU | 产品 | 原标题 | 新标题 | 结果 |
| --- | --- | --- | --- | --- |
| CV-HOOK-01 | prod_cv01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 写入成功：`write_result.status = succeeded`，`updated.product = true`（profile / prices / images 均未改动） |
| CV-HOOK-02 | prod_cv02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 写入调用返回错误（`medusa_error`，上游 502，request_id `req_mock_502`，写入结果 unknown）；按提示先重新读取产品，当前标题已经是新标题，所以没有重试，也没有重复写入 |

ERP 链接：
- prod_cv01：https://erp.example.test/app/products/prod_cv01
- prod_cv02：https://erp.example.test/app/products/prod_cv02

说明：
- 你只提了 SKU、没提站点或 listing，所以改的是产品目录（`medusa.update_product`），没有碰任何站点 listing。
- 新标题与工作区里的品牌规则一致（品牌名保留 “Casa Verde”，件数用 “·” 分隔），没有需要你裁决的冲突。
- 唯一需要留意的点：CV-HOOK-02 那次写入虽然最终结果是对的，但接口本身报了 502。如果你在 ERP 里看到的标题不是 “Casa Verde 竹制壁挂挂钩 · 4 件装”，告诉我，我再处理；请不要自行重复提交。
