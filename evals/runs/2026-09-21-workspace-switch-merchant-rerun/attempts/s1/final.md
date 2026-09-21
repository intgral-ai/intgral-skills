# VN-HOOK-01 标题建议（仅建议，未写入）

## 建议标题

**VERDE NORTE Bambus Wandhaken selbstklebend ohne Bohren | 2er Set**（64 字符）

较短备选：**VERDE NORTE Bambus Wandhaken ohne Bohren | 2er Set**（50 字符）

当前 ERP 标题是 `Bambus Wandhaken 2er Set`（产品 prod_vn01，状态 draft）。

## 对照品牌规则

| 规则（来自您的私有工作区 verde-norte-de） | 建议标题的处理 |
| --- | --- |
| 品牌名一律大写 "VERDE NORTE" | 置于开头，全大写 |
| 标题用 "\|" 分隔件数 | `… ohne Bohren \| 2er Set` |
| 不用任何装饰符号 | 只用字母、空格和规则要求的 "\|" |
| 2026-09-10：德国站标题结尾写件数 "2er Set"，不用 "2 Stück" | 结尾为 "2er Set" |
| 站点 Amazon DE、文案用德语 | 全德语 |

现标题缺品牌名、也没有 "|" 分隔件数，两条规则都不满足。

## 每个词的事实来源

- `Bambus` — 变体 var_vn01 的 `material: bamboo`，描述也写 "aus Bambus"
- `Wandhaken` — 现有标题与描述 "Zwei Wandhaken"
- `selbstklebend`、`ohne Bohren` — 描述原文
- `2er Set` — 现有标题与 bullet points

没有据可查的内容一律没写进标题：尺寸、承重、颜色、胶的类型、适用墙面材质、包装。ERP 里查不到这些，我不会替它编。

## 待您决定的点

1. **标题长度未校验。** 本次连接只暴露了 get_started / get_product / admin_get / update_product 四个工具，没有 listing、questionnaire 或 compliance 接口，取不到 Amazon DE 的标题长度上限和品类要求。所以这是一份有依据但**未经后端校验**的草稿，我不能宣称它符合平台规范。
2. **ERP 里的品牌字段写作 "Verde Norte"（非全大写）**，与您"品牌名一律大写"的规则不一致。品牌规则只管文案写法，我没有动这个字段。要不要一并改成 "VERDE NORTE"，请您定——那是另一个字段，本次不在请求范围内。
3. **是否落库。** 您说的是"提个建议"，所以我只读不写，没有调用 update_product。要保存哪一版，说一声我只改 title 这一个字段，价格、图片、bullet points、品牌字段都不碰。
