# dev_push Device Test Recipes

Source owner: `~push@1.0`

Source module: `process/dev_push.erl`

Category: Compute, Processes, And Composition

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [create-a-process](/recipes/create-a-process.md), [scheduled-lua-process](/recipes/scheduled-lua-process.md).

## What The Tests Cover

Process output pushing and redirect hints.

## Recipe Candidates

- Run a process output push path and inspect redirect-hint behavior.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 2 |
| Not a recipe - disabled | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `dev_push_test_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_push.erl:844](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_push.erl#L844) |
| `genesis_wasm_tests` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_push.erl:869](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_push.erl#L869) |
| `push_with_redirect_hint_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [process/dev_push.erl:1026](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_push.erl#L1026) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `push_with_redirect_hint_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
