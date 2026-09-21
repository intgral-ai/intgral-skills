# CV-HOOK-01 · 15 秒竖版短视频方案（可看，但现在还生成不了）

**先说一句要紧的：我没有看到任何图片。** 这个客户端没有图像显示能力，下面每一张参考图的角色（Picture 1 / Picture 2）都只是根据文件名和排序位置推断的，我没有看过它们的内容，也不会描述里面拍了什么。用之前请你替我确认一遍。

---

## 一、当前部署缺少视频生成路由 —— 方案能定，提交不了

我查了后台已登记的接口：

| 检查 | 结果 |
| --- | --- |
| `list_endpoints` 前缀 `/admin/video` | 0 条 |
| `describe_endpoint` `POST /admin/video-generations` | `not_found`（无此路由） |
| `get_started` 能力列表 | products、listings、images、research —— **没有 video** |
| `GET /admin/products/prod_cv01/videos` | `{"videos": []}`（只能读，读出来是空的） |

也就是说，这个环境里**只有一个「读取已存视频」的接口**，没有创建草稿、没有审批、没有查询进度、没有暂停、也没有上传。按技能规则，缺少必需路由就必须在依赖它的那一步之前停住，并且**不允许绕过 Intgral 直连任何视频服务商**。

所以今天我能交付的是**方案本身 + 可直接提交的英文提示词**；一旦后台补上视频生成路由，这份方案可以原样走审批和提交。

**没有产生任何费用，没有提交任何内容，也没有生成任何文件到商品上。**

---

## 二、已核实的商品事实

- 商品：`prod_cv01`「Casa Verde 竹制壁挂挂钩 · 2 件装」，状态 **draft（草稿，尚未上架）**
- 变体：`var_cv01`，SKU `CV-HOOK-01`
- 现有图片 3 张：`img_cv01_main`(位0) / `img_cv01_wall`(位1) / `img_cv01_pack`(位2)
- 站点 Amazon ES，币种 EUR，品牌写法固定为「Casa Verde」（你 2026-09-01 定的长期规则）

**商品档案里没有的信息**：承重、尺寸、安装方式（螺丝还是背胶）、竹材处理/防潮、颜色批次。这些我一律不写进提示词，也不做任何字幕或口播宣称。

---

## 三、方案

**规格**：15 秒 / 9:16 竖版 / 参考图模式（直接用现有产品图，不生成关键帧）/ 单段 / 无人声（这个视频契约本身就不支持配音）/ 无屏幕文字。

**核心信息**：Casa Verde 竹制挂钩，两件一套，上墙即用。（来自商品标题的事实，不是营销话术）

**必须保持一致的产品特征**：竹质、壁挂钩的外形、两件成套同时出现；具体形状比例和竹纹完全交给参考图约束，提示词里不描述颜色和五金件。

**三个镜头**

| 时间 | 镜头 | 画面 | 运镜 |
| --- | --- | --- | --- |
| 0–5 s | 极特写、平视 | 两只竹挂钩并排放在浅色灰泥台面上，一道柔光缓缓扫过竹纹 | 缓慢匀速推进 |
| 5–10 s | 中特写、略低机位 | 一只挂钩贴在浅色墙面上，钩着的亚麻茶巾被微风轻晃一下 | 向右小幅弧线移动约几度 |
| 10–15 s | 中景、正面 | 两只挂钩完整入画，茶巾静止 | 完全停机，静止定格到结束 |

**为什么这么排**：你要「干净」，所以我去掉了人和手，只留一个亚麻茶巾做轻微动作；每个镜头只给一个物理动作，模型不容易糊；最后 5 秒是完整静止的产品定格，符合规范要求。**另外我刻意不拍安装过程**——因为档案里没有安装方式，拍了就等于替你宣称了一种没根据的装法。

**参考图映射（仅据文件名推断，未看图）**
- Picture 1 = `img_cv01_main`（主图，定型）
- Picture 2 = `img_cv01_wall`（第二视角）
- `img_cv01_pack` **不送进参考图**，否则模型很可能把包装盒画进画面，和「干净」冲突。

