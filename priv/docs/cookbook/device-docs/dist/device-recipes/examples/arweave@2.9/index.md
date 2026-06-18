# arweave@2.9 Example Workflows

These are final recipe candidates for `~arweave@2.9`, derived from the upstream HyperBEAM `edge` tests at commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

This set intentionally includes composable workflows. Tests from `dev_arweave_offset` are promoted here because users can exercise them through the `~arweave@2.9` public address space, even though the source module is a helper.

## Coverage

| Area | Page | Tests covered |
|---|---|---:|
| Posting signed data and L1 transactions | [Post Signed Data To Arweave](post-signed-data-to-arweave.md) | 5 |
| Reading transaction messages | [Read Transaction Messages](read-transaction-messages.md) | 5 |
| Reading raw data and ranges | [Read Raw Data And Ranges](read-raw-data-and-ranges.md) | 4 |
| Reading chunk ranges by byte offset | [Read Chunk Ranges By Offset](read-chunk-ranges-by-offset.md) | 16 |
| Resolving offset addresses | [Resolve Offset Addresses](resolve-offset-addresses.md) | 4 |
| Inspecting and reassembling bundles | [Inspect And Reassemble Bundles](inspect-and-reassemble-bundles.md) | 3 |
| Not promoted | [Unviable Tests](unviable.md) | 6 |

Total: 43 arweave-related tests accounted for.

## Workflows

1. [Post Signed Data To Arweave](post-signed-data-to-arweave.md)
2. [Read Transaction Messages](read-transaction-messages.md)
3. [Read Raw Data And Ranges](read-raw-data-and-ranges.md)
4. [Read Chunk Ranges By Offset](read-chunk-ranges-by-offset.md)
5. [Resolve Offset Addresses](resolve-offset-addresses.md)
6. [Inspect And Reassemble Bundles](inspect-and-reassemble-bundles.md)

## Source Pages

- [`dev_arweave`](../../modules/dev-arweave.md)
- [`dev_arweave_offset`](../../modules/dev-arweave-offset.md)
