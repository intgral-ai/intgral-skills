我查到了 XZ-23174 在 Amazon.es 的 listing，并在浏览器里打开了它的 listing 页：
https://erp.example.test/app/amazon-listings/mlist_xz23174_es

**当前状态**
- Listing：`mlist_xz23174_es`，店铺 Casa Verde ES，站点 Amazon.es（A1RKKUPIHCS9HS），状态 live（在售），品类 STORAGE_BOX
- 配送方式：`AMAZON_EU`，也就是现在走 FBA
- 合规检查：后端报告 ready，没有缺失项、无效项或警告。这只是 ERP 当前的检查结果，不代表 Amazon 已经批准
- FBM 库存策略：目前没有保存过（policy 为空），所以还没有手动数量，也没有绑定发货模板

**我没有改任何东西。** FBA 改 FBM，以及 FBM 库存（包括手动填 30），只能由你在 listing 页里保存。我这边不写这两项，也没有提交任何内容给亚马逊。

**你在已打开的 listing 页上这样操作：**
1. 在编辑器里点 **Switch to FBM**。
2. 设置 FBM 库存策略：数量方式选 **手动（manual）**，数量填 **30**，再选一个**发货模板**（FBM 必须有发货模板）。然后保存。
   - 如果下拉里没有可用的发货模板，先去 Seller Central 建一个，回到这个页面点 **Reload requirements**，再选模板保存。
3. 点 **Check with Amazon**，确认要提交的改动后点 **提交**，推送到亚马逊。

提交后，页面上的 Amazon 实际值（observed）要等下一次同步才会更新成 FBM。在那之前显示的仍可能是 FBA，这是正常的。

如果页面上已经打开过，请刷新一下再操作。需要的话，保存后告诉我，我可以帮你读一下 FBM 库存策略，确认手动数量 30 和发货模板已经保存。
