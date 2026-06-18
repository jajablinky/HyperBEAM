# dev_p4 Device Test Recipes

Source owner: `~p4@1.0`

Source module: `payment/dev_p4.erl`

Category: Payment And Metering

Test count: 3 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [paid-device-access](/recipes/paid-device-access.md).

## What The Tests Cover

Payment route behavior and ledger integration.

## Recipe Candidates

- Estimate a route price, check non-chargeable routes, and read ledger state.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `faff_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_p4.erl:344](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_p4.erl#L344) |
| `non_chargable_route_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_p4.erl:369](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_p4.erl#L369) |
| `hyper_token_ledger_test_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_p4.erl:419](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_p4.erl#L419) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
