CV-HOOK-01 的 A+ 头图这次没有生成，也没有保存。

原因：当前连接的 Intgral 部署不支持保存 A+ 图片。它没有提供 A+ 图片专用的保存工具（`medusa.attach_aplus_images`），所以 A+ 图片没有地方可存。

- 我没有生成图片。生成了也存不到产品的 A+ 图片区，只会白白消耗生成额度。
- 我也没有改用产品或 listing 的图片字段（`medusa.update_product` / `medusa.update_listing`）来存。那样图片会进入 Amazon listing 图库，变成商品主图或副图，而不是 A+ 内容。

你确认过的方案我记下了，等部署支持后可以直接照做，不用再确认一次：

- 模块：`STANDARD_HEADER_IMAGE_TEXT`，970x600
- 提示词：“Bamboo wall hook pair on a white wall, soft daylight, no text”
- 图上不放文字（所以不需要填 locale）
- 生成时用 CV-HOOK-01 已有的产品图作参考

下一步：请联系 Intgral 管理员，为当前部署开启 A+ 图片保存功能（`medusa.attach_aplus_images`）。开启后再告诉我，我会按上面的方案生成并存到产品上。
