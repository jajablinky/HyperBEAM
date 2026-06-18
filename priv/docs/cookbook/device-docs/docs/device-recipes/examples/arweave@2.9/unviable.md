# arweave@2.9 Unviable Tests

These arweave-related tests are not promoted to final recipes. The reasons are narrower than "uses another device"; composability is allowed in this examples tree. A test is only listed here when the tested behavior is private helper behavior, a synthetic malformed fixture, or disabled upstream behavior.

## Not Promoted

| Test | Source | Why it is not a user-level workflow | Possible future recipe |
|---|---|---|---|
| `dev_arweave:bundle_header_garbage_guard_test_parallel/0` | `arweave/dev_arweave.erl` | Calls `lib_arweave_common:bundle_header/3` directly with a fixed bad interior offset and expects `{error, invalid_bundle_header}`. No public `~arweave@2.9` key exposes this exact helper call. | Add a bundle-debug or conformance recipe if bundle-header validation becomes public through a device path. |
| `dev_arweave:best_response_handles_failed_connect_entries_test_parallel/0` | `arweave/dev_arweave.erl` | Calls the private `best_response/1` helper over synthetic route responses. It proves response selection semantics, not a standalone user action. | Keep the operator-facing behavior in [Post Signed Data To Arweave](post-signed-data-to-arweave.md), where parallel routes prefer a successful publish. |
| `dev_arweave:best_response_non_map_error_round_trips_test_parallel/0` | `arweave/dev_arweave.erl` | Calls private error normalization with a synthetic `failed_connect` tuple. Users can observe route failures, but cannot run this exact helper workflow through `~arweave@2.9`. | Add an operator troubleshooting recipe if public route diagnostics expose normalized failed-connect bodies. |
| `dev_arweave:head_raw_ans104_invalid_tags_test/0` | `arweave/dev_arweave.erl` | Builds a malformed ANS-104 item in memory by removing the tag terminator, then calls private `do_head_raw_ans104/5`. It is a parser guardrail, not a live Arweave object. | Promote only if the docs include a conformance fixture that intentionally stores malformed ANS-104 bytes. |
| `dev_arweave:get_tx_rsa_large_bundle_test_disabled/0` | `arweave/dev_arweave.erl` | Disabled upstream because it takes too long to run. Final docs should not ask users to run disabled, non-deterministic performance-sensitive behavior. | Promote after upstream re-enables the test and the workflow has bounded runtime expectations. |
| `dev_arweave:serialize_data_item_test_disabled/0` | `arweave/dev_arweave.erl` | Disabled helper that writes a signed data item fixture to `test/arbundles.js/hyperbeam-test-item.bin` for external JS/gateway validation. The user workflow is fixture generation, not `~arweave@2.9`. | Fold the useful signing portion into an `~ans104@1.0` fixture recipe or the publish flow in [Post Signed Data To Arweave](post-signed-data-to-arweave.md). |

## Coverage Check

The six tests above, plus the 37 tests covered by the workflow pages in [arweave@2.9 Example Workflows](index.md), account for all 43 arweave-related tests from `dev_arweave` and `dev_arweave_offset`.
