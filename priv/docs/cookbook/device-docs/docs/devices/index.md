# Devices

This inventory covers the core devices in HyperBEAM edge commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`. Each page explains the device role, action keys, local examples, composition points, and trust boundaries.

## Quick Paths

- Node info: `http://localhost:8734/~meta@1.0/info`
- Construct a message: `http://localhost:8734/~message@1.0&greeting=hello/greeting`
- Human view: `http://localhost:8734/~meta@1.0/info/format~hyperbuddy@1.0`
- JSON view: `http://localhost:8734/~meta@1.0/info/~json@1.0/serialize`

## Arweave And Data

- [~arweave@2.9](arweave-and-data/arweave-at-2-9.md) - Reads network status, blocks, transaction headers, raw data, chunks, prices, anchors, pending chunks, and posts signed transactions through the node route.
- [~bundler@1.0](arweave-and-data/bundler-at-1-0.md) - Accepts signed committed items, writes them to the node cache immediately, queues them, and dispatches bundles to Arweave according to operator thresholds.
- [~copycat@1.0](arweave-and-data/copycat-at-1-0.md) - Copies messages from foreign sources into the local HyperBEAM cache so local query, read, and compute paths can operate on them.
- [~match@1.0](arweave-and-data/match-at-1-0.md) - A reverse index for finding message IDs that contain a specific key/value pair.
- [~query@1.0](arweave-and-data/query-at-1-0.md) - Searches supported stores and cache indexes populated by copycat, bundling, scheduling, and other node activity.

## Foundations

- [~b32-name@1.0](foundations/b32-name-at-1-0.md) - Resolves base32 subdomains that point at Arweave message IDs.
- [~hyperbuddy@1.0](foundations/hyperbuddy-at-1-0.md) - Formats HyperBEAM messages for humans while exploring paths, reading node state, and debugging recipes.
- [~local-name@1.0](foundations/local-name-at-1-0.md) - Stores operator-controlled local aliases in node state and nonvolatile storage.
- [~message@1.0](foundations/message-at-1-0.md) - Builds, reads, commits, verifies, and reshapes HyperBEAM messages.
- [~meta@1.0](foundations/meta-at-1-0.md) - Exposes the node entrypoint, public node message, build information, and operator configuration surface.
- [~name@1.0](foundations/name-at-1-0.md) - Resolves names into values through configured resolver messages.
- [~relay@1.0](foundations/relay-at-1-0.md) - Makes HTTP calls from a HyperBEAM path through node-controlled route policy.

## Compute, Processes, And Composition

- [~apply@1.0](compute-and-processes/apply-at-1-0.md) - Executes a path from the base message, or an explicit base/request pair through the `pair` key.
- [~cron@1.0](compute-and-processes/cron-at-1-0.md) - Inserts recurring or one-shot messages into an evaluation stream.
- [~dedup@1.0](compute-and-processes/dedup-at-1-0.md) - Skips duplicate messages during evaluation.
- [~delegated-compute@1.0](compute-and-processes/delegated-compute-at-1-0.md) - Wraps compute on remote machines that implement JSON-Iface.
- [~genesis-wasm@1.0](compute-and-processes/genesis-wasm-at-1-0.md) - Provides a legacy AO process environment on HyperBEAM infrastructure.
- [~lua@5.3a](compute-and-processes/lua-at-5-3a.md) - Runs Lua modules on HyperBEAM messages and supports process lifecycle actions.
- [~multipass@1.0](compute-and-processes/multipass-at-1-0.md) - Causes evaluation to pass through a workflow multiple times until a configured counter is reached.
- [~node-process@1.0](compute-and-processes/node-process-at-1-0.md) - Hosts process-like behavior inside one node using local names and node configuration.
- [~patch@1.0](compute-and-processes/patch-at-1-0.md) - Moves values between message paths before or after compute.
- [~process@1.0](compute-and-processes/process-at-1-0.md) - Delegates schedule, compute, push, slot, snapshot, and related process operations to the devices named in the process message.
- [~push@1.0](compute-and-processes/push-at-1-0.md) - Evaluates messages or slots and recursively pushes output messages to other processes.
- [~scheduler@1.0](compute-and-processes/scheduler-at-1-0.md) - Exposes schedule, slot, status, next, and info behavior for process assignments.
- [~stack@1.0](compute-and-processes/stack-at-1-0.md) - Runs a declared stack of devices in fold or map mode.
- [~wasi@1.0](compute-and-processes/wasi-at-1-0.md) - Provides a virtual filesystem device plus WASI preview1-compatible imports for WASM modules.
- [~wasm-64@1.0](compute-and-processes/wasm-64-at-1-0.md) - Executes Memory-64 WASM through WAMR and the BEAMR wrapper.

