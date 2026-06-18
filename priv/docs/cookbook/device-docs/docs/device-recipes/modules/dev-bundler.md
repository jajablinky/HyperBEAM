# dev_bundler Device Test Recipes

Source owner: `~bundler@1.0`

Source module: `arweave/dev_bundler.erl`

Category: Arweave And Data

Test count: 26 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [bundle-data-locally](/recipes/bundle-data-locally.md).

## What The Tests Cover

Signed item acceptance, local optimistic caching, bundle thresholds, dispatch, recovery, and retry behavior.

## Recipe Candidates

- Submit a signed item and read the optimistic local copy.
- Tune count/size/delay thresholds.
- Recover queued bundles after restart.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 13 |
| Guardrail, not standalone | 9 |
| Not a recipe - benchmark/stress | 3 |
| Not a recipe - internal support | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `bundle_count_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:615](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L615) |
| `bundle_size_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:618](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L618) |
| `bundle_dispatch_delay_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:621](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L621) |
| `nested_bundle_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:624](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L624) |
| `nested_unbundled_bundle_child_posted_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:664](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L664) |
| `nested_unbundled_bundle_child_not_posted_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:669](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L669) |
| `price_error_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:765](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L765) |
| `anchor_error_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:771](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L771) |
| `tx_error_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:777](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L777) |
| `unsigned_dataitem_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:806](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L806) |
| `idle_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:840](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L840) |
| `dispatch_blocking_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:893](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L893) |
| `recover_respects_max_items_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:954](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L954) |
| `complete_task_sequence_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:994](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L994) |
| `recover_bundles_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:1038](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1038) |
| `post_tx_price_failure_retry_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:1095](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1095) |
| `post_tx_anchor_failure_retry_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:1131](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1131) |
| `post_tx_post_failure_retry_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:1167](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1167) |
| `post_proof_failure_retry_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:1205](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1205) |
| `rapid_dispatch_test_parallel` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [arweave/dev_bundler.erl:1245](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1245) |
| `one_bundle_fails_others_continue_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:1279](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1279) |
| `parallel_task_execution_test_parallel` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [arweave/dev_bundler.erl:1316](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1316) |
| `exponential_backoff_timing_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [arweave/dev_bundler.erl:1354](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1354) |
| `independent_task_retry_counts_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_bundler.erl:1407](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1407) |
| `invalid_item_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_bundler.erl:1446](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1446) |
| `cache_write_failure_test_parallel` | Not a recipe - internal support | The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. | [arweave/dev_bundler.erl:1489](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_bundler.erl#L1489) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `price_error_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `anchor_error_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `tx_error_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `post_tx_price_failure_retry_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `post_tx_anchor_failure_retry_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `post_tx_post_failure_retry_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `post_proof_failure_retry_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `rapid_dispatch_test_parallel` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `one_bundle_fails_others_continue_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `parallel_task_execution_test_parallel` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `exponential_backoff_timing_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
| `invalid_item_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `cache_write_failure_test_parallel` | Not a recipe - internal support: The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. |
