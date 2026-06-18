# dev_lua_test Device Test Recipes

Source owner: `~lua@5.3a`

Source module: `vm/dev_lua_test.erl`

Category: Helper for ~lua@5.3a

Test count: 1 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: No standalone recipes.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Shared Lua test fixture execution.

## Recipe Candidates

- No standalone user-level recipe is recommended for this module. Keep the tests as internal/spec traceability under the owning device.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Not a recipe - internal support | 1 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `exec_test_` | Not a recipe - internal support | The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. | [vm/dev_lua_test.erl:93](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/vm/dev_lua_test.erl#L93) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `exec_test_` | Not a recipe - internal support: The module is a helper/storage/server layer for a root device; document the owning device workflow instead of exposing the helper as a user recipe. |
