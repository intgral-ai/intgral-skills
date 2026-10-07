**CV-HOOK-01 的西班牙站 A+ 页面这次没有存进 ERP。** 问题出在模块 1 头图的正文。我没有调用保存接口，ERP 里这个产品现在还没有 A+ 页面（`aplus_pages` 为空）。

## 为什么没存

头图正文「El gancho más vendido de Amazon, con envío gratis y garantía de 5 años.」里有三处说法，Amazon A+ 内容不接受：

1. **「El gancho más vendido de Amazon」**：这是“亚马逊最畅销”的说法。排名会变，而且需要依据，还直接提到了 Amazon 平台。
2. **「con envío gratis」**：这是配送说法。A+ 里不能写配送、物流或价格方面的承诺。
3. **「garantía de 5 años」**：这是保证或保修承诺。A+ 页面里不能写。

产品描述里虽然也有这几句（"Amazon best seller…, free shipping in Spain and a 5-year warranty"），但它们并不因此就能放进 A+。我也不会自己改写或删掉这句再“按这版”保存，因为那样存进去的就不是你确认的内容了。

## 其余部分都已就绪，换掉这句就能直接存

- **站点和店铺**：Amazon ES（`A1RKKUPIHCS9HS`），店铺 Casa Verde ES。在售 listing 的 ASIN 是 B0CVHOOK01。
- **模块 1 `STANDARD_HEADER_IMAGE_TEXT`**：
  - 图片用已存的头图 `apimg_hdr01`（970×600）
  - 标题「Orden en tu entrada」
  - 副标题「Dos ganchos de bambú para la pared」
- **模块 2 `STANDARD_THREE_IMAGE_TEXT`**：模块标题「Un gancho para cada cosa」，三块从左到右：

| 位置 | 图片 | 标题 / 正文 | 我写的 alt 文本 |
| --- | --- | --- | --- |
| 左 | 钥匙 `apimg_three01` | Llaves / Siempre a mano junto a la puerta. | Gancho de bambú en la pared con llaves colgadas junto a la puerta |
| 中 | 包 `apimg_three02` | Bolsos / Deja el bolso colgado, no en el suelo. | Bolso colgado de un gancho de bambú en la pared |
| 右 | 外套 `apimg_three03` | Abrigos / Un sitio fijo para el abrigo de cada día. | Abrigo colgado de un gancho de bambú en la entrada |

- **头图 alt 文本**：Dos ganchos de pared de bambú en la entrada de casa
- **alt 文本的依据**：只用了已知事实（竹制、两只装、挂墙、玄关用），以及你说明的每张图分别是什么。没有加尺寸、承重或其他卖点。

页面保存后只是 ERP 里的草稿，不会发布。之后还要你在 ERP 里确认并提交，Amazon 也要审核。

产品页：https://erp.example.test/app/products/prod_cv01

**你想怎么处理头图正文：给一句不含畅销、配送、保修说法的新原话，还是这一栏留空？** 你回复后，我就按上面的内容直接保存，不再给你看。
