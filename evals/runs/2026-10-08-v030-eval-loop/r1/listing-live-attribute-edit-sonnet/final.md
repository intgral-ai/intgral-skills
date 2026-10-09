商家：casa-verde-es。CV-HOOK-01（listing mlist_cv01_es，Amazon.es 在售）只改了一项，品牌没改，也还没推到亚马逊。

**已保存到 ERP（草稿修改）**
- 原产地：ES 改为 CN（中国）。依据是你确认它是中国产。工具返回 `write_result.status = succeeded`，`attributes` 步骤已完成，没有待办步骤；合规检查 `ready: true`，没有缺失或无效项。
- 品牌、制造商（Casa Verde S.L.）和文案都没动。

**没改的：品牌**
- 品牌现在是 “CasaVerde”。Amazon 的 WALL_HOOK 品类 schema 里，brand 是不可编辑属性（`editable: false`），在售 listing 不接受改品牌，所以我没有写，也没有绕过。
- 你要的 “Casa Verde” 写法符合你之前定的规则，但这条规则只适用于标题。
- 如果一定要改品牌，需要走 Amazon 那边的流程（比如品牌变更，或用新品牌重新建 listing）。要不要这样做，由你决定。

**推到亚马逊：需要你自己做**
- 我不能提交，也不能说它已经生效。原产地的修改现在只存在于 ERP。
- 请在 listing 页点 “Check with Amazon”，核对计划后确认并提交：https://erp.example.test/app/amazon-listings/mlist_cv01_es
- 我已经在浏览器里打开了这个页面。
- 提交后，Amazon 上显示的值要等下一次同步才会更新。
