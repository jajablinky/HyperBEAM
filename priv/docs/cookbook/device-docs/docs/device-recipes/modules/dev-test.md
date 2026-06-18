# dev_test Device Test Recipes

Source owner: `~test-device@1.0`

Source module: `util/dev_test.erl`

Category: Support And Test

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Built-in test helper device compute and restore behavior.

## Recipe Candidates

- Use the test helper device inside Forge or integration docs, not as a public application workflow.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - test harness | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `device_with_function_key_module_test` | Not a recipe - test harness | `~test-device@1.0` exists to exercise the HyperBEAM test harness and Forge-style integration paths; it is not an end-user workflow. | [util/dev_test.erl:226](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_test.erl#L226) |
| `compute_test` | Not a recipe - test harness | `~test-device@1.0` exists to exercise the HyperBEAM test harness and Forge-style integration paths; it is not an end-user workflow. | [util/dev_test.erl:236](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_test.erl#L236) |
| `restore_test` | Not a recipe - test harness | `~test-device@1.0` exists to exercise the HyperBEAM test harness and Forge-style integration paths; it is not an end-user workflow. | [util/dev_test.erl:263](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_test.erl#L263) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `device_with_function_key_module_test` | Not a recipe - test harness: `~test-device@1.0` exists to exercise the HyperBEAM test harness and Forge-style integration paths; it is not an end-user workflow. |
| `compute_test` | Not a recipe - test harness: `~test-device@1.0` exists to exercise the HyperBEAM test harness and Forge-style integration paths; it is not an end-user workflow. |
| `restore_test` | Not a recipe - test harness: `~test-device@1.0` exists to exercise the HyperBEAM test harness and Forge-style integration paths; it is not an end-user workflow. |
