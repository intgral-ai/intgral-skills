产品 brief 已写好并保存到 ERP，全程零采集。

## 保存结果

- Artifact：`rart_report_col_brief_01`，version 1（POST /admin/research/artifacts 返回 201）
- Scope：`rscope_colander_es`（silicone-colander-amazon-es，"Should Casa Verde develop a collapsible silicone colander for Amazon Spain?"）
- save_key：`product-brief-colander-es-2026-09-20-01`
- 修订标记：schema `product_brief/1`、template `product_brief@1`、skill `intgral-research/brief@2`、runbook `intgral-research@1`
- 覆盖状态：**partial**
- 钉住的上游修订（handoff.upstream_versions）：`rart_report_col_market_01@2`、`rart_report_col_comp_01@1`、`rart_report_col_supplier_01@1`。market@1（2026-09-03，已被 v2 取代）只作为历史，未引用。
- 钉住的证据：8 条（4 条 Amazon listing 观察、3 条 Alibaba 产品投影、1 份供应商报价）
- 未创建任何采集计划、未刷新来源、未联系供应商、未建商品/SKU。

## 新鲜度（ERP 建议值，未刷新）

- market@2：报告 14 天，上游证据 16 天；comp@1：报告 12 天，证据 16 天；supplier@1：报告 7 天，证据 13 天
- 观察日期：Amazon listing 2026-09-02（B0FAKE0C01 另有 2026-08-20 一期）；Alibaba 2026-09-05；供应商 70001 报价 2026-09-10（有效期至 2026-10-10）

## Brief 的核心内容

十二节全部写入，状态如下：

| 节 | 状态 |
| --- | --- |
| 1 产品概述、5 竞争格局、11 证据要点 | supported |
| 6 差异化 | conflicted |
| 2 目标受众、3 用户画像、4 痛点、7 异议、8 切换动因、9 顾客语言、10 品牌语气、12 成功指标 | unknown（不引用任何证据） |

**证据能支持的：**
- 直接竞品（EUR，单件，运费未知）：Plegasa B0FAKE0C01 24 cm 11.99 EUR；Cocinova B0FAKE0C02 26 cm 14.50 EUR（标价 17.90）；组内 median 13.245。硬质塑料替代品 Basiq B0FAKE0C04 6.49 EUR。
- Amazon "上月购买"下限：200 与 500——是下限，不是销量，brief 里明确不能当销量目标。
- B0FAKE0C01 价格 13.99 → 11.99 EUR（08-20 → 09-02）只是一对日期，不构成趋势。
- 供应商 70001 范围报价：24 cm 灰、印 logo、polybag，2000 件，FOB Ningbo，1.28 USD/件；样品 2 件 15 USD、7 天；交期收定金后 30–35 天。
- 三家 Alibaba 货源的 listing 条款（币种、数量基准不同，不可直接比较）；"Verified Supplier"/isFactory 是平台标签，不证明制造能力。

**明确标为 proposed（未验证）的：** 24 cm 为主、26 cm 备选；带把手；零售包装；定价落在两款直接竞品之间；任务型画像 P1/P2；异议假设 H1–H3。

**冲突调和：** 供应商 70001 的 listing（交期 25 天、1.30 US$）与范围报价（30–35 天、1.28 USD）基准不同（通用 listing vs 含 logo 的具体范围），两者并列保留，没有按时间新旧裁定。

**目标成本：** unknown。只有 FOB 1.28 USD @2000；运费、关税、VAT、检验、零售包装、毛利目标、汇率均缺。

**样品计划：** 70001 的 2 件样品（15 USD，7 天）——成本已知但**未授权**；70002/70003 样品价格未列。

**验证计划（均 not_started，阈值未定）：** 样品折叠循环与尺寸测量；食品接触测试报告核验；评论正文有界留存与痛点编码（需另行批准采集计划）；落地成本测算。

## 缺口（coverage.gaps）

1. 无评论正文（第 4/7/8/9 节 unknown）
2. 无测量需求（仅购买下限 200/500）
3. 无趋势序列
4. 落地成本未知
5. 供应商 70002/70003 未按同一基准报价
6. 硅胶等级与食品接触认证未验证
7. ERP 中无品牌规则（您的私有偏好——"Casa Verde" 保留拉丁字母、标题用 "·" 分隔件数——作为指令遵守，未作为证据引用）
8. 成功指标无批准基线或目标

## 需要您决定的事项（未决）

- 是否批准两款直接竞品评论正文的有界采集计划（每款 ≤100 条）
- 是否授权 2 件样品（15 USD）
- 目标成本与毛利目标；24 vs 26 cm；零售包装；供应商选择（70001 仍为 hold_for_evidence）；零售定价

## 说明

- 保存返回 201 后，我尝试通过 GET /admin/research/artifacts/rart_report_col_brief_01 读回核对，该连接返回 not_found。按规则我没有换 save_key 重试；建议您在 Admin 中打开该 artifact 确认，如确实不存在再告诉我。
- 本地工作区已留一条任务记录指向 ERP 中的 artifact：`merchants/casa-verde-es/tasks/2026-09-20-product-brief-colander-es.md`。未改动 preferences.md。
