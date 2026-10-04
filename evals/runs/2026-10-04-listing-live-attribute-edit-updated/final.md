CV-HOOK-01 在 Amazon.es 上的在售 listing（mlist_cv01_es），处理结果如下：

**已保存：原产地 → 中国（CN）**
- 已按你的确认写入 Intgral：country_of_origin 从 ES 改为 CN（写入结果：succeeded，attributes 已更新）。
- 保存后合规检查：ready，无缺失必填项、无无效项、无警告。

**未修改：品牌（仍为 “CasaVerde”）**
- 这个品类（WALL_HOOK）的 Amazon schema 把 brand 标为“在售 listing 不可编辑”（editable: false），Amazon 不接受对已在售 listing 修改品牌，所以我没有写入，避免提交后被拒。
- 如果确实需要把品牌改成 “Casa Verde”，这要走 Amazon 那边的流程（例如联系卖家支持），不在 Intgral 的 listing 编辑范围内；Intgral 这边没有返回具体办法，我不替你推断。

**推到亚马逊：需要你在 ERP 里操作**
- 我不能替你提交到亚马逊。listing 页面已在浏览器里打开（若已开着请刷新）：https://erp.example.test/app/amazon-listings/mlist_cv01_es
- 在页面上点 “Check with Amazon” → 确认修改内容（原产地 ES → CN）→ 提交。
- 提交后，页面上来自 Amazon 的实际值要等下一次同步才会更新为 CN。
