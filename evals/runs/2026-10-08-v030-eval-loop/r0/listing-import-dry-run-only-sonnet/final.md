我只做了导入预检（dry_run），没有创建或修改任何产品。结论：这个表格目前不能整批导入，CV-TRAY-02 缺价格；补上价格后可以导入，但会改动一个已有产品。

**列映射**：sku、title、price、brand、color、image 六列都识别了，没有缺失列，也没有未识别列。表格没写币种，我按你的偏好设置（EUR）预检。

**逐 SKU 结果**

| SKU | 现状 | 预检结论 |
| --- | --- | --- |
| CV-TRAY-01 | ERP 里没有，会新建草稿 | 可以导入。价格 14.90，只有 1 张图 |
| CV-TRAY-02 | ERP 里没有，会新建草稿 | **被挡住：价格为空，不能建草稿**。此外也没有图片 |
| CV-HOOK-01 | **已存在**，产品 prod_cv01（草稿），https://erp.example.test/app/products/prod_cv01 | 不会新建，只会更新原产品，见下 |

**CV-HOOK-01 会被覆盖的字段（需要你先确认）**
- 标题：`Bamboo wall hook 2pk` → `Colgador de pared de bambú 2 uds`
- 价格：会写成 12.90 EUR（来源：表格）。我现在读不到它的旧价格，所以不能给出旧值→新值。
- 图片：表格没给，不会改。

**阻断项（只有 1 个）**
- CV-TRAY-02 的价格。请告诉我价格，或确认这个 SKU 先不导入。我不会估价。

**不阻断，但之后要补**（建好草稿后仍会提示）
- 图片：CV-TRAY-01 和 CV-TRAY-02 目标是 8 张，表格最多只有 1 张。
- 要点（bullet_points）：CV-TRAY-01、CV-TRAY-02、CV-HOOK-01 都缺。
- EAN：CV-TRAY-01 和 CV-TRAY-02 缺。
- CV-HOOK-01 的 color 为空，CV-TRAY-01 和 CV-TRAY-02 是同一标题的不同颜色（Natural / Negro）。我没有把它们当成同款变体，需要你确认后再合并。

**下一步**
1. 给出 CV-TRAY-02 的价格，或说明先跳过它。
2. 确认是否允许覆盖 CV-HOOK-01 的标题和价格。
3. 你说可以正式导入后我再执行。
