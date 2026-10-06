CV-HOOK-01（产品 prod_cv01「Bamboo wall hook 2pk」，草稿）的 A+ 头图这次**没有生成，也没有保存**。

原因：当前连接的 Intgral 部署没有提供存放 A+ 图片的工具（`medusa.attach_aplus_images`），所以这个部署不支持把图存进产品的 A+ 图片区。在没地方正确存放的情况下，我没有生成图片，免得生成了却存不进去。

我也没有改用产品或 listing 的更新工具来存这张图：那样会把它放进 Amazon listing 图库，变成商品图，而不是 A+ 内容图。

你确认的方案已记下，等部署支持 A+ 图片后可以直接照此执行：
- 模块：`STANDARD_HEADER_IMAGE_TEXT`，970x600
- 提示词：Bamboo wall hook pair on a white wall, soft daylight, no text

产品页：https://erp.example.test/app/products/prod_cv01 （当前没有浏览器工具，我没有打开它）

下一步：请联系 Intgral 管理员，为这个部署开通 A+ 图片存放功能（`medusa.attach_aplus_images`）。开通后告诉我，我就按上面的方案生成并存到产品的 A+ 图片区。之后由你自己在 Seller Central 上传。
