# AGENTS.md - Cookbook UI Source

This folder is a packaged snapshot of the editable `device-docs` UI/source
corpus used by HyperBEAM's prototype `cookbook@1.0` renderer.

## What Lives Here

- `site/`: editable UI shell source (`index.html`, `assets/site.css`,
  `assets/example-runner.js`, fonts).
- `docs/`: Markdown source for reusable boilerplate, device pages, recipes, and
  references.
- `scripts/build-docs-site.mjs`: builds `docs/` + `site/` into `dist/`.
- `dist/`: built runtime assets served by HyperBEAM at `/info/assets/...`.

Do not reintroduce a hardcoded `/home/fn/Dev/device-docs` dependency. The
runtime default is this packaged folder via `code:priv_dir(hb)`.

## Dev Server

From the HyperBEAM repo root, use the guarded wrapper (avoids overlapping
`rebar3 shell` instances on port 8734):

```bash
./scripts/dev-server.sh start   # skip if already up
./scripts/dev-server.sh status
./scripts/dev-server.sh restart # after hb_docs / compile changes
```

## Editing Workflow

From this directory:

```bash
npm ci
npm run docs:build
```

After rebuilding, do not commit a full `node_modules/` tree. This packaged copy
keeps only `node_modules/prismjs/components/prism-core.min.js` because the
current runtime shell loads that file directly.

Then run HyperBEAM tests from the repository root:

```bash
rebar3 compile
erl +S 2:2 -pa _build/default/lib/*/ebin -noshell -eval 'case eunit:test(hb_docs, [verbose]) of ok -> halt(0); _ -> halt(1) end.'
```

## Local Live-Checkout Override

Only for local development, a maintainer can point the renderer at another
`device-docs` checkout:

```bash
HB_DEVICE_DOCS_ROOT=/path/to/device-docs rebar3 shell
```

Do not use that override in deploy instructions, tests, or committed service
files. Reviewers should be able to clone HyperBEAM and run the docs without any
external docs checkout.

## Runtime Contract

- HyperBEAM serves built assets from `dist/assets/`.
- `hb_docs` reads Markdown source from `docs/`.
- Prism core is loaded from `node_modules/prismjs/components/prism-core.min.js`;
  keep that file present when refreshing the snapshot.
- Recipe runner behavior comes from `site/assets/example-runner.js` and the
  built `dist/assets/example-runner.js`.
