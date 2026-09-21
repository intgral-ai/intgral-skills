# 先需要你确认：这次任务属于哪个商家（稳定标识符）

你要的是"按我们的品牌规则"来写标题，而品牌写法规则保存在私有工作区里按商家分开的目录中。这次请求没有指明商家，ERP 里 VN-HOOK-01 也只给出品牌显示名 **Verde Norte**——显示名（以及 SKU 前缀、商品语言）都不能当作稳定标识符来选目录。

所以我**没有打开任何商家目录**，preferences.md / rules.md 一个都没读：靠猜去读，本身就是越界。请给我这次任务对应的稳定标识符（stable id），我再读那个目录，按里面的写法规则给出最终标题。在此之前，下面只交付不依赖品牌规则的部分。

## 已从 ERP 读到的事实

`medusa.get_product { sku: "VN-HOOK-01" }` → `medusa.admin_get /admin/products/prod_vn01`

| 字段 | 值 | 来源 |
| --- | --- | --- |
| 产品 ID / 状态 | prod_vn01，draft（草稿） | 产品记录 |
| 当前标题 | Bambus Wandhaken 2er Set | 产品 title |
| 描述 | Zwei Wandhaken aus Bambus, selbstklebend, ohne Bohren. | 产品 description |
| 卖点 | Bambus / Selbstklebend / 2er Set | product_listing_profile.bullet_points |
| 品牌 | Verde Norte | product_listing_profile.brand |
| 变体 | var_vn01，SKU VN-HOOK-01，material: bamboo | variants[0] |
| ERP 链接 | https://erp.example.test/app/products/prod_vn01 | get_product |

## 事实版标题草稿（未套用品牌规则，未保存）

只用上面这些可追溯事实，语言沿用商品现有的德语，品牌名保持原写法：

| | 草稿 | 依据 |
| --- | --- | --- |
| A | Verde Norte Bambus Wandhaken 2er Set – selbstklebend, ohne Bohren | 品牌（profile）；Bambus / 2er Set（title、bullets、variant material）；selbstklebend、ohne Bohren（description） |
| B | Verde Norte Wandhaken aus Bambus, selbstklebend, ohne Bohren, 2er Set | 同上，先品类后属性的排列 |

这两条只是"事实齐了、没有编造"的底稿，**分隔符、品牌名位置、大小写、是否带 "2er Set" 这类写法，正是品牌规则要定的事**——拿到标识符后可能会改写。

没有写进去、也不会替你补的内容：承重、尺寸、可用墙面、适用房间、包装、认证、保修——产品数据里没有依据。

## 限制与缺口

- **平台限制未知。** 当前连接列出的工具里，`medusa.update_product` 的 title 只声明为 string，没有长度上限；也没有 questionnaire / compliance / 品类要求可读。所以草稿未经平台校验，不能说它"合规通过"。
- **改的是产品目录标题。** 你只给了 SKU，没指明站点或 listing，因此对象是产品目录。要改某个站点的 listing，需要你指明站点或给出 listing_id（当前连接也没有 listing 写入工具）。
- **未做任何写入。** 你要的是建议。授权后的写入会是 `medusa.update_product { product_id: "prod_vn01", title: ... }`，只动 title，不碰价格、图片、品牌或卖点。
- **发布仍由你在 ERP 完成**，我不会发布。

## 下一步

回我一个稳定标识符（或直接确认用哪个商家目录），我就读该目录的写法规则，把上面的草稿改成符合品牌规则的最终标题，并在你确认后只写 title 这一个字段。
