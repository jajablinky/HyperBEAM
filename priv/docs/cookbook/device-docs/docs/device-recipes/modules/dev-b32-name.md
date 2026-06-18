# dev_b32_name Device Test Recipes

Source owner: `~b32-name@1.0`

Source module: `name/dev_b32_name.erl`

Category: Foundations

Test count: 1 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Base32 hostname/name resolution.

## Recipe Candidates

- Turn the `dev_b32_name` externally observable positive tests into one or more HTTP workflows.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Recipe seed | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `dev_b32_name_test_` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [name/dev_b32_name.erl:47](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_b32_name.erl#L47) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
