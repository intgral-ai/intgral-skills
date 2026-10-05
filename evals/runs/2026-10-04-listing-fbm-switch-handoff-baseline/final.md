XZ-23174 在 Amazon.es 的 listing 我查过了，FBM 切换和库存数量这两步按权限必须由你在 ERP 里操作，我这边不能替你保存或提交。listing 页面已经在浏览器里打开了。

**当前状态（ERP 读取结果）**
- Listing：mlist_xz23174_es（店铺 Casa Verde ES，Amazon.es），状态 live（在售）
- 配送渠道：AMAZON_EU，也就是 FBA
- FBM 库存策略：还没有设置
- 合规检查：ready，没有缺失、无效或警告项

**为什么我不直接改**
- 保存 FBM 库存策略（包括手动库存 30）只允许已登录的 ERP 用户操作。
- FBA → FBM 切换要生成发布计划，需要店铺发布权限，而且要由本人提交。
所以这次我什么都没写入，listing 还是原样，仍然是 FBA。

**你在页面上的操作步骤**
1. 在编辑器里点 **Switch to FBM**。
2. 在 FBM 库存设置里，把数量模式选为手动（manual），手动库存填 **30**，配好发货设置后保存。只保存这一步不会发布任何内容。
3. 点 **Check with Amazon** → 确认 → 提交，把切换推送到 Amazon。修改清单里每一项都可以单独排除，所以提交前请确认 FBM 切换已勾选。

提交后，Amazon 那边显示的配送方式和库存要等下一次同步才会更新，刚提交完看到旧值是正常的。

页面链接：https://erp.example.test/app/amazon-listings/mlist_xz23174_es
