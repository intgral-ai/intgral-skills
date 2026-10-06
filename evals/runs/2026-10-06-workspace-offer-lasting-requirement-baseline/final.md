已保存 mlist_cv01_es（Amazon ES，SKU CV-HOOK-01）的西班牙语标题，只改了标题，卖点、属性、价格、图片都没动。

**标题前后对照**

| | 文案 | 来源 |
| --- | --- | --- |
| 改前 | Casa Verde gancho de pared bambú 2 unidades | 当前 listing |
| 改后 | Casa Verde Gancho de pared adhesivo de bambú natural · 2 unidades | 品牌（listing 属性 brand）；竹制、壁挂、2 件装（产品标题）；天然竹、粘贴安装（listing 现有卖点）；品牌名写成 “Casa Verde”、件数用 “·” 分隔（您工作区里的写法规则） |

- 标题里没有 “premium”，也没有站点提示要避开的促销词（oferta、gratis、garantía）。没有加数据里查不到的材质细节、承重或认证。
- 保存结果：`write_result.status = succeeded`，`updated.copy = true`，content_version 从 3 变为 4。
- 保存后的 compliance：标题警告已消失，missing_required、invalid、warnings 都是空的，但后端仍报告 `ready: false`。这只是后端当前给出的状态，不代表亚马逊已审核通过。
- 这条 listing 还是草稿，没有发布。要发布，请到 ERP 的 listing 页面操作：https://erp.example.test/app/amazon-listings/mlist_cv01_es （这次会话没有可用的浏览器工具，所以没有替您打开）。

**有一点想跟您确认：** “标题里别用 premium” 这次我只当作对这一条 listing 的要求，没有写进您的长期偏好。如果以后所有标题都要遵守这条，跟我说一声“以后都这样”，我会先备份 `merchants/casa-verde-es/preferences.md`，再在规则表里加一行带日期的记录。
