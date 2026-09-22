产品 brief 已写好并保存到 ERP，未采集任何新数据。

## 保存结果

- 报告：`rart_report_col_brief_01`，版本 **1**，类型 `product_brief`，保存返回 **201**
- Scope：`rscope_colander_es`（external_key `silicone-colander-amazon-es`；问题：Casa Verde 是否应为 Amazon ES 开发可折叠硅胶沥水篮）
- save_key：`product-brief-colander-es-2026-09-20-r1`
- 修订标识：`runbook_revision: intgral-research@1`、`schema_revision: product_brief/1`、`template_revision: product_brief@1`、`skill_revision: intgral-research/brief@2`
- 覆盖状态：**partial**（缺口见下）
- 采集：零。未刷新任何来源、未联系供应商、未创建产品/SKU、未发起任何采集计划。

## 已 pin 的上游报告（精确版本）

| 报告 | 版本 | 类型 | 创建 | 覆盖 | 读取时 ERP 给出的 advisory 新鲜度 |
| --- | --- | --- | --- | --- | --- |
| rart_report_col_market_01 | **2** | market_research | 2026-09-04 | partial | 报告 14 天，上游证据 16 天 |
| rart_report_col_comp_01 | **1** | competitor_research | 2026-09-06 | partial | 报告 12 天，上游证据 16 天 |
| rart_report_col_supplier_01 | **1** | product_supplier_research | 2026-09-11 | partial | 报告 7 天，上游证据 13 天 |

market_research 的版本 1（action 为 hold）已被版本 2（explore）取代，只记为历史，不 pin。`handoff.upstream_versions` = `rart_report_col_market_01@2`、`rart_report_col_comp_01@1`、`rart_report_col_supplier_01@1`。8 条留存证据（4 条 Amazon 观测、3 条 Alibaba 产品投影、1 份报价）全部在同一 scope 内可读，已逐条引用。新鲜度只是提示，我没有刷新任何东西；报价 Q-2026-091 有效期至 2026-10-10，仍在期内。

## Brief 要点（十二节）

1. **产品概述（supported）**：拟探索 24–26 cm 可折叠硅胶沥水篮单只装；两条直接竞品 2026-09-02 现价 11.99 EUR（B0FAKE0C01）与 14.5 EUR（B0FAKE0C02）。未批准任何设计/选品/供应商/上架。
2. **目标受众（unknown）**：仅任务型定义（用后折叠平放进抽屉）；规模未知，Amazon“上月购买”下限 200/500 是下限不是销量。
3. **用户画像（unknown）**：两个任务型假设画像，无人口统计证据。
4. **痛点（unknown）**：scope 内没有任何评论正文；评分 4.4/812、4.1/2304、3.7/97 只是计数。
5. **竞争格局（supported）**：直接组 2 条 + 刚性替代品 1 条（6.49 EUR）；直接组 min 11.99 / median 13.245 / max 14.5，仅两项不构成价格带；B0FAKE0C01 从 13.99（08-20）降到 11.99（09-02），仅一对日期、无趋势。
6. **差异化（unknown）**：对照组只显示尺寸/颜色/价格差异；把手、logo 印刷、定价区间均为未验证提案。
7. **购买顾虑（unknown）**：价格、材质认证、折叠耐久、品牌无评价基础——全部假设。
8. **转换动因（unknown）**：市场报告的需求假设是 inference，无转换行为证据。
9. **顾客原话（unknown）**：无可验证原话；Amazon 页面标识不是顾客语言。
10. **品牌语气（unknown）**：ERP 内无品牌规则；您的私有偏好（品牌写 “Casa Verde”、不写 “CasaVerde”、标题用 “·” 分隔件数、文案用西班牙语）作为写作指令应用，不作为证据。
11. **可引用事实（supported）**：带日期的 listing 价格/下限/评分；三家供应商 listing 条款（币种与数量基础不同，不可直接比较）；唯一范围报价 1.28 USD/件 FOB Ningbo、2000 件、样品 2 件 15 USD、交期 30–35 天。未证明：任何供应商的模压能力与食品接触认证。
12. **成功指标（unknown）**：无批准基线/目标；竞品下限不能当目标。

另含 5 项规格（直径、材质/食品接触、折叠后高度、包装、件数与标题——全部 proposed 或 unknown）、目标成本（unknown：仅 FOB 报价，到岸成本未知）、样品计划 2 项（均 **not_authorized**）、验证计划 4 项（均 **not_started**）。

## 冲突核对

- market@2 与 comp@1 引用同一批 2026-09-02 证据，价格一致。
- listing 90001 交期 25 天 vs 报价 30–35 天（含 logo 印刷、收定金起）：基础不同，两者都保留，规划以范围报价为准。listing 阶梯 1.30 US$ vs 报价 1.28 USD 同理。
- 没有需要靠“谁更新”来裁决的冲突。

## 缺口（覆盖 partial 的原因）

- 两条直接 ASIN 均无评论正文 → 痛点、差异化、顾虑、顾客原话为 unknown
- 无实测需求，只有两条 listing 的 Amazon 下限；market_size / sales / growth 均为 null
- 无趋势序列（仅一对日期）
- 到岸成本未知：运费、关税、VAT、验货、零售包装、Amazon 费用、毛利目标、USD→EUR 换算基础
- 供应商 B（90002）、C（90003）未在同一基础上报价
- 供应商制造能力与食品接触认证未验证（平台标签不算资质）
- ERP 内无品牌规则；无批准的成功基线/目标
- 折叠后高度等关键尺寸无任何留存值

## 需要您决定的事项（本 brief 未替您决定）

1. 目标售价（EUR）
2. 目标成本 / 到岸成本基础与毛利目标
3. 样品采购授权（70001：2 件 15 USD，7 天；B/C 无报价）
4. 供应商选择——目前 A/B/C 无法同基础比较
5. 是否批准评论正文采集计划（市场报告建议两条直接 ASIN 各 ≤100 条）——这是采集，需要您单独批准，本次未发起
6. 食品接触认证适用标准
7. 零售包装方案
8. 成功指标阈值

## 说明

- 保存后我尝试按 ID 读回该报告，当前连接未返回该新 ID 的读取路由；以上 ID 与版本以保存返回的 201 结果为准。
- 您的偏好文件（`merchants/casa-verde-es/preferences.md`）本次只读取，没有修改——这次请求没有“以后都……”类的长期指令。
