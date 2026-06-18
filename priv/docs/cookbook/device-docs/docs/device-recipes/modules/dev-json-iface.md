# dev_json_iface Device Test Recipes

Source owner: `~json-iface@1.0`

Source module: `codec/dev_json_iface.erl`

Category: Codecs And Formats

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

JSON interface calls into AOS/WASM stacks.

## Recipe Candidates

- Turn the `dev_json_iface` externally observable positive tests into one or more HTTP workflows.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Advanced recipe seed | 1 |
| Not a recipe - benchmark/stress | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `basic_aos_call_test_` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [codec/dev_json_iface.erl:559](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_json_iface.erl#L559) |
| `aos_stack_benchmark_test_` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [codec/dev_json_iface.erl:575](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_json_iface.erl#L575) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `aos_stack_benchmark_test_` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
