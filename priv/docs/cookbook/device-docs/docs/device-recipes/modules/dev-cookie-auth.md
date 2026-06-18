# dev_cookie_auth Device Test Recipes

Source owner: `~cookie@1.0`

Source module: `auth/dev_cookie_auth.erl`

Category: Helper for ~cookie@1.0

Test count: 2 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Cookie-backed HTTP auth and commitment verification.

## Recipe Candidates

- Set a cookie, send it back, and verify the committed session message.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 2 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `directly_invoke_commit_verify_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_cookie_auth.erl:207](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_cookie_auth.erl#L207) |
| `http_set_get_cookies_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_cookie_auth.erl:233](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_cookie_auth.erl#L233) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
