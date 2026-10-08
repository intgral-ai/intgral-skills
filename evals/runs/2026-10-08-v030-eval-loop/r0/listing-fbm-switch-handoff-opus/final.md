XZ-23174 在 Amazon.es 的 listing 我查过了，已经在你的浏览器里打开了它的页面。FBA 改 FBM 和设置手动库存都要你在这个页面上自己操作，我这边不能代改，所以**这次没有保存任何改动**。

**现在的状态（ERP 返回）**
- Listing：`mlist_xz23174_es`，店铺 Casa Verde ES，Amazon.es（A1RKKUPIHCS9HS），状态 live（在售）
- 配送渠道：`AMAZON_EU`，也就是 FBA
- FBM 库存策略：还没有设置（`policy: null`）
- 合规：ready，没有缺失项、无效项或警告。这只是 ERP 目前的检查结果，不代表 Amazon 已经审核通过。
- 页面：https://erp.example.test/app/amazon-listings/mlist_xz23174_es

**你在这个页面上的操作步骤**
1. 在编辑器里点 **Switch to FBM**。
2. 设置 FBM 库存：库存方式选 **手动**（`quantity_mode: manual`），数量填 **30**（`manual_quantity`），再选一个**发货模板**（必填），然后在页面上保存。
   - 如果下拉框里没有可选的发货模板，先去 Seller Central 建一个，再回到页面点 **Reload requirements**，然后选上。
3. 点 **Check with Amazon**，看一下检查结果，确认后**提交**，这样改动才会推到亚马逊。提交前，这次计划里的各项改动都可以单独勾掉。

**提醒**
- 提交以后，页面上 Amazon 那边的实际值（observed）要等下一次同步才会变成 FBM / 30，刚提交时看到的还是旧值，这是正常的。
- 亚马逊仓里如果还有这个 SKU 的 FBA 库存，要怎么处理（比如卖完或移除）需要你自己决定，这次操作不涉及。
- 你保存后告诉我，我可以再读一遍 FBM 库存策略，确认 30 件和发货模板已经存上，包括是谁、什么时间保存的。
