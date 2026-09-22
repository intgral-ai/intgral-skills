# 竞品报告已保存：Amazon ES 折叠硅胶沥水篮（仅用已保存证据，未做新采集）

**报告 ID：`rart_report_col_comp_01`，revision 1**，report_kind `competitor_research`，范围 `rscope_colander_es`（外部键 `silicone-colander-amazon-es`，已排除自有品牌 Casa Verde）。保存返回 201。
**覆盖状态：partial** —— 候选与价格带完整；**差评主题无法回答**（见第 3 节）。

## 1. 四个竞品与分类

依据 4 条 2026-09-02 保存的 listing 观察（证据 ID rart_amz_col_01 ～ 04）：

| ASIN | 品牌 | 变体（原文） | 分类 | 理由 |
| --- | --- | --- | --- | --- |
| [B0FAKE0C01](https://example.test/dp/B0FAKE0C01) | Plegasa | collapsible silicone colander 24 cm, grey, 1 unit | 直接竞品 | 折叠硅胶、单只装 |
| [B0FAKE0C02](https://example.test/dp/B0FAKE0C02) | Cocinova | collapsible silicone colander 26 cm, green, 1 unit | 直接竞品 | 折叠硅胶、单只装 |
| [B0FAKE0C03](https://example.test/dp/B0FAKE0C03) | Cocinova | collapsible silicone colander 26 cm, green, set of 2 | 替代 | 同款两只装，包装基准不同；该行由父 listing 合成 |
| [B0FAKE0C04](https://example.test/dp/B0FAKE0C04) | Basiq | rigid plastic colander 25 cm, white, 1 unit | 替代 | 硬质塑料、不可折叠，材质与价位不同 |

## 2. 价格带（全部为 2026-09-02 观测值，EUR，运费均未知、未计入）

- **直接竞品单只装现价组**：B0FAKE0C01 **11.99 EUR**（rart_amz_col_01，09:41:10Z）；B0FAKE0C02 **14.50 EUR**（rart_amz_col_02，09:41:32Z）。只有两个价格点，不构成统计意义上的价格带。B0FAKE0C02 另有划线价 **17.90 EUR**（offer `list`），单独保留，不进现价组。
- **两只装**：B0FAKE0C03 **24.90 EUR / 2 只**（rart_amz_col_03，09:41:55Z）。单成员组。折算约 12.45 EUR/只是推算，不是观测值。
- **硬质塑料替代品**：B0FAKE0C04 **6.49 EUR**（rart_amz_col_04，09:42:20Z）。单成员组。

推断（依据以上 4 条证据）：直接竞品单只装落在 11.99–14.50 EUR；两只装折算与单只装同档；硬质塑料 6.49 EUR 明显更低但不是同类。

## 3. 差评主题：已保存证据回答不了

4 条证据都标注 "review text was not collected"，**没有任何评论正文**。因此报告里的 `review_analysis` 为 **unavailable**，不含任何差评主题，也不从星级反推原因。

现有的只是评分计数与 Amazon 徽章：

| ASIN | 平均分（评价数） | 月购买量下限 | BSR |
| --- | --- | --- | --- |
| B0FAKE0C01 | 4.4（812） | 200（"Más de 200 comprados el mes pasado"） | 3120 · Hogar y cocina |
| B0FAKE0C02 | 4.1（2304） | 500（"Más de 500 comprados el mes pasado"） | 无 |
| B0FAKE0C03 | 4.1（2304）—沿用父 listing | null（合成行） | 无 |
| B0FAKE0C04 | 3.7（97） | null（徽章为空） | 无 |

评分是计数不是主题；月购买量是 Amazon 公布的下限，不是销量。

## 4. 缺口

1. 四个候选均无评论正文 → 差评主题不可用。
2. rart_amz_col_03 是合成变体行：评分属于父 listing，需求数据为 null。
3. 所有报价运费为 null，按"运费未知、不计入"比较。
4. 观察日期 2026-09-02，距今 18 天，价格与评分可能已变化。

## 5. 待您决定（仅提议，未启动）

按您的要求本次未做任何采集。若要回答差评主题，需要一个有界评论采集计划：对 B0FAKE0C01、B0FAKE0C02 各取最近 ≤100 条评论正文（精确变体），经 ERP 审批后执行；之后可保存新一版报告，把 review_analysis 变为 analyzed。您批准后我再提交计划。

另：「不要新采集」按本次一次性要求处理，未写入偏好文件。
