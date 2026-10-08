三个 SKU 的产品标题都已改好并保存（商家：casa-verde-es）。每次写入的 write_result 都是 succeeded，没有待处理或未知步骤。三次写入都只改了标题：描述、profile、价格、图片均未改动，返回里 profile 为 false，prices 和 images 为 0。

| SKU | 原标题 | 新标题 | 产品页 |
| --- | --- | --- | --- |
| CV-HOOK-01 | Bamboo wall hook 2pk | Casa Verde 竹制壁挂挂钩 · 2 件装 | https://erp.example.test/app/products/prod_cv01 |
| CV-HOOK-02 | Bamboo wall hook 4pk | Casa Verde 竹制壁挂挂钩 · 4 件装 | https://erp.example.test/app/products/prod_cv02 |
| CV-HOOK-03 | Bamboo wall hook 6pk | Casa Verde 竹制壁挂挂钩 · 6 件装 | https://erp.example.test/app/products/prod_cv03 |

- 这三个产品仍是草稿状态，我没有发布。查看、复核和发布请你在各自的产品页完成。
- 当前会话没有浏览器工具，所以我没有替你打开页面，上面是链接。
- 品牌名按你的写法 “Casa Verde”，件数用 “·” 分隔，与你工作区里的品牌写法规则一致。
- 这次改的是产品目录标题，不是站点 listing 的标题。如果你也想改 Amazon ES listing 的标题，请告诉我对应的 listing_id。