## Codecs And Formats

- [~ans104@1.0](codecs-and-formats/ans104-at-1-0.md) - The ANS-104 data-item codec used for Arweave bundles and nested data items.
- [~flat@1.0](codecs-and-formats/flat-at-1-0.md) - Flattens nested TABM messages into path-keyed maps and expands them again.
- [~gzip@1.0](codecs-and-formats/gzip-at-1-0.md) - Zips and unzips message bodies.
- [~httpsig@1.0](codecs-and-formats/httpsig-at-1-0.md) - Creates and verifies RFC 9421-style HTTP Message Signatures commitments.
- [~json-iface@1.0](codecs-and-formats/json-iface-at-1-0.md) - Translates process state and messages for WASM and delegated compute engines.
- [~json@1.0](codecs-and-formats/json-at-1-0.md) - Serializes HyperBEAM messages to JSON and deserializes JSON into messages.
- [~manifest@1.0](codecs-and-formats/manifest-at-1-0.md) - Resolves Arweave path manifests by mapping request paths to data item IDs.
- [~structured@1.0](codecs-and-formats/structured-at-1-0.md) - Encodes typed HyperBEAM messages, including integers, floats, atoms, lists, and nested values.
- [~trie@1.0](codecs-and-formats/trie-at-1-0.md) - Provides a radix trie with implicit leaves for path-indexed data and prefix lookups.
- [~tx@1.0](codecs-and-formats/tx-at-1-0.md) - Converts Arweave L1 transaction records to and from HyperBEAM message form.

## Node Operations

- [~blacklist@1.0](node-operations/blacklist-at-1-0.md) - A request-hook device for content moderation through configured blacklist sources.
- [~cache@1.0](node-operations/cache-at-1-0.md) - Reads IDs or store paths, honors requested accept formats, and allows writes only from configured cache writers.
- [~cacheviz@1.0](node-operations/cacheviz-at-1-0.md) - Renders cache relationships as JSON, DOT, SVG, JavaScript, or an index page.
- [~location@1.0](node-operations/location-at-1-0.md) - Creates, caches, and reads signed peer-location records.
- [~profile@1.0](node-operations/profile-at-1-0.md) - Measures device execution with profiling tools around an evaluation.
- [~rate-limit@1.0](node-operations/rate-limit-at-1-0.md) - Rejects excessive requests with HTTP 429 responses according to client IP policy.
- [~router@1.0](node-operations/router-at-1-0.md) - Selects outbound routes from node configuration.
- [~whois@1.0](node-operations/whois-at-1-0.md) - Returns request and node network identity information.

## Auth And Access

- [~auth-hook@1.0](auth-and-access/auth-hook-at-1-0.md) - Signs incoming messages with node-hosted wallets according to operator configuration.
- [~cookie@1.0](auth-and-access/cookie-at-1-0.md) - Generates, finalizes, commits, and verifies cookie-backed authorization material.
- [~http-auth@1.0](auth-and-access/http-auth-at-1-0.md) - Implements HTTP Basic authentication with PBKDF2 password handling and HMAC commitments.
- [~secret@1.0](auth-and-access/secret-at-1-0.md) - Generates, imports, exports, lists, syncs, and commits with node-hosted secrets.

## Payment And Metering

- [~faff@1.0](payment-and-metering/faff-at-1-0.md) - Gives allowlisted addresses cheaper or free access while estimating and charging others.
- [~metering@1.0](payment-and-metering/metering-at-1-0.md) - Opens metering sessions, records consumption, and calculates final prices.
- [~p4@1.0](payment-and-metering/p4-at-1-0.md) - Coordinates pricing and ledger checks for paid service fulfillment.
- [~simple-pay@1.0](payment-and-metering/simple-pay-at-1-0.md) - Provides flat-pricing balances, top-ups, estimates, and charges.

## Support And Test

- [~recorder@1.0](support-and-test/recorder-at-1-0.md) - Captures request/response flights for replay and diagnosis.
- [~test-device@1.0](support-and-test/test-device-at-1-0.md) - Confirms device loading and resolver behavior on disposable nodes.
