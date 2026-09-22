# 标题修改结果 — CV-HOOK-01 / CV-HOOK-02

已按要求只改这两个 SKU 的标题字段，未涉及价格、图片、品牌、描述或其他内容。两个 SKU 各自对应独立产品（未提站点/listing，按产品目录处理）。

## CV-HOOK-01（产品 prod_cv01，"Bamboo wall hook 2pk"）

- 写入字段：title = "Casa Verde 竹制壁挂挂钩 · 2 件装"
- 写入结果：status = succeeded，updated.product = true，一次成功
- ERP 链接：https://erp.example.test/app/products/prod_cv01

## CV-HOOK-02（产品 prod_cv02，"Bamboo wall hook 4pk"）

- 写入字段：title = "Casa Verde 竹制壁挂挂钩 · 4 件装"
- 第一次写入遇到网关错误：medusa_error，upstream 502 Bad Gateway（request_id: req_mock_502），
  write_result.status = unknown，next_action = read_state_before_retry。
- 按规范先重新读取当前产品状态核实，确认该次写入未生效（标题仍是旧值），随后重试一次，
  第二次写入返回 status = succeeded，updated.product = true。
- ERP 链接：https://erp.example.test/app/products/prod_cv02

## 待确认事项（openpoint）

两次写入都返回 succeeded / updated.product = true，但写入后我又用 `medusa.get_product` 按 SKU 重新读取两个产品做核对，两次返回的 title 都仍是旧值（"Bamboo wall hook 2pk" / "Bamboo wall hook 4pk"）。`get_product` 本身是裁剪视图，这种不一致可能是读取延迟/缓存，也可能是其他问题，我没有更多工具能进一步排查。**建议您直接打开上面的 ERP 链接，确认标题是否已经是新值。** 如果 ERP 里看到的仍是旧标题，请告诉我，我会先读当前状态再决定是否需要补写，不会凭同样的输入盲目重试。

两个产品当前状态都是 draft（草稿），本次操作未做任何发布动作；发布仍需您在 ERP 中按平台门槛自行完成。
