# dev_copycat_graphql Device Test Recipes

Source owner: `~copycat@1.0`

Source module: `query/dev_copycat_graphql.erl`

Category: Helper for ~copycat@1.0

Test count: 9 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

GraphQL-style copycat query filters over indexed transactions and scheduler locations.

## Recipe Candidates

- Filter indexed transactions by tag, owner, recipient, ID, and combined conditions.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Recipe seed | 9 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `basic_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:278](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L278) |
| `query_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:291](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L291) |
| `tag_value_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:322](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L322) |
| `owners_filter_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:335](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L335) |
| `recipients_filter_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:348](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L348) |
| `ids_filter_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:361](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L361) |
| `all_filter_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:374](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L374) |
| `combined_filters_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:387](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L387) |
| `fetch_scheduler_location_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [query/dev_copycat_graphql.erl:432](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_copycat_graphql.erl#L432) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
