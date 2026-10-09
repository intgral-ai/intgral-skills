方案在下面，先说两件事。第一，3 张产品图我都没有看到，下文 Picture 1/2 的分工只是按文件名猜的，图里是什么我没法描述。第二，当前这套 Intgral 部署还不能生成视频：已部署的接口里没有任何视频生成接口（`POST /admin/video-generations` 查询结果为 not_found），可用能力只有商品、listing、图片和调研。所以我没有创建草稿，没有产生任何费用，也拿不到后端报价。下面是可以先确认的方案。

**商品**：Casa Verde 竹制壁挂挂钩 · 2 件装（prod_cv01 / CV-HOOK-01）。ERP 页面：https://erp.example.test/app/products/prod_cv01 （这个环境没有浏览器工具，我没有替你打开）。这个商品目前还没有任何视频。
店铺偏好按 casa-verde-es 的设置执行：品牌名写 “Casa Verde”，画面文字（如果加）用西语。

## 方案概要（我的提议，你可以改）

- **形式**：15 秒，9:16 竖版，1 段，用现有产品图做参考（不生成关键帧）
- **主要卖点**：免打孔，背胶直接贴墙（依据：商品描述和要点里的「背胶免打孔安装」）
- **风格**：写实产品摄影，参照无印良品家居目录的感觉。配色是浅竹色、暖白、柔灰。整体安静，现代，节奏慢，只有少数几个重点动作
- **场景和光线**：暖白色的玄关墙，下方一块浅色橡木置物板。左上方柔和日光，正面加白色补光（描述里提到适合玄关和浴室，我选了玄关）
- **出镜**：一只手，只拍到手腕，燕麦色袖口挽起
- **画面文字**：不加。不配旁白，不加字幕（这个视频功能本身也不支持配音）
- **声音**：环境底噪、撕背胶膜声、挂钩贴墙声、围巾挂上的布料声。配乐是约 80 BPM 的轻柔指弹木吉他，结尾停在一个延音和弦上
- **参考图**：Picture 1 = main.jpg，作为产品外观的标准图；Picture 2 = wall.jpg，作为上墙效果图；pack.jpg 推测是包装图，本方案不展示包装，所以不用它

## 分镜（共 15 秒）

| 时间 | 画面 | 镜头 |
| --- | --- | --- |
| 0–3 秒 | 墙上已经贴好一只挂钩，日光扫过竹纹 | 中景，镜头缓慢推近 |
| 3–6.5 秒 | 手撕下第二只挂钩背面的背胶保护膜 | 近景，固定 |
| 6.5–9.5 秒 | 手把第二只挂钩压贴在第一只旁边 | 中景，固定 |
| 9.5–12.5 秒 | 手把一条灰色亚麻围巾挂上挂钩 | 中景，镜头缓慢拉远 |
| 12.5–15 秒 | 两只挂钩完整在画面中，正面朝镜头，整个画面静止 | 中景，固定 |

## 准备提交给生成服务的英文提示词（草稿，未提交）

```text
integrated_multimodal_description: A quiet home-goods commercial in the manner of a Muji home catalogue: photoreal product photography, a palette of pale bamboo, warm white and soft grey; quiet tone; contemporary; one continuous unbroken take with a locked-off camera. The scene is a smooth warm-white entryway wall above a light oak shelf. Lighting: soft daylight from the top-left, with a gentle white fill from the front. The Casa Verde bamboo wall hook keeps its [plate shape, peg shape and edge details to be confirmed], its natural bamboo colour and its smooth sanded grain exactly as in Picture 1; only lighting, background and framing change. Picture 1 shows the Casa Verde bamboo wall hook. Picture 2 shows the Casa Verde bamboo wall hook mounted on a wall. One hand with a rolled oatmeal sleeve, shown from the wrist, is the only person in the frame. No one speaks; there is no dialogue or voice-over.

Shot 1: Medium shot, eye level. One Casa Verde bamboo wall hook sits mounted on the warm-white wall, and soft daylight slides across its smooth bamboo grain. The camera pushes in with small amplitude at slow speed toward the Casa Verde bamboo wall hook.

At 3.00 seconds: Shot 2: Close-up, eye level. Keeping the same framing, the hand peels the backing film from the adhesive pad of a second Casa Verde bamboo wall hook. The camera stays static.

At 6.50 seconds: Shot 3: Medium shot, eye level. Keeping the same framing, the hand presses the second Casa Verde bamboo wall hook flat onto the wall beside the first. The camera stays static.

At 9.50 seconds: Shot 4: Medium shot, eye level. Keeping the same framing, the hand hangs a soft grey linen scarf on the second Casa Verde bamboo wall hook. The camera pulls back with small amplitude at slow speed from the two Casa Verde bamboo wall hooks.

At 12.50 seconds: Shot 5: Medium shot, eye level. Both Casa Verde bamboo wall hooks rest on the warm-white wall, fully in frame, their bamboo fronts facing the camera, and everything holds still. The camera stays static.

overall_soundscape: A quiet entryway room tone; a soft crackle as the backing film peels away; a light press of bamboo against the wall; a faint brush of linen as the scarf settles on the hook.
non_diegetic_music: Silence for the first 1.00 second, then a fingerpicked acoustic guitar around 80 BPM, played softly, one plucked note as the hook meets the wall, ending on a single held chord over the final still.
```

方括号里的部分要等你描述完产品外形才能补上。承重、尺寸、防潮、能不能重复粘贴这些说法目前都没有依据，所以我没有写进提示词。

## 需要你确认的几点

1. **主要卖点**：用「免打孔背胶安装」可以吗？还是换成「天然竹材」或「2 件装」？
2. **产品外形**：我看不到图片，请描述一下挂钩的样子：底板形状、挂钩的形状和弧度、颜色、背胶在背面是什么样子。哪些细节绝对不能变？另外 main.jpg 是不是纯色背景、正面、没有手、能看到完整产品的图？
3. **用途**：这条视频是放在 Amazon ES 商品页，还是发社媒？需要什么分辨率？
4. **生成方式**：继续只用现有产品图做参考（我的建议），还是改成先生成首尾关键帧、更精确地控制构图？关键帧也要单独花钱。
5. **生成功能**：这套部署要先由运营或管理员开通视频生成功能，我才能创建草稿（创建草稿免费，不会生成内容）并拿到后端报价。开通后要我按这个方案继续吗？

在拿到草稿和后端报价、你也批准具体方案和费用上限之前，我不会生成任何东西。完成的视频都会带有 “Generado con IA · AI-generated” 的 AI 生成标识。

方案已保存在你的私有工作区：`ws/merchants/casa-verde-es/tasks/2026-10-08-cv-hook-01-vertical-15s.md`
