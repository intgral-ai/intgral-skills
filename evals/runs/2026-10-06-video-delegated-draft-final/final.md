CV-HOOK-01 的视频草稿已经建好：**vgen_31**，状态 `drafting`。草稿是免费的，到现在还没有生成任何内容，也没有产生费用。商品页已在你的浏览器里打开：https://erp.example.test/app/products/prod_cv01

开始前我查了一下：这个商品目前没有任何视频，本地也没有进行中的视频任务，所以不会重复付费。

**我替你定下的方案**（每项一句）
- **用途和规格**：用于 Amazon ES 商品页，8 秒、16:9 横屏、768P，一段完成。
- **核心信息**：只用商品标题「Casa Verde 竹制壁挂挂钩 · 2 件装」里已有的事实，也就是两只竹挂钩并排、其中一只挂上东西。
- **外观约束**：挂钩的形状、竹色、纹理和所有细节都要求和 Picture 1（主图 `img_cv01_main`）完全一致。我没有另外描述外观。
- **风格**：写实产品摄影，参考 MUJI 家居目录的感觉；配色是天然竹色、暖白和鼠尾草绿，基调安静、当代，节奏慢。
- **场景和光线**：玄关的暖白墙面，下面放一条浅色橡木长凳；柔和晨光从左上方照进来，正面加一点白色补光。
- **出镜**：只出现一只手（手腕以下，卷起的燕麦色亚麻袖口），道具是一个鼠尾草绿帆布托特包。
- **分镜**：
  - 0–3 秒：晨光扫过竹纹，镜头缓慢推近。
  - 3–5.5 秒：手把包挂到左侧挂钩上。
  - 5.5–8 秒：两只挂钩正面完整入画，静止定格。
- **声音**：玄关环境音、帆布摩擦声、包带落在竹钩上的一声轻响；配乐是约 70 BPM 的独奏毛毡钢琴。
- **文字**：画面上不加文字（模型画出来的文字拼写没法保证），没有字幕，也没有人声或配音。
- **模式**：参考图模式，不生成关键帧。

**参考图**
请注意：我这边看不到图片。Picture 1 的角色只是根据文件名和排序（主图、rank 0）分配的，图片内容我没有看过。我也没有核实主图里是否同时有两只挂钩。如果主图里只有一只，画面可能和「两只并排」的设定冲突，审片时请特别留意这一点。
- Picture 1 = `img_cv01_main`（https://cdn.example.test/cv01/main.jpg）
- 侧面图和细节图没有附上。

**提交给生成服务的完整英文 prompt**
```text
integrated_multimodal_description: A quiet home-goods commercial in the manner of a MUJI home catalogue: photoreal product photography, a palette of natural bamboo, warm white and soft sage green; quiet tone; contemporary; one continuous unbroken take with a locked-off camera. The scene is a warm white entryway wall above a light oak bench. Lighting: soft morning daylight from the top-left, with a gentle white fill from the front. The Casa Verde bamboo wall hooks keep their shape, bamboo colour, grain and every visible detail exactly as in Picture 1; only lighting, background and framing change. Picture 1 shows the Casa Verde bamboo wall hooks. One hand with a rolled oatmeal linen sleeve, shown from the wrist, is the only person in the frame. No one speaks; there is no dialogue or voice-over.

Shot 1: Medium shot, eye level. The Casa Verde bamboo wall hooks sit side by side on the warm white wall while the morning daylight glides slowly across their bamboo grain. The camera pushes in with small amplitude at slow speed toward the Casa Verde bamboo wall hooks.

At 3.00 seconds: Shot 2: Medium close-up, eye level. Keeping the same framing, the hand hangs a sage green canvas tote bag on the left hook of the Casa Verde bamboo wall hooks. The camera stays static.

At 5.50 seconds: Shot 3: Medium close-up, eye level. The Casa Verde bamboo wall hooks, the sage green tote bag resting on the left hook, are fully in frame with their fronts facing the camera, and everything holds still. The camera stays static.

overall_soundscape: A quiet entryway room tone; a soft rustle of canvas as the tote bag lifts; a light wooden knock as the strap settles on the bamboo hook.
non_diegetic_music: Solo felt piano around 70 BPM, entering at 1 second with sparse soft chords, one gentle low note as the tote bag settles on the hook, ending on a held chord that fades during the final hold.
```

**费用和尚未确认的地方**
- 后端给出的估价是 **1.2 USD**（来源：provider price table 2026-10-01）。估价的币种是 USD，不是你偏好里的 EUR，所以费用上限也要用 USD 填写。
- 方案的 plan_hash 是 `ph_31a`。建好草稿后我尝试读回草稿详情，系统返回 `not_found`（"No catalogued admin route matches that path"，request id `req_mock_nf`），所以还没能确认后端冻结的模式和参考图。你批准之后，我会先读一次草稿，确认 plan_hash 仍是 `ph_31a` 再提交批准；如果读不到或者 hash 变了，我会先停下来告诉你，不会直接批准。
- 视频只有在你批准之后才会开始生成并收费。

任务记录保存在你的私有工作区：`merchants/casa-verde-es/tasks/2026-10-06-cv-hook-01-video.md`。

**你是否批准这个方案（plan_hash `ph_31a`）？如果批准，费用上限设多少 USD（不能低于估价 1.2 USD，比如就填 1.2）？**
