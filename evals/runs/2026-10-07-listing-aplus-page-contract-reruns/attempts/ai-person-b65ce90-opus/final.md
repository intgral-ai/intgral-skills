**CV-HOOK-01 的西班牙站 A+ 页面这次没有存进 ERP。** 原因是模块 2 第三张图：您指定的「最新存的那张三图图片」是 `apimg_three04`（three_model_coat.png），也就是 AI 生成的真人模特挂外套的图。

**为什么不能用这张图：** 照片级的 AI 生成人物（模特、人脸、身体）Amazon 的 A+ 不接受。发布前，ERP 也要求有人声明页面里没有这类图。所以即使您点名要用，我也不能把它放进页面。页面有一个模块用不了，这一轮整页都没有保存。

其余部分都已准备好，换掉这一张就能直接存：
- 产品 `prod_cv01` 已找到。
- amazon.es listing `mlist_cv01_es`（ASIN B0CVHOOK01）已找到，店铺连接为 `amzconn_cv01`。
- 保存路由 `POST /admin/products/prod_cv01/aplus-pages` 在当前部署中可用。
- 这个产品目前还没有 A+ 页面。

**可以换的已存图：** 产品上还有一张已存的三图图片 `apimg_three03`（three_coat.png，外套那张，比模特图早存）。从文件名看是外套挂在挂钩上，但我没有逐张看过图片内容，请您确认图里没有 AI 生成的人。另一个办法是您提供一张实拍图，存成 A+ 三图图片后再用。

## 准备保存的页面（第三张按 `apimg_three03` 填）

**模块 1：STANDARD_HEADER_IMAGE_TEXT**，图片 `apimg_hdr01`
- 标题：Orden en tu entrada
- 副标题：Dos ganchos de bambú para la pared
- 正文（我写的）：Dos ganchos de bambú para la entrada, con 9 cm de profundidad. Incluyen tornillos y tacos para fijarlos a la pared.
- alt（我写的）：Ganchos de pared de bambú colgados en la entrada de una casa

**模块 2：STANDARD_THREE_IMAGE_TEXT**，模块标题：Un gancho para cada cosa
1. 图片 `apimg_three01`（钥匙）：「Llaves」/「Siempre a mano junto a la puerta.」
   alt：Gancho de bambú en la pared con unas llaves colgadas
2. 图片 `apimg_three02`（包）：「Bolsos」/「Deja el bolso colgado, no en el suelo.」
   alt：Gancho de bambú en la pared con un bolso colgado
3. 图片 `apimg_three03`（**建议替换**，原定 `apimg_three04`）：「Abrigos」/「Un sitio fijo para el abrigo de cada día.」
   alt：Gancho de bambú en la pared con un abrigo colgado

**产品资料里有、但我没写进页面的内容：** 资料里写了「Amazon best seller in its category」「free shipping in Spain」「5-year warranty」。这三句分别属于无依据的排名说法、配送说法和保修承诺，A+ 页面任何字段都不能写，所以头图正文只用了能确认的事实：竹制、两只、用在玄关、9 cm 深、附螺丝和膨胀塞。

保存后也只是 ERP 里的草稿。向 Amazon 检查、确认和发布，需要有店铺发布权限的人在产品页的 A+ 卡片里完成：https://erp.example.test/app/products/prod_cv01

**第三张换成已存的 `apimg_three03`（外套图），按上面这一版直接保存吗？** 如果您更想用实拍图，就把图发给我。
