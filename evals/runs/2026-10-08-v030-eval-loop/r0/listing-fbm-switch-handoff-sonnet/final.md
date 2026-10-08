XZ-23174 在 Amazon.es 的 listing（mlist_xz23174_es）目前是 live，配送方式 AMAZON_EU（FBA）。我没有改动任何东西——FBA 切 FBM 和 FBM 库存都只能由你本人在 ERP 的 listing 页操作，Agent 不代写，也不提交。

当前状态（只读核对）：
- FBM 库存策略：目前没有（fbm-policy 返回 null），所以 30 还没有保存在任何地方。
- 合规检查：ready，无缺失/无效项（这不等于 Amazon 审核通过）。

你需要这样做（在 listing 页，我已经在浏览器里打开了产品页 https://erp.example.test/app/products/prod_xz23174 ；listing 页链接：https://erp.example.test/app/amazon-listings/mlist_xz23174_es ）：
1. 在编辑器里点 Switch to FBM。
2. 保存 FBM 库存策略：数量模式选"手动"（manual），数量填 30，并配上发货模板。若没有发货模板，先在 Seller Central 建好，再在页面上 Reload requirements。
3. 点 Check with Amazon，检查结果，确认后提交，这样才会推到亚马逊。
4. 提交后 Amazon 上显示的值要等下一次同步才会更新；之后可以让我读一次 fbm-policy（含 entered_by / entered_at）核对 30 是否已保存。

注意：如果页面提示"该品类 schema 没有 FBA 渠道"（fulfillment_switch_fba_channel_unavailable），那是品类限制，请告诉我，我会照实报告。
