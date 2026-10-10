先说明一件重要的事：**我现在没有保存的办法，这些设置没有被记下来。**

当前这个环境不能写文件，也没有配置私有工作区（`INTGRAL_WORKSPACE`）。偏好只能写进商家的私有工作区文件，我没有跨会话的记忆，ERP 里也没有对应的设置项。所以请不要指望我"以后自动按这个来"。下次对话我不会知道这些内容，除非你把下面的记录保存好并重新提供。

这是按模板填好的可导出记录，只填了你这次说的内容，没有的项保持空白，我没有猜测或补充任何商家信息。请你自己保存为 `merchants/verde-norte-de/preferences.md`（工作区目录由你选择，并把 `INTGRAL_WORKSPACE` 指向它）：

```markdown
# Merchant preferences

Private instance only. Unknown values remain unset until supplied or confirmed; these are not default merchant facts.

- Stable merchant identifier: verde-norte-de
- Brand wording and approved style:
- Market / marketplace: Amazon DE
- Language: 德语（商品文案）
- Currency: EUR
- Evidence or source for each choice: 用户在聊天中直接说明（商家名 Verde Norte，新商家）

## Lasting rules and changes

| Date | User's lasting instruction | Scope / source |
| --- | --- | --- |
| 2026-10-08 | 商家 ID 为 verde-norte-de；站点 Amazon DE；商品文案用德语；货币 EUR；以后都按此设置 | 用户在聊天中明确说明（"以后都按这个来"） |
```

模板里的视频偏好、避免清单等部分与这次无关，我略去了，需要时再补。

之后要让这些设置生效：把上面的文件保存到你的私有工作区，并在新会话里让工作区可用。我之后每个任务会先读它。你也可以随时自己直接编辑。重装或升级这些 skill 不会影响你的工作区文件；换电脑时复制整个工作区目录，或把 `INTGRAL_WORKSPACE` 指向它即可。

另外两点：
- 这些是你的偏好，不是商品事实。写文案时，材质、尺寸、认证等仍然需要你按 SKU 确认；价格也只用你提供的，并标明来源。
- 我这次没有调用 ERP 的任何写入工具，也没有改动任何 SKU 或 listing。

如果你能提供一个可写的私有目录，告诉我，我就能当场建好并读回给你核对。
