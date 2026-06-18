# dev_flat Device Test Recipes

Source owner: `~flat@1.0`

Source module: `codec/dev_flat.erl`

Category: Codecs And Formats

Test count: 7 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Flattening and expanding nested messages into path-keyed maps.

## Recipe Candidates

- Flatten nested message data for path-style transport and expand it back.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Spec/test vector | 7 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `simple_conversion_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_flat.erl:137](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_flat.erl#L137) |
| `nested_conversion_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_flat.erl:143](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_flat.erl#L143) |
| `multiple_paths_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_flat.erl:151](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_flat.erl#L151) |
| `path_list_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_flat.erl:167](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_flat.erl#L167) |
| `binary_passthrough_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_flat.erl:184](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_flat.erl#L184) |
| `deep_nesting_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_flat.erl:189](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_flat.erl#L189) |
| `empty_map_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_flat.erl:197](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_flat.erl#L197) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `simple_conversion_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `nested_conversion_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `multiple_paths_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `path_list_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `binary_passthrough_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `deep_nesting_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `empty_map_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
