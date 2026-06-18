# dev_httpsig_siginfo Device Test Recipes

Source owner: `~httpsig@1.0`

Source module: `codec/dev_httpsig_siginfo.erl`

Category: Helper for ~httpsig@1.0

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Signature-Input parser edge cases.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Spec/test vector | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `parse_alg_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_httpsig_siginfo.erl:526](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_httpsig_siginfo.erl#L526) |
| `escaped_value_test` | Spec/test vector | Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. | [codec/dev_httpsig_siginfo.erl:546](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/codec/dev_httpsig_siginfo.erl#L546) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `parse_alg_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
| `escaped_value_test` | Spec/test vector: Keep this as a deterministic codec or data-structure vector; it can feed expected results but should not be a standalone user workflow. |
