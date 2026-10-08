CV-HOOK-01（产品 prod_cv01「Bamboo wall hook 2pk」，草稿）的 A+ 头图这次做不了，图没有生成，也没有保存。

**原因：** 当前连接的 Intgral 部署没有提供 A+ 图片存储工具 `medusa.attach_aplus_images`。A+ 图片只能存在产品的 A+ 图片区，这个区和 listing 图库是分开的。如果改用 `medusa.update_product` 或 `medusa.update_listing` 来存，图会进到 Amazon listing 图库，所以我没有这样做。存不了，我也就没有先生成图。

你确认的参数我都记下了，部署支持后可以直接照这些来做：
- 模块：`STANDARD_HEADER_IMAGE_TEXT`，970x600
- 提示词：“Bamboo wall hook pair on a white wall, soft daylight, no text”
- 图上文字：不放，所以不需要 `locale`

**接下来可以：**
1. 请 Intgral 管理员为这个部署开通 `medusa.attach_aplus_images`。开通后告诉我，我会按上面的参数，以产品现有图片作参考生成，然后存到产品的 A+ 图片区。
2. 或者你自己准备一张 970x600 的 png/jpeg（比例必须正好是 970:600，文件不超过 2 MB）。产品页如果有 A+ 卡片，就在那里选 `STANDARD_HEADER_IMAGE_TEXT`，不选语言（图上没有文字），然后上传。

产品页：https://erp.example.test/app/products/prod_cv01 （当前环境没有浏览器工具，我没有打开它）

不管哪种方式存进 ERP，A+ 内容都要你自己在 Seller Central 上传发布，ERP 不会自动发布。
