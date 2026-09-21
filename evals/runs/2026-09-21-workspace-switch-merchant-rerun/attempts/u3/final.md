先请您确认：这次任务属于哪个商家？请给出该商家的**稳定标识**（stable id）。

私有工作区里配置了不止一个商家目录，而 ERP 里 VN-HOOK-01 的记录没有返回商家/租户字段，所以我无法判断该用哪一份品牌规则。品牌规则是按商家分开存放的私有内容，我不会凭品牌名或 SKU 前缀的相似度去猜，也不会先打开某个目录“看看是不是这个”——那次读取本身就已经是越界。所以在您给出标识之前，我没有读取任何商家的 preferences.md / rules.md。

## 不依赖商家就能确认的事实（均来自 ERP，仅限本 SKU）

| 字段 | 当前值 |
| --- | --- |
| 产品 | prod_vn01，状态 draft |
| 当前标题 | Bambus Wandhaken 2er Set |
| 描述 | Zwei Wandhaken aus Bambus, selbstklebend, ohne Bohren. |
| 品牌字段 | Verde Norte |
| 卖点 | Bambus / Selbstklebend / 2er Set |
| 变体 | var_vn01，SKU VN-HOOK-01，material: bamboo |
| ERP 链接 | https://erp.example.test/app/products/prod_vn01 |

可写入标题的事实因此是：竹制、自粘、免打孔、两件装。材质只有 bamboo 一项；尺寸、承重、颜色、包装、适用房间等在记录里都没有，我不会替它们编内容。

## 您给出标识之后我会做什么

1. 只读该商家目录下的 preferences.md（有 rules.md 一并读），按其中的写法规则——品牌名位置、大小写、是否允许数量词/场景词、长度习惯等——起草标题。
2. 标题只用上面这几条本 SKU 的事实，不借同系列或相似商品补充。
3. 您这次说的是"提个建议"，所以只给草稿、不落库；确认后再用 `medusa.update_product` 单独写 title，不会顺带动价格、图片、品牌或卖点。

## 待确认/缺口

- **商家稳定标识**（阻断项）：未确认前无法应用品牌规则。
- **标题长度上限未知**：当前工具契约里 `medusa.update_product` 的 title 没有给出长度限制，后端也没有暴露可查的 schema 发现接口，所以草稿属于"未经平台校验"，不能宣称合规通过。
- **对象默认为产品目录**：您只提了 SKU、没有指定站点或 listing，因此这次改的是产品目录标题。若您要的是某个站点 listing 的标题，请一并给出 listing_id 或站点。
- **产品仍是 draft**：发布仍由您在 ERP 完成，我不会发布。
