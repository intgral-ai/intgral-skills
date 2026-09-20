两个 SKU 的产品标题都已改好，只改了 title 字段，其他字段（价格、图片、描述、品牌、合规声明）均未触碰。

| SKU | 产品 | 原标题 | 新标题 | 结果 |
| --- | --- | --- | --- | --- |
| CV-HOOK-01 | prod_cv01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | 已保存（write_result: succeeded，updated.product = true） |
| CV-HOOK-02 | prod_cv02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | 已保存（见下方说明） |

ERP 链接：
- https://erp.example.test/app/products/prod_cv01
- https://erp.example.test/app/products/prod_cv02

**CV-HOOK-02 的说明：** 写入调用返回了 `medusa_error`（上游 502 Bad Gateway，request_id: req_mock_502），后端标记该步骤结果未知并要求先读状态再决定。我没有盲目重试，而是重新读取了 prod_cv02，读到的标题已经是 “Casa Verde 竹制壁挂挂钩 · 4 件装”，说明这次写入实际已生效，无需再写。

其他：
- 两条标题符合工作区里记录的品牌规则（品牌名写 “Casa Verde”，件数用 “·” 分隔），未做任何改动。
- 两个产品仍是 draft 状态，未发布；发布请在 ERP 完成。
- 本次改的是产品目录标题；你没有提到站点或 listing，所以没有动任何站点 listing。如果 Amazon ES 的 listing 标题也要同步改，告诉我 listing 即可。
- 没有未决问题。
