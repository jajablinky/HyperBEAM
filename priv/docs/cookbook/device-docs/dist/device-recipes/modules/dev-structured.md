# dev_structured Device Test Recipes

Source owner: `~structured@1.0`

Source module: `codec/dev_structured.erl`

Category: Codecs And Formats

Test count: 1 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Structured field/list encoding.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Spec/test vector | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `list_encoding_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_structured.erl:374](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_structured.erl#L374) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `list_encoding_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
