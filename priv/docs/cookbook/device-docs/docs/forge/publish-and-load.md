# Publish And Load

Publishing signs and uploads the spec and implementation messages:

```bash
rebar3 device publish --key wallet.json
```

The command prints IDs for the device specification and implementation. Operators can then load the implementation in one of three ways:

| Method | Use it when |
|---|---|
| Local preloaded store | You control the node build or are running `rebar3 device local`. |
| Direct pin in `trusted-devices` | You want one exact implementation ID for a name or spec. |
| Trusted signer | You want to accept implementations signed by a known address. |

Check a node's loading policy:

```bash
curl -sS "http://localhost:8734/~meta@1.0/info/load-remote-devices"
curl -sS "http://localhost:8734/~meta@1.0/info/trusted-device-signers"
curl -sS "http://localhost:8734/~meta@1.0/info/format~hyperbuddy@1.0" | grep -i -E 'trusted|remote|preloaded' | head -60
```

A pinned implementation is the narrowest policy. A trusted signer is more flexible and should be limited to signers whose device updates you intend to run.
