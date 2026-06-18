# dev_scheduler_server Device Test Recipes

Source owner: `~scheduler@1.0`

Source module: `process/dev_scheduler_server.erl`

Category: Helper for ~scheduler@1.0

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Scheduler server new-process and benchmark behavior.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - benchmark/stress | 1 |
| Not a recipe - internal support | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `new_proc_test` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [process/dev_scheduler_server.erl:345](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_server.erl#L345) |
| `benchmark_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler_server.erl:373](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler_server.erl#L373) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `new_proc_test` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
| `benchmark_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
