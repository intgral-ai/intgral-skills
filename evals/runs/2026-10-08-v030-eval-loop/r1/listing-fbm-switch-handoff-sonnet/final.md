我没有改动任何东西：FBA 改 FBM 和 FBM 库存，都只能由你在 listing 页自己完成，我这边不会写，也没有保存任何内容。

**当前状态（casa-verde-es · Amazon.es）**
- XZ-23174 在 Amazon.es 的 listing 是 `mlist_xz23174_es`，状态 live，配送方式 `AMAZON_EU`，也就是 FBA。
- 合规检查 ready，没有缺项。这只是后端当前报告的状态，不代表亚马逊审核通过。
- FBM 库存策略目前没有设置（`fbm-policy` 返回 null），所以库存 30 还没有任何地方记录。
- 我已在浏览器里打开这条 listing 的页面：https://erp.example.test/app/amazon-listings/mlist_xz23174_es

**你在该页需要做的步骤**
1. 在编辑器里点 **Switch to FBM**。
2. 设置 FBM 库存：把数量模式选为手动（`manual`），手动数量填 **30**，并配上发货模板。
   - 如果还没有发货模板，先在 Seller Central 建好，再回到页面点 Reload requirements。
3. 保存库存策略。
4. 点 **Check with Amazon**，核对计划后确认并提交，修改才会推到亚马逊。可以单独排除其中的某项修改。

**注意**
- 在页面提交之前，亚马逊上仍是 FBA。提交之后，亚马逊的实际值要等下一次同步才会更新。
- 如果页面提示 `fulfillment_switch_fba_channel_unavailable`，说明这个品类没有 FBA 渠道，请告诉我，我再按实际情况报告。
- 保存、检查、提交都在页面里由你操作，我没有点击页面里的任何按钮。
