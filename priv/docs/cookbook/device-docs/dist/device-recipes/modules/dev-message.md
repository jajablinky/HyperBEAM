# dev_message Device Test Recipes

Source owner: `~message@1.0`

Source module: `message/dev_message.erl`

Category: Foundations

Test count: 14 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [message-to-json-pipe](/recipes/message-to-json-pipe.md).

## What The Tests Cover

Field access, private field filtering, set/unset/remove operations, verification, and linked fields.

## Recipe Candidates

- Read, set, unset, remove, and verify message fields.
- Show private field filtering and linked nested fields.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 13 |
| Guardrail, not standalone | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `get_keys_mod_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:873](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L873) |
| `is_private_mod_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:876](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L876) |
| `keys_from_device_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:883](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L883) |
| `case_insensitive_get_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:886](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L886) |
| `private_keys_are_filtered_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:892](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L892) |
| `cannot_get_private_keys_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [message/dev_message.erl:902](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L902) |
| `key_from_device_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:912](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L912) |
| `remove_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:915](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L915) |
| `set_conflicting_keys_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:932](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L932) |
| `unset_with_set_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:938](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L938) |
| `deep_unset_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:944](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L944) |
| `set_ignore_undefined_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:970](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L970) |
| `verify_test_` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:976](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L976) |
| `set_nested_link_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [message/dev_message.erl:1008](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/message/dev_message.erl#L1008) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `cannot_get_private_keys_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
