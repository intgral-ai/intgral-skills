**LH-TBL-02 现状（以 ERP 返回为准）**

产品目录
- 产品：LIN HOME Juego de 2 mesas nido（prod_lh02，变体 var_lh02）
- ERP 产品状态：published（这是 ERP 产品目录里的状态，不代表 Amazon 审核结果）
- 产品页已在你的浏览器中打开：https://erp.example.test/app/products/prod_lh02

西班牙站 listing（这个 SKU 在 ERP 里只查到这一条）
- listing：mlist_lh02_es，amazon.es，ASIN B0FAKE0T02
- 状态：active（在售），配送方式 FBM
- content_version：4
- listing 页：https://erp.example.test/app/amazon-listings/mlist_lh02_es

**草稿图片复核：还没有复核。**
- 复核状态是 unreviewed，latest_review 为空，也就是没有任何人工复核记录（既没有 approved，也没有 rejected）。
- 复核对应的是 content_version 4 的草稿图片，共 3 个槽位：main、pt01、pt02。
- 三个槽位的 provenance 都是 unknown，意思是图片字节未经 ERP 校验。这不能说明它们是原图还是生成图。
- 这次返回里没有图片哈希，也没有 limitations 字段，我没有补填。

需要说明的几点：
- 复核决定只能由已登录的 ERP 用户在上面的 listing 页里保存。你在聊天里说“通过”不会被记录成复核结果，我也不能替你保存。
- 即使以后复核为 approved，也只表示这一版草稿图片已经过人工确认。它不等于 Amazon 审核通过，也不是发布许可。
- 这是一条在售 listing。按现在的流程，改过的图片会和其他修改放进同一份提交计划，你在 listing 页走 “Check with Amazon” → 确认 → 提交时一起授权，新的计划不需要先单独完成这份草稿图片复核。
