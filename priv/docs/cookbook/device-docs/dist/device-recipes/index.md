# Device Recipes

This corpus evaluates HyperBEAM device tests as recipe source material. It is based on `permaweb/HyperBEAM` `edge` at commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3` and the Friday 2026-06-12 call about using tests, specs, and recipes as a shared source of truth.

The result is deliberately split from the curated cookbook in `docs/recipes/`. Curated recipes stay intent-first. This section is the traceability layer that shows which upstream tests can seed recipes and which tests should not become user-level workflows.

## Bottom Line

- Total scanned tests: 506 across 68 modules.
- Recipe-like or existing recipe overlap: 296.
- Not standalone user recipes: 210.
- Viability: partial. The corpus can produce many strong device workflows, but a one-test-one-recipe conversion would create noisy docs and expose internal test harness behavior.

## Read First

- [Evaluation against existing recipes](evaluation.md)
- [Device recipe format](recipe-format.md)
- [Final example workflows](examples/index.md)
- [Test-derived recipe matrix](test-matrix.md)
- [Tests that are not user-level recipes](non-user-workflows.md)
- [Module test matrix](modules/index.md)

## How To Use This Corpus

For each module page, start with the recipe candidates and outcome summary. Promote only `Recipe seed`, `Existing recipe overlap`, `Operator recipe seed`, or `Advanced recipe seed` entries into human-facing recipes. Keep `Spec/test vector`, `Guardrail, not standalone`, `Not a recipe - internal support`, `Not a recipe - benchmark/stress`, `Not a recipe - disabled`, and `Not a recipe - test harness` entries in conformance or implementation notes.

## Module Pages

| Module | Owner | Tests | Recipe-like | Not standalone | Viability |
|---|---|---:|---:|---:|---|
| [`dev_ans104`](modules/dev-ans104.md) | `~ans104@1.0` | 24 | 0 | 24 | No standalone recipes |
| [`dev_apply`](modules/dev-apply.md) | `~apply@1.0` | 5 | 5 | 0 | High |
| [`dev_arweave`](modules/dev-arweave.md) | `~arweave@2.9` | 39 | 29 | 10 | High |
| [`dev_arweave_offset`](modules/dev-arweave-offset.md) | `~arweave@2.9` | 4 | 0 | 4 | No standalone recipes |
| [`dev_auth_hook`](modules/dev-auth-hook.md) | `~auth-hook@1.0` | 4 | 4 | 0 | High |
| [`dev_b32_name`](modules/dev-b32-name.md) | `~b32-name@1.0` | 1 | 1 | 0 | High |
| [`dev_blacklist`](modules/dev-blacklist.md) | `~blacklist@1.0` | 8 | 6 | 2 | High |
| [`dev_bundler`](modules/dev-bundler.md) | `~bundler@1.0` | 26 | 13 | 13 | High |
| [`dev_bundler_cache`](modules/dev-bundler-cache.md) | `~bundler@1.0` | 6 | 0 | 6 | No standalone recipes |
| [`dev_bundler_recovery`](modules/dev-bundler-recovery.md) | `~bundler@1.0` | 3 | 0 | 3 | No standalone recipes |
| [`dev_bundler_task`](modules/dev-bundler-task.md) | `~bundler@1.0` | 4 | 0 | 4 | No standalone recipes |
| [`dev_cache`](modules/dev-cache.md) | `~cache@1.0` | 2 | 2 | 0 | High |
| [`dev_cookie_auth`](modules/dev-cookie-auth.md) | `~cookie@1.0` | 2 | 2 | 0 | High |
| [`dev_cookie_test_vectors`](modules/dev-cookie-test-vectors.md) | `~cookie@1.0` | 33 | 0 | 33 | No standalone recipes |
| [`dev_copycat_arweave`](modules/dev-copycat-arweave.md) | `~copycat@1.0` | 18 | 13 | 5 | High |
| [`dev_copycat_graphql`](modules/dev-copycat-graphql.md) | `~copycat@1.0` | 9 | 9 | 0 | High |
| [`dev_cron`](modules/dev-cron.md) | `~cron@1.0` | 4 | 4 | 0 | High |
| [`dev_dedup`](modules/dev-dedup.md) | `~dedup@1.0` | 2 | 2 | 0 | High |
| [`dev_flat`](modules/dev-flat.md) | `~flat@1.0` | 7 | 0 | 7 | No standalone recipes |
| [`dev_genesis_wasm`](modules/dev-genesis-wasm.md) | `~genesis-wasm@1.0` | 6 | 6 | 0 | High |
| [`dev_gzip`](modules/dev-gzip.md) | `~gzip@1.0` | 1 | 1 | 0 | High |
| [`dev_http_auth`](modules/dev-http-auth.md) | `~http-auth@1.0` | 1 | 0 | 1 | No standalone recipes |
| [`dev_httpsig`](modules/dev-httpsig.md) | `~httpsig@1.0` | 5 | 5 | 0 | High |
| [`dev_httpsig_conv`](modules/dev-httpsig-conv.md) | `~httpsig@1.0` | 3 | 0 | 3 | No standalone recipes |
| [`dev_httpsig_siginfo`](modules/dev-httpsig-siginfo.md) | `~httpsig@1.0` | 2 | 0 | 2 | No standalone recipes |
| [`dev_hyperbuddy`](modules/dev-hyperbuddy.md) | `~hyperbuddy@1.0` | 2 | 2 | 0 | High |
| [`dev_json`](modules/dev-json.md) | `~json@1.0` | 2 | 2 | 0 | High |
| [`dev_json_iface`](modules/dev-json-iface.md) | `~json-iface@1.0` | 2 | 1 | 1 | High |
| [`dev_local_name`](modules/dev-local-name.md) | `~local-name@1.0` | 5 | 3 | 2 | High |
| [`dev_location`](modules/dev-location.md) | `~location@1.0` | 3 | 3 | 0 | High |
| [`dev_lua`](modules/dev-lua.md) | `~lua@5.3a` | 17 | 12 | 5 | High |
| [`dev_lua_test`](modules/dev-lua-test.md) | `~lua@5.3a` | 1 | 0 | 1 | No standalone recipes |
| [`dev_lua_test_ledgers`](modules/dev-lua-test-ledgers.md) | `~lua@5.3a` | 10 | 7 | 3 | High |
| [`dev_manifest`](modules/dev-manifest.md) | `~manifest@1.0` | 6 | 4 | 2 | High |
| [`dev_message`](modules/dev-message.md) | `~message@1.0` | 14 | 13 | 1 | High |
| [`dev_meta`](modules/dev-meta.md) | `~meta@1.0` | 11 | 9 | 2 | High |
| [`dev_metering`](modules/dev-metering.md) | `~metering@1.0` | 5 | 5 | 0 | High |
| [`dev_multipass`](modules/dev-multipass.md) | `~multipass@1.0` | 1 | 1 | 0 | High |
| [`dev_name`](modules/dev-name.md) | `~name@1.0` | 10 | 8 | 2 | High |
| [`dev_node_process`](modules/dev-node-process.md) | `~node-process@1.0` | 3 | 2 | 1 | High |
| [`dev_p4`](modules/dev-p4.md) | `~p4@1.0` | 3 | 3 | 0 | High |
| [`dev_patch`](modules/dev-patch.md) | `~patch@1.0` | 5 | 4 | 1 | High |
| [`dev_process_cache`](modules/dev-process-cache.md) | `~process@1.0` | 1 | 0 | 1 | No standalone recipes |
| [`dev_process_worker`](modules/dev-process-worker.md) | `~process@1.0` | 3 | 0 | 3 | No standalone recipes |
| [`dev_profile`](modules/dev-profile.md) | `~profile@1.0` | 4 | 4 | 0 | High |
| [`dev_push`](modules/dev-push.md) | `~push@1.0` | 3 | 2 | 1 | High |
| [`dev_query`](modules/dev-query.md) | `~query@1.0` | 8 | 8 | 0 | High |
| [`dev_query_graphql`](modules/dev-query-graphql.md) | `~query@1.0` | 3 | 2 | 1 | High |
| [`dev_query_test_vectors`](modules/dev-query-test-vectors.md) | `~query@1.0` | 18 | 17 | 1 | High |
| [`dev_rate_limit`](modules/dev-rate-limit.md) | `~rate-limit@1.0` | 2 | 2 | 0 | High |
| [`dev_recorder`](modules/dev-recorder.md) | `~recorder@1.0` | 6 | 6 | 0 | High |
| [`dev_relay`](modules/dev-relay.md) | `~relay@1.0` | 3 | 3 | 0 | High |
| [`dev_router`](modules/dev-router.md) | `~router@1.0` | 22 | 21 | 1 | High |
| [`dev_scheduler`](modules/dev-scheduler.md) | `~scheduler@1.0` | 16 | 14 | 2 | High |
| [`dev_scheduler_cache`](modules/dev-scheduler-cache.md) | `~scheduler@1.0` | 8 | 0 | 8 | No standalone recipes |
| [`dev_scheduler_registry`](modules/dev-scheduler-registry.md) | `~scheduler@1.0` | 4 | 0 | 4 | No standalone recipes |
| [`dev_scheduler_server`](modules/dev-scheduler-server.md) | `~scheduler@1.0` | 2 | 0 | 2 | No standalone recipes |
| [`dev_secret`](modules/dev-secret.md) | `~secret@1.0` | 12 | 12 | 0 | High |
| [`dev_simple_pay`](modules/dev-simple-pay.md) | `~simple-pay@1.0` | 2 | 2 | 0 | High |
| [`dev_stack`](modules/dev-stack.md) | `~stack@1.0` | 15 | 11 | 4 | High |
| [`dev_structured`](modules/dev-structured.md) | `~structured@1.0` | 1 | 0 | 1 | No standalone recipes |
| [`dev_test`](modules/dev-test.md) | `~test-device@1.0` | 3 | 0 | 3 | No standalone recipes |
| [`dev_trie`](modules/dev-trie.md) | `~trie@1.0` | 12 | 0 | 12 | No standalone recipes |
| [`dev_trie_props`](modules/dev-trie-props.md) | `~trie@1.0` | 1 | 0 | 1 | No standalone recipes |
| [`dev_tx`](modules/dev-tx.md) | `~tx@1.0` | 26 | 0 | 26 | No standalone recipes |
| [`dev_wasi`](modules/dev-wasi.md) | `~wasi@1.0` | 3 | 3 | 0 | High |
| [`dev_wasm`](modules/dev-wasm.md) | `~wasm-64@1.0` | 8 | 7 | 1 | High |
| [`dev_whois`](modules/dev-whois.md) | `~whois@1.0` | 1 | 1 | 0 | High |
