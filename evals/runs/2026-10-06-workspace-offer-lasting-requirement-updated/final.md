mlist_cv01_es（Amazon ES，CV-HOOK-01）的西班牙语标题已保存，只改了标题，其他字段没动。

**标题前后对照**

| | 标题 | 来源 |
| --- | --- | --- |
| 改前 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing |
| 改后 | Casa Verde Ganchos de pared de bambú natural, instalación adhesiva · 2 unidades | 品牌：listing 属性 brand；竹制、壁挂、2 件装：产品标题；“natural”“adhesiva”：listing 现有卖点（Bambú natural / Instalación adhesiva）；“·” 分隔件数、品牌写 “Casa Verde”：你的偏好 |

- 标题里没有 “premium”，也没有站点点名的促销词（oferta、gratis、garantía）。总共 79 个字符，上限是 200。
- 没有加任何产品数据里没有的内容，比如尺寸、承重、认证。

**保存结果**（以工具返回为准）
- `medusa.update_listing` 状态：succeeded，`updated.copy: true`，content_version 从 3 升到 4。
- 合规检查：保存后没有缺失项、无效项或警告，但 `compliance.ready` 仍是 false。这不代表 Amazon 已经通过审核。
- 当前工具里没有浏览器功能，所以我没有替你打开页面。listing 页面链接在这里：https://erp.example.test/app/amazon-listings/mlist_cv01_es （已经开着的话请刷新）。
- 这次只保存了草稿，没有发布。发布需要你在 ERP 里操作。

要把「标题里别用 premium 这个词」存进 casa-verde-es 的偏好吗？
