# Evaluation Against Existing Recipes

Conclusion: turning all device tests into standalone recipes is not viable, but turning the positive, externally observable subset into recipes is viable and useful.

The scan found 506 unique test entries across 68 device or helper modules. Of these, 296 are recipe-like seeds or already overlap existing recipes, while 210 should remain guardrails, conformance vectors, internal support coverage, benchmarks, stress tests, disabled-test notes, or test-harness notes.

The right model is not one recipe per test. The right model is one workflow per user intent, with many tests attached as source evidence. A single recipe such as bundling locally can absorb positive tests for signed item submission, optimistic cache reads, threshold settings, and recovery checks, while keeping retry failures and cache-write failures in expected-error or operator-warning sections.

## Outcome Counts

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

## Existing Recipe Coverage

| Existing recipe | Related modules | Related tests | Recipe-like tests | Evaluation |
|---|---|---:|---:|---|
| [arweave-json-to-lua](/recipes/arweave-json-to-lua.md) | `dev_arweave`, `dev_copycat_arweave`, `dev_json`, `dev_lua`, `dev_query` | 84 | 64 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [bundle-data-locally](/recipes/bundle-data-locally.md) | `dev_ans104`, `dev_bundler`, `dev_bundler_cache`, `dev_bundler_recovery`, `dev_bundler_task` | 63 | 13 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [check-node-readiness](/recipes/check-node-readiness.md) | `dev_hyperbuddy`, `dev_meta`, `dev_whois` | 14 | 12 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [create-a-process](/recipes/create-a-process.md) | `dev_lua`, `dev_patch`, `dev_process`, `dev_push`, `dev_scheduler`, `dev_stack`, `dev_wasi`, `dev_wasm` | 67 | 53 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [gzip-round-trip](/recipes/gzip-round-trip.md) | `dev_gzip` | 1 | 1 | Covers the top-level idea; add expected-result vectors from tests. |
| [message-to-json-pipe](/recipes/message-to-json-pipe.md) | `dev_json`, `dev_message` | 16 | 15 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [paid-device-access](/recipes/paid-device-access.md) | `dev_faff`, `dev_metering`, `dev_p4`, `dev_simple_pay` | 10 | 10 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [patch-process-state](/recipes/patch-process-state.md) | `dev_patch`, `dev_stack` | 20 | 15 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [query-local-cache](/recipes/query-local-cache.md) | `dev_cache`, `dev_copycat_arweave`, `dev_query`, `dev_query_graphql`, `dev_query_test_vectors` | 49 | 42 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [recorder-debug-flight](/recipes/recorder-debug-flight.md) | `dev_recorder` | 6 | 6 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [relay-fetch-transform](/recipes/relay-fetch-transform.md) | `dev_json`, `dev_relay` | 5 | 5 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [scheduled-lua-process](/recipes/scheduled-lua-process.md) | `dev_cron`, `dev_lua`, `dev_process`, `dev_push`, `dev_scheduler` | 40 | 32 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |
| [trusted-custom-device](/recipes/trusted-custom-device.md) | `dev_meta`, `dev_router` | 33 | 30 | Good overlap; test-derived corpus can strengthen prerequisites, expected output, and guardrails. |

## Gaps Worth Promoting To New Curated Recipes

| Gap | Modules | Recommendation |
|---|---|---|
| Names and local names | [`dev_local_name`](modules/dev-local-name.md), [`dev_name`](modules/dev-name.md), [`dev_b32_name`](modules/dev-b32-name.md) | Register and resolve node-local names, configured names, host-derived names, and base32 names. |
| HTTP signatures and secrets | [`dev_httpsig`](modules/dev-httpsig.md), [`dev_secret`](modules/dev-secret.md), [`dev_cookie_auth`](modules/dev-cookie-auth.md), [`dev_auth_hook`](modules/dev-auth-hook.md) | Commit, verify, sign with node-hosted wallets, and attach auth commitments safely. |
| Router and policy hooks | [`dev_router`](modules/dev-router.md), [`dev_blacklist`](modules/dev-blacklist.md), [`dev_rate_limit`](modules/dev-rate-limit.md), [`dev_location`](modules/dev-location.md) | Configure routes, policy hooks, blacklist providers, rate limits, and scheduler locations on private nodes. |
| Stack/apply/dedup/multipass composition | [`dev_stack`](modules/dev-stack.md), [`dev_apply`](modules/dev-apply.md), [`dev_dedup`](modules/dev-dedup.md), [`dev_multipass`](modules/dev-multipass.md) | Show higher-order device composition beyond the existing patch and process recipes. |
| Manifest resolution | [`dev_manifest`](modules/dev-manifest.md) | Resolve path manifests, fallbacks, 404s, and inner redirects with deterministic examples. |
| Codec conformance vectors | [`dev_ans104`](modules/dev-ans104.md), [`dev_tx`](modules/dev-tx.md), [`dev_flat`](modules/dev-flat.md), [`dev_structured`](modules/dev-structured.md), [`dev_trie`](modules/dev-trie.md) | Publish vectors as spec pages rather than user recipes, with one or two practical codec workflows linked from recipes. |
| WASM/WASI/genesis compute | [`dev_wasm`](modules/dev-wasm.md), [`dev_wasi`](modules/dev-wasi.md), [`dev_genesis_wasm`](modules/dev-genesis-wasm.md), [`dev_json_iface`](modules/dev-json-iface.md) | Create advanced compute recipes with explicit fixture assets and runtime prerequisites. |
| Lua ledger processes | [`dev_lua_test_ledgers`](modules/dev-lua-test-ledgers.md) | Turn ledger/subledger tests into practical Lua process examples once scheduler setup is documented. |

## Existing Recipes That Should Stay Curated

- `bundle-data-locally`, `query-local-cache`, and `arweave-json-to-lua` already match the strongest Arweave/query/bundler tests. The test corpus should add exact expected-response notes and guardrails rather than replace them.
- `message-to-json-pipe`, `gzip-round-trip`, `relay-fetch-transform`, and `recorder-debug-flight` are concise user workflows. Keep them as hand-curated front doors and link out to test vectors for depth.
- `create-a-process`, `scheduled-lua-process`, and `patch-process-state` are still more conceptual than the tests. The scheduler/Lua/stack tests can make them more runnable, but many process tests need fixture setup that is too heavy for a basic recipe.
- `paid-device-access` maps to P4, simple-pay, faff, and metering tests, but payment examples should remain operator-marked because balances, ledgers, and pricing config are node-specific.

## Non-Promotable Test Classes

See [Tests That Are Not User-Level Recipes](non-user-workflows.md) for the full table. The main rejection classes are internal helpers, spec vectors, guardrails, benchmarks/stress tests, and disabled tests.

## Recommendation

Adopt a two-layer corpus:

1. Keep `docs/recipes/` as the short curated cookbook for humans.
2. Use `docs/device-recipes/` as the test-derived evidence layer: each workflow links back to test names, and each non-promoted test is still accounted for.

This gives the team the benefit discussed in the call: docs can be regenerated from passing behavior, but humans still get intent-first workflows instead of raw unit-test prose.
