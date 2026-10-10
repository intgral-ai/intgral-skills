# Refusal codes

The ERP judges every line on its own and returns `refused[]` entries with `index`, `sku`, `code` and `message`. Report each exactly as written. Only these codes call for an action; for any other code, report it verbatim and do not guess its meaning.

| Code | Do |
| --- | --- |
| `location_required` | Several locations: ask which one the count is for, then propose with `location_id`. If the message says the store has "no writable stock location", do not ask: tell the merchant stock locations must be set up in the ERP first. |
| `missing_reason` | Ask why the quantity changed (received, damaged, a count correction or something else). |
| `unknown_sku` | Ask for the corrected SKU. |
| `negative_result`, `below_reserved` | The result would be below zero or below the reserved units: ask the merchant to restate the number. |
| `missing_expected` | The line lacked a valid `expected_stocked_quantity`: read `medusa.get_stock` again and propose that one line again with the fresh value and the same source reference (the same quote is reused). The only refusal a fresh read alone resolves. |

A refused line is not resent, reshaped, split or moved to another location to get past the rule. A new proposal follows only the merchant's answer or, for `missing_expected`, the fresh read.

When the merchant's answer is a clarification (which location, why it changed, the corrected SKU), it is not the count: the new line's source quotes the statement of the number together with the clarification, never the clarification alone ([source rules](sources.md#quote-the-number)).
