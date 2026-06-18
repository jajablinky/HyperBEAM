# dev_hyperbuddy Device Test Recipes

Source owner: `~hyperbuddy@1.0`

Source module: `node/dev_hyperbuddy.erl`

Category: Foundations

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [check-node-readiness](/recipes/check-node-readiness.md).

## What The Tests Cover

Human-readable formatting and custom JSON template rendering.

## Recipe Candidates

- Render a message through HyperBuddy templates and custom JSON.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `return_templated_file_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_hyperbuddy.erl:181](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_hyperbuddy.erl#L181) |
| `return_custom_json_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_hyperbuddy.erl:195](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_hyperbuddy.erl#L195) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
