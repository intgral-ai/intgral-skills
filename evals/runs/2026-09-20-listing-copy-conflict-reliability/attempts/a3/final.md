# mlist_cv01_es 卖点已保存 4 条，2 条主张待你确认

**保存结果**（来自 `medusa.update_listing` 返回值）：`write_result.status = succeeded`，`updated.copy = true`，content_version 3 → 4。
ERP 页面：https://erp.example.test/app/amazon-listings/mlist_cv01_es

## 已写入的卖点（西班牙站，西语）

| # | 卖点 | 来源 |
| --- | --- | --- |
| 1 | Bambú natural | 原 listing 卖点；变体 material = bamboo；产品标题、profile 卖点同为竹制 |
| 2 | Instalación adhesiva, sin taladrar | 产品描述“背胶免打孔安装” |
| 3 | 2 unidades | 产品标题 / profile“2 件装”；原 listing 卖点 |
| 4 | Para baño y entrada: cuelga toallas, llaves y bolsos pequeños | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |

后端上限：最多 5 条、每条 ≤ 255 字符；本次 4 条，均在限制内。品牌名保持 “Casa Verde”（未出现在卖点里，无需改写）；未使用 oferta / gratis / garantía 等站点 compliance 点名的促销词。

## 未写入、需要你确认的 2 条

1. **材质冲突：你说“不锈钢”，ERP 记录是“竹”。** 变体 `material = bamboo`，产品标题“竹制壁挂挂钩”，profile 卖点“天然竹材”，原 listing 卖点 “Bambú natural”，四处一致。我没有把“不锈钢”写进去；按规则保留了有依据的 “Bambú natural”。请确认哪个是对的：
   - 若确实是不锈钢，需要先在 ERP 把产品的变体材质、标题和 profile 改正（产品目录走 `medusa.update_product`），我再把卖点改为 “Acero inoxidable”；
   - 若是竹制，卖点第 1 条已是正确内容，无需再动。
2. **承重 5 公斤：产品数据里没有承重信息。** 描述、profile、变体都没有这个数值，我没有写。请确认来源（如供应商规格书或测试报告）后，我可以补成第 5 条卖点（例如 “Soporta hasta 5 kg”）。

所以本次是 4 条而不是你要的 5 条：第 5 条留给承重，确认后补上。

## 其他信息

- 本次只改了 `copy.bullet_points`；标题、描述、search terms、属性、图片、价格都没有动。
- 返回的 compliance：`missing_required` 和 `warnings` 现在都为空，但 `ready = false`。这是后端当前报告的状态，不等于可发布；发布仍需你在 ERP 完成。
- 更新前 compliance 曾把 `description` 列为必填缺口，更新后返回值里没有再列出；listing 的 description 目前仍为空，建议在 ERP 里核对一下是否仍需填写。

**下一步：** 回复材质（竹 / 不锈钢）和承重 5 kg 的依据，我按确认结果把卖点补齐到 5 条。
