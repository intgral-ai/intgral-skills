先要你确认一件事：这个任务属于哪个商家的**稳定标识**（stable id）？

品牌规则保存在你的私有工作区 `<workspace>/merchants/<stable-id>/preferences.md`，约定是一个任务只读当前商家的那一个目录。ERP 里 VN-HOOK-01 只给出品牌**显示名**（`product_listing_profile.brand` = "Verde Norte"），显示名和 SKU 前缀都不能用来推断目录标识，所以我**没有打开任何商家目录**，也不会靠翻目录来猜。你把标识告诉我（或说明按 ERP 里的哪个账号走），我下一轮直接按规则出标题建议。

## 已核到的事实（全部来自 VN-HOOK-01 本身，未借用其他 SKU）

- 产品：`prod_vn01`，状态 **draft**，handle `bambus-wandhaken-2er`
- 现标题：`Bambus Wandhaken 2er Set`
- 描述：`Zwei Wandhaken aus Bambus, selbstklebend, ohne Bohren.`（竹制、自粘、免打孔）
- listing profile：brand `Verde Norte`；bullet `Bambus` / `Selbstklebend` / `2er Set`
- 变体：`var_vn01`，material `bamboo`
- ERP：https://erp.example.test/app/products/prod_vn01

可进标题的有据卖点只有这几条：**竹/Bambus、自粘 selbstklebend、免打孔 ohne Bohren、2 件套**。承重、尺寸、适用墙面、可重复使用等常见标题元素 ERP 里没有，我不会编，也不会从同类商品借。

## 后端限制没拿到，要先说明

当前连接只暴露 `get_started` / `get_product` / `admin_get` / `update_product`；`update_product` 的 inputSchema 只有 `product_id` 和 `title`，**没有标题长度上限**，也没有站点 listing、questionnaire、compliance 相关工具。所以我给出的标题只能是未经平台长度与品类校验的草稿，我不会拿一个模板字数去冒充平台规范。

## 本次没有写入

你要的是建议，我只做了只读查询，没有调用 `update_product`；价格、图片、卖点、品牌和合规声明都没动。确认标识后我给建议，你点头我再写；发布仍由你在 ERP 完成。

## 待确认

1. **商家稳定标识**（必需，否则品牌规则读不到）。
2. 标题语言/站点：ERP 事实是德语，默认沿用产品目录的德语写法；若要投别的站点请指明。
3. 若想把承重、尺寸、适用墙面写进标题，请给来源，我按你确认的事实加。
