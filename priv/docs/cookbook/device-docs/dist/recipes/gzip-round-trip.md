# Gzip Round Trip

This recipe proves a reversible transformation: message body -> gzip -> unzip -> original body.

## Round Trip

```bash
curl -sS "http://localhost:8734/~message@1.0&body=hello/~gzip@1.0/zip/~gzip@1.0/unzip/body"
```

Expected output:

```text
hello
```

## Read Compressed Headers

```bash
curl -sS -D /tmp/hb-gzip-headers.txt \
  "http://localhost:8734/~message@1.0&body=hello/~gzip@1.0/zip/body" \
  -o /tmp/hb-gzip-body.bin
sed -n '/^content-encoding:/Ip;/^content-length:/Ip' /tmp/hb-gzip-headers.txt
wc -c /tmp/hb-gzip-body.bin
```

## Longer Payload

```bash
curl -sS "http://localhost:8734/~message@1.0&body=HyperBEAM-device-docs/~gzip@1.0/zip/~gzip@1.0/unzip/body"
```

Use this pattern before cache, relay, or bundling workflows where payload size matters.
