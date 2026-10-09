# A+ 页面草稿 - CV-HOOK-01 (amazon.es)

## 产品信息
- **SKU**: CV-HOOK-01
- **标题**: Bamboo wall hook 2pk
- **产品ID**: prod_cv01
- **站点**: amazon.es (A1RKKUPIHCS9HS)
- **店铺**: Casa Verde ES (amzconn_cv01)
- **ASIN**: B0CVHOOK01

## 已有 A+ 图片
- ✓ STANDARD_HEADER_IMAGE_TEXT (1 张): apimg_hdr01
- ✓ STANDARD_THREE_IMAGE_TEXT (3 张): apimg_three01, apimg_three02, apimg_three03
- ✓ STANDARD_FOUR_IMAGE_TEXT (1 张): apimg_four01 [无法使用 - 需要 4 张]
- ✓ STANDARD_COMPARISON_TABLE (1 张): apimg_cmp01 [无法使用 - 页面不支持]

## 拟定的 A+ 页面

### 模块 1: STANDARD_HEADER_IMAGE_TEXT
| 字段 | 内容 | 字符数 |
|------|------|--------|
| 模块标题 | Soportes de Pared en Bambú Natural | 32 |
| 副标题 | Pack de 2 Unidades | 19 |
| 正文 | Soportes elegantes y resistentes fabricados en bambú natural. Cada pieza tiene una profundidad de 9 cm, perfecta para colgar bolsas, abrigos o accesorios en la entrada. Incluye tornillos y tacos de pared para una instalación segura. Acabado natural que complementa cualquier decoración. | 255 |
| 图片 Alt 文本 | Soporte de pared en bambú instalado con accesorios colgados | 56 |

### 模块 2: STANDARD_THREE_IMAGE_TEXT
| 字段 | 内容 | 字符数 |
|------|------|--------|
| 模块标题 | Usos Versátiles | 14 |

**第 1 块** (apimg_three01 - three_keys.png)
- 标题: Organización | 字符数: 12
- 正文: Coloca las llaves de forma accesible en la entrada para no olvidarlas. El diseño en bambú añade un toque natural a tu hogar. | 字符数: 117
- Alt 文本: Llaves colgadas en el soporte de pared de bambú | 字符数: 48

**第 2 块** (apimg_three02 - three_bag.png)
- 标题: Almacenamiento | 字符数: 13
- 正文: Perfecta para bolsas, mochilas o carteras. Aprovecha el espacio vertical de tu entrada de forma decorativa y funcional. | 字符数: 116
- Alt 文本: Bolsa colgada en el soporte de bambú | 字符数: 37

**第 3 块** (apimg_three03 - three_coat.png)
- 标题: Practicidad | 字符数: 11
- 正文: Ideal para abrigos y accesorios. Con capacidad para soportar objetos del día a día en la entrada o pasillo. | 字符数: 108
- Alt 文本: Abrigo colgado en el soporte de pared de bambú | 字符数: 46

## 验证清单

✓ 只用已存的 A+ 图片  
✓ 文本全部用西班牙语 (site locale: es-ES)  
✓ 无价格、促销、配送、保修、竞品或无依据说法  
✓ 无照片级 AI 生成真人  
✓ 所有字符数在上限内  
✓ Alt 文本为 1-100 字符  
✓ 无现有页面冲突 (aplus_pages 为空)  

## 下一步

已准备好保存为草稿。向商家确认后，使用以下参数调用 `medusa.admin_post`:

```json
{
  "path": "/admin/products/prod_cv01/aplus-pages",
  "body": {
    "store_id": "amzconn_cv01",
    "marketplace_id": "A1RKKUPIHCS9HS",
    "modules": [
      {
        "type": "STANDARD_HEADER_IMAGE_TEXT",
        "headline": "Soportes de Pared en Bambú Natural",
        "blocks": [
          {
            "image_id": "apimg_hdr01",
            "alt_text": "Soporte de pared en bambú instalado con accesorios colgados",
            "headline": "Pack de 2 Unidades",
            "body": "Soportes elegantes y resistentes fabricados en bambú natural. Cada pieza tiene una profundidad de 9 cm, perfecta para colgar bolsas, abrigos o accesorios en la entrada. Incluye tornillos y tacos de pared para una instalación segura. Acabado natural que complementa cualquier decoración."
          }
        ]
      },
      {
        "type": "STANDARD_THREE_IMAGE_TEXT",
        "headline": "Usos Versátiles",
        "blocks": [
          {
            "image_id": "apimg_three01",
            "alt_text": "Llaves colgadas en el soporte de pared de bambú",
            "headline": "Organización",
            "body": "Coloca las llaves de forma accesible en la entrada para no olvidarlas. El diseño en bambú añade un toque natural a tu hogar."
          },
          {
            "image_id": "apimg_three02",
            "alt_text": "Bolsa colgada en el soporte de bambú",
            "headline": "Almacenamiento",
            "body": "Perfecta para bolsas, mochilas o carteras. Aprovecha el espacio vertical de tu entrada de forma decorativa y funcional."
          },
          {
            "image_id": "apimg_three03",
            "alt_text": "Abrigo colgado en el soporte de pared de bambú",
            "headline": "Practicidad",
            "body": "Ideal para abrigos y accesorios. Con capacidad para soportar objetos del día a día en la entrada o pasillo."
          }
        ]
      }
    ]
  }
}
```

页面保存后，由商家在 ERP 产品页 A+ 卡片里完成向 Amazon 的检查、确认和发布。
