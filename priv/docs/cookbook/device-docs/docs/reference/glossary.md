# Glossary

| Term | Meaning |
|---|---|
| AO-Core message | The structured message form that devices read and return. |
| Device | A named message interpreter such as `~json@1.0` or `~arweave@2.9`. |
| Device key | The path segment that selects behavior inside a device, such as `info`, `tx`, or `compute`. |
| Hyperpath | A URL path that composes device calls and message reads into one resolution. |
| Preloaded store | Local store containing packaged core device specs and implementations. |
| Preloaded device index | Resolver message mapping names such as `meta@1.0` to device specs. |
| Device Forge | The packaging workflow that turns device source into signed runtime implementations. |
| Trusted signer | An address whose device implementation signatures a node accepts for remote loading. |
| Pinned device | A direct operator mapping from a device name or spec ID to an implementation ID. |
| Commitment device | A device that signs or verifies messages, such as `~httpsig@1.0` or `~ans104@1.0`. |
| Local cache | Node-local storage used by cache, query, copycat, and process devices. |
| Optimistic availability | Data is readable from local cache before final Arweave dispatch or confirmation completes. |
