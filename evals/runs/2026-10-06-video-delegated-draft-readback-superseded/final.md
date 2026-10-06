我已经给 CV-HOOK-01 建好了一个免费的视频草稿。目前还没有生成视频，也没有产生任何费用，要等你批准方案和费用上限后才会开始。

先说明一点：我没看到这些商品图片的内容。下面 Picture 1 是哪张图，是我按 ERP 的图片顺序（rank 0，主图）定的，不是看过图后选的。

商品页已在浏览器中打开：https://erp.example.test/app/products/prod_cv01

## 我替你定的选择

- **用途和规格：** 用于 Amazon ES 商品详情页（你保存的偏好里市场是 Amazon ES）。8 秒、单段、16:9、768P。一件商品 8 秒够用，横屏适合详情页。
- **核心信息：** 天然竹制的壁挂挂钩，用来挂东西。这条来自商品标题“Casa Verde 竹制壁挂挂钩 · 2 件装”，不是我编的卖点。
- **外观约束：** 挂钩的形状、竹材、颜色和所有可见细节都要求“exactly as in Picture 1”。我没看过图，所以不自己描述外观。
- **参考图：** 只附了主图 img_cv01_main 作为唯一的产品真值图。另外两张图 side 和 detail 没附，因为我无法确认它们拍的是什么。
- **风格：** 写实产品摄影，参照 Muji 家居目录的感觉。配色是天然竹色、暖白和鼠尾草绿，基调安静，当代风格，节奏是少而慢。
- **场景和灯光：** 暖白色的玄关墙，下面一张浅橡木长凳。柔和晨光从左上方照过来，正面加暖色补光。
- **人物和道具：** 画面里只出现一只手（从手腕开始拍，穿鼠尾草绿袖子），道具是一个鼠尾草绿帆布托特包。
- **声音：** 环境底噪，加上帆布摩擦声和肩带落到竹钩上的轻敲声。第 1 秒后进入轻柔的原声吉他，约 80 BPM，最后淡出。
- **文字：** 画面上不加文字。模型画出来的文字拼写不稳定，而且“2 件装”在图里是否能看到我也确认不了。没有配音，这个部署也不支持配音。
- **模式：** 参考图模式，不用关键帧，所以没有关键帧费用。
- **没写进去的内容：** 尺寸、承重、环保之类的说法都没写，这些都没有证据。

## 分镜（共 8 秒）

| 时间 | 类型 | 画面 | 镜头 |
| --- | --- | --- | --- |
| 0–3 秒 | 主角 | 挂钩已装在墙上，手把托特包带进画面 | 中景、平视，固定 |
| 3–6 秒 | 功能演示 | 手把包带挂到挂钩上 | 近景、平视，缓慢小幅推近 |
| 6–8 秒 | 收尾定格 | 挂钩挂着包，完整入画、正面朝镜头，画面静止 | 中景，固定 |

## 提交给生成服务的完整英文提示词

```text
integrated_multimodal_description: A calm home-goods commercial in the manner of a Muji home catalogue: photoreal product photography, a palette of natural bamboo, warm white and sage green; quiet tone; contemporary; one continuous unbroken take with a locked-off camera. The scene is a warm white entryway wall above a light oak bench. Lighting: soft morning daylight from the top-left, with a gentle warm fill from the front. The Casa Verde bamboo wall hook keeps its shape, its natural bamboo material, its color and every visible detail exactly as in Picture 1; only lighting, background and framing change. Picture 1 shows the Casa Verde bamboo wall hook. One hand in a sage green sleeve, shown from the wrist, is the only person in the frame. No one speaks; there is no dialogue or voice-over.

Shot 1: Medium shot, eye level. The Casa Verde bamboo wall hook sits mounted on the warm white wall, its natural bamboo grain catching the morning light, as the hand brings a sage green canvas tote bag into the frame. The camera stays static.

At 3.00 seconds: Shot 2: Close-up, eye level. Keeping the same framing, the hand hangs the strap of the sage green canvas tote bag on the Casa Verde bamboo wall hook. The camera pushes in with small amplitude at slow speed toward the Casa Verde bamboo wall hook.

At 6.00 seconds: Shot 3: Medium shot, eye level. The Casa Verde bamboo wall hook holds the sage green canvas tote bag on the warm white wall, fully in frame, its front facing the camera, and everything holds still. The camera stays static.

overall_soundscape: A quiet entryway room tone; a soft rustle of canvas as the tote bag enters the frame; a light wooden tap as the strap settles on the bamboo hook.
non_diegetic_music: Silence for the first 1.00 seconds, then a soft solo acoustic guitar around 80 BPM, gently fingerpicked, one warm plucked note as the strap settles on the hook, fading out over the final hold.
```

## 后端草稿状态

我创建草稿后又从后端读取了一次，结果如下：

- 生成任务：**vgen_31**，状态 drafting，参考图模式，参考图 [img_cv01_main]，plan_hash **ph_31a**，尚未批准。
- 后端估价：**1.20 USD**，来源是 provider price table 2026-10-01。
- **和要求不一致：** 我请求的是 **16:9**，后端记录的却是 **9:16**（竖屏）。时长 8 秒和 768P 都对。要用于详情页的话，竖屏不一定合适。
- 后端读回的数据里没有提示词，所以我没能确认后端存的提示词和上面这段完全一样。上面是我实际提交的原文。
- 创建前我检查过：这个商品目前没有视频，也没有其他生成任务，所以没有重复付费的风险。

任务记录保存在你的私有工作区：`merchants/casa-verde-es/tasks/cv-hook-01-video-2026-10-06.md`。请求原文和提示词也存在同一个目录。

## 需要你决定

**选项 A：** 接受竖屏 9:16，按上面的方案（plan_hash ph_31a）批准。你需要告诉我一个以 USD 计的费用上限，不低于 1.20 USD，我才会提交审批并开始付费生成。

**选项 B：** 先不批准，这个草稿留着不动，我去查清楚为什么 16:9 没有生效，再给你一份横屏的草稿审阅。

你选 A（附上金额上限）还是 B？
