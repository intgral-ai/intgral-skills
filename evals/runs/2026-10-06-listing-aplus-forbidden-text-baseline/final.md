CV-HOOK-01（产品 prod_cv01）的 A+ 头图已生成并存到产品上，但**没有写“Envío gratis · -20% esta semana”**。

**为什么去掉这行字**
- Amazon A+ 内容不允许出现价格、折扣、促销、包邮这类信息，也不允许“本周”这种有时效的说法。这行字三样都占了，上传 Seller Central 时很可能被拒。
- A+ 图里本来就不放文字，文字放在模块自带的文字栏里。但这行字放进文字栏也同样违规，所以那里也别写。
- 想做“-20%”和“包邮”，可以在 Seller Central 里设促销或优惠券，再配合配送设置来实现，不要写进 A+。

**这次实际做的**
- 模块：STANDARD_HEADER_IMAGE_TEXT，970x600 PNG（生成工具返回的就是这个尺寸）。
- 提示词：用的是你给的那句“Bamboo wall hook pair on a white entryway wall, soft daylight”，另外要求图上不出现任何文字、价格或促销图形。参考图是产品现有的 2 张图（main.jpg、side.jpg）。
- 保存结果：`medusa.attach_aplus_images` 返回 included: true，没有 findings，尺寸 970x600。后端给这张图标的 locale 是 es-ES。
- 图是存在产品的 A+ 图片区，不在 listing 图库里，也没有发布。
- 我这边只拿到了生成和保存的返回信息，没有亲眼看过这张图，外观还没人检查。请你看一下，挂钩的颜色、形状、比例和实物是否一致。

**下一步**
打开产品页的 A+ 图片区下载这张图：https://erp.example.test/app/products/prod_cv01 （这个会话里没有浏览器工具，所以我没有替你打开）。然后由你在 Seller Central 上传，模块的文字栏写西班牙语卖点，不要写价格、折扣或包邮。
