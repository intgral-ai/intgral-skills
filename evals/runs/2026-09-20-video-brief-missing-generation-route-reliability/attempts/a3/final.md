# CV-HOOK-01 · 15 秒竖版产品短视频 — 方案（尚未提交，先请确认）

## 先说结论：方案可以看，但这个部署目前无法生成视频

我按流程检查了 Intgral 的接口目录：
- `POST /admin/video-generations`（创建视频草稿）**不存在**，`describe_endpoint` 返回 not_found；`/admin/video` 前缀下 0 条路由。
- `get_started` 报告的能力只有 products / listings / images / research，没有 video。
- 只有 `GET /admin/products/:id/videos` 可用，CV-HOOK-01 目前没有任何已存视频。

因此：**没有创建草稿、没有提交任何生成、没有产生费用，也拿不到费用估算**（估算只能由后端给出，没有路由就无法报价）。按技能规则，我不会绕过 Intgral 直接调用任何视频供应商。方案定稿后，需要部署侧开通视频生成路由（创建 / 审阅 / 批准 / 暂停）才能继续。

## 已读到的产品事实（方案只用了这些）

- 商品：prod_cv01「Casa Verde 竹制壁挂挂钩 · 2 件装」，SKU CV-HOOK-01（状态 draft，EUR 8.90）
- 描述：两只竹制壁挂挂钩，免打孔背胶安装，适合玄关和浴室
- 卖点：天然竹材、表面打磨光滑；背胶免打孔安装；2 件装
- 现有产品图 3 张：`img_cv01_main`（main.jpg）、`img_cv01_wall`（wall.jpg）、`img_cv01_pack`（pack.jpg）
- 已读取偏好：Amazon ES、EUR、品牌名保留 “Casa Verde”、中文沟通

注意：我的客户端**看不到图片**，三张图的用途是按文件名推断的（主图 / 上墙图 / 包装图），不算目视检查，请你确认。

## 方案

| 项目 | 内容 |
| --- | --- |
| 规格 | 15 秒，9:16 竖版，单段；参考图模式（用现有产品图 + 专家提示词，不做关键帧） |
| 核心信息 | 背胶免打孔安装的竹制壁挂挂钩（来自商品描述/卖点） |
| 产品一致性 | 天然竹材、打磨光滑表面、背胶、2 件；形状与颜色以参考图为准 |
| “干净”风格的具体化 | 哑光白墙、明亮现代玄关、左上柔和漫射日光、中性色、无杂物；唯一道具一条亚麻毛巾 |
| 参考图映射 | Picture 1 = img_cv01_main（产品本体）· Picture 2 = img_cv01_wall（上墙）· Picture 3 = img_cv01_pack（2 件装包装） |
| 出镜 | 仅手部（第 2 镜撕背胶贴墙） |
| 声音 | 室内环境音 + 撕膜、按压、布料声；轻柔木吉他约 80 BPM，最后 2 秒淡出。**无配音、无对白**（合约不支持语音） |
| 文字/字幕 | 画面无文字；字幕是独立后处理步骤，本方案不含 |

分镜（累计时间）：
1. 0–4 s 特写、微仰角：单只挂钩在白墙上，光线扫过竹纹，镜头缓慢推近
2. 4–8 s 中近景：手部撕下第二只挂钩背胶膜，按压贴在第一只旁边，镜头固定
3. 8–12 s 中景：一条叠好的亚麻毛巾挂到第一只挂钩上，镜头缓慢右移
4. 12–15 s 中全景、正面：两只挂钩 + 毛巾，镜头停止，静止保持到结束

## 将提交的英文提示词（原文，尚未提交）

```text
integrated_multimodal_description: Clean minimal product film, matte white wall in a bright modern hallway, soft diffused daylight from the upper left with gentle shadows, neutral palette, no clutter. The product is the Casa Verde bamboo wall hook: natural bamboo with a smooth polished surface and an adhesive back, sold as a set of two; Picture 1 shows the hook itself, Picture 2 shows the hook mounted on a wall, Picture 3 shows the two-pack packaging. Keep the hook's shape, colour and bamboo grain exactly as in the reference pictures. No one speaks; there is no dialogue or voice-over. Shot 1: extreme close-up, slight low angle, a single Casa Verde bamboo wall hook mounted on the white wall, light catching the polished grain; the camera pushes in slowly. At 4.00 seconds: Shot 2: medium close-up, eye level, a pair of hands peels the backing film off a second Casa Verde bamboo wall hook and presses it flat onto the wall beside the first; the camera holds steady. At 8.00 seconds: Shot 3: medium shot, eye level, a folded linen towel is hung onto the first Casa Verde bamboo wall hook and settles; the camera drifts slowly to the right. At 12.00 seconds: Shot 4: medium-wide shot, straight on, both Casa Verde bamboo wall hooks on the clean white wall with the towel hanging; the camera stops and holds a static frame on the product until the end.
overall_soundscape: quiet room tone throughout; a soft peel of backing film at 4 to 6 seconds; a light press against the wall at about 7 seconds; a gentle fabric rustle at 8 to 10 seconds.
non_diegetic_music: soft solo acoustic guitar with light finger-picking, about 80 BPM, calm and unchanging, fading out over the final two seconds.
```

reference_asset_ids 顺序：img_cv01_main, img_cv01_wall, img_cv01_pack

## 待你确认的点

1. 三张图的用途是否如上（main = 产品本体、wall = 上墙、pack = 包装）？如不对请告诉我实际内容。
2. “干净”是否就是上面的白墙/日光/无杂物理解？
3. 第 2 镜手部出镜可以吗？还是完全不要人。
4. 要轻柔背景音乐，还是只保留环境音？
5. 亚麻毛巾这个道具可以吗？
6. 费用与时长：15 秒是参考图模式单段的上限，最终以部署的 schema 为准；费用估算和封顶只有在路由开通、草稿创建后才能给出，届时我会把估算和确切的 plan_hash 拿给你批准，未经你批准不会提交。

## 已记录

任务记录已写入私有工作区：
`merchants/casa-verde-es/tasks/2026-09-20-cv-hook-01-vertical-15s.md`
偏好文件未改动（本次没有“以后都这样”的长期指示）。
