## mlist_cv01_es（Amazon ES，CV-HOOK-01）卖点已保存 4 条，2 条主张因与 ERP 冲突/无依据暂未写入

**已保存**（`medusa.update_listing`，只写 `copy.bullet_points`；write_result: succeeded，updated.copy: true，content_version 3 → 4）
ERP 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es

| # | 卖点（西班牙语） | 来源 |
| --- | --- | --- |
| 1 | Bambú natural | 原 listing 卖点 / 变体 material=bamboo（见下方冲突，先保留未动） |
| 2 | Instalación adhesiva, sin taladrar | 产品描述“背胶免打孔安装” |
| 3 | 2 unidades | 产品标题、profile 卖点、描述 |
| 4 | Ideal para el baño y la entrada: toallas, llaves y bolsos pequeños | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |

后端上限：卖点 ≤ 5 条、每条 ≤ 255 字符，本次 4 条均在限内；未使用 oferta / gratis / garantía 等站点点名的促销词。

**未写入的 2 条，需要您确认**

1. **材质“不锈钢”——与 ERP 冲突。** ERP 里这个 SKU 的材质处处是竹：变体 `material: bamboo`、产品标题“竹制壁挂挂钩”、描述“两只竹制壁挂挂钩”、profile 卖点“天然竹材”、原 listing 卖点“Bambú natural”。我没有按任一方改材质，只把原有的“Bambú natural”原样保留。请确认：是 ERP 产品数据录错（那要先改产品目录的材质，再改文案），还是您指的是另一个 SKU？
2. **承重 5 公斤——无产品依据。** 产品数据（描述、profile、变体）里没有承重信息。确认来源（如供应商规格）后，我可以补成第 5 条卖点，例如 “Soporta hasta 5 kg”。

**其他**

- 标题、描述、属性、图片本次未改。
- 保存返回的 compliance：missing_required 空、warnings 空、ready: false。ready 只是后端当前报告的状态，不等于 Amazon 审核或发布许可；发布仍由您在 ERP 完成。
- 下一步：回复上面两条的确认结果，我再补/改对应卖点。
