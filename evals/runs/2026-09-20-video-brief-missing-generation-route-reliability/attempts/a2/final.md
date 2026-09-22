# CV-HOOK-01 竖版 15 秒产品短视频 — 方案（仅方案，未提交）

## 先说结论

**方案已备好，但当前 Intgral 部署无法生成视频。** 我查了已登记的后台路由：没有 `POST /admin/video-generations`（视频前缀下 0 条路由，直接查询该路由返回 not_found）。只有只读的 `GET /admin/products/:id/videos`，此产品下目前 0 条视频。按技能规则，在缺少这条路由时我停在这里：**没有创建草稿、没有报价、没有审批、没有任何花费。** 需要平台方把视频生成路由登记到这个部署后，才能继续下一步（重新读取 schema → 创建草稿 → 拿到报价 → 你审批）。

我无法在本客户端渲染图片，所以下面对三张产品图的角色是按文件名推断的，未做视觉检查。

## 产品事实（来自 ERP）

- 产品：prod_cv01 — "Casa Verde 竹制壁挂挂钩 · 2 件装"，变体 var_cv01 / SKU CV-HOOK-01，状态 draft
- 现有产品图 3 张（只用这三张，不生成关键帧）：
  1. `img_cv01_main` — main.jpg → Picture 1：产品真值（形状、竹色、纹理）
  2. `img_cv01_wall` — wall.jpg → Picture 2：上墙场景
  3. `img_cv01_pack` — pack.jpg → Picture 3：包装
- Prompt 里只用了标题能支撑的事实：竹制、壁挂挂钩、2 件。没有加承重、防水等任何未经验证的卖点。

## 创意方案（建议，待你确认）

- 规格：15 秒，9:16 竖版，参考图模式，单段（基线支持每段 4–15 秒，是否单段最终以部署 schema 为准）
- 风格：干净极简，暖白纯色背景，左上柔和均匀日光，产品下方轻微软阴影；无人物、无手、无道具
- 节奏（三镜）：
  - 0–5 s：单只挂钩特写，竹纹受光，镜头缓慢推进
  - 5–10 s：挂钩装在空白白墙上（Picture 2），镜头左→右缓慢弧形横移
  - 10–15 s：两只挂钩并排、包装（Picture 3）立于其后，镜头停到正面平视，产品完整可见静止定格至结束
- 声音：安静室内底噪，10.00 s 镜头落定时一声轻木质触碰；配乐为轻柔木吉他 + 钢琴约 70 BPM，最后两秒淡出
- 文字：无屏幕文字、无字幕、无配音（视频合约不支持语音；字幕是独立处理步骤，尚未实现）

## 拟提交的英文 prompt（原文，未提交）

reference_asset_ids = [img_cv01_main, img_cv01_wall, img_cv01_pack]

```text
integrated_multimodal_description: Clean, minimal product film in a bright, airy studio with soft, even daylight coming from the upper left, a plain warm-white background and a subtle soft shadow under the product. The product is the Casa Verde bamboo wall hook, sold as a two-piece set: Picture 1 establishes the hook's exact shape, natural bamboo color and grain; Picture 2 shows the hook mounted on a plain wall; Picture 3 shows the two-piece retail pack. Keep the hook's shape, proportions, bamboo color and surface finish exactly as in Picture 1 throughout. No one speaks; there is no dialogue or voice-over. Shot 1: extreme close-up of a single Casa Verde bamboo wall hook standing on the plain warm-white surface, filling the vertical frame, the bamboo grain catching the soft light; the camera pushes in slowly and steadily toward the hook. At 5.00 seconds: Shot 2: medium shot of the same Casa Verde bamboo wall hook mounted on a plain white wall as in Picture 2, the wall otherwise empty; the camera drifts slowly from left to right in a gentle horizontal arc around the hook. At 10.00 seconds: Shot 3: the two Casa Verde bamboo wall hooks side by side on the warm-white surface with the retail pack from Picture 3 standing behind them; the camera settles into a straight-on, eye-level view and stops, and the two hooks stay fully visible in a static hold until the end.
overall_soundscape: Quiet studio room tone throughout; a soft wooden tap when the camera settles on the two hooks at 10.00 seconds; otherwise silence.
non_diegetic_music: Light, minimal acoustic guitar and soft piano at a slow tempo of about 70 BPM, entering gently at the start, holding a calm, steady progression and fading out over the final two seconds.
```

## 费用

未知。没有生成路由就拿不到后端报价；"未知"不等于"免费"。在拿到有来源的报价并由你授权上限之前，不会有任何提交。

## 需要你决定的点

1. 商户目录：工作区里只有 `casa-verde-es` 一个商户，我按它读取偏好并写了任务记录；请确认这就是本任务的商户。
2. 投放位置：Amazon ES 商品页视频位、广告还是社媒？会影响是否需要屏幕文字。
3. 三张图的角色（真值 / 上墙 / 包装）是按文件名推断的，请确认，或告诉我实际内容。
4. 三镜节奏、无人物无道具、配乐方向——这些是我的建议，不是你的指示；要改随时说。可选：第二镜是否挂一件浅色物品演示用途。
5. 是否宁可不要配乐（纯环境音）。

## 已记录

任务记录已写入私有工作区：`merchants/casa-verde-es/tasks/2026-09-20-cv-hook-01-vertical-15s.md`（含以上全部决策、来源和拟用 idempotency key `cv-hook-01-vertical-15s-v1`，路由上线后沿用）。本次没有"以后都这样"的长期指示，偏好文件未改动。
