> Contract reference captured from the development baseline. Discover the deployed endpoint schema before writing; example values are illustrative, not merchant facts.

## `competitor_research` report data

Declared `schema_revision: competitor_research/1`.

```json
{
  "candidates": [{
    "evidence_id": "rart_...",
    "source_ref": "B000000001",
    "classification": "direct",
    "selection_reason": "Open horizontal holder with a retaining weight",
    "variant": "wood/metal weighted bar; structured 7 x 18 x 7 cm"
  }],
  "price_groups": [{
    "id": "direct-eur-item",
    "label": "Direct item prices; shipping unknown and excluded",
    "comparison": {
      "currency": "EUR",
      "quantity": 1,
      "unit": "item",
      "variant_basis": "Open horizontal holders with an observed retaining mechanism",
      "shipping": "excluded_unknown"
    },
    "members": [{"evidence_id": "rart_...", "source_ref": "B000000001", "offer_id": "current"}]
  }],
  "review_analysis": {"status": "unavailable", "reason": "No original review body is retained"}
}
```

Submit prices, never statistics: the server deduplicates candidates, applies scope and report exclusions, enforces the 20-candidate ceiling, and returns Type-7 `statistics` per group. One valid value is not a price band.
