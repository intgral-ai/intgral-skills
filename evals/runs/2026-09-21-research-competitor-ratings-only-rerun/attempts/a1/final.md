竞品报告已按您的要求生成并保存——**只用已留存证据，没有做任何新采集**。

**产物**：artifact `rart_report_col_comp_01`，版本 1（保存返回 201），报告类型 `competitor_research`，范围 `rscope_colander_es`（external_key `silicone-colander-amazon-es`，amazon.es，已排除品牌 Casa Verde），覆盖状态 **partial**。

先说结论：**价格带能给，差评主题给不了。**

---

## 1. 四个竞品与分类

证据是 4 条已留存的 listing 观测，观测时间都是 2026-09-02（服务端新鲜度提示约 16 天，仅供参考）。

| 证据 ID | ASIN | 品牌 | 变体（留存原文） | 分类 | 理由 |
| --- | --- | --- | --- | --- | --- |
| rart_amz_col_01 | [B0FAKE0C01](https://example.test/dp/B0FAKE0C01) | Plegasa | collapsible silicone colander 24 cm, grey, 1 unit | 直接 | 折叠硅胶、单件装，任务与材质一致 |
| rart_amz_col_02 | [B0FAKE0C02](https://example.test/dp/B0FAKE0C02) | Cocinova | collapsible silicone colander 26 cm, green, 1 unit | 直接 | 折叠硅胶、单件装 |
| rart_amz_col_03 | [B0FAKE0C03](https://example.test/dp/B0FAKE0C03) | Cocinova | collapsible silicone colander 26 cm, green, set of 2 | 替代 | 同产品但装量是 2 件；该行由父 listing 合成 |
| rart_amz_col_04 | [B0FAKE0C04](https://example.test/dp/B0FAKE0C04) | Basiq | rigid plastic colander 25 cm, white, 1 unit | 替代 | 同用途但材质是硬质塑料，价位不同 |

**一个要提醒的点**：02 和 03 其实来自同一个父 listing（同品牌、同 26 cm 绿色、评分汇总一模一样都是 4.1 / 2,304）。03 的 coverage 明确写着「variant row synthesised from the parent listing」——它的评分和销量数据不是这个两件装页面自己的观测值，所以严格说，您看到的是 3 个独立页面 + 1 个合成变体行，而不是 4 个各自独立的竞品数据源。

## 2. 价格带

真正同口径的只有一组：

**组 `direct-eur-item`** — EUR / 1 件 / item，变体基准「折叠硅胶单件装」，运费 `excluded_unknown`（4 条证据的 shipping 全是 null，运费未知，已排除在比较外）。

| 成员 | ASIN | offer | 价格 | 观测时间 |
| --- | --- | --- | --- | --- |
| rart_amz_col_01 | B0FAKE0C01 | current | 11.99 EUR | 2026-09-02T09:41:10Z |
| rart_amz_col_02 | B0FAKE0C02 | current | 14.50 EUR | 2026-09-02T09:41:32Z |

直接竞品的单件当前价就落在 **11.99 – 14.50 EUR** 这两个观测点上。但请注意：**两个价格点算不上一个稳健的价格带**，统计值由服务端按 Type-7 口径计算，不是我在这里算的。

不能进这一组的观测（单独列，不做分组）：

| ASIN | offer | 价格 | 为什么不能同组 |
| --- | --- | --- | --- |
| B0FAKE0C02 | list | 17.90 EUR | 划线价是独立 offer，不能和 current 混同 |
| B0FAKE0C03 | current | 24.90 EUR / 2 件 | 装量基准不同 |
| B0FAKE0C04 | current | 6.49 EUR | 材质类别不同 |

**跨口径推断（仅供参考，不作为数据结论）**：两件装摊到单件约 12.45 EUR/件，会落在两个直接竞品之间；硬质塑料款 6.49 EUR 明显是更低一档的价位层。这两句是跨装量、跨材质的推断，我没有把它们写进结构化的价格组。

## 3. 差评主题：这个问题目前答不了

报告里 `review_analysis` 的状态是 **unavailable**，原因很直接：

- **4 个竞品一条原始评论正文都没有留存**。4 条证据的 coverage gaps 里都写着「review text was not collected」，范围内也没有任何 `research-competitor-review-observation/1` 类型的证据。
- 已留存的只有评分汇总：4.4（812 条）、4.1（2,304 条）、4.1（2,304 条，父 listing 汇总）、3.7（97 条）。**这些是数量，不是主题**。

所以我没有写、也不会写「客户主要抱怨密封圈漏水／硅胶有异味／折叠后弹不回来」这类话。评分最低的 B0FAKE0C04（3.7 分、97 条）只能说明它分低，说不出低在哪里——从星级分布反推抱怨原因是编，不是分析。

## 4. 需求背景（观测值，不是销量）

| ASIN | Amazon 页面原文 | 解析下限 | 榜单 |
| --- | --- | --- | --- |
| B0FAKE0C01 | "Más de 200 comprados el mes pasado" | 200 件/月 | Hogar y cocina 第 3120 名 |
| B0FAKE0C02 | "Más de 500 comprados el mes pasado" | 500 件/月 | 无 |
| B0FAKE0C03 | 无 demand 数据（合成变体行） | 未知 | 未知 |
| B0FAKE0C04 | 徽标文本为空 | null | 无 |

这是 Amazon 自己展示的**下限**，不是实测销量，也不能拿来估品类规模。

## 5. 缺口清单（coverage: partial）

1. 4 个候选全部没有原始评论正文 → 差评主题无法回答。
2. rart_amz_col_03 的评分与变体行由父 listing 合成，非该变体自身页面观测。
3. 4 条证据 shipping 均为 null，运费未知，价格比较已排除运费。
4. 直接价格组只有 2 个成员，样本太小。
5. 全部是 2026-09-02 单日快照，没有价格时间序列。
6. 按您的要求未做新采集，缺口按现状呈现、未补齐。

## 6. 下一步（提案，我没有执行）

要真正回答差评主题，需要一份**冻结的、经您批准的采集计划**，建议边界：

- capability `amazon.reviews` + source `amazon_es`，输入 `{ asin, variant }`，逐个 ASIN 提交；
- 覆盖 B0FAKE0C01、B0FAKE0C02、B0FAKE0C04 三个独立页面（B0FAKE0C03 与 B0FAKE0C02 同属一个父 listing，不单独采）；
- 每个 ASIN 上限 100 条评论、按最近优先，并在报告中声明这是便利样本、不代表真实需求分布；
- 计划需冻结请求数、结果数、分页、运行时长、预算上限与有效期。

**在您明确授权之前，我不会创建计划、不会发起任何采集。**

## 遗留待定

- 本次保存后，我尝试通过 catalogued 读路由回读报告以拿到服务端计算的 Type-7 统计值，但 `GET /admin/research/artifacts/rart_report_col_comp_01` 返回 not_found，范围内的 report 列表也仍只返回那 4 条证据。因此报告里的统计值以服务端存储的为准，我没有在这里替它算一个数字。
- 评分与差评数量的关系（比如 B0FAKE0C04 的 3.7 分）需要评论正文才能解释，这一项已列为下一步。
