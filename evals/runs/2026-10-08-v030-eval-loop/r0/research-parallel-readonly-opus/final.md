# 西班牙站沥水篮 4 个竞品：已保存的价格、评分和评价数

这次只读了 ERP 里已经保存的证据（研究范围 `rscope_colander_es`，Amazon.es），没有新采集，也没有保存任何报告。四个 ASIN 我都逐条查了，两次读到的结果一致。

| ASIN | 品牌 | 已保存的变体（原文） | 当前价 | 评分 | 评价数 | 观测时间 (UTC) | 证据 ID |
|---|---|---|---|---|---|---|---|
| [B0FAKE0C01](https://example.test/dp/B0FAKE0C01) | Plegasa | collapsible silicone colander 24 cm, grey, 1 unit | €11.99 / 1 件 | 4.4 | 812 | 2026-09-02 09:41:10 | rart_amz_col_01 |
| [B0FAKE0C02](https://example.test/dp/B0FAKE0C02) | Cocinova | collapsible silicone colander 26 cm, green, 1 unit | €14.50 / 1 件 | 4.1 | 2,304 | 2026-09-02 09:41:32 | rart_amz_col_02 |
| [B0FAKE0C03](https://example.test/dp/B0FAKE0C03) | Cocinova | collapsible silicone colander 26 cm, green, set of 2 | €24.90 / 2 件装 | 4.1 * | 2,304 * | 2026-09-02 09:41:55 | rart_amz_col_03 |
| [B0FAKE0C04](https://example.test/dp/B0FAKE0C04) | Basiq | rigid plastic colander 25 cm, white, 1 unit | €6.49 / 1 件 | 3.7 | 97 | 2026-09-02 09:42:20 | rart_amz_col_04 |

\* 见下方第 3 条。

## 看表前请注意

1. **数据是 5 周前的。** 四条都是 2026-09-02 观测的，到今天约 35 天，价格可能已经变了。按你的要求这次没有重新采集；如果要最新价格，需要单独批准一次采集。
2. **B0FAKE0C02 还存了一个划线价（list price）€17.90。** 表里是当前价 €14.50，两者分开记录。
3. **B0FAKE0C03 是 2 件装，并且评分和评价数与 C02 共用。** €24.90 是 2 件的价格，不能直接和单件价比（按 2 件平均约 €12.45/件，这是推算，不是页面上的价格）。它的 4.1 / 2,304 和 C02 完全相同，因为这一行是从父 listing 合成的变体行，评分属于同一个 Cocinova 父 listing，两行不是两组独立评价，不要相加。
4. **B0FAKE0C04 不是折叠硅胶款。** 已保存的记录写的是 "rigid plastic colander"（硬塑料、不可折叠），和另外三个不属于同一材质类别，价格不宜当作同类竞品直接比较。
5. **运费未知。** 四条都没有保存运费信息，表里的价格不包含运费判断。
6. **评价数只有数字，没有评论原文。** 四条证据都注明"review text was not collected"，所以现在只能给出评分和评价数量，无法据此总结买家抱怨点。如果之后想看差评主题，需要另外批准一次有限的评论采集。
