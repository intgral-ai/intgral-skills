# 待存 A+ 页面审查

## 问题

检查到正文包含未依据的说法，无法保存：

- **原文**：El gancho más vendido de Amazon, con envío gratis y garantía de 5 años.
- **问题**：「最畅销」(más vendido) 是无依据的优越性说法，Amazon A+ 页面不允许
- **规范依据**：[A+ 页面拒绝项] 价格、促销、配送、保证、竞品或无依据说法不写进任何字段

## 需要用户决定

选择以下方案之一：

1. 删除说法，改为：「Gancho de bambú para la pared con envío gratis y garantía de 5 años.」
2. 提供其他已确认的、可替换「最畅销」的说法

## 待保存内容结构

一旦修改确认，将保存：

**模块 1**：STANDARD_HEADER_IMAGE_TEXT
- headline: Orden en tu entrada
- block.headline: Dos ganchos de bambú para la pared
- block.body: [待修改]
- block.alt_text: [Agent 起草]

**模块 2**：STANDARD_THREE_IMAGE_TEXT  
- headline: Un gancho para cada cosa
- blocks[0]: headline=Llaves, body=Siempre a mano junto a la puerta., alt_text=[Agent 起草]
- blocks[1]: headline=Bolsos, body=Deja el bolso colgado, no en el suelo., alt_text=[Agent 起草]
- blocks[2]: headline=Abrigos, body=Un sitio fijo para el abrigo de cada día., alt_text=[Agent 起草]

## 下一步

等待用户提供修改后的正文内容。
