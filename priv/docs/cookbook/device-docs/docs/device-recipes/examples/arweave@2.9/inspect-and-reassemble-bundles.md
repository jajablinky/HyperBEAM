# Inspect And Reassemble Bundles

Use `~arweave@2.9` to inspect nested bundle messages, then reconstruct bundle contents from the L1 transaction offset and chunk range.

Source tests: `dev_arweave:get_tx_rsa_nested_bundle_test_parallel/0`, `dev_arweave:reassemble_bundle1_test_parallel/0`, `dev_arweave:reassemble_bundle2_test_parallel/0`.

Prerequisites:

- Local HyperBEAM node at `http://localhost:8734`.
- Arweave routes available through the node.
- `jq` for extracting offset metadata in the shell examples.
- `~ans104@1.0` or another ANS-104 decoder when inspecting downloaded bundle bytes.

## 1. Read A Nested Bundle Item

```bash
HB=${HB:-http://localhost:8734}
BUNDLE=bndIwac23-s0K11TLC1N7z472sLGAkiOdhds87ZywoE

curl -sS "$HB/~arweave@2.9/tx=$BUNDLE/serialize~json@1.0" \
  > /tmp/hb-rsa-bundle-root.json

curl -sS "$HB/~arweave@2.9/tx=$BUNDLE/1/2/serialize~json@1.0" \
  > /tmp/hb-rsa-bundle-child.json
```

Expected child fields:

```json
{
  "data-protocol": "ao",
  "from-module": "cbn0KKrBZH7hdNkNokuXLtGryrWM--PjSTBqIzw9Kkk",
  "from-process": "agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA",
  "reference": "280188",
  "target": "1R5QEtX53Z_RRQJwzFWf40oXiPW2FibErT_h02pu8MU",
  "type": "Message",
  "variant": "ao.TN.1"
}
```

Expected behavior:

- The root message verifies.
- The child message verifies.
- Resolving `1/2` from the root message gives the same child returned by the HTTP path.

## 2. Find Bundle Offset Metadata

The reassembly tests use Arweave's transaction offset endpoint, then fetch exactly the transaction byte range through `~arweave@2.9/chunk`.

```bash
ARWEAVE_GATEWAY=${ARWEAVE_GATEWAY:-https://arweave.net}
TXID=c1-FkhQd-Ul-VpIMR5Vs77lK__BlzHzena2zgNh_hME

curl -sS "$ARWEAVE_GATEWAY/tx/$TXID/offset" > /tmp/hb-bundle-offset.json

END_OFFSET=$(jq -r '.offset' /tmp/hb-bundle-offset.json)
SIZE=$(jq -r '.size' /tmp/hb-bundle-offset.json)
START_OFFSET=$((END_OFFSET - SIZE + 1))
```

Expected:

```text
START_OFFSET and SIZE identify the complete L1 bundle payload
```

## 3. Download And Decode The Bundle Bytes

```bash
curl -sS "$HB/~arweave@2.9/chunk?offset=$START_OFFSET&length=$SIZE" \
  > /tmp/hb-bundle.bin

curl -sS -X POST \
  -H 'content-type: application/octet-stream' \
  --data-binary @/tmp/hb-bundle.bin \
  "$HB/~ans104@1.0/deserialize"
```

Expected:

- The bundle header decodes.
- Each listed item deserializes.
- Each item verifies as an ANS-104 item.
- If an item is itself a nested bundle, its children verify too.

## 4. Repeat For The Second Bundle Fixture

```bash
HB=${HB:-http://localhost:8734}
ARWEAVE_GATEWAY=${ARWEAVE_GATEWAY:-https://arweave.net}
TXID=OVjj52NvyIys7u84Rv1uqRG2vswlF95QDVPSmsmlwLk

curl -sS "$ARWEAVE_GATEWAY/tx/$TXID/offset" > /tmp/hb-bundle-offset.json

END_OFFSET=$(jq -r '.offset' /tmp/hb-bundle-offset.json)
SIZE=$(jq -r '.size' /tmp/hb-bundle-offset.json)
START_OFFSET=$((END_OFFSET - SIZE + 1))

curl -sS "$HB/~arweave@2.9/chunk?offset=$START_OFFSET&length=$SIZE" \
  > /tmp/hb-bundle.bin
```

Expected:

```text
downloaded bytes decode into a valid bundle and all nested data items verify
```

The disabled large-bundle test is documented in [Unviable Tests](unviable.md) until it is re-enabled upstream.
