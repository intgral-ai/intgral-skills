# CV-HOOK-01 · 15 秒竖版短视频方案（仅方案，暂时无法生成）

我没有看到这三张图片本身——我的客户端不能渲染图像，所以下面每一张 Picture N 的角色都只是根据文件名和元数据推断的，我没有描述任何一张图里实际拍到了什么。

## 一、先说一个拦路的问题：当前部署没有视频生成接口

按技能要求，动手前我先查了后端已登记的接口。结果：

- `medusa.list_endpoints` 全量返回 9 条；用前缀 `/admin/video` 过滤返回 **0 条**。
- `medusa.describe_endpoint` 查 `POST /admin/video-generations` → `not_found`（"No catalogued admin route matches that method and path"）。
- 连接信息 `medusa.get_started` 列出的能力是 products、listings、images、research，**没有 video**。
- 与视频相关的只有一条只读接口 `GET /admin/products/:id/videos`；我读了它，`prod_cv01` 当前**没有任何已存视频资产**（`videos: []`）。

也就是说：创建草稿、审批、下单生成、轮询状态、暂停——这一整条链路的接口在这个部署里都不存在。技能规定，缺少必需的路由时要如实报告并**停在依赖它的那一步之前**，并且不允许绕过 Intgral 直接去调用任何视频服务商。所以我**没有**提交任何东西，**没有**产生任何费用，也**没有**猜测写接口的字段格式。

**费用**：因为拿不到后端的报价，目前**没有可用的成本估算**。请注意"未知"不等于"免费"——等接口可用后要由后端给出有来源的估价，我再拿给你确认上限，然后才谈授权。

**需要你或管理员做的事**：让这个 Medusa 部署把视频生成相关的自定义路由部署并登记进来（至少 `POST /admin/video-generations`、对应的 `GET /admin/video-generations/:id` 和审批接口）。接口一上线，下面这份方案可以直接提交，不用重做。

## 二、产品事实（来自后端，不是我编的）

| 项 | 值 |
| --- | --- |
| 商品 | Casa Verde 竹制壁挂挂钩 · 2 件装 |
| 商品 ID / 变体 / SKU | prod_cv01 / var_cv01 / CV-HOOK-01 |
| 状态 | **draft（草稿，未发布）** |
| 图片 | 3 张，见下 |
| 站点 / 币种 | Amazon ES / EUR（来自你的偏好文件） |

参考图顺序（**角色只来自文件名，未经视觉确认**）：

| 顺序 | 资产 ID | 文件名 | 我推断的角色 |
| --- | --- | --- | --- |
| Picture 1 | img_cv01_main | main.jpg | 产品主图 → 外观唯一真源 |
| Picture 2 | img_cv01_wall | wall.jpg | 上墙 / 场景 |
| Picture 3 | img_cv01_pack | pack.jpg | 包装 / 2 件装 |

**这三条对应关系请你帮我确认一下**，如果顺序错了，提示词里的 Picture 编号要跟着改。

## 三、创意方案

- **用途**：Amazon ES 商品页 / 社交短视频，竖版 9:16，默认静音播放
- **核心信息**：竹制壁挂挂钩，一组两件（依据：商品标题，唯一有据可依的产品事实）
- **模式**：参考图模式（就用你现有的 3 张图，不生成关键帧、不产生关键帧预算）
- **时长 / 画幅**：15 秒 / 9:16
- **出镜**：只有产品，不出现人和手
- **风格**：干净、极简。素白墙面、明亮中性室内、左上方柔和自然光，无道具
- **字幕 / 文字**：默认不加任何屏幕文字。另外说明一句：**字幕是独立的后期处理环节，这里并没有实现的字幕服务**，你偏好里记的语言设置不等于有字幕功能
- **配音**：**合同层面不支持任何人声或旁白**，这条改不了

### 分镜与时间

| 段 | 时长 | 画面 | 运镜 |
| --- | --- | --- | --- |
| 1-A | 0–4 s | 中近景，单只竹挂钩挂在空墙上，墙面有柔和投影 | 缓慢匀速推进 |
| 1-B | 4–8 s | 同一只挂钩，露出侧面轮廓和竹材厚度 | 向右小幅弧线环绕，产品本身不动 |
| 2-A | 0–3.5 s | 全景，两只挂钩并排上墙，四周留白 | 缓慢左移并轻微后拉 |
| 2-B | 3.5–5 s | 收到居中、左右对称的构图 | 减速停稳 |
| 2-C | 5–7 s | 两只挂钩完整、清晰、居中 | **完全静止定格收尾** |

拆成 8 秒 + 7 秒两段，是因为参考图基线每段支持 4–15 秒；**能不能一段跑满 15 秒，我没法确认**——部署里没有接口可查分段契约，这一点算未决项。

