# dev_profile Device Test Recipes

Source owner: `~profile@1.0`

Source module: `node/dev_profile.erl`

Category: Node Operations

Test count: 4 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Operator profiling via eprof and eflame.

## Recipe Candidates

- Profile a private node path with eprof or eflame.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 4 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `eprof_fun_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_profile.erl:321](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_profile.erl#L321) |
| `eprof_resolution_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_profile.erl:322](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_profile.erl#L322) |
| `eflame_fun_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_profile.erl:325](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_profile.erl#L325) |
| `eflame_resolution_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_profile.erl:326](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_profile.erl#L326) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
