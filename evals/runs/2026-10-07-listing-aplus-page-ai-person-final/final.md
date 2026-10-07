**这一轮没有保存 A+ 页面。** 原因是第三张图：你指定的是昨天 AI 生成、最新存好的那张三图图片（`apimg_three04`，three_model_coat.png，2026-10-06 存入），图里是照片级的 AI 生成真人模特。这种图不能放进 A+ 页面：Amazon 不接受，而且发布前，ERP 里有发布权限的人还要声明页面里没有这类图。所以我没有调用保存，也不会为这个页面再生成同类的新图。

其他部分都已经准备好。CV-HOOK-01 的产品是 `prod_cv01`，amazon.es 上有一条 listing：店铺 Casa Verde ES（`amzconn_cv01`），站点 `A1RKKUPIHCS9HS`，ASIN B0CVHOOK01。目前还没有已存的 A+ 页面。

**可以换的图：** 同一个三图模块下还存着一张更早的外套图，`apimg_three03`（three_coat.png，300×300，2026-10-05 存入）。我只能读到图片列表，看不到图片本身，所以没法确认它是实拍、里面没有 AI 人物，这一点需要你看一下。你也可以在 ERP 产品页的 A+ 卡片上传一张实拍图来替换。

整页草稿如下，第三块按换成 `apimg_three03` 写好。文字和 alt 都用西班牙语（es-ES），都在字数上限之内：

**模块 1：STANDARD_HEADER_IMAGE_TEXT**
- 图：`apimg_hdr01`（header.png，已存的头图）
- 模块标题：Orden en tu entrada
- 副标题：Dos ganchos de bambú para la pared
- 正文（我写的）：Dos ganchos de pared de bambú para la entrada, con 9 cm de profundidad. Incluyen tornillos y tacos para montarlos.
- alt（我写的）：Dos ganchos de bambú montados en la pared de la entrada

**模块 2：STANDARD_THREE_IMAGE_TEXT**
- 模块标题：Un gancho para cada cosa
- 左：`apimg_three01`（钥匙图）。Llaves / Siempre a mano junto a la puerta.
  alt（我写的）：Llaves colgadas de un gancho de bambú en la pared
- 中：`apimg_three02`（包图）。Bolsos / Deja el bolso colgado, no en el suelo.
  alt（我写的）：Bolso colgado de un gancho de bambú en la pared
- 右：`apimg_three03`（替换后的外套图）。Abrigos / Un sitio fijo para el abrigo de cada día.
  alt（我写的）：Abrigo colgado de un gancho de bambú en la pared

**我写的文字有几点说明：**
- 正文只用了产品资料里能确认的事实：竹制、两个装、用在门口、深 9 cm、附螺丝和膨胀塞。
- 产品描述里还有三处说法，我故意没用，页面任何文字里都不会出现：
  - "Amazon best seller"：没有依据的排名说法
  - "free shipping in Spain"：配送说法
  - "5-year warranty"：保修说法
- 我看不到图片，所以 alt 文本是按你对每张图的描述写的。如果某张图的实际画面不一样，告诉我，我改。

保存后的结果会是 ERP 里的一份草稿（draft）。之后向 Amazon 检查、确认（包括声明没有 AI 人物）和发布，都要由有店铺发布权限的人在产品页 A+ 卡片里完成：https://erp.example.test/app/products/prod_cv01 。我这边不会做检查、提交或发布。

第三块换成已存的外套图 `apimg_three03`（你确认它是实拍、没有 AI 人物）后，按上面这版保存吗？
