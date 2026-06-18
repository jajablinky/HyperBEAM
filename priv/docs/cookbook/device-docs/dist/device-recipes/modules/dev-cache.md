# dev_cache Device Test Recipes

Source owner: `~cache@1.0`

Source module: `node/dev_cache.erl`

Category: Node Operations

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [query-local-cache](/recipes/query-local-cache.md).

## What The Tests Cover

Direct local cache writes for messages and bytes.

## Recipe Candidates

- Write a message or byte payload into local cache and query it back.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `cache_write_message_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_cache.erl:280](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_cache.erl#L280) |
| `cache_write_binary_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_cache.erl:296](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_cache.erl#L296) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
