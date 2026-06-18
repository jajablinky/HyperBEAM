# dev_patch Device Test Recipes

Source owner: `~patch@1.0`

Source module: `util/dev_patch.erl`

Category: Compute, Processes, And Composition

Test count: 5 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [create-a-process](/recipes/create-a-process.md), [patch-process-state](/recipes/patch-process-state.md).

## What The Tests Cover

Moving values between request, message, and output paths.

## Recipe Candidates

- Move values between paths before/after compute.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 4 |
| Guardrail, not standalone | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `uninitialized_patch_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [util/dev_patch.erl:190](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_patch.erl#L190) |
| `patch_to_submessage_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_patch.erl:230](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_patch.erl#L230) |
| `all_mode_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_patch.erl:268](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_patch.erl#L268) |
| `req_prefix_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_patch.erl:318](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_patch.erl#L318) |
| `custom_set_patch_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_patch.erl:358](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_patch.erl#L358) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `uninitialized_patch_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
