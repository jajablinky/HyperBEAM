# dev_query_test_vectors Device Test Recipes

Source owner: `~query@1.0`

Source module: `query/dev_query_test_vectors.erl`

Category: Helper for ~query@1.0

Test count: 18 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [query-local-cache](/recipes/query-local-cache.md).

## What The Tests Cover

Block, transaction, tag, owner, recipient, cursor, and anchor query vectors.

## Recipe Candidates

- Publish deterministic GraphQL query examples over block and transaction fixtures.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 17 |
| Guardrail, not standalone | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `simple_blocks_query_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:98](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L98) |
| `block_by_height_query_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:144](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L144) |
| `simple_ans104_query_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:196](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L196) |
| `transactions_query_tags_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:263](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L263) |
| `transactions_query_owners_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:326](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L326) |
| `transactions_query_recipients_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:388](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L388) |
| `transactions_query_ids_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:453](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L453) |
| `transactions_query_combined_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:515](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L515) |
| `transactions_query_sort_by_block_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:581](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L581) |
| `transactions_query_filter_by_block_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:624](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L624) |
| `transactions_query_filter_by_block_excludes_unknown_offsets_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:671](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L671) |
| `transactions_query_filter_by_block_can_ignore_ranges_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:704](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L704) |
| `transactions_query_ids_preserve_arweave_tx_id_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:739](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L739) |
| `transactions_query_cursor_by_offset_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:770](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L770) |
| `transaction_query_by_id_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:881](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L881) |
| `transaction_query_full_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:931](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L931) |
| `transaction_query_not_found_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [query/dev_query_test_vectors.erl:1008](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L1008) |
| `transaction_query_with_anchor_test_parallel` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_test_vectors.erl:1044](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_test_vectors.erl#L1044) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `transaction_query_not_found_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
