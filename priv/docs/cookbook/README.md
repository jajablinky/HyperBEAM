# Cookbook docs shell snapshot

This directory packages the `device-docs` inputs used by the prototype
`cookbook@1.0` renderer so a HyperBEAM checkout can run the docs pages without
an external `/home/fn/Dev/device-docs` dependency.

Runtime resolution uses `code:priv_dir(hb)/docs/cookbook/device-docs` by
default. Set `HB_DEVICE_DOCS_ROOT=/path/to/device-docs` only when developing
against a live `device-docs` checkout.

The packaged snapshot contains:

- `dist/` from `device-docs`, kept as the complete built runtime tree for the
  docs shell and Markdown pages.
- `node_modules/prismjs/components/prism-core.min.js`, which is not emitted into
  `dist/assets/` but is loaded by the current shell.
- Editable `site/`, `scripts/`, `package.json`, `package-lock.json`, and `docs/`
  source from `device-docs`, so reviewers can rebuild the UI shell without an
  external checkout.

See `device-docs/AGENTS.md` for the UI-side editing and rebuild workflow.
