# dev_router Device Test Recipes

Source owner: `~router@1.0`

Source module: `node/dev_router.erl`

Category: Node Operations

Test count: 22 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [trusted-custom-device](/recipes/trusted-custom-device.md).

## What The Tests Cover

Route providers, dynamic routes, pricing, strategies, hooks, and route config.

## Recipe Candidates

- Declare explicit/template/regex routes and inspect chosen routes.
- Configure dynamic provider routing and route hooks.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - benchmark/stress | 1 |
| Operator recipe seed | 21 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `test_provider_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:840](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L840) |
| `dynamic_provider_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:867](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L867) |
| `local_process_provider_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:891](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L891) |
| `local_dynamic_router_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:941](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L941) |
| `dynamic_router_pricing_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1065](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1065) |
| `dynamic_router_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1236](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1236) |
| `dynamic_routing_by_performance_test_parallel_` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [node/dev_router.erl:1343](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1343) |
| `weighted_random_strategy_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1510](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1510) |
| `shuffled_strategy_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1523](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1523) |
| `range_limited_route_filtering_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1562](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1562) |
| `strategy_suite_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1615](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1615) |
| `by_base_determinism_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1640](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1640) |
| `route_template_message_matches_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1682](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1682) |
| `route_regex_matches_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1715](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1715) |
| `explicit_route_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1739](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1739) |
| `device_call_from_singleton_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1774](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1774) |
| `get_routes_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1789](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1789) |
| `add_route_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1809](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1809) |
| `request_hook_reroute_to_nearest_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1849](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1849) |
| `route_nearest_integer_preserves_opts_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1909](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1909) |
| `route_multirequest_parallel_limit_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:1976](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L1976) |
| `full_route_config_test_parallel_` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_router.erl:2053](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_router.erl#L2053) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `dynamic_routing_by_performance_test_parallel_` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
