# dev_whois Device Test Recipes

Source owner: `~whois@1.0`

Source module: `node/dev_whois.erl`

Category: Node Operations

Test count: 1 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [check-node-readiness](/recipes/check-node-readiness.md).

## What The Tests Cover

Self identity lookup.

## Recipe Candidates

- Ask the node who handled the request.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `find_self_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [node/dev_whois.erl:53](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_whois.erl#L53) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