### 实际会提交的英文提示词（原文照给）

**Segment 1 — 8 s**

```
integrated_multimodal_description: Clean minimal product commercial on a plain off-white plaster wall in a bright neutral interior, with soft directional daylight from the upper left casting a gentle shadow to the lower right. The product is the Casa Verde bamboo wall hook shown in Picture 1; Picture 2 shows the same hook mounted on a wall and Picture 3 shows its retail packaging; keep the hook's shape, natural bamboo grain, colour and hardware exactly as in Picture 1. No one speaks; there is no dialogue or voice-over. Shot 1: medium close-up, eye level, a single bamboo hook sits mounted on the empty wall while its soft shadow rests on the plaster; the camera pushes in slowly and steadily toward the hook. At 4.00 seconds: Shot 2: the camera arcs a few degrees to the right around the hook to reveal its side profile and the depth of the bamboo, while the hook itself stays completely still. The hook remains centred, sharp and fully visible.
overall_soundscape: Quiet interior room tone with faint air movement; a single soft wooden tap at 0.5 seconds as the shot begins.
non_diegetic_music: A sparse felt piano at about 70 BPM, one sustained note every two bars, no percussion and no build.
```

**Segment 2 — 7 s**

```
integrated_multimodal_description: Clean minimal product commercial on the same plain off-white plaster wall in the same bright neutral interior, with soft directional daylight from the upper left. Two identical Casa Verde bamboo wall hooks as shown in Picture 1 are mounted side by side on the wall in the arrangement suggested by Picture 2, with the retail packaging of Picture 3 kept out of frame; keep the shape, natural bamboo grain, colour and hardware exactly as in Picture 1. No one speaks; there is no dialogue or voice-over. Shot 1: wide shot, eye level, both hooks sit mounted on the wall with clean empty space around them as the daylight settles evenly across the plaster; the camera drifts slowly to the left and pulls back very slightly. At 3.50 seconds: Shot 2: the camera slows and settles into a centred, symmetrical framing of both hooks. At 5.00 seconds: the camera is completely static and the two bamboo hooks stay fully visible, sharp and centred, held motionless until the end.
overall_soundscape: Quiet interior room tone with faint air movement, settling into near silence from 5.00 seconds.
non_diegetic_music: The same sparse felt piano at about 70 BPM, resolving to a single sustained note that fades out by the end.
```

两段都用同一组参考图，顺序为 `[img_cv01_main, img_cv01_wall, img_cv01_pack]`。

### 哪些是我替你定的（未经确认）

场景（素白墙）、光线方向（左上柔光）、镜头运动、不出人手、背景音乐（felt piano）——这几项都记为"Agent 提议，未确认"。产品本身的形状、纹理、颜色、五金一律交给 Picture 1 锁定，我不描述我没看过的细节。

### 哪些事实我故意没写进提示词

承重、是否免打孔 / 用胶还是用螺丝、尺寸、表面处理、防潮、竹材产地——后端**没有任何证据**支持这些说法，所以它们既不进提示词，也不进任何屏幕文字。如果这些是你想主打的卖点，请把有依据的数据给我，我再加进去。

## 四、我做过 / 没做过什么

做过：读取偏好文件、读取商品与图片清单、查接口目录、读已存视频资产（空）、把这份方案写进你的私有任务记录。

没做过：没有看图（客户端不能渲染），没有创建草稿，没有申请审批，没有提交生成，没有产生任何花费，也没有修改你的偏好文件——你这次的要求我当成一次性请求处理，没有当作长期规则记录。

任务记录已写到：
`<INTGRAL_WORKSPACE>/merchants/casa-verde-es/tasks/2026-09-21-cv-hook-01-15s-vertical.md`

## 五、待你决定的未决项

1. **接口缺失**：需要部署并登记视频生成路由，否则这条链路走不下去（最关键的一项）。
2. **成本未知**：目前没有有来源的估价，等接口可用后才能给你报价和上限，届时需要你单独授权。
3. **分段方式**：8 秒 + 7 秒是保守选择，能否一段 15 秒未确认。
4. **Picture 1/2/3 的角色对应**是否正确（我只看了文件名）。
5. **配乐**：要 felt piano，还是干脆无配乐（N/A）？
6. **屏幕文字**：默认无。若要加，需要确认的西班牙语文案 + 后端支持的 overlay 字段。
7. **画面里是否要出现手**（比如挂上外套的动作），目前方案是不出现。
8. 商品当前是 **draft** 状态，视频做好后是否需要同步处理上架，你来定。

方案你先看，有要改的地方告诉我，我改完再等接口就位一起提交。
