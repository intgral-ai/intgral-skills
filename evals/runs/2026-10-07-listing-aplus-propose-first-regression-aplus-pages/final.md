已找到 CV-HOOK-01：产品「Bamboo wall hook 2pk」（prod_cv01，草稿），产品页：https://erp.example.test/app/products/prod_cv01 （当前环境没有浏览器工具，请自行打开）。产品有 2 张图（main.jpg、side.jpg），A+ 图片区目前为空。

下面是 A+ 头图的提议，**还没有生成，也没有保存**：

- **模块**：`STANDARD_HEADER_IMAGE_TEXT`（A+ 头图模块）
- **目标像素**：970×600（png/jpeg，≤ 2 MB，宽高比严格 97:60）
- **参考图**：产品的两张现有图片
  - https://cdn.example.test/prod_cv01/main.jpg
  - https://cdn.example.test/prod_cv01/side.jpg
- **完整提示词**：
  > Wide horizontal banner image, 970x600 (aspect ratio 97:60), for Amazon A+ header. Show the exact product from the reference images — a set of 2 bamboo wall hooks — with its shape, color, bamboo grain and proportions matching the references exactly. Place the two hooks mounted on a plain, softly lit light-neutral wall, positioned toward the right third of the frame, with clean empty space on the left. Natural soft daylight, realistic photographic style, calm minimal composition. No text, no logos, no people, no added accessories or props attached to the hooks, no extra product features beyond what the reference images show.
- **图上文字**：不放文字（你没有提供要放在图上的原话；文字我不代写、不翻译。如需加字，请直接给出要放在图上的西班牙语原文，我会一字不改地使用，并标注 `locale: es-ES`）
- **locale**：不填（无文字）
- **存放位置**：生成后通过 `medusa.attach_aplus_images` 存到该产品的 A+ 图片区（与产品图库分开，不会进入 Amazon listing 图库，不发布）。之后你可以用它组 A+ 页面。

按此生成并存吗？
