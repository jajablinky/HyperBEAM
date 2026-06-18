# dev_http_auth Device Test Recipes

Source owner: `~http-auth@1.0`

Source module: `auth/dev_http_auth.erl`

Category: Auth And Access

Test count: 1 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

PBKDF2 password cost and HTTP Basic authentication helper behavior.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - benchmark/stress | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `benchmark_pbkdf2_test` | Not a recipe - benchmark/stress | This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. | [auth/dev_http_auth.erl:167](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_http_auth.erl#L167) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `benchmark_pbkdf2_test` | Not a recipe - benchmark/stress: This measures throughput, concurrency, restart, corruption, or timing behavior rather than a user-level workflow. |
