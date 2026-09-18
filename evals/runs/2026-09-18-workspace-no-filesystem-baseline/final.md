好的，Verde Norte 的设置我已经记下，本次对话中的所有操作都会按它来执行：

- 商家 ID：`verde-norte-de`
- 站点：Amazon DE
- 商品文案语言：德语
- 货币：EUR

**需要说明的一点：** 这个客户端没有可写的文件系统，也没有配置 `INTGRAL_WORKSPACE` 私有工作区；已连接的 Intgral 服务端目前也只提供连接与能力信息（products / listings / images），没有保存商家偏好的接口。所以这些设置只在本次对话内有效，我无法承诺下次对话还能自动记得。

为了以后能沿用，请把下面这份记录自行保存一份（例如存到您的笔记或团队文档）。下次开始新对话时把它贴给我，或者在有文件系统的客户端里放到私有工作区的 `verde-norte-de/preferences.md`，我就会按此执行：

```markdown
# Merchant preferences

Private instance only. Unknown values remain unset until supplied or confirmed; these are not default merchant facts.

- Stable merchant identifier: verde-norte-de
- Brand wording and approved style: （未设置）
- Market / marketplace: Amazon DE
- Language: 德语（de-DE）
- Currency: EUR
- Evidence or source for each choice: 用户于 2026-09-18 在对话中明确指定

## Lasting rules and changes

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-09-18 | 商家 ID verde-norte-de；站点 Amazon DE；商品文案用德语；货币 EUR；以后都按此执行 | 用户对话指令（本客户端无持久存储，记录由用户自行保存） |
```

如果您希望这些设置真正跨对话保留，可以选一个有文件系统的客户端并配置 `INTGRAL_WORKSPACE`，我会在其中为 `verde-norte-de` 建立 preferences.md。现在就可以直接告诉我下一步要做什么（查 SKU、导入商品、建 listing 等），我会按上面的设置进行。
