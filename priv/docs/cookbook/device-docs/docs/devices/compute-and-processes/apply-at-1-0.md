# ~apply@1.0

An AO resolution helper. It executes a path from the base message, or executes an explicit base/request pair through the `pair` key.

## When To Use It

- Invoke stored path programs.
- Apply one message/request pair from inside another device.
- Build higher-order composition where messages carry executable paths.

## Action Keys

| Key | What it does |
|---|---|
| `default` | Resolve the path named by the request key against a source message. |
| `pair` | Execute an explicit `base` and `request` pair together. |
| `info` | Expose device information. |

## Local Examples

### Apply a request stored inside another message

```bash
curl -sS "http://localhost:8734/~meta@1.0/info/request:debug-info~apply@1.0?debug-info=short-trace-len"
```

Expected: `20` on a default edge node. `apply@1.0` reads `request:debug-info` from the request, finds `short-trace-len`, then applies that path to the base meta message.

### Price an apply subrequest with simple-pay

```bash
curl -sS \
  -H 'request: device="apply@1.0", path="call", call="/~meta@1.0/info/address"' \
  -H 'ao-types: request="map"' \
  "http://localhost:8734/~simple-pay@1.0/estimate"
```

Expected: the pricing device recursively estimates the inner apply target instead of charging only for the wrapper. Nested request fields are sent as structured headers so paths containing `/` and device names containing `@` are parsed as strings.

### Use apply as a controlled API bridge

```bash
curl -sS "http://localhost:8734/~meta@1.0/build/node~apply@1.0&node=TEST&base=request:&request=base:"
```

Expected: `TEST`. This applies the request message as the base and the base message as the request, showing how `base:` and `request:` prefixes let `apply@1.0` control which message supplies the executable path.

## Composition

- Use inside process, stack, and scheduler recipes where paths are data.
- Use with `~patch@1.0` to prepare base/request pairs.

## Trust And Operation

Executing paths from messages is powerful. Trust the message that carries the path before evaluating it on sensitive nodes.

## Source

- Root module: `dev_apply`
- Device inventory: HyperBEAM edge commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`