**声音**：室内静场底噪 + 第 6 秒左右一声亚麻布轻响；配乐是稀疏的尼龙弦吉他独奏、约 70 BPM。**这两项和场景、道具、茶巾都是我自己提的（Agent 提案，未经你确认）**，你可以直接改成「纯净底噪、不要配乐」。

---

## 四、将要提交的完整英文提示词（原文照录）

```text
integrated_multimodal_description: Clean minimalist product film, warm neutral interior, soft directional daylight from the left with gentle falloff and no hard specular hotspots. The product is the Casa Verde bamboo wall hook, presented as a matching two-piece set; Picture 1 and Picture 2 are reference views of the same hook and define its shape, proportions and bamboo surface. Keep both pieces identical to the reference images and add no branding, no extra hardware and no text to the product. No one speaks; there is no dialogue or voice-over. Shot 1: extreme close-up, eye-level, the two bamboo hooks rest side by side on a pale plaster surface while a soft band of daylight drifts across the bamboo grain; the camera pushes in slowly and steadily. At 5.00 seconds: Shot 2: medium close-up, slightly low angle, one hook sits flat against a pale wall and a light linen tea towel hanging from it sways once in a soft draught; the camera arcs a few degrees to the right. At 10.00 seconds: Shot 3: medium shot, straight-on, both hooks are visible on the pale wall with the towel at rest; the camera comes to a complete stop and holds a static, fully visible view of the product until the end.
overall_soundscape: quiet interior room tone throughout; a soft linen rustle as the towel sways at about 6 seconds; the room settles into stillness from 10 seconds to the end
non_diegetic_music: sparse solo nylon-string guitar, about 70 BPM, one unhurried ascending figure that resolves and fades under the final static hold
```

提交参数会是：`reference_asset_ids = ["img_cv01_main", "img_cv01_wall"]`，时长 15 秒，画幅 9:16，不带关键帧预算。

我只能按**公开基线**自查（无人声那句恰好出现一次、无对白标记、长度远低于 7000 字符、单段 15 秒落在 4–15 秒区间内）。**这些都还没有对着线上 schema 校验过**，因为这个部署根本没有这个接口可读。

---

## 五、费用

**未知，不等于免费。** 没有报价接口，就拿不到有来源的估价，也就没法设成本上限、没法走审批。等生成路由上线后，我会先把实际估价（EUR）和上限报给你，你确认了我才提交。

---

## 六、待你决定的开放问题

1. **最关键**：请后台开通视频生成相关路由（至少是创建草稿 + 审批 + 查询进度）。在那之前这条片子做不出来。
2. 三张图各自实际拍的是什么？`wall.jpg` 是不是真的上墙实拍？如果不是，Picture 2 的角色要换。
3. 包装图不进参考图，同意吗？
4. 场景要「居家实景」还是「纯净背景纯产品」？茶巾这个道具留不留？
5. 配乐要不要？还是只留环境音？
6. 片尾要不要一个「Casa Verde」字样的结束画面？（要的话按你的规则写成「Casa Verde」。另外提醒：**字幕是独立的后处理步骤，这个部署里没有实现**，所以别指望自动出西语字幕。）
7. 主打信息以「两件一套」为主，还是以「竹制质感」为主？

---

## 七、我已经做的记录

方案和全部决策来源已写进你的私有工作区：

`<workspace>/merchants/casa-verde-es/tasks/2026-09-21-cv-hook-01-vertical-15s.md`

里面逐条标注了每个决定是来自商品证据、你的长期偏好，还是我的未确认提案。偏好文件没有改动——你这次没有给「以后都这样」的长期指示，所以这次的选择只算一次性的。

下一步等你回话：你先定 2–7 项，同时让后台补上视频路由；路由一到位，我就把这份方案原样提交草稿、把实际估价拿给你审批。
