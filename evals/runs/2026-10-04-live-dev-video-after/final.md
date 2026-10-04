好的，先出方案，不生成。XZ-23066 的产品页已经在浏览器里打开了：https://erp-dev.intgral.ai/app/products/prod_01M1NG0DN69AG6E115WW9H1HMX

**产品**：LIN HOME 两件套套叠茶几（Juego De 2 Mesas Nido），人字拼木纹台面，黑色金属框架。ERP 里有 9 张图，这个商品目前还没有视频。

## 关于价格

现在还报不了价。视频的估价只能由 Intgral 后台在创建视频草稿时给出。创建草稿本身不收费，也不会生成任何内容。我不会凭印象或者参考别的视频来报价。

另外有一个阻塞：这个 ERP 的接口目录现在读不到（网关返回 `catalog_unavailable`）。所以我确认不了视频生成接口和它支持的分辨率等参数，就算你同意，现在也没法建草稿。要请管理员修复网关的接口目录（重新生成 catalog 后重建网关）。修好后，你确认下面的方案，我就建草稿。估价会从后台读出来给你，你点头并给出预算上限之前，不会开始生成。

## 方案草稿（10 秒，竖版 9:16，单段）

我看过的图只有两张：主图（白底，两张桌子并排）和场景图（客厅里，桌上放着杯子和书）。另外 7 张 PNG 我还没看，下面没有用到它们的内容。

- **模式**：参考图模式（推荐）。Picture 1 = 白底主图，作为产品的“真实外观”依据。场景图只当风格参考，不放进生成请求。
- **核心信息**（待你确认）：两张桌子能套叠收起，省空间。这条来自 listing 描述里的“可以一张套进另一张”。
- **外观约束**（我按主图写的，请逐条改）：一高一矮两张桌子，高的长方形，矮的较小、能推到高的下面；浅橡木色人字拼（parquet）台面；细的黑色方管金属框架，两侧是闭合的框形腿。尺寸只当比例用，不在画面里写数字。

| 时间 | 镜头 | 动作 | 运镜 |
| --- | --- | --- | --- |
| 0–3 秒 | 中景，俯角 | 两张桌子并排放在米色地毯上，一只手把白色陶瓷杯放到高桌的人字拼台面上 | 固定 |
| 3–7 秒 | 中景，俯角，同一构图 | 这只手把矮桌一推到底，推进高桌下面（套叠） | 小幅慢推近 |
| 7–10 秒 | 中景，俯角，同一构图 | 套好的两张桌子完整入画，台面朝向镜头，全部静止 | 固定 |

以下是我的提议（来源：Agent 提议，未确认），哪条不对直接改：
- **风格**：照片级产品摄影，参照 Zara Home 目录的感觉；配色是蜂蜜橡木、哑光黑、暖白；调子安静；当代；节奏是少量慢节拍。
- **场景和灯光**：明亮的客厅，浅灰色墙面，地上铺米色羊毛地毯；左侧窗户进来柔和的日光，正面有暖色补光，背后有一点轮廓光。
- **人物**：画面里只出现一只手（从手腕开始拍，袖子是燕麦色），没有其他人。
- **声音**：室内环境底噪，杯子落在木面上的轻响，桌子滑过地毯的闷声。配乐是约 80 BPM 的指弹木吉他，每个动作对应一个音，结尾淡出。
- **文字**：画面里不加字。成片都会自动烧录 AI 生成标识 “Generado con IA · AI-generated”（欧盟 AI 法案要求），去不掉。
- **不支持的部分**：没有旁白和配音，这条视频没有人说话。

**竖版要注意**：桌子是横向的，放进 9:16 画面上下会比较空。所以我用了俯角，把台面和地毯也拍进来。

## 会提交给生成服务的英文提示词（草稿）

```text
integrated_multimodal_description: A calm home-furniture commercial in the manner of a Zara Home catalogue: photoreal product photography, a palette of honey oak, matte black and warm off-white; quiet tone; contemporary; one continuous unbroken take with a locked-off camera. The scene is a bright living room with a pale grey wall, a light linen sofa edge and a cream wool rug. Lighting: soft daylight from the left through a window, with a gentle warm fill from the front, with a faint rim light from behind. The LIN HOME nesting coffee table set keeps its two tables, a taller rectangular table and a lower, smaller table that slides beneath it, its light oak herringbone parquet tops and its slim black square-tube metal frames exactly as in Picture 1; only lighting, background and framing change. Picture 1 shows the LIN HOME nesting coffee table set. One hand with a rolled oatmeal sleeve, shown from the wrist, is the only person in the frame. No one speaks; there is no dialogue or voice-over.

Shot 1: Medium shot, high angle. The LIN HOME nesting coffee table set stands side by side on the cream rug, and the hand sets a white ceramic mug on the light oak herringbone top of the taller table. The camera stays static.

At 3.00 seconds: Shot 2: Medium shot, high angle. Keeping the same framing, the hand pushes the lower table of the LIN HOME nesting coffee table set fully beneath the taller table in one smooth glide. The camera pushes in with small amplitude at slow speed toward the LIN HOME nesting coffee table set.

At 7.00 seconds: Shot 3: Medium shot, high angle. Keeping the same framing, the LIN HOME nesting coffee table set rests nested on the cream rug, fully in frame, its herringbone tops facing the camera, and everything holds still. The camera stays static.

overall_soundscape: A quiet living-room room tone; a soft ceramic tap as the mug meets the oak top; a muffled glide of metal feet across the wool rug; a light settle as the lower table stops.
non_diegetic_music: Soft fingerpicked acoustic guitar around 80 BPM, entering at 0.50 seconds, one gentle pluck as the mug lands and one as the tables nest, fading out over the final hold.
```

## 需要你先回答的几件事

1. 核心信息就定“套叠收纳、省空间”吗？还是想突出别的，比如人字拼木纹？
2. 上面的外观约束对不对？哪些细节绝对不能变？（比如矮桌是不是真的能整个推进高桌下面？）
3. 视频用在哪里，Amazon 商品视频还是社媒？分辨率有要求吗？（可选的分辨率要等接口目录修好后才能确认。）
4. 用参考图模式可以吗？还是要用“首尾关键帧”模式更严格地控制构图？关键帧模式要另外生成图片，也要单独花钱。
5. 画面里可以出现手吗？如果不要手，我改成桌子自己滑进去。

这个方案目前只记在这段对话里，没有存成文件。
