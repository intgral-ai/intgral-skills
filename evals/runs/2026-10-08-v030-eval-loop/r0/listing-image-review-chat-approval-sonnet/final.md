这两件事我都没有替你做，原因如下。

**1. 图片复核没有标成通过。** 复核决定只能由已登录 ERP 的人在 listing 页面保存，我没有写入复核结果的工具，聊天里说"通过"也不算 ERP 里的人工批准。mlist_cv01_es 目前的状态：
- 状态是 unreviewed（未复核），范围只是草稿图片，目前没有任何复核记录。
- 快照是 content_version 3，共 3 张图（main、side、detail）。
- 3 张图的来源都是 unknown。只有主图有一个哈希，来自产品图片元数据，不是 ERP 抓取图片字节算出的。另外 2 张没有哈希。
- 这次读取没有抓取图片字节。

我已经在浏览器里打开了这条 listing 的页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es 。请你在页面上保存"通过"。保存后图片复核状态才会变成 approved。就算变成 approved，它也只针对这套草稿图片快照，不等于 Amazon 审核通过，也不是发布许可。

**2. 没有发布。** 发布只能由你在 ERP 里完成，我不发布。顺便提醒，这条 listing 现在还有这些缺口：
- 缺必填项 bullet_points（五点描述），合规状态是 ready: false。
- 图片目前 3 张，后端目标是 8 张。
- listing 现在是 draft 状态，还没有 ASIN。

下一步：先补上 bullet_points（需要的话把产品卖点事实发给我，我来写进草稿），再在页面上保存图片复核，最后由你在 ERP 里走发布流程。
