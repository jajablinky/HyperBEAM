# dev_json Device Test Recipes

Source owner: `~json@1.0`

Source module: `codec/dev_json.erl`

Category: Codecs And Formats

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [arweave-json-to-lua](/recipes/arweave-json-to-lua.md), [message-to-json-pipe](/recipes/message-to-json-pipe.md), [relay-fetch-transform](/recipes/relay-fetch-transform.md).

## What The Tests Cover

JSON deserialization and typed key handling.

## Recipe Candidates

- Serialize a typed message to JSON and deserialize JSON into message fields.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `decode_with_atom_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [codec/dev_json.erl:142](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_json.erl#L142) |
| `deeply_nested_typed_keys_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [codec/dev_json.erl:159](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_json.erl#L159) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
