# dev_name Device Test Recipes

Source owner: `~name@1.0`

Source module: `name/dev_name.erl`

Category: Foundations

Test count: 10 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Configured name resolver behavior, ARNS snapshots, and host-derived name resolution.

## Recipe Candidates

- Resolve names through configured resolvers and host-derived names.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 2 |
| Operator recipe seed | 8 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `no_resolvers_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [name/dev_name.erl:188](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L188) |
| `single_resolver_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:212](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L212) |
| `message_lookup_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:228](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L228) |
| `multiple_resolvers_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:245](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L245) |
| `load_and_execute_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:266](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L266) |
| `arns_json_snapshot_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:292](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L292) |
| `arns_host_resolution_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:306](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L306) |
| `arns_host_resolution_with_node_host_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:321](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L321) |
| `root_request_skips_name_resolution_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [name/dev_name.erl:339](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L339) |
| `name_from_host_test_parallel` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_name.erl:368](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_name.erl#L368) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `no_resolvers_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `root_request_skips_name_resolution_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
