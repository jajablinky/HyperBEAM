# dev_recorder Device Test Recipes

Source owner: `~recorder@1.0`

Source module: `debug/dev_recorder.erl`

Category: Support And Test

Test count: 6 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [recorder-debug-flight](/recipes/recorder-debug-flight.md).

## What The Tests Cover

Recording, landing, redaction, and recorder hook installation.

## Recipe Candidates

- Record a short request flight and verify private data redaction.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 6 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `take_off_land_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [debug/dev_recorder.erl:724](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/debug/dev_recorder.erl#L724) |
| `land_defaults_to_html_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [debug/dev_recorder.erl:738](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/debug/dev_recorder.erl#L738) |
| `ao_take_off_land_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [debug/dev_recorder.erl:745](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/debug/dev_recorder.erl#L745) |
| `maybe_append_records_started_event_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [debug/dev_recorder.erl:757](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/debug/dev_recorder.erl#L757) |
| `private_data_redacted_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [debug/dev_recorder.erl:780](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/debug/dev_recorder.erl#L780) |
| `record_installs_hook_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [debug/dev_recorder.erl:840](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/debug/dev_recorder.erl#L840) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
