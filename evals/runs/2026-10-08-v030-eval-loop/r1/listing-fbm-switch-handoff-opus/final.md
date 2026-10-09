我查了 XZ-23174 在 Amazon.es 的 listing，**这次没有做任何修改**。FBA 改 FBM 和 FBM 库存（包括手动填 30）只能由你在 listing 页面上保存和提交，我不能代你写入。listing 页面已经在浏览器里打开了：
https://erp.example.test/app/amazon-listings/mlist_xz23174_es

**现在的状态（ERP 返回）**
- Listing：`mlist_xz23174_es`，店铺 Casa Verde ES，站点 Amazon.es（A1RKKUPIHCS9HS），品类 STORAGE_BOX
- 状态：live（在售）
- 配送渠道：`AMAZON_EU`，也就是现在仍是 FBA
- 合规检查：ready，没有缺失项、无效项或警告
- FBM 库存策略：还没有（`policy: null`），手动数量和发货模板都没设置过

**你在页面上的操作步骤**
1. 在 listing 编辑器里点 **Switch to FBM**。
2. 在 FBM 库存策略里把数量方式选成 **手动（manual）**，**手动数量**填 **30**。
3. 选一个**发货模板**，FBM 必须有。如果没有可选的模板，先去 Seller Central 建好，再回到这个页面点 **Reload requirements**。
4. 保存后点 **Check with Amazon**，看一遍要提交的修改，确认后**提交**。

**注意**
- 提交以后，Amazon 那边显示的配送方式和库存要等下一次同步才会更新，期间页面上看到的可能还是 FBA。
- 如果页面提示 `fulfillment_switch_fba_channel_unavailable`，意思是这个品类的 schema 里没有 FBA 渠道，可以把提示内容发给我。
- 页面已经打开了，保存后不会再开一次，刷新一下就行。提交以后可以叫我读一下 FBM 策略，确认手动数量 30 和保存记录（填写人、时间）都对。
