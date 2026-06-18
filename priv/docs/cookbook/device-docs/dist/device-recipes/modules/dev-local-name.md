# dev_local_name Device Test Recipes

Source owner: `~local-name@1.0`

Source module: `name/dev_local_name.erl`

Category: Foundations

Test count: 5 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: None yet.

## What The Tests Cover

Node-local name lookup, registration, authorization, and HTTP access.

## Recipe Candidates

- Register a local name, resolve it over HTTP, and observe authorization failures.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Guardrail, not standalone | 2 |
| Operator recipe seed | 3 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `no_names_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [name/dev_local_name.erl:131](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_local_name.erl#L131) |
| `lookup_opts_name_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_local_name.erl:137](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_local_name.erl#L137) |
| `register_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_local_name.erl:147](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_local_name.erl#L147) |
| `unauthorized_test` | Guardrail, not standalone | This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. | [name/dev_local_name.erl:167](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_local_name.erl#L167) |
| `http_test` | Operator recipe seed | This is viable as an operator workflow on a node the reader controls, with safety notes for configuration, hooks, secrets, or policy. | [name/dev_local_name.erl:181](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/name/dev_local_name.erl#L181) |

## Tests Not Promoted To Standalone Recipes

| Test | Reason |
|---|---|
| `no_names_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
| `unauthorized_test` | Guardrail, not standalone: This is useful as an expected failure or safety assertion inside another recipe, but it is not a positive user workflow by itself. |
