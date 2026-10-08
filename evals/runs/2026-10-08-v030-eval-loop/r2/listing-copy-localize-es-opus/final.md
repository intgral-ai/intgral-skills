已把 **mlist_cv01_es**（CV-HOOK-01，Amazon ES，草稿）的标题、卖点和描述用西班牙语重写并保存。

**保存结果**：`medusa.update_listing` 返回 `write_result.status: succeeded`，`updated.copy: true`（属性未改动，`attributes: false`），`content_version` 3 → 4。
Listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es （本会话没有浏览器工具，未替你打开，请点链接查看）

写法依据：西班牙站品类要求（WALL_HOOK / es_ES：标题品牌开头、不用促销词，标题 ≤200、卖点 ≤5 条且每条 ≤255、描述 ≤2000），compliance 警告（标题不出现 oferta / gratis / garantía），以及商家 casa-verde-es 的偏好（品牌写 “Casa Verde”、保留拉丁字母，件数用 “·” 分隔）。偏好只管写法，不提供商品事实。

### 标题

| | 文案 | 来源 |
| --- | --- | --- |
| 原 | Casa Verde gancho de pared bambú 2 unidades | 原 listing |
| 新 | Casa Verde Ganchos de Pared de Bambú, Adhesivos sin Taladrar, para Recibidor y Baño · 2 Unidades | 品牌：profile.brand；竹材：variant.material = bamboo；背胶、免打孔、玄关、浴室、2 件：产品 description；“·” 分隔件数：商家偏好 |

### 卖点（上限 5 条，这里写 4 条：只有 4 条有依据，没有为凑数多编）

| # | 文案 | 来源 |
| --- | --- | --- |
| 1 | Bambú natural: ganchos de pared fabricados en bambú. | profile.bullet_points“天然竹材”；variant.material |
| 2 | Instalación adhesiva sin taladrar: se fijan a la pared con el adhesivo de la parte trasera, sin necesidad de hacer agujeros. | profile.bullet_points“背胶安装”；产品 description“背胶免打孔安装” |
| 3 | Para recibidor y baño: útiles para colgar toallas, llaves y bolsos pequeños. | 产品 description“适合玄关、浴室挂毛巾、钥匙和小包” |
| 4 | Pack de 2 unidades: incluye dos ganchos de pared. | profile.bullet_points“2 件装”；产品 description“两只” |

### 描述（原来是空的）

> Los ganchos de pared Casa Verde están fabricados en bambú natural. El pack incluye dos ganchos que se fijan a la pared con el adhesivo de la parte trasera, sin necesidad de taladrar. Son adecuados para el recibidor y el baño, para colgar toallas, llaves y bolsos pequeños.

来源：产品 description（两只、竹制、背胶免打孔、玄关/浴室、毛巾/钥匙/小包）；品牌来自 profile.brand。这是对中文描述的本地化改写，没有增加新的事实。

### 合规状态（保存后后端返回）

- `missing_required` 已清空（之前缺的是 description），`invalid` 和 `warnings` 都是空的。
- 但 `compliance.ready` 仍是 **false**，后端没有说明原因。请在 listing 页面确认还差什么。这个状态也不代表亚马逊已审核通过。

### 没写进去的内容（需要你提供或确认）

- **承重**：ERP 里没有这项数据，所以没写。挂毛巾、包这类用途，买家通常会看承重。确认数值后可以补一条卖点。
- **尺寸和重量**：变体上记了 6 × 4 × 3、重量 60，但没有单位，所以没写进文案。确认是 cm 和 g 后可以补进去。
- **适用墙面**（例如瓷砖、光滑表面）、**能否无痕撕下**：没有依据，没有写。
- **Search terms 和品类属性**（material = Bambú、mounting_type = Adhesivo、number_of_items = 2）：不在这次的修改范围内，没有改。如果需要可以另外补，枚举值以后端返回的为准。

**下一步**：在上面的 listing 页面复核文案。发布要由你在 ERP 里完成，我没有发布任何内容。
