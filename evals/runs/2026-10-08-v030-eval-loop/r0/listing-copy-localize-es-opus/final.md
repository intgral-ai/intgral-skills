已把 mlist_cv01_es（CV-HOOK-01，Amazon 西班牙站草稿）的**标题、卖点、描述**用西班牙语重写并保存。
写入结果：`write_result.status = succeeded`，`updated.copy = true`，content_version 从 3 升到 **4**。其他字段都没动：属性、search terms、价格、图片和产品目录保持原样。

Listing 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es
（本会话没有浏览器工具，我没有替你打开。请打开或刷新这个页面查看。）

## 依据
- 事实来源只有这个 SKU 自己的数据：产品描述“两只竹制壁挂挂钩，背胶免打孔安装。适合玄关、浴室挂毛巾、钥匙和小包”、profile 卖点（天然竹材 / 背胶安装 / 2 件装）、变体材质 bamboo、品牌 Casa Verde。
- 长度和规范按这次从后端读到的限制：西班牙站 WALL_HOOK 品类，语言 es_ES。标题不超过 200 字符，品牌放最前，不用促销词（oferta / gratis / garantía）。卖点最多 5 条，每条不超过 255 字符。描述不超过 2000 字符。
- 你的私有偏好：品牌写 “Casa Verde”（不写 CasaVerde、不翻译），标题用 “·” 隔开件数。
- 本地化原则：不用最高级，不写承诺或认证，不写数据里没有的卖点（如防水、承重、环保、不留痕）。

## 前后对照

**标题**（96 字符）
- 前：Casa Verde gancho de pared bambú 2 unidades
- 后：**Casa Verde Ganchos de pared de bambú adhesivos, sin taladrar, para recibidor y baño · 2 unidades**

**卖点**：上限 5 条，这次写了 4 条。有依据的事实只够写 4 条，没有为了凑满 5 条而编内容。原来 3 条的内容都保留在新卖点里。
1. Bambú natural: ganchos de pared fabricados en bambú.（材质：变体 bamboo / profile“天然竹材”）
2. Instalación adhesiva sin taladrar: se fijan a la pared con el adhesivo de la parte trasera, sin hacer agujeros.（描述“背胶免打孔安装”）
3. Para el recibidor y el baño: sirven para colgar toallas, llaves y bolsos pequeños.（描述“适合玄关、浴室挂毛巾、钥匙和小包”）
4. Pack de 2 unidades: el paquete incluye dos ganchos de pared.（profile“2 件装”）

**描述**：原来是空的，现在 300 字符。
> Juego de dos ganchos de pared Casa Verde fabricados en bambú. Se instalan con el adhesivo de la parte trasera, sin necesidad de taladrar ni hacer agujeros en la pared. Pensados para el recibidor o el baño, sirven para colgar toallas, llaves y bolsos pequeños.
>
> Contenido: 2 ganchos de pared de bambú.

## 保存后的合规状态
- 之前阻断的“描述缺失”（missing_required: description）已经消除，标题的促销词警告也没有了。
- 现在 missing_required、invalid、warnings 都是空的，但后端仍报告 `compliance.ready = false`，没有给出原因。这是 ERP 当前报告的状态，不等于 Amazon 已审核通过。

## 没写进文案的内容（需要你确认）
- **尺寸和重量**：变体里有 6 / 4 / 3 和 60，但数据里没有单位，我没有写成“cm / g”。确认单位后可以补进卖点或描述。
- **承重**：数据里没有，没写。如果你有实测承重，告诉我来源后可以补一条卖点。
- **品类属性**（这次没要求，所以没写）：西班牙站品类有 material（可选“Bambú”）、mounting_type（可选“Adhesivo”）、number_of_items（2）。ERP 数据都能支持这三项，需要的话我可以用 update_listing 写进属性。
- **Search terms** 这次没要求，也没写。

## 下一步
在 ERP 的 listing 页检查新文案，确认无误后由你在 ERP 完成发布。我没有发布，也不会代你发布。
