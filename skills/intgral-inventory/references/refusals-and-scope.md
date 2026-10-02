# Out of scope, refusal codes and warnings

## Out of scope

The Agent proposes the stocked quantity of existing, inventory-managed variants at a location, and nothing else. When a request reaches past that, say so and give the reason; do not look for a workaround.

| Request | Tell the merchant |
| --- | --- |
| FBA stock (a SKU or row for a fulfilled-by-Amazon listing) | Amazon manages FBA quantities; the ERP does not own them, so a count here would be a second, conflicting number. Nothing was proposed for that SKU |
| A kit or bundle variant (one SKU made of several inventory items, or of more than one unit of an item) | A kit has no stock of its own: its availability comes from its components. Propose the components' counts instead, if the merchant states them |
| A new stock location | The Agent cannot create locations. An administrator adds it in the ERP; after that it appears in `medusa.get_stock` |
| Reservations | Units reserved for orders are held by the order flow. The Agent never creates, releases or edits them |
| Turning inventory management or backorders on or off | Those are product settings an administrator changes in the ERP |
| Changing the quantity on Amazon | Amazon quantity changes only through a publication plan that a human confirms in the ERP. A confirmed ERP stock change reaches Amazon at the next such plan, not before |
| Prices, titles, images, publishing | Not stock: the listing skill and the ERP's own publication path |

A row in a sheet that is marked FBA or bundle in a note column is out of scope: do not send it, even to "let the ERP refuse it".

## Refusal codes

The ERP judges every line on its own and returns `refused[]` entries with `index`, `sku`, `code` and `message`. Report each as written, then add what it means. Codes the list does not name are reported the same way; do not guess their meaning.

| Code | Meaning | What to tell the merchant | What could change it |
| --- | --- | --- | --- |
| `unknown_sku` | No stockable variant has this SKU | The SKU is not in the ERP as a stockable product | The merchant corrects the SKU |
| `ambiguous_sku` | The SKU resolves to more than one inventory item | It cannot be tied to one stock record | An administrator fixes the product in the ERP |
| `not_inventory_managed` | The variant does not track inventory | Stock is not tracked for it, so there is nothing to count | An administrator changes the setting; the Agent never does |
| `kit_variant` | The variant is a kit of several inventory items or units | Kits take their stock from components | The merchant states component counts |
| `fba_listing` | The variant's linked listing is fulfilled by Amazon | Amazon manages FBA quantities | Nothing on the ERP side |
| `location_required` | Several locations are writable and none was named | Which location is this count for? | The merchant names it |
| `location_not_allowed` | The location is not linked to a sales channel of the store | That location cannot take stock changes here | The merchant picks a writable one |
| `missing_expected` | A `set` line had no `expected_stocked_quantity`, or a value other than 0 where no level exists yet | The line was incomplete | A fresh `medusa.get_stock` read (see below) |
| `missing_reason` | An `adjust` line had no reason | Why did the quantity change: received, damaged, a count correction or something else? | The merchant says why |
| `no_level_for_adjust` | An `adjust` on a SKU with no level at that location | An adjustment needs an existing level | The merchant gives a counted total (a `set`) |
| `negative_result` | The result would be below zero | The change would leave negative stock | The merchant restates the number |
| `below_reserved` | The result would be below the reserved quantity | That many units are already reserved for open orders | The merchant restates, or the orders change in the ERP |

`negative_result` and `below_reserved` are also checked again at confirmation. A line can pass at proposal and still be refused when a human confirms, because stock moved.

## Refusals are final

A refused line stays refused for this turn.

- Do not resend it, change its kind, drop the reason, switch location, adjust the quantity, or split it to get past the rule.
- Report it as above and stop. A refusal that the merchant can answer (a missing reason, a location, a corrected SKU) becomes a **new** proposal only after the merchant answers, with their answer in the source.
- One narrow exception: when the code names a field **you** left out (`missing_expected`, `missing_reason`), the line was never really judged. Read `medusa.get_stock` (for `missing_expected`) or ask the merchant (for `missing_reason`), then propose that one line again and say you did.

## Warnings

Warnings ride on the stored lines (`batch.lines[].warnings`, each `{ code, message }`). They never remove a line. Report each verbatim.

- **A large jump** (more than 10 times the current stock, or more than 1000 units): the figure may be a typo. A human sees the warning at review. If the merchant's words were unambiguous, the warning is the whole of your response to it; do not change the number.
- **An active FBM listing**: the SKU has a live merchant-fulfilled listing, so the next publication plan will carry the new quantity to Amazon. The proposal itself changes nothing on Amazon.

Code names for warnings may change between deployments; report what the result contains, not what this page expects.
