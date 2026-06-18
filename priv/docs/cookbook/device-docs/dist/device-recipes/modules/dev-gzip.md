# dev_gzip Device Test Recipes

Source owner: `~gzip@1.0`

Source module: `codec/dev_gzip.erl`

Category: Codecs And Formats

Test count: 1 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [gzip-round-trip](/recipes/gzip-round-trip.md).

## What The Tests Cover

Compression response decoding and round-trip behavior.

## Recipe Candidates

- Zip and unzip a message body while preserving inspectable headers.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `unzip_encoded_response_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [codec/dev_gzip.erl:71](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_gzip.erl#L71) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
