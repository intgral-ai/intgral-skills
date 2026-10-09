这一版 **没有存进 ERP**：模块 1 的正文里有三处 A+ 页面不能写的说法，按规则必须先改掉才能保存。

## 需要改的地方（模块 1 正文）

原文：「El gancho más vendido de Amazon, con envío gratis y garantía de 5 años.」

1. **「El gancho más vendido de Amazon」**：这是“最畅销/第一”一类的排名说法，而且直接提到 Amazon。A+ 页面不写没有依据的排名说法。
2. **「con envío gratis」**：这是配送说法。A+ 页面任何字段都不能写配送条件。
3. **「garantía de 5 años」**：这是保修/保证说法，同样不能写进 A+ 页面。

产品资料（ERP 产品描述）里虽然也写了“Amazon best seller”、“free shipping in Spain”、“5-year warranty”，但这些内容同样不能用在 A+ 页面里。

**建议改写**（只用产品资料里已有的事实：两只装、竹子材质、用在玄关、9 cm 深、附螺丝和膨胀塞）：
「Dos ganchos de bambú de 9 cm de fondo, con tornillos y tacos incluidos.」

## 其余部分已经准备好，只等正文

- 产品：CV-HOOK-01（prod_cv01）。amazon.es listing 是 ASIN B0CVHOOK01，店铺连接 amzconn_cv01，站点 A1RKKUPIHCS9HS。
- 保存路由 `POST /admin/products/prod_cv01/aplus-pages` 已在部署中确认。
- 这个产品目前还没有 A+ 页面，这次保存会新建一页草稿。

**模块 1 · STANDARD_HEADER_IMAGE_TEXT**（图 apimg_hdr01）
- 标题：Orden en tu entrada
- 副标题：Dos ganchos de bambú para la pared
- 正文：待你确认改法
- alt：Dos ganchos de pared de bambú en la entrada de una casa

**模块 2 · STANDARD_THREE_IMAGE_TEXT**，模块标题：Un gancho para cada cosa
- 左（钥匙图 apimg_three01）：Llaves / Siempre a mano junto a la puerta.
  alt：Llaves colgadas de un gancho de bambú junto a la puerta
- 中（包图 apimg_three02）：Bolsos / Deja el bolso colgado, no en el suelo.
  alt：Bolso colgado de un gancho de bambú en la pared
- 右（外套图 apimg_three03）：Abrigos / Un sitio fijo para el abrigo de cada día.
  alt：Abrigo colgado de un gancho de bambú en la entrada

除了模块 1 的正文，其他文字都照你的原文用。alt 文本是按你说的图片内容（钥匙/包/外套）和已存图片的用途写的，我没有逐张看过图片。

正文改好后我就按上面的方案存成草稿。存好后，向 Amazon 检查和发布要由有权限的人在 ERP 产品页的 A+ 卡片里操作。产品页：https://erp.example.test/app/products/prod_cv01

**模块 1 的正文用上面的建议改写，还是你另给一句（或者删掉正文）？**
