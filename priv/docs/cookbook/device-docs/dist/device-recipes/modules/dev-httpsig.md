# dev_httpsig Device Test Recipes

Source owner: `~httpsig@1.0`

Source module: `codec/dev_httpsig.erl`

Category: Codecs And Formats

Test count: 5 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

HTTP signature commitments, linked commitments, and ID derivation.

## Recipe Candidates

- Commit a message with HTTP signatures and verify IDs/linked commitments.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Recipe seed | 5 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `validate_large_message_from_http_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [codec/dev_httpsig.erl:561](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_httpsig.erl#L561) |
| `committed_id_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [codec/dev_httpsig.erl:599](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_httpsig.erl#L599) |
| `commit_secret_key_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [codec/dev_httpsig.erl:610](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_httpsig.erl#L610) |
| `multicommitted_id_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [codec/dev_httpsig.erl:643](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_httpsig.erl#L643) |
| `sign_and_verify_link_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [codec/dev_httpsig.erl:662](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_httpsig.erl#L662) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
