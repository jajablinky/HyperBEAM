# Install The Forge Template

Install from a HyperBEAM checkout:

```bash
cd /tmp/hyperbeam-source
./install-template --local /tmp/hyperbeam-source
```

Install from upstream edge:

```bash
./install-template --branch edge
```

Pin to a commit for repeatable scaffolding:

```bash
./install-template --commit <commit-or-tag>
```

The installer writes a `rebar3 new device` template into your user template directory. New projects generated from it pin both the `hb` dependency and Forge plugin to the same HyperBEAM reference.

Create a project:

```bash
mkdir -p /tmp/hb-device-docs-forge
cd /tmp/hb-device-docs-forge
rebar3 new device name=echo_lens
```

Continue with the [runbook](runbook.md).
