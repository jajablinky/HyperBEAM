# dev_query Device Test Recipes

Source owner: `~query@1.0`

Source module: `query/dev_query.erl`

Category: Arweave And Data

Test count: 8 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [arweave-json-to-lua](/recipes/arweave-json-to-lua.md), [query-local-cache](/recipes/query-local-cache.md).

## What The Tests Cover

Local index queries, return modes, and HTTP query access.

## Recipe Candidates

- Count, list, and filter local cache/query indexes.
- Choose return modes: count, boolean, key, types.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 8 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `basic_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:247](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L247) |
| `only_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:262](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L262) |
| `multiple_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:273](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L273) |
| `nested_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:289](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L289) |
| `list_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:303](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L303) |
| `return_key_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:315](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L315) |
| `return_types_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:327](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L327) |
| `http_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query.erl:358](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query.erl#L358) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
