# dev_secret Device Test Recipes

Source owner: `~secret@1.0`

Source module: `auth/dev_secret.erl`

Category: Auth And Access

Test count: 12 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Node-hosted wallets, import/export, cookie-wallet commitment, and wallet sync.

## Recipe Candidates

- Generate, list, import, export, and sync node-hosted wallets on a private node.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Operator recipe seed | 12 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `client_persist_generate_and_verify_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:810](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L810) |
| `cookie_wallet_generate_and_verify_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:817](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L817) |
| `non_volatile_persist_generate_and_verify_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:824](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L824) |
| `import_wallet_with_key_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:831](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L831) |
| `list_wallets_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:853](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L853) |
| `commit_with_cookie_wallet_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:885](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L885) |
| `export_wallet_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:905](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L905) |
| `export_non_volatile_wallet_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:936](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L936) |
| `export_individual_batch_wallets_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:967](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L967) |
| `export_batch_all_wallets_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:1052](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L1052) |
| `sync_wallets_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:1108](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L1108) |
| `sync_non_volatile_wallets_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [auth/dev_secret.erl:1142](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/auth/dev_secret.erl#L1142) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
