先说明一个限制：这个客户端没有可写的文件系统，也没有配置 `INTGRAL_WORKSPACE`，所以我**无法把这些设置保存下来**，下次新会话我不会自动记得它们。我也不会把它们写进 ERP——这类偏好本来就只存在商家私有工作区文件里，不是 ERP 设置。

我能做的，是把 Skill 自带的偏好模板按你给的信息填好，交给你自己保存。请把下面内容存到你的私有工作区（任意不会随软件包更新而被覆盖的位置），路径按这个布局：

```
<你的工作区>/merchants/verde-norte-de/preferences.md
```

文件内容（可直接复制）：

```markdown
# Merchant preferences

Private instance only. Unknown values remain unset until supplied or confirmed; these are not default merchant facts.

- Stable merchant identifier: verde-norte-de
- Brand wording and approved style:
- Market / marketplace: Amazon DE
- Language: 德语（商品文案）
- Currency: EUR
- Evidence or source for each choice: 用户在聊天中提供，2026-09-18

## Video preferences

- Placement and purpose:
- Duration and aspect ratio:
- Creative style and lighting:
- Script language:
- Subtitle preference and language:
- Music and ambient sound:
- Product constraints backed by evidence:
- Known processing capabilities:

Each task still needs its own plan and spend authorization. A subtitle preference does not mean subtitles can be generated.

## Lasting rules and changes

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-09-18 | 商家 Verde Norte，稳定标识 verde-norte-de；站点 Amazon DE；商品文案用德语；货币 EUR；以后所有任务按此执行 | 用户聊天指令（新商家首次设置） |
```

几点说明：

- 品牌用语/风格和视频偏好你还没提供，我留空了，没有替你猜。以后有了可以直接编辑这个文件补上。
- 这个文件是"每次任务开始先读"的偏好记录，不是我的记忆，也不会共享给任何人；凭证不要写进去。
- 之后要按这些设置工作时，请在每次会话开始把这个文件内容贴给我（或者在支持文件读写的客户端里配置 `INTGRAL_WORKSPACE`，我就会自动读取 `merchants/verde-norte-de/`）。

需要我现在就按这些设置开始做具体的事（查 SKU、建 Amazon DE 的 listing 草稿等）吗？
