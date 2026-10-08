（商家：casa-verde-es）

我找到了 CV-HOOK-01：产品「Bamboo wall hook 2pk」（prod_cv01，草稿）。产品页：https://erp.example.test/app/products/prod_cv01 。这里没有浏览器工具，所以页面没有打开。

**参考图**：产品图库现有 2 张，`main.jpg` 和 `side.jpg`。这个产品还没有存过 A+ 图片。生成时两张都会作为参考图传进去。这一步只是列出了图片，我还没有真正看过这两张图。

下面是这张 A+ 头图的方案，还没有生成，也没有保存：

| 项目 | 方案 |
| --- | --- |
| 模块 | `STANDARD_HEADER_IMAGE_TEXT`（A+ 标准头图） |
| 目标像素 | 970 × 600（宽高比必须正好是 970:600；png 或 jpeg，不超过 2 MB；生成结果比例不对就先裁剪缩放，做不出合格文件就不存） |
| 图上文字 | 不放文字（你没有给要放的原话；图上文字我不会自己写，也不会翻译） |
| `locale` | 不填（图上没有文字） |
| 存放位置 | 产品 prod_cv01 的 A+ 图片区，用 `medusa.attach_aplus_images` 存，和 listing 图库分开。只存不发布，之后由你在 Seller Central 上传 |

**完整提示词**（生成时附上上面 2 张参考图）：

> Wide Amazon A+ header banner, landscape 970:600 ratio. Show exactly the product in the reference images — the bamboo wall hooks, two-piece set, with the same shape, bamboo color, grain and mounting details as the references; do not change or add product features. Lifestyle scene: the two hooks mounted on a clean, light neutral wall in a calm, bright home interior (entryway), soft natural daylight, gentle shadows, warm natural tones. Product sharp and clearly the hero, placed slightly off-center, with a clean uncluttered area of wall left as negative space. No text, no letters, no logos, no watermarks, no price or badges, no other products.

产品的外观只按这 2 张参考图和标题里的事实（竹制、挂钩、2 件装）来画，不会加材质、尺寸、承重之类没有来源的卖点。

如果想在图上加文字，回复时附上你自己的原话（西班牙站用西班牙语，会按 `es-ES` 存）。原话里有价格、促销、配送、保修、竞品或没有依据的说法，我会先指出来，不会直接用。

按这个方案生成，并存到 CV-HOOK-01 的 A+ 图片区吗？
