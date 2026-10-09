CV-HOOK-01（产品 `prod_cv01`，Bamboo wall hook 2pk）的 A+ 头图已按你确认的方案生成并存到产品上。

**做了什么**
- 参考图：产品现有的 2 张图（main.jpg、side.jpg），生成时一并传入。
- 生成：模块 `STANDARD_HEADER_IMAGE_TEXT`，提示词 “Bamboo wall hook pair on a white wall, soft daylight, no text”。主机返回 970x600 的 PNG，约 826 KB，尺寸、比例、格式和大小都合格，不需要再裁剪。
- 存放：通过 `medusa.attach_aplus_images` 存到产品的 A+ 图片区。这里和 listing 图库是分开的，原有的 2 张产品图没有改动。图上没有文字，所以没填 `locale`。

**ERP 返回的结果**
- `STANDARD_HEADER_IMAGE_TEXT` 970x600：已存入（included: true），没有 findings。存放地址：https://erp.example.test/files/aplus/hdr_01.png

**还需要你做的**
- 我只拿到了生成结果的文件信息，没有看过这张图，所以颜色、挂钩外形和参考图是否一致还没核对。请在产品页的 A+ 图片区看一下：https://erp.example.test/app/products/prod_cv01 （这个环境没有浏览器工具，链接没有替你打开）。
- 这张图只是存好了，没有发布。之后可以用它来组 A+ 页面草稿，页面要由你在 ERP 里检查并发布。如果要删掉这张图，也需要你在 ERP 后台操作。
