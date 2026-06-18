# dev_ans104 Device Test Recipes

Source owner: `~ans104@1.0`

Source module: `codec/dev_ans104.erl`

Category: Codecs And Formats

Test count: 24 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: [bundle-data-locally](/recipes/bundle-data-locally.md).

## What The Tests Cover

ANS-104 serialization, signing, target/tag normalization, and bundle commitments.

## Recipe Candidates

- Commit a message as ANS-104, serialize it, and verify the bundle commitment.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Spec/test vector | 24 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `normal_tags_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:173](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L173) |
| `from_maintains_tag_name_case_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:184](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L184) |
| `restore_tag_name_case_from_cache_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:200](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L200) |
| `unsigned_duplicated_tag_name_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:229](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L229) |
| `signed_duplicated_tag_name_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:242](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L242) |
| `simple_to_conversion_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:256](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L256) |
| `external_item_with_target_field_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:272](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L272) |
| `generate_item_with_target_tag_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:305](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L305) |
| `generate_item_with_target_field_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:331](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L331) |
| `type_tag_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:358](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L358) |
| `ao_data_key_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:373](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L373) |
| `simple_signed_to_httpsig_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:391](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L391) |
| `unsorted_tag_map_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:425](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L425) |
| `field_and_tag_ordering_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:446](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L446) |
| `fields_as_tags_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:457](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L457) |
| `data_tag_with_data_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:480](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L480) |
| `unsigned_lowercase_bundle_map_tags_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:499](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L499) |
| `unsigned_mixedcase_bundle_list_tags_1_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:524](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L524) |
| `unsigned_mixedcase_bundle_list_tags_2_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:571](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L571) |
| `unsigned_mixedcase_bundle_map_tags_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:618](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L618) |
| `signed_lowercase_bundle_map_tags_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:668](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L668) |
| `signed_mixedcase_bundle_map_tags_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:716](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L716) |
| `bundle_commitment_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:782](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L782) |
| `bundle_uncommitted_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_ans104.erl:846](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_ans104.erl#L846) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `normal_tags_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `from_maintains_tag_name_case_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `restore_tag_name_case_from_cache_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `unsigned_duplicated_tag_name_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `signed_duplicated_tag_name_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `simple_to_conversion_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `external_item_with_target_field_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `generate_item_with_target_tag_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `generate_item_with_target_field_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `type_tag_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `ao_data_key_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `simple_signed_to_httpsig_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `unsorted_tag_map_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `field_and_tag_ordering_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `fields_as_tags_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `data_tag_with_data_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `unsigned_lowercase_bundle_map_tags_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `unsigned_mixedcase_bundle_list_tags_1_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `unsigned_mixedcase_bundle_list_tags_2_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `unsigned_mixedcase_bundle_map_tags_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `signed_lowercase_bundle_map_tags_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `signed_mixedcase_bundle_map_tags_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `bundle_commitment_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `bundle_uncommitted_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
