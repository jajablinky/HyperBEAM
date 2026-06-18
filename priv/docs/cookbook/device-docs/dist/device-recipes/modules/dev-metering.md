# dev_metering Device Test Recipes

Source owner: `~metering@1.0`

Source module: `payment/dev_metering.erl`

Category: Payment And Metering

Test count: 5 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [paid-device-access](/recipes/paid-device-access.md).

## What The Tests Cover

Resource metering and P4 charge accounting.

## Recipe Candidates

- Meter reductions and charge through P4 response accounting.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 5 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `inactive_meter_noop_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_metering.erl:118](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_metering.erl#L118) |
| `consume_price_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_metering.erl:124](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_metering.erl#L124) |
| `consume_is_not_device_key_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_metering.erl:138](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_metering.erl#L138) |
| `beam_reductions_price_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_metering.erl:155](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_metering.erl#L155) |
| `p4_response_charge_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [payment/dev_metering.erl:170](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/payment/dev_metering.erl#L170) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
