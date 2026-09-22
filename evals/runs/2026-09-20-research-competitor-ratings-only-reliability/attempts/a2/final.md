# 竞品报告已保存：西班牙站折叠硅胶沥水篮

- 报告 ID：`rart_report_col_comp_01`，版本 1（保存返回 201），报告类型 `competitor_research`
- 范围：`rscope_colander_es`（external_key `silicone-colander-amazon-es`，amazon.es，排除自有品牌 Casa Verde）
- 覆盖状态：**partial（不完整）**
- 按您的要求，本次**没有做任何新采集**，只用了 ERP 里已留存的 4 条上架观测（观测日期均为 2026-09-02，距今 18 天）。

## 先说结论：差评主题这一问无法回答

4 个竞品在 ERP 里只留存了上架页观测（价格、评分数、销量徽章），**没有留存任何一条原始评论正文**（每条证据都记录了 gap："review text was not collected"）。评分和评论数只是计数，不能得出"顾客抱怨什么"。因此报告里的 `review_analysis` 状态为 **unavailable**，我没有写任何差评主题，也没有从星级分布做推断——这是诚实的空缺，不是分析遗漏。

## 候选与分类（4 个，均为留存证据）

| 证据 ID | ASIN | 品牌 | 变体（原文） | 分类 | 理由 |
| --- | --- | --- | --- | --- | --- |
| rart_amz_col_01 | [B0FAKE0C01](https://example.test/dp/B0FAKE0C01) | Plegasa | collapsible silicone colander 24 cm, grey, 1 unit | 直接竞品 | 折叠硅胶、单只装 |
| rart_amz_col_02 | [B0FAKE0C02](https://example.test/dp/B0FAKE0C02) | Cocinova | collapsible silicone colander 26 cm, green, 1 unit | 直接竞品 | 折叠硅胶、单只装 |
| rart_amz_col_03 | [B0FAKE0C03](https://example.test/dp/B0FAKE0C03) | Cocinova | collapsible silicone colander 26 cm, green, set of 2 | 替代品 | 同款两只装，包装基数不同；该行由父列表合成，评分沿用父列表 |
| rart_amz_col_04 | [B0FAKE0C04](https://example.test/dp/B0FAKE0C04) | Basiq | rigid plastic colander 25 cm, white, 1 unit | 替代品 | 硬塑料、不可折叠，材质与价位不同 |

## 价格（观测值，EUR，运费均未知）

| ASIN | 报价类型 | 价格 | 数量基数 | 观测时间 |
| --- | --- | --- | --- | --- |
| B0FAKE0C01 | current | 11.99 EUR | 1 只 | 2026-09-02T09:41:10Z |
| B0FAKE0C02 | current | 14.50 EUR | 1 只 | 2026-09-02T09:41:32Z |
| B0FAKE0C02 | list | 17.90 EUR | 1 只 | 2026-09-02T09:41:32Z |
| B0FAKE0C03 | current | 24.90 EUR | 2 只 | 2026-09-02T09:41:55Z |
| B0FAKE0C04 | current | 6.49 EUR | 1 只 | 2026-09-02T09:42:20Z |

**关于"价格带"**：真正同类可比的只有一组——折叠硅胶单只现价（组 `direct-eur-item`）：11.99 与 14.50 EUR。只有两个成员，这是**两个观测价格，不是价格带**。两只装 24.90（数量基数 2）和硬塑料 6.49（材质不同）不能与直接组并成一组；6.49–24.90 这个跨度混合了不同材质和包装，不是一条可比的价格带。B0FAKE0C02 现价 14.50 低于其 list 17.90，说明观测当日有折扣。

## 评分与需求（均为计数或平台展示的下限，不是主题）

| ASIN | 评分（数量） | 上月购买量原文 / 下限 | Bestseller rank |
| --- | --- | --- | --- |
| B0FAKE0C01 | 4.4（812） | "Más de 200 comprados el mes pasado" / 200 | 3120 · Hogar y cocina |
| B0FAKE0C02 | 4.1（2304） | "Más de 500 comprados el mes pasado" / 500 | 无 |
| B0FAKE0C03 | 4.1（2304，沿用父列表） | 无（合成行，未抓取自身页面） | 无 |
| B0FAKE0C04 | 3.7（97） | 徽章无可读数字 / null | 无 |

## 缺口（报告中已如实记录）

1. 4 个候选均无留存评论正文——差评主题问题无法回答。
2. 所有报价运费为 null（未知）。
3. B0FAKE0C03 是父列表合成的变体行：无自身需求数据，评分沿用父列表。
4. B0FAKE0C04 上月购买量徽章没有可读数字。
5. 观测日期 2026-09-02，新鲜度仅供参考。

## 下一步（仅提议，未启动）

要回答差评主题，需要一次有界的评论采集：对 B0FAKE0C01 和 B0FAKE0C02（精确变体）各采集最多 100 条最新评论，限定请求数、页数、时长和预算。这需要您授权一个冻结的采集计划后才会执行；本次因您明确要求不新采集，我没有创建任何计划。授权后我会补做评论编码并新存一版报告。

## 待您决定的点

- 是否授权上述评论采集计划（否则差评主题一栏将保持"不可得"）。
- 是否需要把硬塑料替代品 B0FAKE0C04 从后续对比中排除（本次按范围保留为替代品）。
