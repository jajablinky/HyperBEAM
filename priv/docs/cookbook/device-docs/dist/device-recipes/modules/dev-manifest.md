# dev_manifest Device Test Recipes

Source owner: `~manifest@1.0`

Source module: `arweave/dev_manifest.erl`

Category: Codecs And Formats

Test count: 6 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Arweave path manifest resolution, redirects, and fallbacks.

## Recipe Candidates

- Resolve an Arweave manifest path, default fallback, 404, and inner redirect.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 2 |
| Recipe seed | 4 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `resolve_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [arweave/dev_manifest.erl:210](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_manifest.erl#L210) |
| `manifest_default_fallback_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [arweave/dev_manifest.erl:270](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_manifest.erl#L270) |
| `manifest_404_error_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_manifest.erl:281](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_manifest.erl#L281) |
| `manifest_inner_redirect_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [arweave/dev_manifest.erl:353](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_manifest.erl#L353) |
| `access_key_path_in_manifest_test_parallel` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [arweave/dev_manifest.erl:367](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_manifest.erl#L367) |
| `manifest_should_fallback_on_not_found_path_test_parallel` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [arweave/dev_manifest.erl:381](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/arweave/dev_manifest.erl#L381) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `manifest_404_error_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `manifest_should_fallback_on_not_found_path_test_parallel` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
