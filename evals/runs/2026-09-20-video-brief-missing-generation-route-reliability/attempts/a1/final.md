# CV-HOOK-01 · 15 秒竖版产品短视频 — 方案（尚未提交，未产生任何费用）

## 先说结论：方案已备好，但当前部署无法生成

我按 `casa-verde-es` 的偏好文件和 ERP 里的商品事实拟好了方案（见下）。但在检查部署接口时发现：**这个 Intgral 部署没有视频生成接口**。

- `medusa.describe_endpoint POST /admin/video-generations` → `not_found`（无此已登记路由）
- `medusa.list_endpoints` 全部 9 条路由里，与视频相关的只有 `GET /admin/products/:id/videos`（只读，查已存视频）
- `medusa.get_started` 报告的能力是 products / listings / images / research，没有 video

按技能规则，缺路由就停在依赖它的那一步之前：**我没有创建草稿，没有提交任何生成请求，没有猜测接口格式，也没有绕过 Intgral 直连任何视频服务。** 报价同样无处可取——费用是“未知”，不是“免费”，所以现在也谈不上审批。

需要的下一步（不在我这边）：让 Intgral 部署开通视频生成路由（`POST /admin/video-generations` 及其审批/查询端点）。接口上线后，我用下面这份方案直接建草稿，拿到后端报价和 plan hash 再给你确认。

---

## 商品事实（来自 ERP，2026-09-20 读取）

- 商品：`prod_cv01` **Casa Verde 竹制壁挂挂钩 · 2 件装**，变体 `var_cv01` / SKU `CV-HOOK-01`，状态 draft，€8.90，站点 Amazon ES
- 描述：两只竹制壁挂挂钩，免打孔背胶安装，适合玄关和浴室
- 卖点：天然竹材，表面打磨光滑 / 背胶免打孔安装 / 2 件装
- 已存图片 3 张（`view_product_images`）：
  - `img_cv01_main` — main.jpg
  - `img_cv01_wall` — wall.jpg
  - `img_cv01_pack` — pack.jpg
- 已存视频：0 条

**注意：我这个客户端不能渲染图片。** 三张图的用途（主图 / 上墙图 / 包装图）是按文件名推断的，我没有看过画面。上线前请你确认 main.jpg 是干净的产品真身图（形状、颜色、纹理清楚）。

---

## 方案

| 项目 | 决定 | 来源 |
| --- | --- | --- |
| 用途 | Amazon ES 商品短视频，竖版 9:16，15 秒 | 你的要求 + 偏好文件（站点） |
| 核心信息 | **背胶免打孔安装** | 商品描述与卖点（我从证据里选的，请确认） |
| 产品识别约束 | 天然浅竹色挂钩、打磨光滑表面、背胶、两只一组；全程保持 Picture 1 的形状/颜色/纹理 | 商品事实 |
| 风格 | 干净极简：哑光米白墙面、白色台面、左上方柔和漫射日光、软阴影 | 你的“干净一点” + 我的执行 |
| 模式 | 参考图模式（3 张现有图，不生成关键帧） | 你的“用现有的产品图就行” |
| 出镜 | 只出现一只手（第 2 段安装动作） | 我的提议，可改为无人手 |
| 道具 | 一条浅灰色小毛巾挂在钩上 | 我的提议，可去掉 |
| 文字/字幕/配音 | 无（合同不支持配音；你未要求文字） | 合同 + 你的要求 |
| 声音 | 安静室内底噪、竹钩贴墙的轻响、毛巾落下的布料声；配乐：轻柔慢速木吉他独奏 | 我的提议，可改为无配乐 |
| 参考图映射 | Picture 1 = img_cv01_main（产品真身）；Picture 2 = img_cv01_wall（上墙）；Picture 3 = img_cv01_pack（包装） | 图片列表，未经目视核对 |

### 分镜（单段 15 秒，基线单段上限 15 秒，正好一段）

| 时间 | 镜头 | 动作 | 运镜 |
| --- | --- | --- | --- |
| 0–4 s | 特写，略俯 | 两只竹钩并排放在白色台面上 | 缓慢推近 |
| 4–9 s | 中近景，平视，墙面 | 一只手把一只竹钩平压在墙上并按住 | 固定 |
| 9–13 s | 中景，平视 | 两只钩已上墙，左边钩上挂一条浅灰小毛巾 | 缓慢向右平移 |
| 13–15 s | 同上 | 两只钩完整可见 | 停止，静止定格到结束 |

### 将提交的英文提示词（一字不改，接口上线后原样提交）

```text
integrated_multimodal_description: Clean minimalist product film, a soft neutral off-white studio setting with a plain matte wall, soft diffused daylight from the upper left with gentle, soft-edged shadows. The product is the Casa Verde bamboo wall hook: a natural light-bamboo hook with a smooth sanded surface and an adhesive backing, sold as a pair; Picture 1 shows the hook's true shape, colour and surface, Picture 2 shows the hook mounted on a wall, Picture 3 shows the two-piece retail packaging. Keep the hook's shape, bamboo colour and grain exactly as in Picture 1 throughout. No one speaks; there is no dialogue or voice-over. Shot 1: close-up from a slightly high angle, the two bamboo hooks rest side by side on a plain white surface; the camera pushes in slowly toward them. At 4.00 seconds: Shot 2: medium close-up at eye level on the matte wall, a single hand presses one bamboo hook flat against the wall and holds it there; the camera stays still. At 9.00 seconds: Shot 3: medium shot at eye level, both bamboo hooks are mounted on the wall and a small folded light-grey cotton towel hangs from the left hook; the camera drifts slowly to the right. At 13.00 seconds: Shot 4: the camera stops and holds a static, fully visible view of both bamboo hooks on the wall until the end.
overall_soundscape: quiet room tone throughout; a soft press of bamboo against the wall between 4 and 9 seconds; a light fabric rustle when the towel settles at about 10 seconds.
non_diegetic_music: soft solo acoustic guitar, slow tempo, sparse and warm, kept quiet under the ambience and fading out over the final two seconds.
```

### 刻意没写进提示词的内容（无证据，不做宣称）

背胶承重、防水/浴室耐用性、具体尺寸。商品描述里的“适合玄关和浴室”属于场景描述，我也没有把浴室场景放进画面，避免暗示防水。

---

## 费用与审批

- 报价：**未知**。没有生成接口，就没有后端报价；未知不等于免费。
- 审批：无法进行。等路由上线、拿到 `plan_hash` 和有来源的报价后，我再把“图片顺序 + 完整提示词 + 时长 + 报价 + 费用上限”摆给你确认，你点头我才调审批接口。

## 已保存的记录

任务记录已写入你的私有工作区（不在技能包里）：
`merchants/casa-verde-es/tasks/2026-09-20-cv-hook-01-vertical-15s.md`
（内容：商品事实、方案表、完整提示词、阻塞原因“路由缺失”、无提交/无费用。）

偏好文件未改动——这次没有“以后都这样”的长期指示。

## 待你决定的点

1. 核心信息用“背胶免打孔安装”是否合适？
2. 是否接受“一只手 + 一条浅灰毛巾”的安装/使用镜头？（可改为纯产品、无人手、无道具）
3. 配乐要轻柔木吉他，还是无配乐？
4. 请确认 main.jpg 是干净的产品真身图（我看不到画面）。
5. 视频生成接口何时在这个部署上开通——这是唯一的硬阻塞。
