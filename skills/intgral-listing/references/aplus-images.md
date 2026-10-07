# A+ 图片

A+（EBC、品牌内容）图片存在产品的 A+ 图片区，与 listing 图库分开，只经 `medusa.attach_aplus_images` 存放，
且仅当部署列出了这个工具。没列出就说明当前部署不支持存放 A+ 图片，此时不生成，也不改用 `medusa.update_product` /
`medusa.update_listing` 存图（那会把它们放进 Amazon listing 图库）。这里只存图，不发布；存好的图组成页面按 [A+ 页面](aplus-pages.md)。
A+ 图片只由人在 ERP 后台删除，Agent 不删。

只接受这五个 Standard 模块（`module` 即 SP-API 的 `contentModuleType`），其他模块和 Premium 不提供：

| `module` | 最小像素 |
| --- | --- |
| `STANDARD_HEADER_IMAGE_TEXT` | 970x600 |
| `STANDARD_IMAGE_TEXT_OVERLAY` | 970x300 |
| `STANDARD_THREE_IMAGE_TEXT` | 300x300 |
| `STANDARD_FOUR_IMAGE_TEXT` | 220x200 |
| `STANDARD_COMPARISON_TABLE` | 150x300 |

合格文件：不小于最小像素，宽高比与之完全一致（高 = round(宽 × 最小高 / 最小宽)），png 或 jpeg，不超过 2 MB。

图上文字只用用户给的原话，一字不改；Agent 不写、不译、不润色文案。原话含价格、促销或折扣、配送说法、保证或保修、竞品、或没有依据的说法时，提议前就拒绝：指出哪几处、为什么，请用户换自己的原话或不放文字，这一轮不生成。带文字的图存放时给该图填 `locale`（BCP-47，按文字语言和站点，如西班牙站的西班牙语为 `es-ES`）；不带文字不填。

1. 用 `medusa.get_product` 确定 SKU 对应的产品，再用 `medusa.view_product_images` 取它的图片作为参考图（已存的 A+ 图另在 `aplus_images`，不计入 total_images）；外观只取自这些图和已确认事实，不添加没有来源的卖点。没有可信参考图就请用户先给产品照片，这一轮不生成。
2. 提议模块、目标像素、完整提示词、图上原话和 `locale`（没有就写“不放文字”），说明会存到产品上，然后只问一个问题：按此生成并存吗？请求本身已确认了这些就不再问。得到“是”之前，不生成、不存；之后生成并存，不问第二次。
3. 带着第 1 步的参考图、按该模块的宽高比生成，生成能力和“已生成”的说法按[图片处理](images.md)第 2 条，只报主机实际返回的。主机能裁剪或缩放就处理成合格文件；做不出合格文件就不发送（ERP 会拒收），告诉用户目标尺寸，请他在 ERP 产品页的 A+ 卡片选模块和语言、上传自己裁好的图。
4. 调用 `medusa.attach_aplus_images`：`product_id` 或 `sku`，加 `images: [{module, locale?, path | url | data_base64}]`。读返回的逐张报告（`included`、`reason`: duplicate / rejected、`findings`），说清哪些存了、哪些没有；被拒的按 `findings` 里的目标尺寸，同第 3 步交给产品页的 A+ 卡片。
5. 告诉用户图已存在产品页（`erp_url`）的 A+ 图片区，可以用它们组 [A+ 页面](aplus-pages.md)；部署不支持 A+ 页面时，用户从这里取图，自己在 Seller Central 上传。
