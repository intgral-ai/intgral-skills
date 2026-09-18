方案先给你看，但有一个前提要先说清楚：

## 先说结论：这套部署目前做不了视频生成

我查了 Intgral 的接口目录：`get_started` 的能力列表只有 products / listings / images / research，没有 video；`/admin/video-generations`（创建、审批、生成视频的路由）在目录里不存在，只有一个 `GET /admin/products/:id/videos`（读取已存的视频，CV-HOOK-01 目前为空）。

所以这次我**没有**创建任何草稿，也**没有**产生任何费用；费用估算也拿不到（不是免费，是未知）。按 Skill 的规则，缺路由就必须停在提交之前，我也不会绕过 Intgral 直接去调用视频服务商。需要你们的部署方（或 Intgral 侧）把视频生成路由上线后，这个方案才能提交。

下面是基于现有商品事实做好的方案，路由上线后可以直接进入审批流程。

## 商品事实（来自 ERP）

- 商品：`Casa Verde 竹制壁挂挂钩 · 2 件装`（prod_cv01，状态 draft），SKU CV-HOOK-01
- 现有图片 3 张：`img_cv01_main`（main.jpg）、`img_cv01_wall`（wall.jpg）、`img_cv01_pack`（pack.jpg）
- 注意：我看不了图片，只能按文件名推断三张分别是主图 / 上墙图 / 包装图，**未经目视核实**。哪一张是"产品真实外观"的基准图，需要你确认。
- 视频只用商品标题里能确认的事实：竹制、壁挂、两件装、品牌 Casa Verde。不加任何承重、环保等未经证实的卖点。

## 方案（参考图模式，1 段 15 秒，9:16 竖版）

| 项目 | 方案 | 来源 |
| --- | --- | --- |
| 用途 | 15 秒竖版产品短视频 | 你 |
| 核心信息 | 竹制壁挂挂钩，两件装 | 商品标题 |
| 风格 | 干净极简：浅色素墙、柔和定向自然光、无杂物 | 你（"干净一点"）+ 我补细节 |
| 参考图映射 | Picture 1 = main，Picture 2 = wall，Picture 3 = pack | 现有图片（角色待确认） |
| 出镜 | 只有产品，不出现人和手 | 我的建议 |
| 文字 / 语音 | 无画面文字；合约不支持配音；字幕不是已实现的服务 | Skill 合约 |
| 声音 | 轻微室内环境音 + 轻柔极简原声吉他，或者干脆无音乐 | 待你定 |
| 模式 / 预算 | 参考图模式，不用关键帧；费用未知（需后端估算） | — |

分镜（单段 15 秒）：

1. 0–5 秒：挂钩挂在素墙上，镜头缓慢推近，看清竹纹和钩型
2. 5–10 秒：镜头缓慢环绕，两只挂钩并排出现，体现"2 件装"
3. 10–15 秒：镜头缓慢拉远，产品完整入画，最后 2 秒静止定格

## 拟提交的英文提示词（原样）

```text
integrated_multimodal_description: Clean minimal product film, a plain warm-white plaster wall, soft directional daylight from the upper left casting a gentle shadow, no clutter. The product is the Casa Verde bamboo wall hook: a natural bamboo wall-mounted hook exactly as shown in Picture 1; Picture 2 shows it mounted on a wall; Picture 3 shows the two-pack packaging. Keep the bamboo grain, color and hook shape identical to Picture 1 throughout. No one speaks; there is no dialogue or voice-over. Shot 1: medium close-up at eye level, one bamboo wall hook mounted on the plain wall, a light cotton tote bag hanging still from it; the camera pushes in slowly and steadily toward the hook. At 5.00 seconds: Shot 2: medium shot, the tote bag is gone and two identical bamboo wall hooks are mounted side by side on the wall; the camera orbits slowly a quarter turn from left to right around them. At 10.00 seconds: Shot 3: medium-wide shot, both hooks fully visible and centered; the camera pulls back slowly and then comes to a complete stop, holding a static frame on the two hooks for the final two seconds.
overall_soundscape: Quiet interior room tone throughout; a soft fabric rustle as the tote bag settles in the first second; otherwise silence.
non_diegetic_music: Soft minimal acoustic guitar, slow tempo around 70 BPM, a single gentle motif that fades out over the last two seconds.
```

说明：Skill 基线要求提示词里恰好出现一次 "No one speaks; there is no dialogue or voice-over."，单段 4–15 秒、最多 5 张参考图，这条方案都符合；但因为路由不在，无法用部署方的真实 schema 校验，上线后我会再核对一次。分镜 1 里的手提袋是我为了体现"挂钩在用"加的道具，你不要的话去掉即可。

## 需要你决定的

1. 三张图哪一张是产品外观基准图？（我按文件名猜 main.jpg）
2. 音乐：轻柔原声吉他 / 无音乐 / 其他？
3. 分镜 1 的手提袋道具要不要？
4. 视频用在哪（Amazon 商品页视频、社媒）？这会影响后面是否要加文字版本。

方案和"路由缺失"这个状态我已记在你的私有工作区（merchants/casa-verde-es/video-tasks/2026-09-18-cv-hook-01-vertical-15s.md），没有改动你的偏好文件。路由上线后告诉我，我再创建草稿、拿到真实报价和 plan hash 之后，再来找你审批，不会在你确认前花任何钱。
