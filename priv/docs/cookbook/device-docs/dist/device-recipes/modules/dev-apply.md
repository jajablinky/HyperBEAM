# dev_apply Device Test Recipes

Source owner: `~apply@1.0`

Source module: `util/dev_apply.erl`

Category: Compute, Processes, And Composition

Test count: 5 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Resolution helpers that apply keys or key pairs to messages.

## Recipe Candidates

- Apply a key or key pair to a message over HTTP.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Recipe seed | 5 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `resolve_key_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [util/dev_apply.erl:201](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_apply.erl#L201) |
| `resolve_pair_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [util/dev_apply.erl:214](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_apply.erl#L214) |
| `reverse_resolve_pair_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [util/dev_apply.erl:229](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_apply.erl#L229) |
| `resolve_with_prefix_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [util/dev_apply.erl:241](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_apply.erl#L241) |
| `apply_over_http_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [util/dev_apply.erl:257](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_apply.erl#L257) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
