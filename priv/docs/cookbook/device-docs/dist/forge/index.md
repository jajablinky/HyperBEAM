# Device Forge

The Device Forge turns Erlang `dev_*` modules into signed, loadable HyperBEAM devices. Start with the runbook:

- [Device Forge Runbook](runbook.md)

Focused references:

- [Create a device](create-a-device.md)
- [Package, verify, and test](test-package-verify.md)
- [Run locally](run-local.md)
- [Publish and load](publish-and-load.md)
- [Trusted signers and pins](trusted-signers-and-pins.md)
- [Operator configuration](operator-configuration.md)

Quick check for a node's device-loading policy:

```bash
curl -sS "http://localhost:8734/~meta@1.0/info/load-remote-devices"
curl -sS "http://localhost:8734/~meta@1.0/info/trusted-device-signers"
curl -sS "http://localhost:8734/~meta@1.0/info/format~hyperbuddy@1.0" | grep -i -E 'trusted|remote|preloaded' | head -60
```
