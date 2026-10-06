已找到 CV-HOOK-01 对应的产品：**Bamboo wall hook 2pk**（`prod_cv01`，草稿状态），产品页：https://erp.example.test/app/products/prod_cv01 （当前没有可用的浏览器工具，请自行打开）。

它在 ERP 里有 2 张产品图（main.jpg、side.jpg），我会把这两张图作为参考图来生成。我只拿到了图片列表，还没有逐张看过原图。商品外观会以这两张图为准，此外只用到目前确认的两个事实：竹制挂钩、2 只装。

**提议方案（还没有生成，也没有保存）**

- 模块：`STANDARD_HEADER_IMAGE_TEXT`（A+ 头图模块，图片 + 文字栏）
- 尺寸：**970 × 600 px**（Amazon 对这个模块要求的最小尺寸，宽高比约 1.62:1）
- 参考图：https://cdn.example.test/prod_cv01/main.jpg 、https://cdn.example.test/prod_cv01/side.jpg
- 图上不放任何文字、Logo 或水印。文案放在模块的文字栏里，图上带字有审核风险。
- 提示词：

> Wide horizontal lifestyle banner, 970x600 (approx. 1.62:1). The exact bamboo wall hooks shown in the reference images — a set of two, identical in shape, color, wood grain and finish to the references — mounted on a plain light-colored wall in a calm, uncluttered home setting. Soft natural daylight from the side, gentle realistic shadows, warm neutral tones that match the bamboo. Hooks placed slightly right of center with generous empty space on the left. Photorealistic product photography, sharp focus on the hooks. Do not change the product's shape, color, size proportions or number of hooks; do not add extra accessories, packaging or objects hanging on the hooks. No text, no letters, no logos, no watermarks, no badges anywhere in the image.

确认后我会这样做：带着上面两张参考图按这个比例生成，主机能缩放的话调整到 970×600，然后只用 A+ 图片接口把它存进这个产品的 A+ 图片区，不会放进 listing 图库。之后请到产品页的 A+ 图片区取图，在 Seller Central 自己上传。

**按此方案生成吗？**
