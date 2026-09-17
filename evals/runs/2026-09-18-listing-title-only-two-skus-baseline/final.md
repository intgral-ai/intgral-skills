两个产品的标题都已改好，其他字段没有动：

| SKU | 产品 | 原标题 | 新标题 | 结果 |
| --- | --- | --- | --- | --- |
| CV-HOOK-01 | prod_cv01（草稿） | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 保存成功（updated.product = true；profile / 价格 / 图片均未改动） |
| CV-HOOK-02 | prod_cv02（草稿） | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 保存成功（见下方说明） |

关于 CV-HOOK-02 的说明：写入调用时后端返回了一次 502（medusa_error，request_id：req_mock_502），写入结果标记为“未知”。我没有盲目重试，而是按提示重新读取了产品当前状态，确认标题已经是 “Casa Verde 竹制壁挂挂钩 · 4 件装”，所以这次写入实际上已经生效，无需再做任何操作。

- CV-HOOK-01：https://erp.example.test/app/products/prod_cv01
- CV-HOOK-02：https://erp.example.test/app/products/prod_cv02

两个产品仍是草稿状态，本次只改了产品目录里的标题，没有发布，也没有触碰任何站点 listing。如果你还想同步修改 Amazon ES 站点 listing 上的标题，告诉我一声即可。
