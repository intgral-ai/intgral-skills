已读取 mlist_cv01_es（Amazon ES，草稿，content_version 3）和产品 prod_cv01 的完整资料（描述、profile、变体）。以下只是建议，**未保存任何改动**。

## 依据的事实（都来自当前 SKU）

| 事实 | 值 | 来源 |
| --- | --- | --- |
| 品牌 | Casa Verde | profile.brand；私有偏好：保留拉丁字母，标题用 “·” 分隔件数 |
| 材质 | 竹（bamboo） | variants[0].material；profile 卖点“天然竹材” |
| 安装方式 | 背胶、免打孔 | 产品 description |
| 件数 | 2 件 | profile 卖点、产品标题 |
| 使用场景 | 玄关、浴室；挂毛巾、钥匙、小包 | 产品 description |
| 站点限制 | 标题 ≤ 200 字符；卖点 ≤ 5 条、每条 ≤ 255；标题不得含促销词（oferta / gratis / garantía） | compliance.limits / warnings |

## 标题

| | 文案 |
| --- | --- |
| 现在 | Casa Verde gancho de pared bambú 2 unidades |
| 建议 | Casa Verde · Ganchos de pared de bambú adhesivos · Sin taladro · 2 unidades |

改动理由：现标题只有“品牌 + 品类 + 件数”，漏掉了描述里最有辨识度的“背胶免打孔”；单数 “gancho” 与 2 件装不一致；按你的偏好用 “·” 分隔件数。79 字符，在 200 以内，不含促销词。

## 卖点（后端上限 5 条，有来源的只有 4 条，不为凑数编第 5 条）

| # | 现在 | 建议 | 来源 |
| --- | --- | --- | --- |
| 1 | Bambú natural | Fabricados en bambú natural | profile 卖点 / 变体 material |
| 2 | Instalación adhesiva | Montaje adhesivo: se pegan a la pared sin taladrar ni hacer agujeros | 描述“背胶免打孔” |
| 3 | 2 unidades | Juego de 2 ganchos | profile 卖点 |
| 4 | — | Para el recibidor o el baño: cuelga toallas, llaves y bolsos pequeños | 描述的使用场景 |

现有三条每条只有两三个词，没有把描述里的信息用上；建议版每条都在 255 以内，没有最高级、承诺和促销词。第 3、4 条的措辞是我写的（source: agent），事实本身来自产品数据。

## 没写进去、需要你确认的

- **承重、适用墙面（瓷砖/油漆墙等）、是否可拆无痕**：产品数据里没有，不能编。确认后可各补一条卖点。
- **重量 / 尺寸**：变体记录 weight 60、尺寸 6×4×3，但未标单位，先不写；确认单位后可以加一条。
- **描述（description）**：compliance 标为必填、阻断项，目前为空——不在你这次要求的范围内，但发布前必须补。需要的话我可以按同样的事实起草。
- search_terms 也为空，同上。

## 下一步

你确认后，我会调用 `medusa.update_listing`（listing_id: mlist_cv01_es），只写 `copy.title` 和 `copy.bullet_points` 两个字段，不动描述、属性、价格和图片；保存后按返回的 content_version 和 compliance 汇报。发布仍在 ERP 完成：https://erp.example.test/app/amazon-listings/mlist_cv01_es
