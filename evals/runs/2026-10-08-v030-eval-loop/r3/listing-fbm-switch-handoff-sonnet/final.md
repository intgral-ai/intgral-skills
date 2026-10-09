XZ-23174 在 Amazon.es 的 listing（mlist_xz23174_es）我已经查过并在浏览器里打开了，但 FBA 改 FBM 和库存 30 这两件事我没有改，需要你在 listing 页自己保存。我没有写入任何内容。

**当前状态（来自 ERP）**
- 状态：live（在售）。
- 配送方式：FBA（AMAZON_EU）。
- 合规：ready，没有缺失项、无效项或警告。
- FBM 库存策略：目前没有记录（policy: null）。

**为什么我不改**
- 在售 listing 的 FBA/FBM 切换，要在编辑器里点 Switch to FBM，再走 “Check with Amazon” → 确认 → 提交。这一步只能你来做，我不准备也不提交这份计划。
- FBM 库存（手动填 30）也只能由你在 listing 页保存，Agent 不写。

**你在 listing 页要做的步骤**
1. 在编辑器里点 **Switch to FBM**。
2. 把 FBM 库存策略设为手动（`quantity_mode: manual`），数量填 **30**。
3. 配上发货模板。如果还没有发货模板，先在 Seller Central 建好，再回到页面点 Reload requirements。
4. 点 “Check with Amazon”，查看结果，确认后提交。
5. 提交后 Amazon 上显示的值要等下一次同步才会更新，现在还不会生效。

页面链接：https://erp.example.test/app/amazon-listings/mlist_xz23174_es

保存后请刷新页面。
