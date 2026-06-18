# dev_arweave Device Test Recipes

Source owner: `~arweave@2.9`

Source module: `arweave/dev_arweave.erl`

Category: Arweave And Data

Test count: 39 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [arweave-json-to-lua](/recipes/arweave-json-to-lua.md).

## What The Tests Cover

Arweave reads, raw data/range reads, transaction posting, and bundle reassembly behavior.

## Recipe Candidates

- Read transaction metadata and raw bytes.
- Post a signed ANS-104 item or L1 transaction.
- Read byte ranges from Arweave data.
- Reassemble bundled data locally.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 29 |
| Guardrail, not standalone | 3 |
| Not a recipe - disabled | 2 |
| Not a recipe - internal support | 5 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `bundle_header_garbage_guard_test_parallel` | Not a recipe - internal support | The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. | [arweave/dev_arweave.erl:1012](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1012) |
| `post_ans104_message_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1023](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1023) |
| `post_tx_message_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1078](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1078) |
| `post_tx_json_failure_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_arweave.erl:1114](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1114) |
| `post_tx_json_success_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1127](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1127) |
| `post_tx_json_mixed_status_prefers_success_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1135](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1135) |
| `best_response_handles_failed_connect_entries_test_parallel` | Not a recipe - internal support | The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. | [arweave/dev_arweave.erl:1146](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1146) |
| `best_response_non_map_error_round_trips_test_parallel` | Not a recipe - internal support | The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. | [arweave/dev_arweave.erl:1163](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1163) |
| `get_tx_basic_data_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1328](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1328) |
| `get_tx_split_chunk_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1356](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1356) |
| `get_tx_basic_data_exclude_data_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1385](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1385) |
| `get_tx_data_tag_exclude_data_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1422](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1422) |
| `head_raw_tx_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1458](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1458) |
| `head_raw_ans104_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1485](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1485) |
| `head_raw_ans104_invalid_tags_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_arweave.erl:1512](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1512) |
| `get_raw_range_tx_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1534](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1534) |
| `get_raw_range_ans104_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1574](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1574) |
| `get_tx_rsa_nested_bundle_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1619](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1619) |
| `get_tx_rsa_large_bundle_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [arweave/dev_arweave.erl:1652](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1652) |
| `get_bad_tx_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_arweave.erl:1662](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1662) |
| `serialize_data_item_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [arweave/dev_arweave.erl:1670](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1670) |
| `get_partial_chunk_post_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1701](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1701) |
| `get_full_chunk_post_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1722](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1722) |
| `get_multi_chunk_post_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1743](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1743) |
| `get_mid_chunk_post_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1766](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1766) |
| `get_partial_chunk_pre_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1787](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1787) |
| `get_full_chunk_pre_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1808](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1808) |
| `get_multi_chunk_pre_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1829](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1829) |
| `get_mid_chunk_pre_split_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1850](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1850) |
| `get_pre_split_small_chunks_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1871](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1871) |
| `get_post_split_small_chunks_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1883](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1883) |
| `get_pre_split_gap_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1895](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1895) |
| `get_pre_split_small_tx_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1907](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1907) |
| `get_ed25519_item_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1921](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1921) |
| `bucket_based_offset_fail_test_parallel` | Not a recipe - internal support | The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. | [arweave/dev_arweave.erl:1936](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1936) |
| `bucket_based_offset_pass_test_parallel` | Not a recipe - internal support | The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. | [arweave/dev_arweave.erl:1951](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1951) |
| `reassemble_bundle1_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1963](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1963) |
| `reassemble_bundle2_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:1966](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L1966) |
| `get_post_split_mid_chunk_large_module_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [arweave/dev_arweave.erl:2143](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_arweave.erl#L2143) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `bundle_header_garbage_guard_test_parallel` | Not a recipe - internal support: The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. |
| `post_tx_json_failure_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `best_response_handles_failed_connect_entries_test_parallel` | Not a recipe - internal support: The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. |
| `best_response_non_map_error_round_trips_test_parallel` | Not a recipe - internal support: The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. |
| `head_raw_ans104_invalid_tags_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `get_tx_rsa_large_bundle_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
| `get_bad_tx_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `serialize_data_item_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
| `bucket_based_offset_fail_test_parallel` | Not a recipe - internal support: The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. |
| `bucket_based_offset_pass_test_parallel` | Not a recipe - internal support: The assertion protects internal routing, selection, conversion, or failure handling rather than a public path users should run. |
