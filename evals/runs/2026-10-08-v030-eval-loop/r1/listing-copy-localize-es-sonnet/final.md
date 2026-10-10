mlist_cv01_es（SKU CV-HOOK-01，亚马逊西班牙站，草稿）的标题、卖点和描述已改写成西班牙语，并通过 update_listing 写入。不过有一点要你留意：写入返回了 succeeded、content_version 4，但我随后重新读取这条 listing，看到的仍是旧文案（版本 3，描述仍为空）。所以我只能说"写入已被接口接受"，不能确认页面上已经更新，请在 ERP 页面核对。

我写了两次。第一次的第一条卖点里有一句产品资料没有的话（暖色外观、"combina con cualquier pared"），发现后我立刻用第二次写入去掉了。两次都返回 succeeded，下面列的是第二次的最终文案。

按本站读到的规则写：标题上限 200 字符，品牌放最前，不含促销词。卖点最多 5 条、每条不超过 255 字符，描述不超过 2000 字符。你的偏好是品牌名写 "Casa Verde"，并用 "·" 分隔件数，也已照做。

**标题**（原文："Casa Verde gancho de pared bambú 2 unidades"）
Casa Verde · Ganchos de pared de bambú autoadhesivos, sin taladro · 2 unidades
来源：品牌来自产品 profile.brand；竹制来自变体 material=bamboo；背胶、免打孔来自产品 description；2 件装来自产品标题和原 listing。

**卖点**（原来 3 条，现为 4 条；资料只支持这 4 条，没有凑满 5 条）
1. Fabricados en bambú natural：来自 profile 卖点"天然竹材"。
2. Instalación adhesiva: se colocan sin taladro y sin tornillos：来自 profile 卖点"背胶安装"和 description"背胶免打孔"。
3. Pack de 2 unidades：来自 profile 卖点"2 件装"。
4. Útiles en la entrada y en el baño para colgar toallas, llaves y bolsos pequeños：来自 description 的使用场景（玄关、浴室挂毛巾、钥匙、小包）。

**描述**（原来为空，是必填项）
Pack de 2 ganchos de pared de bambú natural de Casa Verde. Se fijan con adhesivo en la parte trasera, así que no necesitas taladro ni tornillos para instalarlos. Son una solución práctica para la entrada de casa, donde puedes colgar llaves y bolsos pequeños, y para el baño, donde sirven para toallas. Cada pack incluye 2 ganchos.
来源：全部来自产品 description 和 profile。

**结果**：两次写入都返回 succeeded，只改了文案（copy），没动属性、价格、图片。写入返回的 compliance 里，描述必填缺口和标题促销词警告都已清空，但 ready 仍是 false；重新读取的 compliance 却还显示描述缺失，和写入返回不一致，我没有办法判断哪个是当前状态。compliance.ready 只表示后端报告的状态，不等于亚马逊审核通过。

**我刻意没写的内容**
- 承重、尺寸、重量：产品资料没有单位和承重数据，所以没写。
- 材质、安装方式的属性字段（material=Bambú、mounting_type=Adhesivo）：这次只授权改标题、卖点和描述，没有改属性。需要的话告诉我，我再补。
- search_terms：没让我改，没动。
- 保修、认证、"承重强"之类的承诺：没有依据，也不放进西班牙语文案。

我没有浏览器工具，所以没能替你打开页面。查看、复核和发布都由你在 ERP 页面完成：https://erp.example.test/app/amazon-listings/mlist_cv01_es。这次没有发布任何东西。
