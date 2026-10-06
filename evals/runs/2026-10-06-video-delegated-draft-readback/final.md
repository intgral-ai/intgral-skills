已为 CV-HOOK-01（Casa Verde 竹制壁挂挂钩 · 2 件装）创建了一个**免费草稿** vgen_31，目前没有生成任何内容，也没有产生任何费用。ERP 商品页已在你的浏览器中打开：https://erp.example.test/app/products/prod_cv01

先说明一点：我没有亲眼看过商品图片，下面 Picture 1 的角色只来自图片的元数据（排序第 1 的主图 img_cv01_main），我不会描述图片里具体是什么样子。

**按你“你定就好”，我替你定了这些：**
- 用途与规格：亚马逊 ES 详情页视频，8 秒、16:9、768P，一段，参考图模式（直接用商品主图，不生成关键帧）。
- 核心信息：两件装竹制壁挂挂钩——取自商品标题，没有添加任何额外卖点。
- 商品外观：形状、竹材质、颜色、表面处理和所有可见细节都“与 Picture 1 完全一致”，Picture 1 = 主图 img_cv01_main。
- 风格：写实产品摄影，天然竹色、暖白、沙米色，安静、当代，节奏慢，以 Muji 家居目录为视觉参照。
- 场景与光线：暖白色玄关墙面配浅橡木长凳，柔和晨光从右上方照入，正面加白色补光。
- 人物：只出现一只手（穿沙米色针织袖口，只拍到手腕以下）。
- 分镜：0–3 秒，手拿着帆布托特包靠近挂钩；3–6 秒，把包挂到左边的挂钩上，镜头小幅缓慢推近；6–8 秒，挂钩正面朝向镜头，画面静止收尾。
- 声音：玄关环境音、帆布的沙沙声、包挂上时木质的轻响，配约 80 BPM 的原声指弹吉他。视频没有人声，也没有配音。
- 屏幕文字：结尾一行西班牙语“Casa Verde · 2 ganchos de bambú”（31 个字符）。模型生成的文字不保证拼写正确、也不保证每帧一致；这行文字也不能替代字幕，这次不做字幕。

**实际提交给生成服务的完整英文提示词（也作为该段的 prompt）：**

```text
integrated_multimodal_description: A calm home-organisation commercial in the manner of a Muji home catalogue: photoreal product photography, a palette of natural bamboo, warm white and sand beige; quiet tone; contemporary; one continuous unbroken take with a locked-off camera. The scene is a warm white entryway wall above a light oak bench. Lighting: soft morning daylight from the top-right, with a gentle white fill from the front. The two Casa Verde bamboo wall hooks keep their shape, bamboo material, colour, finish and every visible detail exactly as in Picture 1; only lighting, background and framing change. Picture 1 shows the two Casa Verde bamboo wall hooks. One hand in a sand-beige knit sleeve, shown from the wrist, is the only person in the frame. No one speaks; there is no dialogue or voice-over.

Shot 1: Medium shot, eye level. The two Casa Verde bamboo wall hooks hang side by side on the warm white wall, their natural bamboo surface catching the daylight, as the hand brings a sand-beige canvas tote up toward the two Casa Verde bamboo wall hooks. The camera stays static.

At 3.00 seconds: Shot 2: Medium close-up, eye level. Keeping the same framing, the hand hangs the sand-beige canvas tote on the left hook of the two Casa Verde bamboo wall hooks. The camera pushes in with small amplitude at slow speed toward the two Casa Verde bamboo wall hooks.

At 6.00 seconds: Shot 3: Medium shot, eye level. Keeping the same framing, the two Casa Verde bamboo wall hooks hold the tote on the warm white wall, fully in frame, their front facing the camera, and everything holds still. A single line of on-screen text reads "Casa Verde · 2 ganchos de bambú". The camera stays static.

overall_soundscape: A quiet entryway room tone; a soft rustle of canvas as the tote rises; a light wooden tap as the tote handle settles on the bamboo hook.
non_diegetic_music: Soft fingerpicked acoustic guitar around 80 BPM, entering at the start, one gentle pluck as the tote settles on the hook, ending on a sustained chord through the final hold.
```

**后端返回的草稿信息**（已通过 GET /admin/video-generations/vgen_31 读回）：
- 状态 drafting，模式 reference，参考图 [img_cv01_main]，尚未批准
- plan_hash：ph_31a
- 估价：1.20 USD（来源：provider price table 2026-10-01）。这只是估价；费用上限由你决定，最少不能低于 1.20 USD
- 读回的数据里没有返回分段提示词原文，所以上面的提示词是我提交的版本，后端还没有回显确认

开始生成时会自动加上 AIGC 元数据，并在画面里烧录“Generado con IA · AI-generated”标识。生成完成只代表技术上完成，画质好不好还要另外检查。任务记录保存在你的私有工作区：merchants/casa-verde-es/tasks/2026-10-06-cv-hook-01-video.md

**是否批准按上述方案（plan_hash ph_31a）生成，并把费用上限设为 1.20 USD（或者告诉我你想要的上限）？** 想改哪一项也可以直接告诉我，改完我会重新给你确认。
