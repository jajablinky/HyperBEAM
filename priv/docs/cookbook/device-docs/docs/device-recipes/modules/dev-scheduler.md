# dev_scheduler Device Test Recipes

Source owner: `~scheduler@1.0`

Source module: `process/dev_scheduler.erl`

Category: Compute, Processes, And Composition

Test count: 16 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [create-a-process](/recipes/create-a-process.md), [scheduled-lua-process](/recipes/scheduled-lua-process.md).

## What The Tests Cover

Scheduler status, process registration, scheduling, HTTP schedule reads/writes, redirects, and legacy views.

## Recipe Candidates

- Register a process, schedule a message, read slots and schedule ranges over HTTP.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 14 |
| Not a recipe - benchmark/stress | 1 |
| Not a recipe - disabled | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `status_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1458](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1458) |
| `register_new_process_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1467](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1467) |
| `schedule_message_and_get_slot_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1493](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1493) |
| `redirect_to_hint_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1518](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1518) |
| `redirect_from_graphql_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1544](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1544) |
| `get_local_schedule_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1579](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1579) |
| `http_get_schedule_redirect_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1672](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1672) |
| `http_post_schedule_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1690](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1690) |
| `http_get_schedule_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1712](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1712) |
| `http_get_legacy_schedule_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1755](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1755) |
| `http_get_legacy_slot_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1765](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1765) |
| `http_get_legacy_schedule_slot_range_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1773](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1773) |
| `http_get_legacy_schedule_as_aos2_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1785](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1785) |
| `http_post_legacy_schedule_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [process/dev_scheduler.erl:1803](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1803) |
| `http_get_json_schedule_test_parallel_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [process/dev_scheduler.erl:1835](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1835) |
| `benchmark_suite_test_parallel_` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [process/dev_scheduler.erl:1954](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/process/dev_scheduler.erl#L1954) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `http_post_legacy_schedule_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
| `benchmark_suite_test_parallel_` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
