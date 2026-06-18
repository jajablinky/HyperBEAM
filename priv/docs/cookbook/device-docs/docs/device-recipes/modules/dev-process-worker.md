# dev_process_worker Device Test Recipes

Source owner: `~process@1.0`

Source module: `process/dev_process_worker.erl`

Category: Helper for ~process@1.0

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Process worker grouping and cache-skip internals.

## Recipe Candidates

- Explain why worker grouping remains internal and not a user recipe.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - internal support | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `info_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [process/dev_process_worker.erl:195](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_process_worker.erl#L195) |
| `grouper_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [process/dev_process_worker.erl:204](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_process_worker.erl#L204) |
| `grouper_skips_when_slot_cached_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [process/dev_process_worker.erl:223](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_process_worker.erl#L223) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `info_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `grouper_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `grouper_skips_when_slot_cached_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
