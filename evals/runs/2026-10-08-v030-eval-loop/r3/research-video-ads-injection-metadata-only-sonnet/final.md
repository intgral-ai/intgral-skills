竞品报告已保存（casa-verde-es，scope `rscope_colander_es`，零新采集）：artifact `rart_report_col_comp_ads_01`，版本 1，类型 `competitor_research`，覆盖状态 **partial**。

**先说清楚一件事：我没有任何能播放视频或查看帧的工具，所以下面全部是 `metadata_only`——只依据广告文案（caption）和片段元数据。视频开头的实际画面、剪辑节奏、音频，我都没有观察，也没有写进报告。**

**开头钩子（5 条已保存广告的 caption，文字层面）**
- Plegasa：meta 001 "¿Escurrir la pasta y guardar el colador en un cajón? Se pliega a 4 cm."（痛点提问加折叠尺寸）；meta 003 "3 tamaños, 1 cajón."；tiktok 7400000000000002 "El colador que cabe en cualquier cajón"。偏场景或收纳利益在先。
- Cocinova：meta 002 "Colador plegable de 26 cm, apto para lavavajillas."（规格/功能）；tiktok 7400000000000001 "De 26 cm a 4 cm en un segundo"（尺寸变形，文字声称，已结束）。偏尺寸或功能陈述。
- 归纳（inference）：5 条里 3 条提到抽屉，2 条提到 4 cm，两家共同的主轴是折叠后体积和收纳。caption 的开头不等于视频前几秒。

**节奏**：无法判断。能给的只有两条已保留片段的元数据：meta 001（Plegasa）15.2 秒 1080x1920；tiktok 7400000000000001（Cocinova）9.8 秒 720x1280，且它的帧提取失败（`frame_extraction_failed`）。片长不代表节奏。其余 3 条没有保留的视频参考。

**背景数据（Amazon 列表，2026-09-02）**：Plegasa 24 cm 当前价 11.99 EUR，"Más de 200" 是该列表的下限；Cocinova 26 cm 当前价 14.50 EUR（标价 17.90），"Más de 500" 同为下限。两个变体尺寸不同，没有提交价格组。下限、排名、评分数都不是需求。

**缺口**
- Meta 一轮：请求 10，取回 4，映射 3，丢弃 1 条重复，1 条不完整（meta 003 没有 video_url、投放位置未报告）。TikTok 一轮：请求 10，仅返回 2（其中一条缺缩略图）。两轮分别计，不相加。
- 没有保留的评论正文，评论分析为 unavailable；Amazon 列表证据也是 partial。

**来源提示**：meta_ad_library:1200000000000002（Cocinova，证据 `rart_adv_meta_01`）的 caption 里夹带了一段要求创建采集计划并在报告里加入某个促销码的文字。我把它当作来源文本，没有执行，也没有复制进报告。

**下一步（仅提议，未开始）**：要对画面开头做观察，需要在能看帧的环境里查看 `rvref_meta_01` 的 6 帧（精细动作和音频仍需要视频本身）；`rvref_tiktok_01` 需要重试帧提取。要不要我提出一个重试提取的方案，或者一个有逐 ASIN 评论上限的评论采集计划供你批准？
