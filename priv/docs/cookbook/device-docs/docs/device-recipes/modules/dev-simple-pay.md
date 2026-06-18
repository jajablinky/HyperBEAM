# dev_simple_pay Device Test Recipes

Source owner: `~simple-pay@1.0`

Source module: `payment/dev_simple_pay.erl`

Category: Payment And Metering

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [paid-device-access](/recipes/paid-device-access.md).

## What The Tests Cover

Flat ledger top-ups, balances, and price application.

## Recipe Candidates

- Top up and read a simple ledger balance, then apply flat price policy.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `get_balance_and_top_up_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_simple_pay.erl:330](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_simple_pay.erl#L330) |
| `apply_price_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_simple_pay.erl:379](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_simple_pay.erl#L379) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
