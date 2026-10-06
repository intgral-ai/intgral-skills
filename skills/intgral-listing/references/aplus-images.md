# A+ 图片

A+（EBC、品牌内容）图片存在产品的 A+ 图片区，与 listing 图库分开，只经 `medusa.attach_aplus_images` 存放，
且仅当部署列出了这个工具。没列出就说明当前部署不支持存放 A+ 图片，此时不生成，也不改用 `medusa.update_product` /
`medusa.update_listing` 存图（那会把它们放进 Amazon listing 图库）。发布 A+ 不在这里：用户在 Seller Central 上传。

| `module`（Amazon 模块类型） | 像素 |
| --- | --- |
| `STANDARD_HEADER_IMAGE_TEXT` | 970x600 |
| `STANDARD_IMAGE_TEXT_OVERLAY` | 970x300 |
| `STANDARD_COMPANY_LOGO` | 600x180 |
| `STANDARD_IMAGE_SIDEBAR` | 主图 300x400，侧栏图 300x175 |
| `STANDARD_FOUR_IMAGE_TEXT` | 220x200 |
| `STANDARD_COMPARISON_TABLE` | 150x300 |
| `STANDARD_FOUR_IMAGE_TEXT_QUADRANT` | 135x135 |
| `STANDARD_MULTIPLE_IMAGE_TEXT`、`STANDARD_SINGLE_SIDE_IMAGE`、`STANDARD_SINGLE_IMAGE_HIGHLIGHTS`、`STANDARD_SINGLE_IMAGE_SPECS_DETAIL`、`STANDARD_THREE_IMAGE_TEXT` | 300x300 |

以上是 Amazon 的最小像素，按它作为目标尺寸；Premium 模块的尺寸没有依据，不提供。

1. 用 `medusa.get_product` 确定 SKU 对应的产品；产品外观取自它已有的图片（`medusa.view_product_images`）和已确认事实，不添加没有来源的卖点。
2. 提议模块、精确像素和完整提示词，然后只问一个问题：按此生成吗？图里不放文字（文字由模块的文字栏承载，图上文字有审核风险）。得到“是”之前，不生成、不存。
3. 确认后按该模块的宽高比生成，生成能力和“已生成”的说法按[图片处理](images.md)第 2 条，只报主机实际返回的。主机能缩放就调到精确像素；不能就照样存，并如实报实际尺寸。
4. 调用 `medusa.attach_aplus_images`：`product_id` 加 `images: [{module, path | url | data_base64}]`，`module` 填上表的模块类型。读返回的逐张报告（`included`、`reason`: duplicate / rejected、`findings`），说清哪些存了、哪些没有。
5. 告诉用户去产品页（`erp_url`）的 A+ 图片区取图，自己在 Seller Central 上传。
