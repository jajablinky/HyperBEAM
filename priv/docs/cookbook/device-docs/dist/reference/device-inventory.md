# Device Inventory

Target: `permaweb/HyperBEAM` branch `edge` at commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

The edge scan found 55 root devices from 84 `dev_*.erl` files. Helper modules are documented on their owning root device pages.

## Root Devices

| Device | Source root | Category | Primary role |
|---|---|---|---|
| `~ans104@1.0` | `dev_ans104` | Codecs And Formats | The ANS-104 data-item codec used for Arweave bundles and nested data items. |
| `~apply@1.0` | `dev_apply` | Compute, Processes, And Composition | An AO resolution helper. |
| `~arweave@2.9` | `dev_arweave` | Arweave And Data | The Arweave access device. |
| `~auth-hook@1.0` | `dev_auth_hook` | Auth And Access | A request hook that signs incoming messages with node-hosted wallets according to operator configuration. |
| `~b32-name@1.0` | `dev_b32_name` | Foundations | A name resolver for base32 subdomains that point at Arweave message IDs. |
| `~blacklist@1.0` | `dev_blacklist` | Node Operations | A request-hook device for content moderation. |
| `~bundler@1.0` | `dev_bundler` | Arweave And Data | A local bundling service. |
| `~cache@1.0` | `dev_cache` | Node Operations | The local cache read/write device. |
| `~cacheviz@1.0` | `dev_cacheviz` | Node Operations | A visualization device for the local cache. |
| `~cookie@1.0` | `dev_cookie` | Auth And Access | A cookie commitment and authentication device. |
| `~copycat@1.0` | `dev_copycat` | Arweave And Data | An indexing orchestrator. |
| `~cron@1.0` | `dev_cron` | Compute, Processes, And Composition | A scheduled self-call device. |
| `~dedup@1.0` | `dev_dedup` | Compute, Processes, And Composition | A stream helper that skips duplicate messages during evaluation. |
| `~delegated-compute@1.0` | `dev_delegated_compute` | Compute, Processes, And Composition | A wrapper for compute on remote machines that implement the JSON-Iface. |
| `~faff@1.0` | `dev_faff` | Payment And Metering | A friends-and-family allowlist pricing device. |
| `~flat@1.0` | `dev_flat` | Codecs And Formats | A codec that flattens nested TABM messages into path-keyed maps and can expand them again. |
| `~genesis-wasm@1.0` | `dev_genesis_wasm` | Compute, Processes, And Composition | A legacy AO process environment implemented on HyperBEAM infrastructure. |
| `~gzip@1.0` | `dev_gzip` | Codecs And Formats | A compression device that zips and unzips message bodies. |
| `~http-auth@1.0` | `dev_http_auth` | Auth And Access | An HTTP Basic authentication device with PBKDF2 password handling and HMAC commitment support through HTTP signatures. |
| `~httpsig@1.0` | `dev_httpsig` | Codecs And Formats | An HTTP Message Signatures commitment device based on RFC 9421-style signatures. |
| `~hyperbuddy@1.0` | `dev_hyperbuddy` | Foundations | A human-readable formatter for HyperBEAM messages. |
| `~json-iface@1.0` | `dev_json_iface` | Codecs And Formats | The JSON interface used by WASM and delegated compute engines to exchange process state and messages. |
| `~json@1.0` | `dev_json` | Codecs And Formats | A JSON codec for serializing and deserializing HyperBEAM messages. |
| `~local-name@1.0` | `dev_local_name` | Foundations | A node-local name registry. |
| `~location@1.0` | `dev_location` | Node Operations | A peer-location device. |
| `~lua@5.3a` | `dev_lua` | Compute, Processes, And Composition | The Lua execution device. |
| `~manifest@1.0` | `dev_manifest` | Codecs And Formats | An Arweave path-manifest resolver for v1 manifests. |
| `~match@1.0` | `dev_match` | Arweave And Data | A reverse index for finding message IDs that contain a specific key/value pair. |
| `~message@1.0` | `dev_message` | Foundations | The basic message construction and field access device. |
| `~meta@1.0` | `dev_meta` | Foundations | The node entrypoint and configuration surface. |
| `~metering@1.0` | `dev_metering` | Payment And Metering | A dynamic pricing device for P4. |
| `~multipass@1.0` | `dev_multipass` | Compute, Processes, And Composition | A repass trigger device. |
| `~name@1.0` | `dev_name` | Foundations | A resolver device for turning names into values through configured resolver messages. |
| `~node-process@1.0` | `dev_node_process` | Compute, Processes, And Composition | A singleton node-local process device that uses local names and node configuration to host process-like behavior inside one node. |
| `~p4@1.0` | `dev_p4` | Payment And Metering | The core payment and ledger orchestrator. |
| `~patch@1.0` | `dev_patch` | Compute, Processes, And Composition | A data-shaping device that moves values between message paths. |
| `~process@1.0` | `dev_process` | Compute, Processes, And Composition | The AO process router. |
| `~profile@1.0` | `dev_profile` | Node Operations | A profiling device for measuring device execution. |
| `~push@1.0` | `dev_push` | Compute, Processes, And Composition | A process-output propagation device. |
| `~query@1.0` | `dev_query` | Arweave And Data | The local discovery engine. |
| `~rate-limit@1.0` | `dev_rate_limit` | Node Operations | A request-hook rate limiter keyed by client IP. |
| `~recorder@1.0` | `dev_recorder` | Support And Test | A debugging recorder that captures request/response flights for replay and diagnosis. |
| `~relay@1.0` | `dev_relay` | Foundations | A relay device for making HTTP calls from a HyperBEAM path. |
| `~router@1.0` | `dev_router` | Node Operations | The outbound routing device. |
| `~scheduler@1.0` | `dev_scheduler` | Compute, Processes, And Composition | The scheduling device for process assignments. |
| `~secret@1.0` | `dev_secret` | Auth And Access | A node-hosted secret and wallet device. |
| `~simple-pay@1.0` | `dev_simple_pay` | Payment And Metering | A simple flat-pricing ledger device. |
| `~stack@1.0` | `dev_stack` | Compute, Processes, And Composition | A composition device that runs a declared stack of devices in fold or map mode. |
| `~structured@1.0` | `dev_structured` | Codecs And Formats | A rich structured codec for typed HyperBEAM messages, including integers, floats, atoms, lists, and nested values. |
| `~test-device@1.0` | `dev_test` | Support And Test | A built-in test helper device used by HyperBEAM tests and examples. |
| `~trie@1.0` | `dev_trie` | Codecs And Formats | A radix trie device with implicit leaves. |
| `~tx@1.0` | `dev_tx` | Codecs And Formats | The Arweave L1 transaction codec. |
| `~wasi@1.0` | `dev_wasi` | Compute, Processes, And Composition | A virtual filesystem device plus WASI preview1-compatible imports for WASM modules. |
| `~wasm-64@1.0` | `dev_wasm` | Compute, Processes, And Composition | A Memory-64 WASM execution device backed by WAMR through the BEAMR wrapper. |
| `~whois@1.0` | `dev_whois` | Node Operations | A small device for request and node network identity information. |

