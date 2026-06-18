# dev_location Device Test Recipes

Source owner: `~location@1.0`

Source module: `node/dev_location.erl`

Category: Node Operations

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Scheduler/peer location registration and boot behavior.

## Recipe Candidates

- Register scheduler locations and read node location idempotently.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `register_scheduler_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_location.erl:403](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_location.erl#L403) |
| `unsigned_get_node_is_idempotent_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_location.erl:422](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_location.erl#L422) |
| `register_location_on_boot_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_location.erl:450](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_location.erl#L450) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
