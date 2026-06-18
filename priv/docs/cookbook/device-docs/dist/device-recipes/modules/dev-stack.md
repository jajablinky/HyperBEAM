# dev_stack Device Test Recipes

Source owner: `~stack@1.0`

Source module: `util/dev_stack.erl`

Category: Compute, Processes, And Composition

Test count: 15 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [create-a-process](/recipes/create-a-process.md), [patch-process-state](/recipes/patch-process-state.md).

## What The Tests Cover

Fold/map stacks, device transformations, prefixes, skip/pass, reinvocation, and not-found behavior.

## Recipe Candidates

- Build fold/map stacks, use input/output prefixes, skip/pass, and reinvoke composed devices.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 11 |
| Guardrail, not standalone | 3 |
| Not a recipe - benchmark/stress | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `transform_internal_call_device_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:418](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L418) |
| `transform_external_call_device_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:439](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L439) |
| `example_device_for_stack_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:480](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L480) |
| `simple_stack_execute_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:493](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L493) |
| `many_devices_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:509](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L509) |
| `benchmark_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [util/dev_stack.erl:535](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L535) |
| `no_prefix_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [util/dev_stack.erl:594](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L594) |
| `output_prefix_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:605](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L605) |
| `input_and_output_prefixes_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:622](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L622) |
| `input_output_prefixes_passthrough_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:641](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L641) |
| `reinvocation_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:662](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L662) |
| `skip_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [util/dev_stack.erl:684](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L684) |
| `pass_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:703](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L703) |
| `not_found_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [util/dev_stack.erl:720](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L720) |
| `simple_map_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_stack.erl:745](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_stack.erl#L745) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `benchmark_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `no_prefix_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `skip_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `not_found_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
