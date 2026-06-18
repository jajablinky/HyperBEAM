# Resolve Offset Addresses

Use `~arweave@2.9` as an offset resolver: byte offsets and compact unit suffixes resolve to the ANS-104 item that contains that position in the weave. This promotes the `dev_arweave_offset` helper tests into user-facing `~arweave@2.9` workflows.

Source tests: `dev_arweave_offset:parse_offset_test/0`, `dev_arweave_offset:offset_item_cases_test/0`, `dev_arweave_offset:offset_nested_item_test/0`, `dev_arweave_offset:offset_as_name_resolver_lookup_test/0`.

Prerequisites:

- Local HyperBEAM node at `http://localhost:8734`.
- Arweave routes available through the node.
- Optional: a request hook using `~name@1.0` when testing host-name resolution.

## 1. Use Supported Offset Forms

These strings all parse as arweave offset references:

| Input | Offset | Length |
|---|---:|---:|
| `160399272861859` | `160399272861859` | unset |
| `160399272861859-498852` | `160399272861859` | `498852` |
| `160399273000000` | `160399273000000` | unset |
| `160399273000000-498852` | `160399273000000` | `498852` |
| `160399273m` | `160399273000000` | unset |
| `160399273m-498852` | `160399273000000` | `498852` |
| `1337tib` | `1469098103259136` | unset |

## 2. Resolve Offset References To Items

```bash
HB=${HB:-http://localhost:8734}

curl -sSI "$HB/~arweave@2.9/160399272861859"
curl -sSI "$HB/~arweave@2.9/160399272861859-498852"
curl -sSI "$HB/~arweave@2.9/160399273000000"
curl -sSI "$HB/~arweave@2.9/160399273m"
curl -sSI "$HB/~arweave@2.9/384600234780716"
```

Expected stable metadata:

| Path | Data size | Content type |
|---|---:|---|
| `/160399272861859` | `498852` | `image/png` |
| `/160399272861859-498852` | `498852` | `image/png` |
| `/160399273000000` | `498852` | `image/png` |
| `/160399273m` | `498852` | `image/png` |
| `/384600234780716` | `856691` | `image/jpeg` |

Each resolved item should verify as a signed ANS-104 item.

## 3. Match A Nested Bundle Item By Offset

First read the nested item by bundle path:

```bash
HB=${HB:-http://localhost:8734}
BUNDLE=bndIwac23-s0K11TLC1N7z472sLGAkiOdhds87ZywoE

curl -sS "$HB/~arweave@2.9/tx=$BUNDLE/1/2/serialize~json@1.0" \
  > /tmp/hb-bundle-child.json
```

Then resolve the same item by the byte offset computed from the bundle index:

```bash
ITEM_START_OFFSET='<offset returned by the bundle index walk>'
curl -sS "$HB/~arweave@2.9/$((ITEM_START_OFFSET + 1))/serialize~json@1.0" \
  > /tmp/hb-offset-child.json
```

Expected:

```text
the signed IDs and data sizes match
```

This is the same equivalence checked by the source offset-nesting test: bundle path addressing and offset addressing should identify the same ANS-104 item.

## 4. Use arweave@2.9 As A Name Resolver

When `~name@1.0` is installed as a request hook and `~arweave@2.9` is listed as a name resolver, offset hostnames can resolve directly.

Node option shape:

```json
{
  "name-resolvers": [
    {
      "device": "arweave@2.9"
    }
  ],
  "on": {
    "request": [
      {
        "device": "name@1.0"
      }
    ]
  }
}
```

Request:

```bash
curl -sSI \
  -H 'Host: 152974576623958.localhost' \
  "$HB/"
```

Expected:

```text
content-type: application/json
```
