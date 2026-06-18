# dev_wasm Device Test Recipes

Source owner: `~wasm-64@1.0`

Source module: `vm/dev_wasm.erl`

Category: Compute, Processes, And Composition

Test count: 8 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [create-a-process](/recipes/create-a-process.md).

## What The Tests Cover

WASM input/process prefixes, execution, imports, and state export/restore.

## Recipe Candidates

- Execute a WASM module, pass input prefixes, import a host function, and export/restore state.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Advanced recipe seed | 7 |
| Not a recipe - benchmark/stress | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `input_prefix_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasm.erl:425](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L425) |
| `process_prefixes_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasm.erl:449](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L449) |
| `init_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasm.erl:471](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L471) |
| `basic_execution_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasm.erl:486](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L486) |
| `basic_execution_64_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasm.erl:492](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L492) |
| `imported_function_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasm.erl:498](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L498) |
| `benchmark_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [vm/dev_wasm.erl:512](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L512) |
| `state_export_and_restore_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_wasm.erl:543](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_wasm.erl#L543) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `benchmark_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
