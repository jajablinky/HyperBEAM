# dev_auth_hook Device Test Recipes

Source owner: `~auth-hook@1.0`

Source module: `auth/dev_auth_hook.erl`

Category: Auth And Access

Test count: 4 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Operator-controlled request hooks that add cookie or HTTP-auth commitments before resolution.

## Recipe Candidates

- Attach cookie or HTTP-auth commitments through a request hook.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 4 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `cookie_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_auth_hook.erl:441](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_auth_hook.erl#L441) |
| `http_auth_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_auth_hook.erl:502](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_auth_hook.erl#L502) |
| `chained_preprocess_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_auth_hook.erl:577](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_auth_hook.erl#L577) |
| `when_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_auth_hook.erl:632](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_auth_hook.erl#L632) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
