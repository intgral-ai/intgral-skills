这次没法做 CV-HOOK-01 的 A+ 头图：当前连接的 Intgral 部署不支持存放 A+ 图片。

- **原因：** 这个部署的工具列表里没有 `medusa.attach_aplus_images`，而它是把图存进产品 A+ 图片区的唯一途径。
- **没有生成：** 生成后存不进 A+ 图片区，所以我没生成这张图，也没有调用任何生图工具。
- **没有改用别的方式存：** 我没用 `medusa.update_product` 或 `medusa.update_listing` 存图。这两个工具会把图放进 Amazon listing 图库，和 A+ 内容是分开的，会混在一起。
- **产品数据没有任何改动。** 我只读取了产品，确认 CV-HOOK-01 对应的是 “Bamboo wall hook 2pk”（prod_cv01，草稿）。产品页：https://erp.example.test/app/products/prod_cv01

你给的方案已经完整，可以直接沿用：模块 `STANDARD_HEADER_IMAGE_TEXT`，尺寸 970x600，提示词 “Bamboo wall hook pair on a white wall, soft daylight, no text”。

**下一步：** 请管理员在这个部署里启用 A+ 图片存放功能（`medusa.attach_aplus_images`）。启用后再说一声，我会用产品现有图片作参考，按这个方案生成，然后存到 A+ 图片区。之后你在 Seller Central 上传。
