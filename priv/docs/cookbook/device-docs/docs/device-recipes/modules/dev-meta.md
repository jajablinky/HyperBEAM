# dev_meta Device Test Recipes

Source owner: `~meta@1.0`

Source module: `node/dev_meta.erl`

Category: Foundations

Test count: 11 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [check-node-readiness](/recipes/check-node-readiness.md), [trusted-custom-device](/recipes/trusted-custom-device.md).

## What The Tests Cover

Node info/config, node message mutation, request/response hooks, and build info.

## Recipe Candidates

- Read node config/build info and install request/response hooks on a private node.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 2 |
| Operator recipe seed | 9 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `config_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:483](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L483) |
| `priv_inaccessible_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:493](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L493) |
| `unauthorized_set_node_msg_fails_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [node/dev_meta.erl:507](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L507) |
| `authorized_set_node_msg_succeeds_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:531](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L531) |
| `uninitialized_node_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [node/dev_meta.erl:560](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L560) |
| `permanent_node_message_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:567](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L567) |
| `claim_node_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:614](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L614) |
| `request_response_hooks_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:660](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L660) |
| `halt_request_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:703](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L703) |
| `modify_request_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:723](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L723) |
| `buildinfo_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_meta.erl:756](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_meta.erl#L756) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `unauthorized_set_node_msg_fails_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `uninitialized_node_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
