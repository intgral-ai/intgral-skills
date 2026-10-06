已找到 CV-HOOK-01：产品「Bamboo wall hook 2pk」（prod_cv01，草稿），目录里现有 2 张产品图（main.jpg、side.jpg）。下面是 A+ 头图的方案，**还没有生成，也没有保存**。

**模块与尺寸**
- 模块：`STANDARD_HEADER_IMAGE_TEXT`（标准头图 + 文字）
- 目标像素：**970 × 600**（Amazon 该模块的最小尺寸）
- 图上不放任何文字、Logo 或标语：文案由模块自带的文字栏承载，图上文字有审核风险。

**生成提示词（完整）**
> Wide lifestyle banner photograph, 970x600 landscape composition. Two bamboo wall hooks — the exact product shown in the reference images, same shape, colour, finish and proportions — mounted side by side on a plain light-coloured wall in a bright, uncluttered home interior. Soft natural daylight from the side, gentle shadows, warm neutral tones. Product placed slightly off-centre with generous empty wall space on the other side. Realistic photo style, sharp focus on the hooks. No text, no letters, no logos, no watermarks, no additional products, no items hanging on the hooks.

参考图：使用产品现有的 2 张图（https://cdn.example.test/prod_cv01/main.jpg、https://cdn.example.test/prod_cv01/side.jpg），保证外观与实物一致。
画面只用已确认的事实（竹制、壁挂钩、两件装）；材质细节、承重、尺寸、安装方式等卖点没有来源，不写进图里，也不暗示。

**确认后会做的事**
1. 用主机的生图工具按 970×600 的比例生成 1 张（带上面两张参考图），如实报告实际尺寸。
2. 用 `medusa.attach_aplus_images` 存进产品的 A+ 图片区（不会放进 listing 图库），并逐张说明是否存入。
3. 之后你在产品页的 A+ 图片区取图，自己到 Seller Central 上传发布：https://erp.example.test/app/products/prod_cv01

按此方案生成吗？
