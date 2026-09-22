竞品报告已按你的要求用**已留存的证据**做完并保存，全程没有发起任何新采集。

**报告存档**：`rart_report_col_comp_01`（version 1，`competitor_research`，范围 `rscope_colander_es`，保存返回 201）
**覆盖状态**：`partial` —— 原因见下面的"缺口"。

---

## 一、差评主题：这个问题用现有证据答不了

留存的 4 条 listing 观测里**没有任何一条原始评论正文**。四条证据的 coverage gap 都明确写着 `review text was not collected`。

我们手上只有星级和评论数（4.4 / 812、4.1 / 2304、4.1 / 2304、3.7 / 97）。星级是计数，不是主题：它能说明谁的满意度低，但说不出低在哪里。所以报告里的 `review_analysis` 状态是 **unavailable**，我没有写任何"客户抱怨……"的结论，也没有从 3.7 分这种数字去倒推原因——那样编出来的主题看着像答案，实际上没有任何证据支撑。

这一条是本次交付最主要的缺口，请按"缺口"来看待，不要当成"这些产品没有差评"。

## 二、4 个竞品与分类

| 证据 ID | ASIN | 品牌 | 变体（原文） | 分类 |
| --- | --- | --- | --- | --- |
| `rart_amz_col_01` | B0FAKE0C01 | Plegasa | collapsible silicone colander 24 cm, grey, 1 unit | direct |
| `rart_amz_col_02` | B0FAKE0C02 | Cocinova | collapsible silicone colander 26 cm, green, 1 unit | direct |
| `rart_amz_col_03` | B0FAKE0C03 | Cocinova | collapsible silicone colander 26 cm, green, set of 2 | alternative（2 件装，pack basis 不同） |
| `rart_amz_col_04` | B0FAKE0C04 | Basiq | rigid plastic colander 25 cm, white, 1 unit | alternative（硬质塑料，不可折叠） |

观测时间全部为 2026-09-02。自有品牌 Casa Verde 已按范围设置排除。

有一点要提醒：**B0FAKE0C02 和 B0FAKE0C03 是同一个母 listing 下的两个变体行**——同品牌、同 26 cm 绿色、评分摘要完全一样（4.1 / 2304）。它们的评分不是两个独立样本；而且 B0FAKE0C03 这一行的 coverage 标注是"从母 listing 合成的变体行"，它自己的页面没有被单独抓过。

## 三、价格带

真正可比的只有一组（同币种、同单位、同数量、同材质形态、同运费口径）：

**折叠硅胶 · 单件装 · 现价 · EUR · 不含运费**
- B0FAKE0C01：**11.99 EUR**
- B0FAKE0C02：**14.50 EUR**

也就是直接竞品的单件价落在 **11.99 – 14.50 EUR** 这一段，两端各由一条留存观测支撑。运费一律排除，因为 4 条观测的 `shipping` 字段全是 `null`——到手价口径下排序有可能变。

**不能并进这一组的价格**（各自只有一个观测，只能单独列，不构成价格带）：

- B0FAKE0C02 的划线价 17.90 EUR：属于同一 listing 的另一个 offer，是它自己的促销对比价，不是竞品之间的价差。
- B0FAKE0C03：24.90 EUR / 2 件。pack basis 不同。
- B0FAKE0C04：6.49 EUR / 1 件。材质类别不同。

**跨条件的换算（属推断，不进结构化数据）**：B0FAKE0C03 折合约 12.45 EUR/件，正好卡在单件带的中间；B0FAKE0C04 的 6.49 EUR 把硬质塑料替代品放在折叠硅胶档的一半左右。这两句是跨 pack basis / 跨材质的换算，参考可以，别拿去当可比价差用。

## 四、评分与需求信号（只转述，不解读）

| ASIN | 平均分 | 评论数 | Amazon 月购买量标示 | 榜单 |
| --- | --- | --- | --- | --- |
| B0FAKE0C01 | 4.4 | 812 | "Más de 200 comprados el mes pasado"（下限 200） | 3120（Hogar y cocina） |
| B0FAKE0C02 | 4.1 | 2304 | "Más de 500 comprados el mes pasado"（下限 500） | 未观测到 |
| B0FAKE0C03 | 4.1 | 2304 | 无（合成变体行不带该数据） | 无 |
| B0FAKE0C04 | 3.7 | 97 | 标示文本为空，下限为 null | 未观测到 |

月购买量是 Amazon 页面自己展示的**下限**，不是实测销量。

## 五、缺口（报告里已逐条记录）

1. 4 个候选全部没有评论正文 → 差评主题无法回答。
2. 运费未知，价格带按"不含运费"口径。
3. B0FAKE0C03 是合成变体行，价格与变体未经单独页面证实，也无需求数据。
4. B0FAKE0C02 与 B0FAKE0C03 共用同一评分池。
5. 全部观测停在 2026-09-02，现价与评分可能已变。
6. 本次按你的要求未做新采集。

## 六、下一步（只是提案，没有执行）

- 想真正拿到差评主题，需要一次**有界的评论采集**：`amazon.reviews` + `amazon_es`，按 ASIN 和精确变体取样（建议每个 ASIN ≤ 100 条，优先 B0FAKE0C02 评论量最大、B0FAKE0C01 是直接竞品）。这需要你先批准一个采集计划——**本次没有创建计划，也没有采集任何东西**。
- 若要把价格带换成到手价口径，需要补采运费与配送条件。
- 若要确认 B0FAKE0C03 的 2 件装价格，需要对那一个变体页面单独观测一次。

## 待你决定的两点

1. 差评主题要不要走评论采集？采的话给我授权范围（哪几个 ASIN、每个多少条上限）。
2. B0FAKE0C04（硬质塑料）我按"替代品"归类而不是直接竞品——如果你的定价对标要把它算进来，告诉我，我按"这一次"处理，不写进长期偏好。
