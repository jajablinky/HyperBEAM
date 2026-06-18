# dev_blacklist Device Test Recipes

Source owner: `~blacklist@1.0`

Source module: `node/dev_blacklist.erl`

Category: Node Operations

Test count: 8 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Operator moderation hooks and external blacklist providers.

## Recipe Candidates

- Load a blacklist from local/external providers and verify blocked requests.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 1 |
| Not a recipe - benchmark/stress | 1 |
| Operator recipe seed | 6 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `basic_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_blacklist.erl:384](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L384) |
| `first_request_always_return_503_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_blacklist.erl:408](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L408) |
| `default_provider_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_blacklist.erl:426](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L426) |
| `blacklist_from_external_http_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_blacklist.erl:445](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L445) |
| `multiple_providers_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_blacklist.erl:481](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L481) |
| `provider_failure_resilience_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [node/dev_blacklist.erl:520](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L520) |
| `refresh_periodically_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_blacklist.erl:541](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L541) |
| `parse_blacklist_performance_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [node/dev_blacklist.erl:589](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_blacklist.erl#L589) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `provider_failure_resilience_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `parse_blacklist_performance_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
