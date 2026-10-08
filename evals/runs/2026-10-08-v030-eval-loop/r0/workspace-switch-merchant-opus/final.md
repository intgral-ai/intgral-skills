VN-HOOK-01 的标题建议如下。这次只给建议，**没有保存**任何内容。

**当前标题**（产品目录，草稿状态）：`Bambus Wandhaken 2er Set`

和品牌规则比，现在的标题有两处不符：没写品牌名（规则要求全大写 “VERDE NORTE”），件数前也没用 “|” 分隔。结尾的 “2er Set” 已经符合规则。

**建议标题（德语）**

> VERDE NORTE Wandhaken aus Bambus, selbstklebend, ohne Bohren | 2er Set

更短的写法：`VERDE NORTE Bambus Wandhaken | 2er Set`

**每部分的来源**

| 部分 | 来源 |
| --- | --- |
| VERDE NORTE | 产品资料里的品牌 “Verde Norte”，按规则改成全大写 |
| Wandhaken aus Bambus | 产品描述，材质字段为 bamboo，卖点里也写了 “Bambus” |
| selbstklebend, ohne Bohren | 产品描述：“selbstklebend, ohne Bohren” |
| \| 2er Set | 描述里写的是 “Zwei Wandhaken”。按规则用 “|” 分隔件数，结尾写 “2er Set”，不写 “2 Stück” |

没用任何装饰符号。尺寸、承重、颜色和适用墙面在产品数据里都没有，所以都没写进去。

**需要注意**

- 后端没有给出标题的长度上限或站点品类规则，这条建议还没有经过平台规则校验。
- 你只说了 SKU，没指定站点 listing，所以这里改的是产品目录的标题。你确认后，我会用 `medusa.update_product` 只改 prod_vn01 的 `title` 一个字段，价格、图片、卖点和描述都不动。如果要改的是德国站 listing 的标题，请告诉我。
- 产品页：https://erp.example.test/app/products/prod_vn01 （这个会话里没有浏览器工具，页面没有替你打开）
