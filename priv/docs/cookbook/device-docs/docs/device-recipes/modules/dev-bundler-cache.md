# dev_bundler_cache Device Test Recipes

Source owner: `~bundler@1.0`

Source module: `arweave/dev_bundler_cache.erl`

Category: Helper for ~bundler@1.0

Test count: 6 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: [bundle-data-locally](/recipes/bundle-data-locally.md).

## What The Tests Cover

Bundler cache state and recovered item linking.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - internal support | 6 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `basic_cache_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_cache.erl:216](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_cache.erl#L216) |
| `load_unbundled_items_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_cache.erl:233](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_cache.erl#L233) |
| `recovered_items_relink_to_original_bundle_path_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_cache.erl:256](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_cache.erl#L256) |
| `load_bundle_states_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_cache.erl:267](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_cache.erl#L267) |
| `load_bundled_items_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_cache.erl:285](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_cache.erl#L285) |
| `bundler_optimistic_cache_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [arweave/dev_bundler_cache.erl:324](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler_cache.erl#L324) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `basic_cache_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `load_unbundled_items_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `recovered_items_relink_to_original_bundle_path_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `load_bundle_states_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `load_bundled_items_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `bundler_optimistic_cache_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
