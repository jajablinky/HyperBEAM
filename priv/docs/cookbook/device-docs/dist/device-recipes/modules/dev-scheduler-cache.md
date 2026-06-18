# dev_scheduler_cache Device Test Recipes

Source owner: `~scheduler@1.0`

Source module: `process/dev_scheduler_cache.erl`

Category: Helper for ~scheduler@1.0

Test count: 8 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Scheduler cache durability, races, restart, and corruption stress cases.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - benchmark/stress | 6 |
| Not a recipe - internal support | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `volatile_schedule_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [process/dev_scheduler_cache.erl:157](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L157) |
| `concurrent_scheduler_write_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler_cache.erl:183](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L183) |
| `concurrent_read_write_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler_cache.erl:228](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L228) |
| `large_assignment_volume_test_` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler_cache.erl:309](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L309) |
| `rapid_restart_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler_cache.erl:348](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L348) |
| `mixed_store_reset_operations_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [process/dev_scheduler_cache.erl:390](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L390) |
| `invalid_assignment_stress_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler_cache.erl:418](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L418) |
| `volatile_store_corruption_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler_cache.erl:456](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_cache.erl#L456) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `volatile_schedule_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `concurrent_scheduler_write_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `concurrent_read_write_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `large_assignment_volume_test_` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `rapid_restart_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `mixed_store_reset_operations_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `invalid_assignment_stress_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `volatile_store_corruption_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
