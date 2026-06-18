# dev_wasi Device Test Recipes

Source owner: `~wasi@1.0`

Source module: `vm/dev_wasi.erl`

Category: Compute, Processes, And Composition

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [create-a-process](/recipes/create-a-process.md).

## What The Tests Cover

WASI virtual filesystem serialization and AOS execution.

## Recipe Candidates

- Run a WASI/AOS command with a serializable virtual filesystem.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Advanced recipe seed | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `vfs_is_serializable_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasi.erl:245](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasi.erl#L245) |
| `wasi_stack_is_serializable_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasi.erl:258](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasi.erl#L258) |
| `basic_aos_exec_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasi.erl:264](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasi.erl#L264) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
