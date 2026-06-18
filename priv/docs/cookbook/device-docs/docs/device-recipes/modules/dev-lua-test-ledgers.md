# dev_lua_test_ledgers Device Test Recipes

Source owner: `~lua@5.3a`

Source module: `vm/dev_lua_test_ledgers.erl`

Category: Helper for ~lua@5.3a

Test count: 10 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Lua ledger and subledger process examples.

## Recipe Candidates

- Run a Lua ledger transfer, subledger deposit, and subledger-to-subledger transfer.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 1 |
| Not a recipe - disabled | 2 |
| Recipe seed | 7 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `transfer_test_` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [vm/dev_lua_test_ledgers.erl:421](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L421) |
| `transfer_unauthorized_test_` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [vm/dev_lua_test_ledgers.erl:445](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L445) |
| `subledger_deposit_test_` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [vm/dev_lua_test_ledgers.erl:475](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L475) |
| `subledger_transfer_test_` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [vm/dev_lua_test_ledgers.erl:501](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L501) |
| `subledger_registration_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [vm/dev_lua_test_ledgers.erl:560](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L560) |
| `single_subledger_to_subledger_test_` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [vm/dev_lua_test_ledgers.erl:595](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L595) |
| `subledger_to_subledger_test_` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [vm/dev_lua_test_ledgers.erl:639](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L639) |
| `unregistered_peer_transfer_test_` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [vm/dev_lua_test_ledgers.erl:687](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L687) |
| `multischeduler_test_disabled` | Not a recipe - disabled | The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. | [vm/dev_lua_test_ledgers.erl:754](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L754) |
| `comma_separated_scheduler_list_test` | Recipe seed | This is externally observable enough to become a workflow recipe with HTTP steps and an expected result. | [vm/dev_lua_test_ledgers.erl:921](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test_ledgers.erl#L921) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `transfer_unauthorized_test_` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `subledger_registration_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
| `multischeduler_test_disabled` | Not a recipe - disabled: The test is disabled upstream; do not turn it into user documentation until the behavior is re-enabled and deterministic. |
