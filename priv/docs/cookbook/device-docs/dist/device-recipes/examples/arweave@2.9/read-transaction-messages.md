# Read Transaction Messages

Fetch Arweave transactions as HyperBEAM messages, optionally omit the raw `data` field, and follow nested bundled items by path.

Source tests: `dev_arweave:get_tx_basic_data_test_parallel/0`, `dev_arweave:get_tx_split_chunk_test_parallel/0`, `dev_arweave:get_tx_basic_data_exclude_data_test_parallel/0`, `dev_arweave:get_tx_data_tag_exclude_data_test_parallel/0`, `dev_arweave:get_bad_tx_test_parallel/0`.

Prerequisites:

- Local HyperBEAM node at `http://localhost:8734`.
- Arweave routes available through the node.
- Optional: `jq` for compact inspection.

## 1. Read A Transaction With Data

```bash
HB=${HB:-http://localhost:8734}
TXID=ptBC0UwDmrUTBQX3MqZ1lB57ex20ygwzkjjCrQjIx3o

curl -sS "$HB/~arweave@2.9/tx=$TXID/serialize~json@1.0" > /tmp/hb-arweave-tx.json
```

Expected stable fields:

```json
{
  "reward": "482143296",
  "anchor": "XTzaU2_m_hRYDLiXkcleOC4zf5MVTXIeFWBOsJSRrtEZ8kM6Oz7EKLhZY7fTAvKq",
  "content-type": "application/json"
}
```

The source test hashes the returned `data` bytes with SHA-256 and expects:

```text
PEShWA1ER2jq7CatAPpOZ30TeLrjOSpaf_Po7_hKPo4
```

## 2. Read Headers Without Data, Then Reattach Raw Bytes

```bash
HB=${HB:-http://localhost:8734}
TXID=ptBC0UwDmrUTBQX3MqZ1lB57ex20ygwzkjjCrQjIx3o

curl -sS "$HB/~copycat@1.0/arweave?from=1749502&to=1749502&mode=write" >/dev/null

curl -sS "$HB/~arweave@2.9/tx=$TXID/serialize~json@1.0?exclude-data=true" \
  > /tmp/hb-arweave-header.json

curl -sS "$HB/~arweave@2.9/raw=$TXID" \
  > /tmp/hb-arweave-body.bin
```

Expected:

- The header response has no `data` field.
- The header still verifies as a signed transaction message.
- Reattaching `/raw` bytes to the header verifies the same transaction.
- SHA-256 of `/raw` bytes is `PEShWA1ER2jq7CatAPpOZ30TeLrjOSpaf_Po7_hKPo4`.

## 3. Read A Data-Tagged JSON Transaction

```bash
HB=${HB:-http://localhost:8734}
TXID=jI0A4BASHaUdCCsdv249BxDX6IlE0Ko391TuI6REATw

curl -sS "$HB/~copycat@1.0/arweave?from=1289677&to=1289677&mode=write" >/dev/null

curl -sS "$HB/~arweave@2.9/tx=$TXID/serialize~json@1.0?exclude-data=true"
curl -sS "$HB/~arweave@2.9/raw=$TXID" > /tmp/hb-arweave-data-tagged.json
```

Expected stable fields:

```json
{
  "reward": "630923958",
  "anchor": "CWJKkpdXEQO9sCWLFg8Cqby0d7wY0Gez5H95YG15g8pAYaXVatF9Ms1QBUpvZ-Ll",
  "content-type": "application/json"
}
```

Expected SHA-256 of the raw body:

```text
IHyJ9BlQaHLWVwwklMwV1XEYXGjwx2B6HXNJZ4yJXeQ
```

## 4. Follow A Nested Bundled Item

The split-chunk transaction below is a signed L1 transaction whose data resolves into nested ANS-104 items. HyperBEAM exposes child items as path segments.

```bash
HB=${HB:-http://localhost:8734}
TXID=T2pluNnaavL7-S2GkO_m3pASLUqMH_XQ9IiIhZKfySs

curl -sS "$HB/~arweave@2.9/tx=$TXID/serialize~json@1.0?exclude-data=true"
curl -sS "$HB/~arweave@2.9/tx=$TXID/1/2/serialize~json@1.0"
```

Expected root fields:

```json
{
  "reward": "6035386935",
  "anchor": "PX16-598IrIMvLxFkvfNTWLVKXqXSmArOdW3o7X8jWMCH1fiNOjBZ2XjQlw0FOme",
  "Contract": "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw"
}
```

Expected signed child ID:

```text
8aJrRWtHcJvJ61qsH6agGkemzrtLw3W22xFrpCGAnTM
```

## 5. Handle Missing Transactions

```bash
HB=${HB:-http://localhost:8734}

curl -sS -o /tmp/hb-invalid-tx.html -w '%{http_code}\n' \
  "$HB/~arweave@2.9/tx=INVALID-ID"
```

Expected:

```text
404
```
