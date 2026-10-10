Verde Norte 你好，欢迎。我先说明一下限制：**当前这个环境没有可写的文件系统，也没有配置私有工作区（INTGRAL_WORKSPACE），所以这些设置我没有办法替你长期保存。** 我也没有跨会话的记忆，下一次对话我不会自己记得这些。这些设置也不是 ERP 里的配置项，ERP 中没有因此做任何改动。

**本次对话里**，我会一直按下面这些设置来做：商家 `verde-norte-de`、站点 Amazon DE、德语文案、货币 EUR。

要做到“以后都按这个来”，可以这样：在你自己的电脑上建一个私有工作区目录，把下面这份记录保存为
`<工作区>/merchants/verde-norte-de/preferences.md`，再把宿主的 `INTGRAL_WORKSPACE` 指向这个工作区目录。之后每次开始任务，我都会先读这个文件。你也可以直接编辑它。这个目录在 skill 包之外，重装或升级 skill 都不会碰到它；换电脑时把整个工作区目录复制过去就行。注意：**这份记录只是导出给你的内容，现在还没有保存在任何地方。**

可导出的记录如下。我只填了你给出的信息，其他项保持空白，没有替你猜：

```markdown
# Merchant preferences

Private instance only. Unknown values remain unset until supplied or confirmed; these are not default merchant facts.

- Stable merchant identifier: verde-norte-de
- Brand wording and approved style:
- Market / marketplace: Amazon DE
- Language: 德语 (German)
- Currency: EUR
- Evidence or source for each choice: 商家 Verde Norte 于 2026-10-08 在聊天中明确给出（商家 ID、站点、文案语言、货币）

## Video preferences

- Placement and purpose:
- Duration and aspect ratio:
- Script language (with regional variant):
- Subtitle preference and language:
- Music (instrument, tempo, progression, or none):
- Ambient sound (physical sounds only, no mood words):
- Product constraints backed by evidence:
- Default mode (reference images unless a lasting instruction says otherwise):

Style, one line per axis, each confirmed by the user before it counts; an unconfirmed axis is asked in the briefing:

- Art direction:
- Palette:
- Tone:
- Era:
- Rhythm:
- Tier (a named brand or campaign as the reference):
- Setting:
- Lighting (key light and its direction; optional fill and rim):

## Avoid list

| Date | The user's words | Positive sentence for prompts |
| --- | --- | --- |

## Verified processing methods

## Lasting rules and changes

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-10-08 | 商家 ID 用 verde-norte-de，站点 Amazon DE，商品文案用德语，货币 EUR，以后都按这个来 | 全部任务；商家在聊天中明确的长期指示 |
```

补充两点：
- 这些设置只决定写文案时用什么站点、语言和货币，不提供任何商品事实。价格仍然只用你或你的表格给出的数字，不会估价。
- 品牌用语、视频偏好这些项目还空着。以后你想补充，告诉我就行；在有可写工作区的环境里，我会直接写进这个文件，并把保存结果读回来给你核对。
