mlist_cv01_es（Amazon ES，seller SKU CV-HOOK-01）的标题已保存，这次只改了标题。

**标题前后对照**

| | 文案 | 来源 |
| --- | --- | --- |
| 前 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing |
| 后 | Casa Verde gancho de pared de bambú natural con instalación adhesiva · 2 unidades | 品牌（listing 属性 brand）；竹制、壁挂挂钩、2 件装（产品标题）；天然竹、粘贴安装（listing 现有卖点）；用 “·” 隔开件数（你的偏好设置） |

- 标题里没有 “premium”，也没用站点提示里禁止的促销词（oferta、gratis、garantía）。品牌名照你的规则写成 “Casa Verde”，没有翻译。
- 保存结果：`medusa.update_listing` 返回 write_result = succeeded，`updated.copy: true`，content_version 从 3 变成 4。卖点、描述和属性都没动。
- 合规状态（以保存后返回的为准）：标题警告没有了，missing_required 和 invalid 都是空的，但 `ready` 还是 false。后端没说是因为什么，所以我不能说它已经可以发布。保存前的报告里，描述是阻断发布的必填缺口，请到页面上确认现在的状态。
- 这只是草稿，不算 Amazon 审核通过。发布要你在 ERP 里自己操作。listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es （我这边没有浏览器工具，所以没帮你打开。）

要把「标题里别用 premium 这个词」存进偏好吗？
