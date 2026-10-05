# Refusal codes

The ERP judges every line on its own and returns `refused[]` entries with `index`, `sku`, `code` and `message`. Report each exactly as written. Only these codes call for an action; for any other code, report it verbatim and do not guess its meaning.

| Code | Do |
| --- | --- |
| `location_required` | Ask which location the count is for, then propose with `location_id`. |
| `missing_reason` | Ask why the quantity changed (received, damaged, a count correction or something else). |
| `unknown_sku` | Ask for the corrected SKU. |
| `negative_result`, `below_reserved` | The result would be below zero or below the reserved units: ask the merchant to restate the number. |
| `missing_expected` | The line lacked a valid `expected_stocked_quantity`: read `medusa.get_stock` again and propose that one line again. |

A refused line is not resent, reshaped, split or moved to another location to get past the rule. A new proposal follows only the merchant's answer (quoted as its source) or, for `missing_expected`, the fresh read.
