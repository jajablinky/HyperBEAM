# Test-Derived Recipe Matrix

Source: `permaweb/HyperBEAM` branch `edge` at `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`. Scope: unique zero-arity or suite-style tests in `src/preloaded/dev_*.erl`.

## Overall Outcome Counts

| Outcome | Count |
|---|---:|
| Advanced recipe seed | 17 |
| Existing recipe overlap | 164 |
| Guardrail, not standalone | 45 |
| Not a recipe - benchmark/stress | 20 |
| Not a recipe - disabled | 10 |
| Not a recipe - internal support | 31 |
| Not a recipe - test harness | 3 |
| Operator recipe seed | 81 |
| Recipe seed | 34 |
| Spec/test vector | 101 |

## Module Rollup

| Module | Owner | Total | Outcomes |
|---|---|---:|---|
| [`dev_ans104`](modules/dev-ans104.md) | `~ans104@1.0` | 24 | Spec/test vector: 24 |
| [`dev_apply`](modules/dev-apply.md) | `~apply@1.0` | 5 | Recipe seed: 5 |
| [`dev_arweave`](modules/dev-arweave.md) | `~arweave@2.9` | 39 | Existing recipe overlap: 29, Guardrail, not standalone: 3, Not a recipe - disabled: 2, Not a recipe - internal support: 5 |
| [`dev_arweave_offset`](modules/dev-arweave-offset.md) | `~arweave@2.9` | 4 | Spec/test vector: 4 |
| [`dev_auth_hook`](modules/dev-auth-hook.md) | `~auth-hook@1.0` | 4 | Operator recipe seed: 4 |
| [`dev_b32_name`](modules/dev-b32-name.md) | `~b32-name@1.0` | 1 | Recipe seed: 1 |
| [`dev_blacklist`](modules/dev-blacklist.md) | `~blacklist@1.0` | 8 | Guardrail, not standalone: 1, Not a recipe - benchmark/stress: 1, Operator recipe seed: 6 |
| [`dev_bundler`](modules/dev-bundler.md) | `~bundler@1.0` | 26 | Existing recipe overlap: 13, Guardrail, not standalone: 9, Not a recipe - benchmark/stress: 3, Not a recipe - internal support: 1 |
| [`dev_bundler_cache`](modules/dev-bundler-cache.md) | `~bundler@1.0` | 6 | Not a recipe - internal support: 6 |
| [`dev_bundler_recovery`](modules/dev-bundler-recovery.md) | `~bundler@1.0` | 3 | Not a recipe - internal support: 3 |
| [`dev_bundler_task`](modules/dev-bundler-task.md) | `~bundler@1.0` | 4 | Not a recipe - internal support: 4 |
| [`dev_cache`](modules/dev-cache.md) | `~cache@1.0` | 2 | Operator recipe seed: 2 |
| [`dev_cookie_auth`](modules/dev-cookie-auth.md) | `~cookie@1.0` | 2 | Operator recipe seed: 2 |
| [`dev_cookie_test_vectors`](modules/dev-cookie-test-vectors.md) | `~cookie@1.0` | 33 | Guardrail, not standalone: 4, Spec/test vector: 29 |
| [`dev_copycat_arweave`](modules/dev-copycat-arweave.md) | `~copycat@1.0` | 18 | Existing recipe overlap: 13, Guardrail, not standalone: 4, Not a recipe - disabled: 1 |
| [`dev_copycat_graphql`](modules/dev-copycat-graphql.md) | `~copycat@1.0` | 9 | Recipe seed: 9 |
| [`dev_cron`](modules/dev-cron.md) | `~cron@1.0` | 4 | Existing recipe overlap: 4 |
| [`dev_dedup`](modules/dev-dedup.md) | `~dedup@1.0` | 2 | Recipe seed: 2 |
| [`dev_flat`](modules/dev-flat.md) | `~flat@1.0` | 7 | Spec/test vector: 7 |
| [`dev_genesis_wasm`](modules/dev-genesis-wasm.md) | `~genesis-wasm@1.0` | 6 | Advanced recipe seed: 6 |
| [`dev_gzip`](modules/dev-gzip.md) | `~gzip@1.0` | 1 | Existing recipe overlap: 1 |
| [`dev_http_auth`](modules/dev-http-auth.md) | `~http-auth@1.0` | 1 | Not a recipe - benchmark/stress: 1 |
| [`dev_httpsig`](modules/dev-httpsig.md) | `~httpsig@1.0` | 5 | Recipe seed: 5 |
| [`dev_httpsig_conv`](modules/dev-httpsig-conv.md) | `~httpsig@1.0` | 3 | Spec/test vector: 3 |
| [`dev_httpsig_siginfo`](modules/dev-httpsig-siginfo.md) | `~httpsig@1.0` | 2 | Spec/test vector: 2 |
| [`dev_hyperbuddy`](modules/dev-hyperbuddy.md) | `~hyperbuddy@1.0` | 2 | Operator recipe seed: 2 |
| [`dev_json`](modules/dev-json.md) | `~json@1.0` | 2 | Existing recipe overlap: 2 |
| [`dev_json_iface`](modules/dev-json-iface.md) | `~json-iface@1.0` | 2 | Advanced recipe seed: 1, Not a recipe - benchmark/stress: 1 |
| [`dev_local_name`](modules/dev-local-name.md) | `~local-name@1.0` | 5 | Guardrail, not standalone: 2, Operator recipe seed: 3 |
| [`dev_location`](modules/dev-location.md) | `~location@1.0` | 3 | Operator recipe seed: 3 |
| [`dev_lua`](modules/dev-lua.md) | `~lua@5.3a` | 17 | Existing recipe overlap: 12, Guardrail, not standalone: 2, Not a recipe - benchmark/stress: 3 |
| [`dev_lua_test`](modules/dev-lua-test.md) | `~lua@5.3a` | 1 | Not a recipe - internal support: 1 |
| [`dev_lua_test_ledgers`](modules/dev-lua-test-ledgers.md) | `~lua@5.3a` | 10 | Guardrail, not standalone: 1, Not a recipe - disabled: 2, Recipe seed: 7 |
| [`dev_manifest`](modules/dev-manifest.md) | `~manifest@1.0` | 6 | Guardrail, not standalone: 2, Recipe seed: 4 |
| [`dev_message`](modules/dev-message.md) | `~message@1.0` | 14 | Existing recipe overlap: 13, Guardrail, not standalone: 1 |
| [`dev_meta`](modules/dev-meta.md) | `~meta@1.0` | 11 | Guardrail, not standalone: 2, Operator recipe seed: 9 |
| [`dev_metering`](modules/dev-metering.md) | `~metering@1.0` | 5 | Existing recipe overlap: 5 |
| [`dev_multipass`](modules/dev-multipass.md) | `~multipass@1.0` | 1 | Recipe seed: 1 |
| [`dev_name`](modules/dev-name.md) | `~name@1.0` | 10 | Guardrail, not standalone: 2, Operator recipe seed: 8 |
| [`dev_node_process`](modules/dev-node-process.md) | `~node-process@1.0` | 3 | Guardrail, not standalone: 1, Operator recipe seed: 2 |
| [`dev_p4`](modules/dev-p4.md) | `~p4@1.0` | 3 | Existing recipe overlap: 3 |
| [`dev_patch`](modules/dev-patch.md) | `~patch@1.0` | 5 | Existing recipe overlap: 4, Guardrail, not standalone: 1 |
| [`dev_process_cache`](modules/dev-process-cache.md) | `~process@1.0` | 1 | Not a recipe - internal support: 1 |
| [`dev_process_worker`](modules/dev-process-worker.md) | `~process@1.0` | 3 | Not a recipe - internal support: 3 |
| [`dev_profile`](modules/dev-profile.md) | `~profile@1.0` | 4 | Operator recipe seed: 4 |
| [`dev_push`](modules/dev-push.md) | `~push@1.0` | 3 | Existing recipe overlap: 2, Not a recipe - disabled: 1 |
| [`dev_query`](modules/dev-query.md) | `~query@1.0` | 8 | Existing recipe overlap: 8 |
| [`dev_query_graphql`](modules/dev-query-graphql.md) | `~query@1.0` | 3 | Existing recipe overlap: 2, Guardrail, not standalone: 1 |
| [`dev_query_test_vectors`](modules/dev-query-test-vectors.md) | `~query@1.0` | 18 | Existing recipe overlap: 17, Guardrail, not standalone: 1 |
| [`dev_rate_limit`](modules/dev-rate-limit.md) | `~rate-limit@1.0` | 2 | Operator recipe seed: 2 |
| [`dev_recorder`](modules/dev-recorder.md) | `~recorder@1.0` | 6 | Existing recipe overlap: 6 |
| [`dev_relay`](modules/dev-relay.md) | `~relay@1.0` | 3 | Existing recipe overlap: 3 |
| [`dev_router`](modules/dev-router.md) | `~router@1.0` | 22 | Not a recipe - benchmark/stress: 1, Operator recipe seed: 21 |
| [`dev_scheduler`](modules/dev-scheduler.md) | `~scheduler@1.0` | 16 | Existing recipe overlap: 14, Not a recipe - benchmark/stress: 1, Not a recipe - disabled: 1 |
| [`dev_scheduler_cache`](modules/dev-scheduler-cache.md) | `~scheduler@1.0` | 8 | Not a recipe - benchmark/stress: 6, Not a recipe - internal support: 2 |
| [`dev_scheduler_registry`](modules/dev-scheduler-registry.md) | `~scheduler@1.0` | 4 | Not a recipe - internal support: 4 |
| [`dev_scheduler_server`](modules/dev-scheduler-server.md) | `~scheduler@1.0` | 2 | Not a recipe - benchmark/stress: 1, Not a recipe - internal support: 1 |
| [`dev_secret`](modules/dev-secret.md) | `~secret@1.0` | 12 | Operator recipe seed: 12 |
| [`dev_simple_pay`](modules/dev-simple-pay.md) | `~simple-pay@1.0` | 2 | Existing recipe overlap: 2 |
| [`dev_stack`](modules/dev-stack.md) | `~stack@1.0` | 15 | Existing recipe overlap: 11, Guardrail, not standalone: 3, Not a recipe - benchmark/stress: 1 |
| [`dev_structured`](modules/dev-structured.md) | `~structured@1.0` | 1 | Spec/test vector: 1 |
| [`dev_test`](modules/dev-test.md) | `~test-device@1.0` | 3 | Not a recipe - test harness: 3 |
| [`dev_trie`](modules/dev-trie.md) | `~trie@1.0` | 12 | Spec/test vector: 12 |
| [`dev_trie_props`](modules/dev-trie-props.md) | `~trie@1.0` | 1 | Spec/test vector: 1 |
| [`dev_tx`](modules/dev-tx.md) | `~tx@1.0` | 26 | Guardrail, not standalone: 5, Not a recipe - disabled: 3, Spec/test vector: 18 |
| [`dev_wasi`](modules/dev-wasi.md) | `~wasi@1.0` | 3 | Advanced recipe seed: 3 |
| [`dev_wasm`](modules/dev-wasm.md) | `~wasm-64@1.0` | 8 | Advanced recipe seed: 7, Not a recipe - benchmark/stress: 1 |
| [`dev_whois`](modules/dev-whois.md) | `~whois@1.0` | 1 | Operator recipe seed: 1 |
