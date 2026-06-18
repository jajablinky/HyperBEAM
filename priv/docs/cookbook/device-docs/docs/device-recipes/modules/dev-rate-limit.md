# dev_rate_limit Device Test Recipes

Source owner: `~rate-limit@1.0`

Source module: `node/dev_rate_limit.erl`

Category: Node Operations

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Operator IP rate limiting and reset behavior.

## Recipe Candidates

- Apply and reset rate limits on repeated client requests.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `rate_limit_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_rate_limit.erl:209](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_rate_limit.erl#L209) |
| `rate_limit_reset_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_rate_limit.erl:238](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_rate_limit.erl#L238) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
