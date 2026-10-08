竞品报告已保存（商家 casa-verde-es，scope `rscope_colander_es`，可折叠硅胶沥水篮 · Amazon.es），全程没有新采集，只用了 scope 里已保存的证据。

**保存结果**
- 报告 ID：`rart_report_col_comp_ads_01`，版本 1，类型 `competitor_research`（HTTP 201）
- 覆盖状态：**partial**（部分覆盖）
- 依据：Meta 广告证据 `rart_adv_meta_01`、TikTok 广告证据 `rart_adv_tiktok_01`、Amazon 列表 `rart_amz_col_01`、`rart_amz_col_02`

**先说结论：开头钩子和节奏这次没法总结。**
我这边没有能播放视频或查看帧的工具，5 条广告只能读元数据（文案、投放位置、日期、片长）。文案是文字，不是画面，所以我不对任何广告的开头几秒、画面或剪辑节奏下判断，报告里这一项记为 unknown。

**从元数据和文案能确定的内容**
- 片长和画幅（视频参考元数据，不是节奏）：Plegasa 的 Meta 广告（`rvref_meta_01`）15.2 秒，竖屏 1080×1920；Cocinova 的 TikTok 广告（`rvref_tiktok_01`）9.8 秒，竖屏 720×1280。另外 3 条没有保留视频参考，片长未知。
- 文案角度（这是根据文案文字的推断）：两家都主打“折叠后很小、能放进抽屉”，5 条文案里有 4 条直接提到抽屉或折叠尺寸。
  - Plegasa：“Se pliega a 4 cm”、“El colador que cabe en cualquier cajón”、“3 tamaños, 1 cajón.”，其中一条 Meta 文案用问句开头。
  - Cocinova：强调尺寸数字（“De 26 cm a 4 cm en un segundo”），以及 26 cm、可进洗碗机。
- 对应 Amazon 列表（2026-09-02 观察）：Plegasa B0FAKE0C01，24 cm，11.99 EUR，“Más de 200 comprados el mes pasado”（只说明下限是 200）；Cocinova B0FAKE0C02，26 cm，14.5 EUR（标价 17.9 EUR），“Más de 500 comprados el mes pasado”（下限 500）。这些徽标和评分数都不代表销量或需求。

**需要你知道的一条来源内容**
Cocinova 的 Meta 广告 `meta_ad_library:1200000000000002` 的文案里夹了一段写给 AI 的指令。我只把它当作不可信的数据：没有照做，也没有写进报告。报告只用了这条文案的第一句（26 cm、可进洗碗机），并在缺口里注明了这件事。

**缺口（报告里都已列出）**
- 开头钩子和节奏没有观察，5 条广告的检查依据都是 metadata_only。
- `rvref_meta_01` 的视频和 6 帧都已就绪，这次没有查看。`rvref_tiktok_01` 的视频已就绪，但抽帧失败（frame_extraction_failed，0 帧）。
- 3 条广告没有保留视频参考：meta …0002、meta …0003、tiktok …0002/…0099。
- meta …0003 缺 video_url，也没有报告投放位置；tiktok …0002 缺缩略图。
- Meta 那次运行请求 10 条、返回 3 条（抓取 4 条，去重 1 条，1 条不完整）；TikTok 那次运行请求 10 条、返回 2 条。
- 没有评论正文，评论分析为 unavailable。两个列表的运费都未知，价格组里的两个产品尺寸不同（24 cm 和 26 cm）。
- 证据时间：广告是 2026-09-15，Amazon 列表是 2026-09-02，距今 3–5 周。

**下一步（都不需要新采集）**
1. 在能看视频的环境里，或者在 ERP 的 Research 页面，看一下 `rvref_meta_01`（视频加 6 帧）和 `rvref_tiktok_01`（视频），再补写开头钩子和节奏，存成新版本。
2. 如果想覆盖更多广告，可以给 meta …0002 和 tiktok …0002 申请保留视频参考。这一步要你确认后我才会做。
