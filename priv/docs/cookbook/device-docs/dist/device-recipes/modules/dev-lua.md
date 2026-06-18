# dev_lua Device Test Recipes

Source owner: `~lua@5.3a`

Source module: `vm/dev_lua.erl`

Category: Compute, Processes, And Composition

Test count: 17 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [arweave-json-to-lua](/recipes/arweave-json-to-lua.md), [create-a-process](/recipes/create-a-process.md), [scheduled-lua-process](/recipes/scheduled-lua-process.md).

## What The Tests Cover

Lua invocation, module loading, sandboxing, AO-Core calls from Lua, and Lua process restoration.

## Recipe Candidates

- Invoke Lua directly, load modules by ID, call AO-Core from Lua, and restore Lua process state.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 12 |
| Guardrail, not standalone | 2 |
| Not a recipe - benchmark/stress | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `simple_invocation_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:509](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L509) |
| `post_invocation_message_validation_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:521](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L521) |
| `load_modules_by_id_test_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:546](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L546) |
| `multiple_modules_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:557](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L557) |
| `error_response_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [vm/dev_lua.erl:584](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L584) |
| `sandboxed_failure_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [vm/dev_lua.erl:599](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L599) |
| `ao_core_sandbox_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:613](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L613) |
| `ao_core_resolution_from_lua_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:628](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L628) |
| `direct_benchmark_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [vm/dev_lua.erl:642](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L642) |
| `invoke_non_compute_key_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:670](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L670) |
| `lua_http_hook_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:694](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L694) |
| `pure_lua_process_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:714](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L714) |
| `pure_lua_restore_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:723](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L723) |
| `pure_lua_process_benchmark_test_` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [vm/dev_lua.erl:739](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L739) |
| `invoke_aos_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:773](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L773) |
| `aos_authority_not_trusted_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [vm/dev_lua.erl:784](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L784) |
| `aos_process_benchmark_test_` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [vm/dev_lua.erl:814](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua.erl#L814) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `error_response_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `sandboxed_failure_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `direct_benchmark_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `pure_lua_process_benchmark_test_` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `aos_process_benchmark_test_` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
