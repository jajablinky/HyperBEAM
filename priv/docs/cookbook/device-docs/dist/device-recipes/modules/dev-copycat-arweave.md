# dev_copycat_arweave Device Test Recipes

Source owner: `~copycat@1.0`

Source module: `query/dev_copycat_arweave.erl`

Category: Helper for ~copycat@1.0

Test count: 18 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [arweave-json-to-lua](/recipes/arweave-json-to-lua.md), [query-local-cache](/recipes/query-local-cache.md).

## What The Tests Cover

Arweave block and bundle indexing behavior used by copycat.

## Recipe Candidates

- Copy one Arweave block into local indexes.
- List indexed transaction IDs.
- Handle invalid ranges and empty blocks safely.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 13 |
| Guardrail, not standalone | 4 |
| Not a recipe - disabled | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `index_ids_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:490](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L490) |
| `small_bundle_header_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:563](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L563) |
| `large_bundle_header_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:584](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L584) |
| `invalid_bundle_header_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [query/dev_copycat_arweave.erl:604](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L604) |
| `invalid_bundle_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [query/dev_copycat_arweave.erl:622](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L622) |
| `block_with_large_integer_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:642](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L642) |
| `empty_block_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:655](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L655) |
| `tx_with_data_tag_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [query/dev_copycat_arweave.erl:696](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L696) |
| `tx_with_no_data_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [query/dev_copycat_arweave.erl:730](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L730) |
| `non_string_tags_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:791](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L791) |
| `list_index_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:797](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L797) |
| `auto_stop_on_indexed_block_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:846](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L846) |
| `explicit_to_reindexes_all_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:876](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L876) |
| `auto_stop_partial_index_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:906](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L906) |
| `negative_parse_range_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:952](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L952) |
| `latest_height_failure_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [query/dev_copycat_arweave.erl:969](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L969) |
| `negative_resolved_height_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:1006](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L1006) |
| `negative_from_index_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_copycat_arweave.erl:1040](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_arweave.erl#L1040) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `invalid_bundle_header_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `invalid_bundle_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `tx_with_data_tag_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
| `tx_with_no_data_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `latest_height_failure_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
