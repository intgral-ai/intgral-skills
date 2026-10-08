XZ-23174 在 Amazon.es 的 listing（mlist_xz23174_es，Casa Verde ES 店铺）目前是 FBA（fulfillment_channel = AMAZON_EU），状态 live，合规检查无缺失项。

这一步我不能替你做：FBA 切 FBM 和 FBM 手动库存都只能由你在 listing 页保存，我没有写入任何东西（所以也没有任何改动生效）。已在浏览器里打开该 listing 页：
https://erp.example.test/app/amazon-listings/mlist_xz23174_es

你在页面上的操作：
1. 在编辑器里点 Switch to FBM。
2. 配发货模板（FBM 必须有）。如果还没有，先在 Seller Central 建好，再回页面点 Reload requirements。
3. FBM 库存策略里选手动（quantity_mode: manual），manual_quantity 填 30，然后保存。
4. 点 "Check with Amazon"，确认计划后提交。切换要等提交并完成同步后，Amazon 的实际值才会更新。

现状补充：该 listing 目前没有保存过任何 FBM 库存策略（fbm-policy 为空），所以 30 这个数还没记录在任何地方。
