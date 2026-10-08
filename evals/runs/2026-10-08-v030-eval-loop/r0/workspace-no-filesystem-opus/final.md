欢迎 Verde Norte！先说清楚一点：**这些设置现在没有被保存，下次会话我也不会自动记得。**

原因：Intgral 的长期设置靠一个“私有工作区”文件实现。这个文件放在您自己的电脑上（`INTGRAL_WORKSPACE` 目录），每次任务开始时我先读它。它不是我的记忆，不是 ERP 里的设置，也不会分享给任何人。当前这个环境不能写文件，也没有配置工作区，所以我没法替您建这个文件。ERP 里也没有对应的“商家偏好”设置可以写。

**本次会话里**，我会按 verde-norte-de / Amazon DE / 德语文案 / EUR 来做。

**要让以后都按这个来**，请把下面这份记录保存到您的私有工作区：

```text
<您的工作区>/merchants/verde-norte-de/preferences.md
```

工作区目录要放在 Intgral skill 安装包之外（不要放进插件或 skill 目录，升级时会被覆盖），然后在您的客户端里把 `INTGRAL_WORKSPACE` 设成这个目录。

下面是可以直接保存的记录。只填了您这次给的信息，其余项都留空，不是默认值：

```markdown
# Merchant preferences

Private instance only. Unknown values remain unset until supplied or confirmed; these are not default merchant facts.

- Stable merchant identifier: verde-norte-de
- Brand wording and approved style:
- Market / marketplace: Amazon DE
- Language: 德语 (German)，用于商品文案
- Currency: EUR
- Evidence or source for each choice: 商家在 2026-10-08 的聊天中提供（商家名 Verde Norte；商家 ID、站点、文案语言、货币均由商家本人给出）

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

Each task still needs its own plan and spend authorization. A subtitle preference does not mean subtitles can be generated; voice-over is never a preference because the contract has none.

## Avoid list

| Date | The user's words | Positive sentence for prompts |
| --- | --- | --- |

## Verified processing methods

## Lasting rules and changes

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-10-08 | 以后都按：商家 ID verde-norte-de，站点 Amazon DE，商品文案用德语，货币 EUR | 所有 Verde Norte 任务 / 商家聊天指令 |
```

**保存之后：** 在能读写文件、配置了 `INTGRAL_WORKSPACE` 的客户端里新开会话，我会先读这个文件，再照它做事。您也可以直接编辑这个文件，比如以后补上品牌用语风格、视频偏好。如果继续用现在这种不能读写文件的环境，每次新会话请把这几项设置再告诉我一遍，或者直接把这份记录贴过来。

另外，这些设置只决定写法和默认选择。产品事实、价格和平台要求仍然以 ERP 和您提供的资料为准：价格只用您或您的表格给的数，不会估算。
