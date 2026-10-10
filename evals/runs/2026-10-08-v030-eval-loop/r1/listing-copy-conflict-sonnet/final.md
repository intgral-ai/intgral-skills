我只保存了其中 3 条有依据的卖点，材质和承重这两条没写，需要你先确认。

**已保存（商家 casa-verde-es，listing mlist_cv01_es，内容版本 3 → 4，只改了卖点）**

| # | 保存的卖点（西语） | 来源 |
| --- | --- | --- |
| 1 | Instalación adhesiva sin taladrar: se pega a la pared, sin agujeros ni tornillos | 产品描述“背胶免打孔安装”，原有卖点“背胶安装” |
| 2 | Pack de 2 ganchos de pared | 产品标题“2 件装”，产品描述“两只……挂钩” |
| 3 | Apto para el baño: para colgar toallas, llaves y bolsos pequeños, también en la entrada | 产品描述“适合玄关、浴室挂毛巾、钥匙和小包” |

**没写的两条，需要你确认**

1. **材质“不锈钢”与 ERP 冲突，两边都没写。**
   - ERP 里这个 SKU 的变体材质是 bamboo（竹）。
   - 产品标题、产品描述、产品卖点里也都写竹制。
   - 站点品类选项里有 Acero inoxidable，但这只说明可以选，不能证明这个产品是不锈钢。
   - 因此我把原来的第 1 条“Bambú natural”也移出了卖点，现在这个事实有争议。
   - 请确认实际材质和证据来源（例如供应商资料）。确认后我再补一条材质卖点，必要时还要改产品里的材质字段。
   - 如果确实是竹制，请告诉我，我把“Bambú natural”补回去。
2. **“承重 5 公斤”没有任何产品依据。**
   - 产品数据里没有承重信息，所以没写。
   - 请提供测试报告或供应商规格，确认后补充。

**其他**
- 现在是 3 条卖点，上限是 5 条（每条 255 字符以内）。我没有为凑数编内容。
- 标题和描述这次没动。描述仍是必填缺口，`compliance.ready` 为 false，原因就是缺描述。
- 保存的只是草稿，发布由你在 ERP 完成。本会话没有浏览器工具，我没有打开页面，请自己打开查看：https://erp.example.test/app/amazon-listings/mlist_cv01_es
