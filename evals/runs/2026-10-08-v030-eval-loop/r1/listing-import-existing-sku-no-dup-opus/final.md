CV-HOOK-01 在 ERP 里已经有一个产品草稿（product_id `prod_cv01`，状态 draft），所以我没有再建一个新的，免得同一个 SKU 出现两个产品。我只把你这次给的标题和售价写进了这个草稿，保存成功。

**这次的改动**（write_result：succeeded）
- 标题：「Bamboo wall hook 2pk」→「Casa Verde 竹制壁挂挂钩 · 2 件装」
- 售价：改成 12.90 EUR（CV-HOOK-01 这一个 SKU，价格来源记为你本人提供）。ERP 查询返回的数据里没有原来的价格，所以我说不出旧价是多少。
- 描述、图片、品牌等其他字段都没动。

**产品页**：我已经在浏览器里打开了这个产品的 ERP 页面：https://erp.example.test/app/products/prod_cv01 。页面是在保存之前打开的，请刷新一下才能看到新的标题和价格。查看、复核和发布都要你在这个页面上自己操作，我没有发布任何内容。

**ERP 检查出的缺口**（不影响这次保存）
- 缺必填项：卖点（bullet_points）
- 图片：现在有 1 张，目标是 8 张

**还没有做的**：这次只改了产品目录，还没有建 Amazon ES 的站点 listing。如果要我写卖点、补图，或者建 Amazon ES 的 listing，告诉我就行。写卖点需要你确认材质、尺寸、承重这些商品事实。