## Helper Modules

Helper modules are packaged with their root device and are not separate top-level devices:
- `~arweave@2.9`: `dev_arweave_offset`, `dev_arweave_block_cache`.
- `~bundler@1.0`: `dev_bundler_cache`, `dev_bundler_recovery`, `dev_bundler_task`.
- `~cookie@1.0`: `dev_cookie_auth`, `dev_cookie_test_vectors`.
- `~copycat@1.0`: `dev_copycat_arweave`, `dev_copycat_graphql`.
- `~httpsig@1.0`: `dev_httpsig_conv`, `dev_httpsig_keyid`, `dev_httpsig_proxy`, `dev_httpsig_siginfo`.
- `~location@1.0`: `dev_location_cache`.
- `~lua@5.3a`: `dev_lua_lib`, `dev_lua_test`, `dev_lua_test_ledgers`.
- `~process@1.0`: `dev_process_cache`, `dev_process_worker`.
- `~query@1.0`: `dev_query_arweave`, `dev_query_graphql`, `dev_query_test_vectors`.
- `~scheduler@1.0`: `dev_scheduler_cache`, `dev_scheduler_formats`, `dev_scheduler_registry`, `dev_scheduler_server`.
- `~trie@1.0`: `dev_trie_props`.
- `~tx@1.0`: `dev_tx_from`, `dev_tx_to`.
