# dev_query_graphql Device Test Recipes

Source owner: `~query@1.0`

Source module: `query/dev_query_graphql.erl`

Category: Helper for ~query@1.0

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [query-local-cache](/recipes/query-local-cache.md).

## What The Tests Cover

GraphQL lookup wrapper behavior.

## Recipe Candidates

- Turn the `dev_query_graphql` externally observable positive tests into one or more HTTP workflows.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 2 |
| Guardrail, not standalone | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `lookup_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_graphql.erl:295](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_graphql.erl#L295) |
| `lookup_with_vars_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [query/dev_query_graphql.erl:347](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_graphql.erl#L347) |
| `lookup_without_opname_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [query/dev_query_graphql.erl:414](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/query/dev_query_graphql.erl#L414) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `lookup_without_opname_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
