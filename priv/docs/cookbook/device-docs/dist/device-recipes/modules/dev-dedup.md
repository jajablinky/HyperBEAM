# dev_dedup Device Test Recipes

Source owner: `~dedup@1.0`

Source module: `util/dev_dedup.erl`

Category: Compute, Processes, And Composition

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Duplicate suppression during device composition.

## Recipe Candidates

- Turn the `dev_dedup` externally observable positive tests into one or more HTTP workflows.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Recipe seed | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `dedup_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [util/dev_dedup.erl:138](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_dedup.erl#L138) |
| `dedup_with_multipass_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [util/dev_dedup.erl:169](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_dedup.erl#L169) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
