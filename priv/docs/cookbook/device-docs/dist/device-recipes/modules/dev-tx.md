# dev_tx Device Test Recipes

Source owner: `~tx@1.0`

Source module: `codec/dev_tx.erl`

Category: Codecs And Formats

Test count: 26 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Arweave transaction codec vectors for tags, fields, nested data, and real transaction fixtures.

## Recipe Candidates

- Decode a real Arweave transaction and inspect data/tags/fields.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 5 |
| Not a recipe - disabled | 3 |
| Spec/test vector | 18 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `enforce_valid_tx_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:249](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L249) |
| `happy_tx_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:293](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L293) |
| `data_header_but_no_data_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [codec/dev_tx.erl:337](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L337) |
| `data_tag_with_data_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:388](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L388) |
| `data_tag_no_data_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [codec/dev_tx.erl:431](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L431) |
| `tag_name_case_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:484](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L484) |
| `duplicated_tag_name_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:523](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L523) |
| `tags_and_fields_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:571](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L571) |
| `tags_no_fields_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [codec/dev_tx.erl:699](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L699) |
| `non_conforming_fields_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:807](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L807) |
| `ao_data_key_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:916](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L916) |
| `unsorted_tags_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:940](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L940) |
| `nested_data_tabm_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:964](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L964) |
| `nested_non_data_key_tabm_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1012](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1012) |
| `nested_multiple_tabm_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1060](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1060) |
| `real_basic_data_tx_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1126](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1126) |
| `real_rsa_nested_bundle_tx_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1132](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1132) |
| `real_ecdsa_bundle_tx_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [codec/dev_tx.erl:1147](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1147) |
| `real_ecdsa_single_item_bundle_tx_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [codec/dev_tx.erl:1154](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1154) |
| `real_ecdsa_no_data_tx_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [codec/dev_tx.erl:1160](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1160) |
| `real_ecdsa_data_tx_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1166](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1166) |
| `real_2048_bit_rsa_tx_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1172](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1172) |
| `real_no_data_tx_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [codec/dev_tx.erl:1178](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1178) |
| `bundle_commitment_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1408](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1408) |
| `bundle_uncommitted_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_tx.erl:1470](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1470) |
| `list_aotypes_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [codec/dev_tx.erl:1506](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_tx.erl#L1506) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `enforce_valid_tx_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `happy_tx_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `data_header_but_no_data_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `data_tag_with_data_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `data_tag_no_data_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `tag_name_case_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `duplicated_tag_name_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `tags_and_fields_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `tags_no_fields_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `non_conforming_fields_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `ao_data_key_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `unsorted_tags_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `nested_data_tabm_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `nested_non_data_key_tabm_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `nested_multiple_tabm_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `real_basic_data_tx_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `real_rsa_nested_bundle_tx_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `real_ecdsa_bundle_tx_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
| `real_ecdsa_single_item_bundle_tx_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
| `real_ecdsa_no_data_tx_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `real_ecdsa_data_tx_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `real_2048_bit_rsa_tx_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `real_no_data_tx_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `bundle_commitment_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `bundle_uncommitted_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `list_aotypes_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
