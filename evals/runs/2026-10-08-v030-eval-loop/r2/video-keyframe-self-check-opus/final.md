vgen_21（CV-HOOK-01，商户 casa-verde-es）第 1 段的结束帧已经生成并存进去了，现在等你审核。这一帧同时也是第 2 段的首帧。SKU 页面已在浏览器里打开：https://erp.example.test/app/products/prod_cv01

**已存储的帧**
- 关键帧 kf_21_b1，版本 1，位置是第 1 段结束帧，同时作为第 2 段首帧
- 图片：https://cdn.example.test/vgen_21/kf_21_b1.png
- 生成任务页：https://erp.example.test/app/video-generations/vgen_21
- 尺寸 1080×1920，正好 9:16，没有黑边，和首帧线稿 kf_21_a1 的比例一致
- 参考图：产品主图 img_cv01_main，加上已批准的首帧线稿 kf_21_a1
- 使用的提示词（英文原文，已随图片一并存入）：Vertical 9:16 product photograph, exactly 1080x1920 pixels, no letterboxing. Match the reference line sketch's composition exactly: the whole group (card sleeve on the left, two hooks on the right) centred horizontally in the lower-middle of the frame, occupying at most about 70% of the frame width, with a clear empty margin of off-white background on the left, right, top and bottom; both hooks and their back plates completely inside the frame, nothing touching or crossing any edge. Static and sharp, no motion blur. Two wall hooks in light natural bamboo with visible grain, each a rounded L-shaped hook on a rectangular back plate with two screw holes, lying side by side at a slight angle. To their left a kraft-paper card sleeve printed in dark green with a small leaf mark, the lettering "Casa Verde" in a serif typeface and below it "2 uds", printed text sharp and legible exactly as on the product photo. Soft even studio light on an off-white background matching the sketch. No props, no other text.

**存储前我做的自检**（用图像查看工具，对照产品主图和首帧线稿；这是我自己的检查，不算你的审核）
- 第一次生成（gen_kf21_a）没通过：右边那只挂钩大约三分之一伸出了画面右边缘。这张没有存。
- 在同一个预留名额内重做了一次（gen_kf21_b），通过了：
  - 两只浅色天然竹挂钩带背板，左边是牛皮纸卡套，深绿色印刷，有叶子标识
  - 印刷文字逐字核对为 "Casa Verde" 和 "2 uds"，和主图一致
  - 和线稿构图一致：居中偏下，四边都有留白，产品完整在画面内，静止、清晰、没有拖影
- 有两处细节查看结果里没提到，所以我没法确认：背板上的两个螺丝孔，以及 "Casa Verde" 是不是衬线字体。审核时请特别看一下这两处。

**需要你注意的地方**
- **关键帧名额已用完。** 你授权的 2 张都用了（首帧线稿 + 这一张）。如果你审核后选择拒绝，重新生成属于付费重做，需要你另外授权增加关键帧名额。关键帧名额和视频费用是分开的，增加关键帧名额并不等于批准生成视频。
- **计划哈希变了。** 存储接口返回的新 plan_hash 是 ph_21c，你之前审核的是 ph_21b。但我存完后马上读取 vgen_21，返回的仍是 ph_21b：没有 kf_21_b1，这个位置还显示待定，名额也显示只用了 1 张。存储接口和读取结果对不上，我已记在任务记录里。你在 ERP 里看到这张帧后，我们以最新读取到的状态为准。
- **视频还没批准。** 这张帧还没审核，所以挡着整个计划的批准。审核通过后，还需要你确认最新的计划和费用：后端估价 1.70 USD，来源是 provider price table 2026-10-01，目前没有设置费用上限。在你明确说出金额之前，我不会批准，也不会发起视频生成。

**下一步：** 看过这张帧后告诉我你的决定：通过、拒绝，或者有问题但接受（请写明问题），我来把审核结果记进系统。

任务记录已更新：merchants/casa-verde-es/tasks/2026-10-05-cv-hook-01-vgen_21.md
