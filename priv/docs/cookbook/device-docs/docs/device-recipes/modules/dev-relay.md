# dev_relay Device Test Recipes

Source owner: `~relay@1.0`

Source module: `util/dev_relay.erl`

Category: Foundations

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [relay-fetch-transform](/recipes/relay-fetch-transform.md).

## What The Tests Cover

HTTP relay calls, nearest relay selection, and committed relay requests.

## Recipe Candidates

- Relay a local or remote HTTP path and serialize the returned message.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `call_get_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_relay.erl:191](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_relay.erl#L191) |
| `relay_nearest_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_relay.erl:205](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_relay.erl#L205) |
| `commit_request_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [util/dev_relay.erl:260](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/util/dev_relay.erl#L260) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
