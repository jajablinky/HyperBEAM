# dev_node_process Device Test Recipes

Source owner: `~node-process@1.0`

Source module: `node/dev_node_process.erl`

Category: Compute, Processes, And Composition

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Node-local process lookup, spawn, and execution.

## Recipe Candidates

- Spawn and execute a node-local singleton process.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 1 |
| Operator recipe seed | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `lookup_no_spawn_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [node/dev_node_process.erl:164](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_node_process.erl#L164) |
| `lookup_spawn_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_node_process.erl:171](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_node_process.erl#L171) |
| `lookup_execute_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_node_process.erl:201](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_node_process.erl#L201) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `lookup_no_spawn_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
