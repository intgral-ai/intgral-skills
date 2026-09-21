已读取 mlist_cv01_es（CV-HOOK-01，Amazon ES，草稿，content_version 3）的当前文案和后端合规报告。**没有做任何写入**，以下只是建议。

## 现状

- 标题：`Casa Verde gancho de pared bambú 2 unidades`
- 卖点：`Bambú natural` / `Instalación adhesiva` / `2 unidades`
- 后端限制（来自 WALL_HOOK / Amazon ES 的 compliance）：标题 ≤ 200 字符；卖点最多 5 条、每条 ≤ 255；描述 ≤ 2000（必填，目前为空，**阻断项**）；search terms ≤ 250
- 后端提示：ES 站标题不要出现促销词（oferta、gratis、garantía）。当前标题没有，改后也要保持

可用于文案的可追溯事实只有这几条：品牌 Casa Verde、竹制（bambú natural）、壁挂挂钩、粘贴式安装、2 件装、全新。尺寸、承重、适用墙面、颜色/表面处理、是否可无痕拆除、包装内含物等，后端里都没有，我没有编。

## 标题建议

问题：现在的标题是词堆在一起，主要属性（材质、安装方式）位置靠后；件数没按你们的偏好用 “·” 分隔。

- 方案 A（推荐）：`Casa Verde Ganchos de Pared de Bambú Natural Adhesivos · 2 Unidades`（约 70 字符）
- 方案 B（更短）：`Casa Verde Gancho Adhesivo de Bambú para Pared · 2 Unidades`

两版都保留 “Casa Verde” 原写法、用 “·” 分隔件数、无促销词、远低于 200 上限。如果后面能确认承重或“sin taladrar”等事实，可以再加到标题里。

## 卖点建议（先给 4 条，第 5 条留给待补事实）

1. `BAMBÚ NATURAL: gancho de pared fabricado en bambú, material natural para el hogar`
2. `INSTALACIÓN ADHESIVA: se fija a la pared sin taladrar ni atornillar`
3. `PACK DE 2 UNIDADES: dos ganchos en un solo envío`
4. `MARCA CASA VERDE: producto nuevo de la línea Casa Verde para el hogar`
5. （待补）承重 / 适用墙面 / 尺寸——确认后再写，例如 `SOPORTA HASTA X KG` 或 `APTO PARA AZULEJO, CRISTAL Y SUPERFICIES LISAS`

说明：第 2 条的 “sin taladrar ni atornillar” 是从“粘贴式安装”推出来的，不是后端单独记录的事实；如果产品其实附带螺丝，请告诉我改掉。第 4 条信息量偏弱，只是为了不空缺，若你更愿意保持 3 条也可以。

## 需要你确认的事实（补了才能把文案写扎实）

- 承重（kg）
- 适用/不适用的墙面类型（瓷砖、玻璃、乳胶漆墙等）
- 单个挂钩尺寸
- 颜色 / 表面处理
- 是否可无痕移除、是否防水（浴室用）
- 包装内含物（除 2 个挂钩外是否有备用胶贴等）

## 下一步

- 你选定标题方案和卖点后，我用 `medusa.update_listing` 只写 `title` 和 `bullet_points` 两个字段，其他字段不动；写完 content_version 会从 3 变 4。
- 描述（description）是后端标记的阻断必填项，本次没有动它；需要的话我可以基于同样的事实起草一版给你看。
- 发布仍在 ERP 完成：https://erp.example.test/app/amazon-listings/mlist_cv01_es
