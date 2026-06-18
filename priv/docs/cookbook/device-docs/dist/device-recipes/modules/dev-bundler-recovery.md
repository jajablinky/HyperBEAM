# dev_bundler_recovery Device Test Recipes

Source owner: `~bundler@1.0`

Source module: `arweave/dev_bundler_recovery.erl`

Category: Helper for ~bundler@1.0

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: [bundle-data-locally](/recipes/bundle-data-locally.md).

## What The Tests Cover

Bundler recovery scanning after unfinished bundle work.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - internal support | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `recover_unbundled_items_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_recovery.erl:146](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_recovery.erl#L146) |
| `recover_bundles_skips_complete_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_recovery.erl:164](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_recovery.erl#L164) |
| `recover_bundles_failed_bundle_items_continue_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_recovery.erl:195](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_recovery.erl#L195) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `recover_unbundled_items_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `recover_bundles_skips_complete_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `recover_bundles_failed_bundle_items_continue_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
