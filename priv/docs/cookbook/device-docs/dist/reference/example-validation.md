# Local Checks

These commands provide a quick smoke test for the examples in this guide.

```bash
curl -sS "http://localhost:8734/~meta@1.0/info/address"
curl -sS "http://localhost:8734/~message@1.0&greeting=hello/greeting"
curl -sS "http://localhost:8734/~message@1.0&count+integer=42/count"
curl -sS "http://localhost:8734/~message@1.0&greeting=hello/~json@1.0/serialize"
curl -sS "http://localhost:8734/~message@1.0&body=hello/~gzip@1.0/zip/~gzip@1.0/unzip/body"
HB="http://localhost:8734"
curl -sS -G "$HB/~relay@1.0/call" \
  --data-urlencode 'relay-method=GET' \
  --data-urlencode "relay-path=$HB/~meta@1.0/info/address"
```

Expected results:

- The `~meta@1.0` calls return local node state.
- The `~message@1.0` calls return the fields supplied in the URL.
- The JSON and gzip examples round-trip deterministic local data.
- The relay example returns the same address as the direct meta call when local relay is allowed.

Operator-sensitive and remote-data examples depend on node configuration. A not-found, unauthorized, or unavailable response is often the useful result: it tells you which route, signer, wallet, store, or policy the workflow needs before it can complete.
