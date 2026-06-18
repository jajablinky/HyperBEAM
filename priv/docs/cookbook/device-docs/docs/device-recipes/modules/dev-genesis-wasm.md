# dev_genesis_wasm Device Test Recipes

Source owner: `~genesis-wasm@1.0`

Source module: `vm/dev_genesis_wasm.erl`

Category: Compute, Processes, And Composition

Test count: 6 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Legacy AO process execution through the genesis WASM environment.

## Recipe Candidates

- Spawn a legacy AO process, execute a slot, dry-run, and compare with WASM output.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Advanced recipe seed | 6 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `import_legacy_checkpoint_test_` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_genesis_wasm.erl:572](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_genesis_wasm.erl#L572) |
| `dedup_test` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_genesis_wasm.erl:769](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_genesis_wasm.erl#L769) |
| `spawn_and_execute_slot_test_` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_genesis_wasm.erl:854](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_genesis_wasm.erl#L854) |
| `compare_result_genesis_wasm_and_wasm_test_` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_genesis_wasm.erl:899](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_genesis_wasm.erl#L899) |
| `send_message_between_genesis_wasm_processes_test_` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_genesis_wasm.erl:962](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_genesis_wasm.erl#L962) |
| `dryrun_genesis_wasm_test_` | Advanced recipe seed | This can become a user-facing workflow, but it needs explicit assets or runtime prerequisites beyond curl and a default node. | [vm/dev_genesis_wasm.erl:1044](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_genesis_wasm.erl#L1044) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
