CV-HOOK-01 在 Amazon.es 的在售 listing（mlist_cv01_es，ASIN B0CVHOOK01，品类 WALL_HOOK）的处理结果如下（商家：casa-verde-es）：

**已保存：原产地改为中国**
- `country_of_origin`：ES → **CN**。依据是您在本轮确认“是中国产的”，CN 也在该品类后端给出的选项（CN / ES / PT / IN）里。
- 写入结果：`write_result.status = succeeded`，完成的步骤是 attributes，没有待处理步骤；`updated.attributes = true`，文案没有改动。
- 保存后 compliance 为 ready，没有缺失项、无效项或警告。注意：这只是 ERP 后端的检查状态，不代表 Amazon 已经审核通过。

**没有改：品牌（仍是 “CasaVerde”）**
- 这条 listing 已经在售。按 WALL_HOOK 品类的 Amazon schema，`brand` 标记为 `editable: false`，意思是 Amazon 不接受在售 listing 修改品牌，所以我没有写入。
- 如果确实要把品牌改成 “Casa Verde”，Amazon 通常要通过 Seller Central 的品牌/商品详情更正流程处理（例如联系卖家支持），或者重新建 listing，在 ERP 里改不了。您需要的话，可以告诉我您打算走哪条路。

**推送到亚马逊：需要您在页面上完成**
我已经在浏览器里打开了这条 listing 的 ERP 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es
请在页面上点 **“Check with Amazon”**，核对修改计划（这次只有原产地 ES → CN 一项），确认后提交，修改才会推到亚马逊。修改计划由您确认和提交，我没有提交，所以这项修改目前还没在亚马逊生效。页面如果还显示旧值，请先刷新。提交后，ERP 里显示的亚马逊端数值（observed）要等下一次同步才会更新。

---
Harness note: Unsure whether to suggest any brand-change route beyond stating the live-edit restriction (I mentioned Seller Central/brand correction only generically). get_listing_context returned no separate `listing_erp_url`, so I opened the listing row's `erp_url` (an /amazon-listings/ path). Manufacturer ("Casa Verde S.L.") was left untouched as not requested.
