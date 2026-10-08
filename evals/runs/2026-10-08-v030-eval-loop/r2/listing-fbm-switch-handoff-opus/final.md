我查了 XZ-23174 在 Amazon.es 的 listing，并在浏览器里打开了它的页面：
https://erp.example.test/app/amazon-listings/mlist_xz23174_es

**现在的状态**（全部来自 ERP 返回的数据）
- Listing：`mlist_xz23174_es`，店铺 Casa Verde ES，站点 Amazon.es（A1RKKUPIHCS9HS），状态 **live（在售）**
- 配送渠道：`AMAZON_EU`，也就是目前确实是 **FBA**
- 品类 STORAGE_BOX；ERP 现在的合规检查是 ready，没有缺失项、无效项或警告（这只代表 ERP 目前的判断，不代表 Amazon 已经批准）
- FBM 库存策略：**还没有**（`fbm-policy` 返回 null），所以“手动库存 30”目前不在任何地方

**这次没有替你改任何东西。** 在售 listing 从 FBA 切到 FBM，以及 FBM 库存设置，都需要你本人在 ERP 的 listing 页面里保存和提交，我不能代你写入或提交。页面已经打开，请按下面的步骤操作：

1. **设置 FBM 库存策略**：在 listing 页面的 FBM 库存设置里，把数量方式选成**手动**（quantity_mode = manual），手动数量填 **30**，再选一个**发货模板**（必填），然后保存。保存这一步不会发布任何内容。
   - 如果下拉里没有可用的发货模板，先去 Seller Central 建一个，回到这个页面点 **Reload requirements**，再选。
2. **切换配送方式**：在编辑器里点 **Switch to FBM**，然后点 **Check with Amazon**，看完检查结果后确认并**提交**。
3. **提交以后**：Amazon 那边显示的配送方式和库存，要等下一次同步才会更新。页面上暂时还显示 FBA 是正常的，过一会儿刷新再看。

做完后可以叫我再查一次，我会去读这条 listing 已保存的 FBM 策略（包括手动数量、录入人和录入时间）和配送渠道，跟你确认是不是已经生效。
