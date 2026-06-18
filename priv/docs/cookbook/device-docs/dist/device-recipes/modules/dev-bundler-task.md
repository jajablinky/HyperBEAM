# dev_bundler_task Device Test Recipes

Source owner: `~bundler@1.0`

Source module: `arweave/dev_bundler_task.erl`

Category: Helper for ~bundler@1.0

Test count: 4 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: [bundle-data-locally](/recipes/bundle-data-locally.md).

## What The Tests Cover

Bundle task conversion and cross-checking against arbundles.js fixtures.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - internal support | 4 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `build_signed_tx_on_arbundles_js_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_task.erl:251](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_task.erl#L251) |
| `bundle_convert_real_data_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_task.erl:327](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_task.erl#L327) |
| `bundle_convert_minimal_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_task.erl:352](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_task.erl#L352) |
| `bundle_convert_mixed_tree_verify_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_task.erl:385](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_task.erl#L385) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `build_signed_tx_on_arbundles_js_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `bundle_convert_real_data_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `bundle_convert_minimal_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `bundle_convert_mixed_tree_verify_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
