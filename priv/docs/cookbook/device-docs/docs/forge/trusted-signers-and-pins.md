# Trusted Signers And Pins

Remote device loading is controlled by operator policy.

| Configuration | Meaning |
|---|---|
| `load-remote-devices` | Allows the node to fetch device specs/implementations that are not already local. |
| `trusted-device-signers` | Accepts implementation messages signed by listed addresses. |
| `trusted-devices` | Pins a device name or spec ID to a specific implementation ID. |

Read the current node trust policy:

```bash
curl -sS "http://localhost:8734/~meta@1.0/info/load-remote-devices"
curl -sS "http://localhost:8734/~meta@1.0/info/trusted-device-signers"
curl -sS "http://localhost:8734/~meta@1.0/info/format~hyperbuddy@1.0" | grep -i -E 'trusted|remote|preloaded' | head -60
```

Use pins when the implementation must not change without an operator edit. Use signer trust when the signer should be able to publish upgrades. Keep remote loading disabled when a node should only run its preloaded device set.
