# dev_arweave_offset Device Test Recipes

Source owner: `~arweave@2.9`

Source module: `arweave/dev_arweave_offset.erl`

Category: Helper for ~arweave@2.9

Test count: 4 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Offset parsing and nested item lookup internals for Arweave reads.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Spec/test vector | 4 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `parse_offset_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [arweave/dev_arweave_offset.erl:344](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave_offset.erl#L344) |
| `offset_item_cases_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [arweave/dev_arweave_offset.erl:357](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave_offset.erl#L357) |
| `offset_nested_item_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [arweave/dev_arweave_offset.erl:384](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave_offset.erl#L384) |
| `offset_as_name_resolver_lookup_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [arweave/dev_arweave_offset.erl:463](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave_offset.erl#L463) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `parse_offset_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `offset_item_cases_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `offset_nested_item_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `offset_as_name_resolver_lookup_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
