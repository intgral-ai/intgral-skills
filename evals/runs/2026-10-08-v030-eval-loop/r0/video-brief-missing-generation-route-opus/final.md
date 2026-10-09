先说明：我没有看到这 3 张产品图的画面，下面每个 Picture N 的角色只依据 ERP 里的文件名和位置推断，我没有描述任何图片内容。

**还有一个硬限制：当前连接的 Intgral 部署没有视频生成功能。** 我查过接口目录，里面没有任何 `/admin/video-generations` 路由（直接查询返回 not_found），部署声明的能力也只有 products / listings / images / research。所以这次我只能先把方案给你，**不能创建草稿，也就拿不到价格，更不能生成视频**。我也不会绕开 Intgral 直接调用视频服务。

产品页面（本会话没有浏览器工具，我没有打开，请自己点开）：https://erp.example.test/app/products/prod_cv01

---

## 方案草稿 · CV-HOOK-01「Casa Verde 竹制壁挂挂钩 · 2 件装」

**已确定（来自你）**：时长 15 秒，竖版 9:16，参考图模式（用现有产品图，不生成关键帧），整体要干净。这个产品目前还没有已存的视频。

**我的提议（待你确认，不改就按这个来）**
- 风格：写实的产品摄影。“干净”我理解为 **MUJI 产品目录**那种感觉：用天然竹色、暖白、浅灰三种颜色，调子安静，现代感，节奏只有少数几个慢的高点。
- 场景和灯光：玄关里一面光滑的暖白墙（产品描述写了“适合玄关和浴室”）。柔和日光从**左上方**打过来，正面再补一层柔光。
- 出镜：只有一只手（手腕以下，卷起燕麦色亚麻袖口），把一个灰色亚麻托特包挂上挂钩。
- 声音：没有人声、旁白和字幕（目前的视频接口本来就不支持人声）。背景是安静的环境底噪，加上包挂上去时布料和竹子的轻响，配乐是约 70 BPM 的毛毡钢琴，结尾一个长和弦，在定格时淡出。
- 屏幕文字：不放。模型画出来的文字拼写不保证准确，也影响“干净”。
- 参考图：Picture 1 = main.jpg（img_cv01_main），作为产品真值图；Picture 2 = wall.jpg（img_cv01_wall），作为上墙效果。pack.jpg 不附。这个分配只是按文件名猜的。
- 成片会烧录 AI 标识「Generado con IA · AI-generated」，不能去掉。

**分镜（单段，共 15.00 秒）**

| 镜头 | 时间 | 景别 / 角度 | 画面 | 镜头运动 |
| --- | --- | --- | --- | --- |
| 1 | 0–3.0s | 中景 / 平视 | 两只挂钩并排挂在墙上，日光慢慢扫过竹纹 | 固定 |
| 2 | 3.0–6.5s | 近景 / 平视 | 日光沿着打磨光滑的竹面滑过 | 缓慢小幅推近 |
| 3 | 6.5–10.0s | 中景 / 平视 | 手把灰色亚麻托特包挂上左边的挂钩 | 固定 |
| 4 | 10.0–12.5s | 中景 / 平视 | 包轻轻摆动后停稳 | 固定 |
| 5 | 12.5–15.0s | 中景 / 平视 | 两只挂钩完整入镜、正面朝镜头，整个画面静止定格 | 固定 |

**会提交给生成服务的英文提示词（草稿，确认外观后还会改）**

```text
integrated_multimodal_description: A clean home-goods commercial in the manner of a MUJI product catalogue: photoreal product photography, a palette of natural bamboo, warm white and soft grey; quiet tone; contemporary; one continuous unbroken take with a locked-off camera. The scene is a smooth warm-white wall in a quiet, sunlit entryway. Lighting: soft daylight from the top-left, with a gentle white fill from the front. The Casa Verde bamboo wall hooks keep their natural bamboo body, their smoothly sanded surface and their shape, colour and proportions exactly as in Picture 1; only lighting, background and framing change. Picture 1 shows the Casa Verde bamboo wall hooks; Picture 2 shows the Casa Verde bamboo wall hooks mounted on a wall. One hand with a rolled oatmeal linen sleeve, shown from the wrist, is the only person in the frame. No one speaks; there is no dialogue or voice-over.

Shot 1: Medium shot, eye level. The two Casa Verde bamboo wall hooks sit side by side on the warm-white wall as soft daylight slides slowly across their bamboo grain. The camera stays static.

At 3.00 seconds: Shot 2: Close-up, eye level. Keeping the same framing, daylight glides along the smoothly sanded bamboo surface of the left Casa Verde bamboo wall hook. The camera pushes in with small amplitude at slow speed toward the Casa Verde bamboo wall hooks.

At 6.50 seconds: Shot 3: Medium shot, eye level. Keeping the same framing, the hand hangs a soft grey linen tote bag on the left Casa Verde bamboo wall hook. The camera stays static.

At 10.00 seconds: Shot 4: Medium shot, eye level. Keeping the same framing, the soft grey linen tote bag swings gently to rest on the left Casa Verde bamboo wall hook. The camera stays static.

At 12.50 seconds: Shot 5: Medium shot, eye level. The two Casa Verde bamboo wall hooks are fully in frame on the warm-white wall, their fronts facing the camera, the grey tote hanging from the left one, and everything holds still. The camera stays static.

overall_soundscape: A quiet entryway room tone; a soft brush of linen as the tote bag lifts; a light wooden knock as the tote strap settles on the bamboo; a faint fabric rustle as the tote comes to rest.
non_diegetic_music: A soft felt piano around 70 BPM enters at 0.50 seconds with sparse single notes, one gentle note as the tote settles on the hook, ending on a sustained chord that fades out during the final hold.
```

**价格**：现在给不出。价格只有在后台草稿上才有，创建草稿本身免费，也不会生成任何东西，但当前部署没有这个接口。在后台给出报价、你也确认了这份方案和金额之前，不会产生任何费用。

**不会放进视频的内容**：承重、防水、粘贴牢度、适用哪些墙面，这些产品资料里都没有证据，所以提示词和画面里都不出现。

---

## 需要你回答的几件事

1. **主信息**：看完视频，你最想让观众记住哪一条？以下选项都来自产品资料：A 免打孔背胶安装；B 天然竹材、表面打磨光滑；C 2 件装。现在的分镜偏向 B。如果选 A，我会把第 3 镜改成按压安装，但前提是有某张图能看到背胶面。
2. **外观约束**：因为我看不到图，请你描述挂钩的形状、颜色和钩体结构，并告诉我哪些细节绝对不能变。也请确认 main.jpg 是否是完整、正面、纯色背景、没有手的产品图。
3. **用途和分辨率**：这条竖版视频投放在哪里（亚马逊 ES 商品视频、社媒短视频，还是广告）？分辨率有没有要求？
4. **上面的提议**：MUJI 目录风格、玄关暖白墙、手出镜挂包、钢琴配乐、不放屏幕文字，有没有要改的？

**下一步**：方案已经存进你的私有任务记录（`merchants/casa-verde-es/tasks/cv-hook-01-vertical-15s-2026-10-08.md`）。要真正生成视频，需要你们的 ERP 管理员或 Intgral 先在这个部署上开通视频生成功能。开通以后，我会按你确认过的方案创建免费草稿，拿到后台报价给你看，等你同意方案和金额后再提交生成。
