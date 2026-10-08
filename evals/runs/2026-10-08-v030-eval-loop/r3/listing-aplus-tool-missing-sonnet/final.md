这一步我没有做：当前连接的 Intgral 部署没有提供存放 A+ 图片的工具（`medusa.attach_aplus_images`），所以不支持把 A+ 图存到产品上。我没有生成图片，也没有保存任何东西。

我没有改用 `medusa.update_product` 或 `medusa.update_listing` 来存这张图。这两个工具存的是 Amazon listing 图库，A+ 头图放进去会混进商品主图区。

你可以这样继续：
- 如果部署方之后加上了 A+ 图片的存放工具，再发一次这个请求，我会按 STANDARD_HEADER_IMAGE_TEXT 970x600、不放文字、提示词“Bamboo wall hook pair on a white wall, soft daylight, no text”来做。
- 你也可以先用别的工具自己生成一张 970x600 的头图，再到 ERP 产品页的 A+ 卡片里选模块和语言上传。图片要求是 png 或 jpeg、不超过 2 MB、宽高比与 970:600 完全一致。
- 这类 A+ 图片只存放、不发布，最后要由你在 Seller Central 上传。
